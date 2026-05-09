"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Menu, X } from "lucide-react"

export function HeroSection({ onGetQuote }: { onGetQuote: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Beautiful custom patio cover in Arizona desert landscape"
        fill
        className="object-cover"
        style={{ objectPosition: "65% top" }}
        priority
      />
      <div className="absolute inset-0 bg-[oklch(0.15_0.02_50/0.70)]" />
      <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="relative">
          <svg className="absolute h-0 w-0" aria-hidden="true">
            <defs>
              <filter id="white-keep-yellow">
                <feComponentTransfer in="SourceGraphic" result="allWhite">
                  <feFuncR type="discrete" tableValues="1" />
                  <feFuncG type="discrete" tableValues="1" />
                  <feFuncB type="discrete" tableValues="1" />
                  <feFuncA type="identity" />
                </feComponentTransfer>
                <feBlend in="SourceGraphic" in2="allWhite" mode="color" />
              </filter>
            </defs>
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Desert Valley Patio Covers LLC logo"
            className="h-16 w-auto"
            style={{ filter: "url(#white-keep-yellow)" }}
          />
        </div>
        {/* Desktop CTA */}
        <button
          onClick={onGetQuote}
          className="hidden rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-all hover:brightness-110 md:inline-flex"
        >
          Get a Free Quote
        </button>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex items-center justify-center rounded-lg border border-[oklch(1_0_0/0.3)] p-2 text-[oklch(1_0_0)] transition-colors hover:bg-[oklch(1_0_0/0.1)]"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-[88px] z-30 mx-4 rounded-xl bg-[oklch(0.15_0.02_50/0.95)] backdrop-blur-md p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { onGetQuote(); setMobileMenuOpen(false) }}
              className="w-full rounded-lg bg-[#FDC901] px-4 py-3 text-sm font-bold uppercase tracking-wide text-[oklch(1_0_0)]"
              style={{ fontFamily: "var(--font-poppins), sans-serif", textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl px-6 pt-32 md:pt-24 pb-12 text-left lg:px-12">
        <h1 className="mb-6 text-[45px] font-bold leading-tight text-[oklch(1_0_0)] md:text-5xl lg:text-6xl text-balance" style={{ fontFamily: "'TeX Gyre Termes', serif" }}>
          $500 Bucks Gets Your Pergola Started.
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6">
          {["Top Grade Premium Material", "12 Months 0% Financing Available", "Custom Built"].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <span className="flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-full border-2 border-[#FDC901]">
                <Check className="size-3 sm:size-4 text-[#FDC901]" strokeWidth={3} />
              </span>
              <span className="text-[16px] sm:text-[20px] font-semibold text-[oklch(1_0_0)]" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>{text}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onGetQuote}
          className="inline-flex items-center rounded-lg bg-[#FDC901] px-5 py-2.5 text-[16px] md:px-8 md:py-4 md:text-[1.25rem] font-bold uppercase tracking-wide text-[oklch(1_0_0)] shadow-lg transition-all hover:brightness-110"
          style={{ fontFamily: "var(--font-poppins), sans-serif", textShadow: "0 2px 6px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)" }}
        >
          Book Your Free Consultation
        </button>
      </div>
    </section>
  )
}
