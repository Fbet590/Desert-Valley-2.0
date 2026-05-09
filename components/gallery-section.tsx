"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const GALLERY = [
  { src: "/images/gallery/01.jpg", alt: "Modern solid top patio cover with TV wall by pool" },
  { src: "/images/gallery/02.jpg", alt: "White solid top patio cover with palm trees and pool" },
  { src: "/images/gallery/03.jpg", alt: "Louvered pergola at dusk with purple flowers and uplighting" },
  { src: "/images/gallery/04.jpg", alt: "Freestanding louvered pergola with stone column bases" },
  { src: "/images/gallery/05.jpg", alt: "Large louvered patio cover with turf and pool area" },
  { src: "/images/gallery/06.jpg", alt: "White freestanding lattice pergola on turf" },
  { src: "/images/gallery/07.jpg", alt: "Dark pergola with blue tile pool and cacti" },
  { src: "/images/gallery/08.jpg", alt: "Louvered patio cover at sunset with travertine flooring" },
  { src: "/images/gallery/09.jpg", alt: "Solid top patio cover with privacy wall by pool" },
  { src: "/images/gallery/10.jpg", alt: "Louvered pergola with BBQ area on paver patio" },
  { src: "/images/gallery/11.jpg", alt: "Dark louvered pergola angle shot with outdoor kitchen" },
  { src: "/images/gallery/12.jpg", alt: "Lattice pergola with desert mountains and cacti" },
  { src: "/images/gallery/13.jpg", alt: "Solid top patio cover close-up with paver walkway" },
  { src: "/images/gallery/14.jpg", alt: "Louvered patio cover with pool and white chairs" },
  { src: "/images/gallery/15.jpg", alt: "Solid top pergola with outdoor kitchen and red dirt" },
  { src: "/images/gallery/16.jpg", alt: "Louvered patio cover interior with ceiling fan at dusk" },
  { src: "/images/gallery/17.jpg", alt: "Louvered pergola over lap pool with shadow pattern" },
  { src: "/images/gallery/18.jpg", alt: "Lattice pergola with outdoor dining and fireplace" },
  { src: "/images/gallery/19.jpg", alt: "Louvered patio cover with outdoor dining area" },
  { src: "/images/gallery/20.jpg", alt: "Dark solid top pergola with horizontal slat wall" },
]

export function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = GALLERY.length

  const goTo = useCallback((index: number) => {
    setCurrent(((index % total) + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-scroll every 4 seconds (paused when lightbox is open)
  useEffect(() => {
    if (lightbox !== null) return
    timerRef.current = setTimeout(next, 4000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, next, lightbox])

  // Lightbox navigation
  const lightboxNext = useCallback(() => {
    if (lightbox !== null) setLightbox(((lightbox + 1) % total + total) % total)
  }, [lightbox, total])

  const lightboxPrev = useCallback(() => {
    if (lightbox !== null) setLightbox(((lightbox - 1) % total + total) % total)
  }, [lightbox, total])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowRight") lightboxNext()
      if (e.key === "ArrowLeft") lightboxPrev()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [lightbox, lightboxNext, lightboxPrev])

  // Show 3 thumbnail previews (prev, current, next)
  const prevIdx = ((current - 1) % total + total) % total
  const nextIdx = (current + 1) % total

  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-center text-[20px] font-semibold uppercase tracking-[0.15em] text-primary" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
          See Our Stunning Results
        </p>
        <h2 className="mb-4 text-center font-serif text-[32px] font-bold text-foreground md:text-4xl text-balance leading-tight">
          Explore Our Recent Patio Projects
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[22px] text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
          Imagine the possibilities for your own home
        </p>

        {/* Main slideshow */}
        <div className="relative mx-auto max-w-3xl">
          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2.5 text-muted-foreground shadow-md backdrop-blur-sm transition-colors hover:text-foreground md:-left-14"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card/90 p-2.5 text-muted-foreground shadow-md backdrop-blur-sm transition-colors hover:text-foreground md:-right-14"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Main image */}
          <button
            onClick={() => setLightbox(current)}
            className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg focus:outline-none"
          >
            <Image
              src={GALLERY[current].src}
              alt={GALLERY[current].alt}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <span className="absolute bottom-4 right-4 rounded-lg bg-[oklch(0.15_0.02_50/0.6)] px-3 py-1.5 text-xs font-medium text-[oklch(1_0_0)] backdrop-blur-sm">
              {current + 1} / {total}
            </span>
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="mx-auto mt-4 flex max-w-3xl items-center justify-center gap-3">
          {[prevIdx, current, nextIdx].map((idx, i) => (
            <button
              key={`thumb-${idx}-${i}`}
              onClick={() => goTo(idx)}
              className={`relative aspect-[16/10] overflow-hidden rounded-lg transition-all ${
                idx === current
                  ? "w-24 ring-2 ring-primary md:w-32"
                  : "w-20 opacity-50 hover:opacity-80 md:w-28"
              }`}
            >
              <Image
                src={GALLERY[idx].src}
                alt={GALLERY[idx].alt}
                fill
                className="object-cover"
                sizes="128px"
              />
            </button>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`size-2 rounded-full transition-all ${
                i === current
                  ? "bg-primary scale-125"
                  : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.05_0_0/0.92)] p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 z-10 rounded-full bg-[oklch(0.2_0_0/0.5)] p-2 text-[oklch(1_0_0)] transition-colors hover:bg-[oklch(0.3_0_0/0.5)]"
          >
            <X className="size-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              lightboxPrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[oklch(0.2_0_0/0.5)] p-3 text-[oklch(1_0_0)] transition-colors hover:bg-[oklch(0.3_0_0/0.5)]"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              lightboxNext()
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[oklch(0.2_0_0/0.5)] p-3 text-[oklch(1_0_0)] transition-colors hover:bg-[oklch(0.3_0_0/0.5)]"
          >
            <ChevronRight className="size-6" />
          </button>

          <div
            className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-[oklch(0.15_0_0/0.6)] px-4 py-2 text-sm font-medium text-[oklch(1_0_0)] backdrop-blur-sm">
            {lightbox + 1} / {total}
          </span>
        </div>
      )}
    </section>
  )
}
