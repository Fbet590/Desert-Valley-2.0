import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    q: "How long does it take to build a patio cover?",
    a: "On average, our patio cover installations are completed within one to two weeks, ensuring minimal disruption to your schedule.",
  },
  {
    q: "Do you offer a payment plan?",
    a: "Yes, we offer flexible financing options to accommodate your budget and make your patio cover project more accessible.",
  },
  {
    q: "Do I need a permit to install a patio cover?",
    a: "Permits aren't always required. Some projects, like those involving HOAs or commercial projects, may need one. If that's the case, we will handle it for you!",
  },
]

export function FaqSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center font-serif text-[30px] font-bold text-foreground md:text-4xl">
          FAQs
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-[24px] font-extrabold text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[22px] font-bold text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
