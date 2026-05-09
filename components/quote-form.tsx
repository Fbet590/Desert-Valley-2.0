"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    title: "Which package interests you?",
    type: "select" as const,
    options: [
      { label: "Essential Package - $5,499" },
      { label: "Comfort Package - $9,999" },
      { label: "Arcova Elite Package - $14,999" },
    ],
  },
  {
    title: "Enter your name:",
    type: "text" as const,
    placeholder: "Your full name",
    field: "name",
  },
  {
    title: "What's your email address?",
    type: "text" as const,
    placeholder: "email@example.com",
    field: "email",
  },
  {
    title: "What's the best mobile number to reach you on?",
    type: "text" as const,
    placeholder: "(555) 123-4567",
    field: "phone",
  },
]

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const progress = ((currentStep + 1) / STEPS.length) * 100
  const step = STEPS[currentStep]
  const canGoNext =
    step.type === "select"
      ? answers[currentStep] !== undefined
      : (answers[currentStep] ?? "").trim().length > 0
  const isLastStep = currentStep === STEPS.length - 1

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }))
    const step = STEPS[currentStep]
    if (step.type === "select" && currentStep < STEPS.length - 1) {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentStep((s) => s + 1)
        setTransitioning(false)
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 50)
      }, 500)
    }
  }

  async function handleNext() {
    if (!canGoNext) return
    if (isLastStep) {
      setIsSubmitting(true)
      try {
        const payload: Record<string, string> = {}
        STEPS.forEach((s, i) => {
          if (s.type === "select") {
            payload[s.title] = answers[i] ?? ""
          } else if (s.field) {
            payload[s.field] = answers[i] ?? ""
          }
        })
        await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "Lead", {
            content_name: payload["Which package interested you the most?"] ?? "",
          })
        }
      } catch (err) {
        console.error("Webhook submission failed:", err)
      } finally {
        setIsSubmitting(false)
        setIsSubmitted(true)
      }
      return
    }
    setCurrentStep((s) => s + 1)
  }

  function handlePrev() {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  if (isSubmitted) {
    return (
      <section id="quote-form" className="py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-lg">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-accent">
              <Check className="size-8 text-accent-foreground" />
            </div>
            <h3 className="mb-3 font-serif text-2xl font-bold text-card-foreground">
              Thank You!
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {"We've received your information and will be in touch within 24 hours to discuss your patio cover project."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form" className="relative -mt-12 sm:-mt-24 z-20 pt-0 pb-20">
      <div ref={formRef} className="mx-auto max-w-lg px-4 sm:px-6">
        <div className="rounded-2xl border-2 border-[#B94A00] bg-card pt-6 sm:pt-7 px-4 sm:px-6 pb-4 sm:pb-6 shadow-lg md:pt-7 md:px-8 md:pb-8">
          <div className="mb-6 flex items-center gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-2 flex-1 rounded-full transition-all duration-500 ease-in-out",
                  i <= currentStep
                    ? "bg-primary scale-y-125"
                    : "bg-border scale-y-100"
                )}
                style={{
                  transform: i === currentStep ? "scaleY(1.6)" : i < currentStep ? "scaleY(1.3)" : "scaleY(1)",
                }}
              />
            ))}
          </div>

          {/* Eyebrow badge - only show on first step */}
          {currentStep === 0 && (
            <div className="text-center mb-4">
              <span className="inline-block text-[12px] font-semibold tracking-[1.5px] uppercase text-[#B94A00]">
                EASY START OFFER
              </span>
            </div>
          )}

          <div
            className="transition-all duration-400 ease-in-out"
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? "translateY(12px)" : "translateY(0)",
            }}
          >
            <h3 className="mb-4 text-[23px] sm:text-[20px] md:text-[22px] font-bold text-card-foreground text-balance text-center" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
              {step.title}
            </h3>

            {/* Offer text - only show on first step */}
            {currentStep === 0 && (
              <p className="text-center text-[20px] sm:text-[16px] leading-relaxed text-[#555] mb-6" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                Projects under $5,000 start at just <strong className="text-card-foreground">$500 down</strong> — larger builds at <strong className="text-card-foreground">$1,000</strong>.
              </p>
            )}

            {step.type === "select" && (
              <div className="mb-6 grid gap-2.5">
                {step.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    className={cn(
                      "flex flex-col items-start rounded-xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 text-left transition-all",
                      answers[currentStep] === opt.label
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-[oklch(0.75_0.01_80)] hover:border-primary/40 hover:bg-secondary/50"
                    )}
                  >
                    <span className="text-[21px] sm:text-[18px] font-black text-card-foreground" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step.type === "text" && (
              <div className="mb-6">
                <input
                  type={
                    step.field === "email"
                      ? "email"
                      : step.field === "phone"
                      ? "tel"
                      : "text"
                  }
                  placeholder={step.placeholder}
                  value={answers[currentStep] ?? ""}
                  onChange={(e) => handleSelect(e.target.value)}
                  className="w-full rounded-xl border-2 border-[oklch(0.75_0.01_80)] bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-[16px] sm:text-[18px] text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-1 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[16px] sm:text-[18px] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext || isSubmitting}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 text-[16px] sm:text-[18px] font-semibold transition-all shadow-md disabled:opacity-50",
                isLastStep
                  ? "bg-[#B94A00] text-[oklch(1_0_0)] hover:brightness-110"
                  : "bg-primary text-primary-foreground hover:brightness-110"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : isLastStep ? (
                "Submit"
              ) : (
                <>
                  Next
                  <ChevronRight className="size-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
