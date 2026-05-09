"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Chandler Mercer",
    text: "The team at Desert Valley Patio Covers was quick with an estimate, flexible with the installation, and followed-up to ensure the structure was completed to our satisfaction. The pergola helped finalize our vision and regain use of this space.",
  },
  {
    name: "Stephen Woolverton",
    text: "From start to finish, they were wonderful. Excellent communication to ensure they knew what I wanted, and they were very responsive all the way through. The final product looks excellent and provides the shade I needed. Thank you!",
  },
  {
    name: "Maria Gonzalez",
    text: "We couldn't be happier with our new patio cover. The quality of the work and professionalism of the team exceeded our expectations. Highly recommend Desert Valley Patio Covers!",
  },
  {
    name: "James & Linda Park",
    text: "Outstanding service from beginning to end. They handled everything including permits and the final result is absolutely beautiful. Our backyard is now our favorite room!",
  },
  {
    name: "Robert Chen",
    text: "Incredible craftsmanship and attention to detail. The crew was professional, clean, and finished ahead of schedule. Our new patio cover has completely transformed our outdoor space.",
  },
  {
    name: "Sarah Thompson",
    text: "Best investment we've made for our home. The team walked us through every option and helped us choose the perfect design. The installation was flawless and we use our patio every single day now.",
  },
]

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const total = TESTIMONIALS.length
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    timerRef.current = setTimeout(next, 5000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, next])

  const review = TESTIMONIALS[current]

  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-center text-[18px] font-semibold uppercase tracking-[0.15em] text-primary" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
          {"Don't Just Take Our Word For It..."}
        </p>
        <h2 className="mb-14 text-center font-serif text-[24px] font-bold text-foreground md:text-4xl text-balance leading-tight">
          {"Here's What Our Past Clients Had To Say"}
        </h2>

        <div className="mx-auto max-w-md">
          <div className="relative">
            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Previous review"
              className="absolute -left-12 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background p-2 text-muted-foreground shadow-sm transition-colors hover:text-foreground md:flex"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="absolute -right-12 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background p-2 text-muted-foreground shadow-sm transition-colors hover:text-foreground md:flex"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Card */}
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-5 fill-primary text-primary" />
                  ))}
                </div>
                <GoogleIcon className="size-6" />
              </div>
              <p className="mb-6 text-[20px] text-foreground leading-relaxed">
                {`"${review.text}"`}
              </p>
              <p className="text-[20px] font-semibold text-foreground">
                {"- "}{review.name}
              </p>
            </div>
          </div>

          {/* Dots + mobile arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="rounded-full border border-border bg-background p-1.5 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-2.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`size-2.5 rounded-full transition-all ${
                    i === current
                      ? "bg-primary scale-125"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next review"
              className="rounded-full border border-border bg-background p-1.5 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
