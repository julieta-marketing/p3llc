'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { MediaFrame } from '@/components/image-placeholder'
import type { CaseStudy, CaseStudyCategory } from '@/lib/cases'

const categories: Array<'All' | CaseStudyCategory> = [
  'All',
  'Alternative Financing',
  'Alternative Delivery',
  'Expert Network',
  'Economic Development Implementation',
]

export function CaseStudyLibrary({ studies }: { studies: CaseStudy[] }) {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>('All')

  const visibleStudies =
    activeCategory === 'All'
      ? studies
      : studies.filter((study) =>
          study.categories.includes(activeCategory),
        )

  return (
    <div className="case-library">
      <div className="case-library__toolbar">
        <div className="case-library__filters" aria-label="Filter case studies">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? 'is-active' : ''}
              aria-pressed={category === activeCategory}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p aria-live="polite">
          {String(visibleStudies.length).padStart(2, '0')} projects
        </p>
      </div>

      <div className="case-library__grid">
        {visibleStudies.map((study) => {
          return (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="case-library-card group"
              aria-label={`See full case study: ${study.title}`}
            >
              <div className="case-library-card__media">
                <MediaFrame
                  src={study.image}
                  alt={study.title}
                  label="Project Image Pending Client Approval"
                  aspect="absolute inset-0"
                  rounded={false}
                  className="border-0"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  hoverZoom
                />

              </div>

              <div className="case-library-card__body">
                <div className="case-library-card__tags">
                  {study.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
                <h2>{study.title}</h2>
                <p>{study.preview}</p>
                <span className="case-library-card__link">
                  See full case study
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
