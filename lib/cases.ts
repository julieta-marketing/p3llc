import fs from 'node:fs'
import path from 'node:path'

export const caseStudyCategories = [
  'Alternative Financing',
  'Alternative Delivery',
  'Expert Network',
  'Economic Development Implementation',
] as const

export type CaseStudyCategory = (typeof caseStudyCategories)[number]

export type CaseStudy = {
  slug: string
  title: string
  categories: CaseStudyCategory[]
  preview: string
  image: string
  overview: string
  challenge: string
  approach: string
  results: string[]
  role: string
  order: number
}

const casesDirectory = path.join(process.cwd(), 'content', 'cases')

const requiredSections = [
  'Project Overview',
  'Our Role',
  'Challenge',
  'Approach',
  'Results',
] as const

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
    throw new Error(`${fileName}: add a second "---" before the case details.`)
  }

  const data: Record<string, string> = {}
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

function readRequiredField(
  data: Record<string, string>,
  key: string,
  fileName: string,
) {
  const value = data[key]?.trim()
  if (!value) throw new Error(`${fileName}: please complete "${key}".`)
  return value
}

function parseCategories(value: string, fileName: string) {
  const categories = value
    .split(/[,|]/)
    .map((category) => category.trim())
    .filter(Boolean)

  if (!categories.length) {
    throw new Error(`${fileName}: please add at least one category.`)
  }

  const invalidCategories = categories.filter(
    (category) =>
      !caseStudyCategories.includes(category as CaseStudyCategory),
  )
  if (invalidCategories.length) {
    throw new Error(
      `${fileName}: unknown category "${invalidCategories.join(', ')}".`,
    )
  }

  return categories as CaseStudyCategory[]
}

function parseSections(body: string, fileName: string) {
  const headings = Array.from(body.matchAll(/^##\s+(.+?)\s*$/gm))
  const sections = new Map<string, string>()

  headings.forEach((heading, index) => {
    const title = heading[1].trim()
    const contentStart = (heading.index ?? 0) + heading[0].length
    const contentEnd = headings[index + 1]?.index ?? body.length
    sections.set(title, body.slice(contentStart, contentEnd).trim())
  })

  for (const section of requiredSections) {
    if (!sections.get(section)) {
      throw new Error(`${fileName}: please complete "## ${section}".`)
    }
  }

  return sections
}

function readTextSection(
  sections: Map<string, string>,
  section: string,
) {
  return (sections.get(section) ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
}

function parseResults(sections: Map<string, string>, fileName: string) {
  const results = (sections.get('Results') ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)

  if (!results.length) {
    throw new Error(`${fileName}: add at least one bullet below "## Results".`)
  }

  return results
}

function getFileIdentity(fileName: string) {
  const baseName = path.basename(fileName, '.md')
  const numberedName = baseName.match(/^(\d+)-(.+)$/)

  return {
    order: numberedName ? Number(numberedName[1]) : Number.MAX_SAFE_INTEGER,
    slug: numberedName?.[2] ?? baseName,
  }
}

function parseCaseFile(filePath: string): CaseStudy {
  const fileName = path.basename(filePath)
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontMatter(source, fileName)
  const sections = parseSections(body, fileName)
  const { order, slug } = getFileIdentity(fileName)

  return {
    slug,
    order,
    title: readRequiredField(data, 'title', fileName),
    image: readRequiredField(data, 'image', fileName),
    preview: readRequiredField(data, 'summary', fileName),
    categories: parseCategories(
      readRequiredField(data, 'categories', fileName),
      fileName,
    ),
    overview: readTextSection(sections, 'Project Overview'),
    role: readTextSection(sections, 'Our Role'),
    challenge: readTextSection(sections, 'Challenge'),
    approach: readTextSection(sections, 'Approach'),
    results: parseResults(sections, fileName),
  }
}

function loadCaseStudies() {
  if (!fs.existsSync(casesDirectory)) return []

  return fs
    .readdirSync(casesDirectory)
    .filter(
      (fileName) =>
        fileName.endsWith('.md') &&
        !fileName.startsWith('_') &&
        fileName.toLowerCase() !== 'readme.md',
    )
    .flatMap((fileName) => {
      try {
        return [parseCaseFile(path.join(casesDirectory, fileName))]
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`[cases] Skipping invalid file: ${message}`)
        return []
      }
    })
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))
}

export const caseStudies = loadCaseStudies()

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}
