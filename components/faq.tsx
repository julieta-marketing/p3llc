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
    <div className="grid gap-4 lg:grid-cols-2">
      {columns.map((items, columnIndex) => (
        <div
          key={items[0]?.question}
          className="flex flex-col gap-3"
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
                  'overflow-hidden rounded-xl shadow-[0_12px_34px_rgba(7,26,34,0.055)] ring-1 transition-[background-color,box-shadow] duration-300',
                  tone === 'dark'
                    ? 'bg-white/[0.05] ring-white/10'
                    : 'bg-white/90 ring-[color:var(--color-navy)]/8',
                  isOpen &&
                    (tone === 'dark'
                      ? 'bg-white/[0.075]'
                      : 'bg-white shadow-[0_16px_42px_rgba(7,26,34,0.08)]'),
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex min-h-20 w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left outline-none transition-colors hover:bg-[color:var(--color-blue)]/[0.045] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--color-blue)]"
                  >
                    <span
                      className={cn(
                        'max-w-[31ch] font-sans text-[1.03rem] font-medium leading-[1.4] transition-colors group-hover:text-[color:var(--color-blue)] md:text-[1.1rem]',
                        tone === 'dark'
                          ? 'text-white/88'
                          : 'text-[color:var(--color-navy)]',
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color] group-hover:bg-[color:var(--color-blue)] group-hover:text-white',
                        tone === 'dark'
                          ? 'bg-white/[0.07] text-[#67cce5]'
                          : 'bg-[color:var(--color-blue)]/[0.08] text-[color:var(--color-blue)]',
                        isOpen && 'bg-[color:var(--color-blue)] text-white',
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
                  className="px-5 pb-6 pr-16"
                >
                  <p
                    className={cn(
                      'text-[0.98rem] leading-7',
                      tone === 'dark'
                        ? 'text-white/68'
                        : 'text-[color:var(--color-dark-azure)]/68',
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
