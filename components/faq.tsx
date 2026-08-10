'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { faqItems } from '@/lib/content'

export function Faq({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(null)
  const midpoint = Math.ceil(faqItems.length / 2)
  const columns = [faqItems.slice(0, midpoint), faqItems.slice(midpoint)]

  return (
    <div className="grid gap-x-8 gap-y-0 lg:grid-cols-2 xl:gap-x-12">
      {columns.map((items, columnIndex) => (
        <div
          key={items[0]?.question}
          className={cn(
            'border-t',
            tone === 'dark'
              ? 'border-white/12'
              : 'border-[color:var(--color-navy)]/22',
            columnIndex === 1 && 'max-lg:border-t-0',
          )}
        >
          {items.map((item, itemIndex) => {
            const index = columnIndex === 0 ? itemIndex : midpoint + itemIndex
            const isOpen = open === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div
                key={item.question}
                className={cn(
                  'border-b',
                  tone === 'dark'
                    ? 'border-white/10'
                    : 'border-[color:var(--color-navy)]/16',
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex min-h-[4.75rem] w-full items-center justify-between gap-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        'max-w-[30ch] font-serif text-[1.05rem] leading-[1.35] transition-colors group-hover:text-[#67cce5] md:text-[1.12rem]',
                        tone === 'dark'
                          ? 'text-white/88'
                          : 'text-[color:var(--color-navy)]',
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color] group-hover:border-[#67cce5]',
                        tone === 'dark'
                          ? 'border-white/15 text-[#67cce5]'
                          : 'border-[color:var(--color-navy)]/25 text-[color:var(--color-blue)]',
                        isOpen && 'border-[#67cce5] bg-[#67cce5]/10',
                      )}
                    >
                      <Plus
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-300',
                          isOpen && 'rotate-45',
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 pr-10"
                >
                  <p
                    className={cn(
                      'text-[0.9rem] leading-6',
                      tone === 'dark'
                        ? 'text-white/52'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
