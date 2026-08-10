import fs from 'node:fs'
import path from 'node:path'

export type NewsContentBlock =
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'quote'
      text: string
      attribution: string
    }

export type NewsPost = {
  slug: string
  title: string
  date: string
  displayDate: string
  order: number
  category: string
  publication: string
  introduction: string
  image: string
  imageAlt: string
  imageCredit: string
  imageCreditUrl: string
  aboutThisRepost: string
  content: NewsContentBlock[]
}

const newsDirectory = path.join(process.cwd(), 'content', 'news')

function readRequiredString(
  data: Record<string, unknown>,
  key: string,
  fileName: string,
  legacyKeys: string[] = [],
) {
  const value = [key, ...legacyKeys]
    .map((candidate) => data[candidate])
    .find((candidate) => typeof candidate === 'string' && candidate.trim())

  if (typeof value !== 'string') {
    throw new Error(`${fileName}: please complete "${key}".`)
  }
  return value.trim()
}

function readOptionalString(data: Record<string, unknown>, key: string) {
  const value = data[key]
  return typeof value === 'string' ? value.trim() : ''
}

function formatNewsDate(date: string, fileName: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${fileName}: "date" must use YYYY-MM-DD format.`)
  }

  const parsedDate = new Date(`${date}T00:00:00Z`)
  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`${fileName}: "date" is not a valid date.`)
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsedDate)
}

function parseValue(rawValue: string) {
  const value = rawValue.trim()
  const hasMatchingQuotes =
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))

  return hasMatchingQuotes ? value.slice(1, -1) : value
}

function parseFrontMatter(source: string, fileName: string) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  if (lines[0]?.trim() !== '---') {
    throw new Error(`${fileName}: the file must begin with "---".`)
  }

  const endIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === '---',
  )
  if (endIndex === -1) {
    throw new Error(`${fileName}: add a second "---" before the article.`)
  }

  const data: Record<string, unknown> = {}
  for (const rawLine of lines.slice(1, endIndex)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      throw new Error(`${fileName}: invalid field line "${line}".`)
    }

    const key = line.slice(0, separatorIndex).trim()
    const rawValue = line.slice(separatorIndex + 1).trim()
    if (!key) {
      throw new Error(`${fileName}: invalid field line "${line}".`)
    }
    data[key] = parseValue(rawValue)
  }

  return {
    data,
    body: lines.slice(endIndex + 1).join('\n').trim(),
  }
}

function parseArticleContent(body: string, fileName: string): NewsContentBlock[] {
  if (!body) {
    throw new Error(`${fileName}: please add the full article below the fields.`)
  }

  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim())
      const isQuote = lines.every((line) => line.startsWith('>'))

      if (!isQuote) {
        return {
          type: 'paragraph' as const,
          text: lines.join(' '),
        }
      }

      const quoteLines = lines
        .map((line) => line.replace(/^>\s?/, '').trim())
        .filter(Boolean)
      const attributionLine = quoteLines.at(-1)
      if (attributionLine?.startsWith('— ') && quoteLines.length > 1) {
        return {
          type: 'quote' as const,
          text: quoteLines.slice(0, -1).join(' '),
          attribution: attributionLine.slice(2).trim(),
        }
      }

      return {
        type: 'paragraph' as const,
        text: quoteLines.join(' '),
      }
    })
}

function parseNewsFile(filePath: string): NewsPost {
  const fileName = path.basename(filePath)
  const slug = path.basename(filePath, '.md')
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontMatter(source, fileName)
  const date = readRequiredString(data, 'date', fileName)
  const title = readRequiredString(data, 'title', fileName)
  const aboutThisRepost = readRequiredString(
    data,
    'about',
    fileName,
    ['aboutThisRepost'],
  )
  const inferredPublication = aboutThisRepost.match(
    /originally appeared in (.+?) and is republished/i,
  )?.[1]

  return {
    slug,
    title,
    date,
    displayDate: formatNewsDate(date, fileName),
    order: 0,
    category: readOptionalString(data, 'category') || 'News',
    publication:
      readOptionalString(data, 'publication') ||
      inferredPublication?.trim() ||
      'P3 LLC',
    introduction: readRequiredString(data, 'summary', fileName, [
      'introduction',
    ]),
    image: readRequiredString(data, 'image', fileName),
    imageAlt: readOptionalString(data, 'imageAlt') || title,
    imageCredit: readOptionalString(data, 'imageCredit'),
    imageCreditUrl: readOptionalString(data, 'imageCreditUrl'),
    aboutThisRepost,
    content: parseArticleContent(body, fileName),
  }
}

function loadNewsPosts() {
  if (!fs.existsSync(newsDirectory)) return []

  const posts = fs
    .readdirSync(newsDirectory)
    .filter(
      (fileName) =>
        fileName.endsWith('.md') &&
        !fileName.startsWith('_') &&
        fileName.toLowerCase() !== 'readme.md',
    )
    .flatMap((fileName) => {
      try {
        return [parseNewsFile(path.join(newsDirectory, fileName))]
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`[news] Skipping invalid file: ${message}`)
        return []
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))

  return posts.map((post, index) => ({ ...post, order: index + 1 }))
}

export const newsPosts = loadNewsPosts()

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug)
}
