"use client"

import { useCallback } from "react"
import { HeroSection } from "@/components/hero-section"
import { QuoteForm } from "@/components/quote-form"
import { TrustSection } from "@/components/trust-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  const scrollToQuote = useCallback(() => {
    document
      .getElementById("quote-form")
      ?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <main>
      <HeroSection onGetQuote={scrollToQuote} />
      <QuoteForm />
      <TrustSection onGetQuote={scrollToQuote} />
      <TestimonialsSection />
      <ServicesSection onGetQuote={scrollToQuote} />
      <GallerySection />
      <FaqSection />
      <SiteFooter />
    </main>
  )
}
