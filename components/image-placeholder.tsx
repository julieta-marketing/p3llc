import Image from 'next/image'
import { cn } from '@/lib/utils'

type ImagePlaceholderProps = {
  label: string
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]" */
  aspect?: string
  className?: string
  rounded?: boolean
}

/**
 * Neutral, clearly-labeled image region used when no approved image exists yet.
 * Styled in the Light Gray Blue family so it reads as an intentional
 * "pending approval" state rather than a broken image.
 */
export function ImagePlaceholder({
  label,
  aspect = 'aspect-[4/3]',
  className,
  rounded = true,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden border border-[color:var(--color-lgb)] bg-[color:var(--color-lgb-soft)]',
        aspect,
        rounded ? 'rounded-[1.5rem]' : 'rounded-none',
        className,
      )}
    >
      {/* thin-line corner marks for an understated, drafted feel */}
      <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-[color:var(--color-lgb)]" />
      <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-[color:var(--color-lgb)]" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[color:var(--color-lgb)]" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[color:var(--color-lgb)]" />
      <div className="flex flex-col items-center px-6 text-center text-[color:var(--color-navy)]">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>
    </div>
  )
}

type MediaFrameProps = {
  /** Image path; when null a labeled placeholder is rendered instead */
  src: string | null
  alt: string
  /** Label shown by the placeholder when no image is available */
  label: string
  aspect?: string
  className?: string
  rounded?: boolean
  sizes?: string
  priority?: boolean
  /** Subtle scale on parent .group hover (for project previews) */
  hoverZoom?: boolean
}

/**
 * Renders an approved image at a consistent aspect ratio, or a neutral labeled
 * placeholder when the image is not yet available. Keeps all media in a
 * uniform frame regardless of source dimensions.
 */
export function MediaFrame({
  src,
  alt,
  label,
  aspect = 'aspect-[4/3]',
  className,
  rounded = true,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  hoverZoom = false,
}: MediaFrameProps) {
  if (!src) {
    return (
      <ImagePlaceholder
        label={label}
        aspect={aspect}
        className={className}
        rounded={rounded}
      />
    )
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden border border-border bg-muted',
        aspect,
        rounded ? 'rounded-[1.5rem]' : 'rounded-none',
        className,
      )}
    >
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'object-cover',
          hoverZoom &&
            'transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
        )}
      />
    </div>
  )
}
