import {
  DollarSign,
  Award,
  MessageSquare,
  Layers,
  FileCheck,
  Wrench,
  ArrowRight,
} from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: DollarSign,
    title: "Clear, Upfront Pricing",
    description: "No hidden costs or surprise charges. You know exactly what you're paying for.",
  },
  {
    icon: Award,
    title: "Proven Expertise & Stunning Results",
    description: "Over 10 years of delivering beautiful patio cover installations.",
  },
  {
    icon: MessageSquare,
    title: "Communication You Can Count On",
    description: "We keep you informed every step of the way from start to finish.",
  },
  {
    icon: Layers,
    title: "Expert Material Guidance",
    description: "We help you choose the best materials for Arizona's unique climate.",
  },
  {
    icon: FileCheck,
    title: "Permits Handled For You",
    description: "We manage the entire permitting process so you don't have to worry.",
  },
  {
    icon: Wrench,
    title: "Professional, Reliable Service",
    description: "Our team shows up on time and delivers quality craftsmanship.",
  },
]

function TrustCardDesktop({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="group w-56 shrink-0 rounded-xl border-2 border-[#B94A00] bg-card p-4 transition-all hover:shadow-md">
      <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-[#B94A00]/10 text-[#B94A00]">
        <Icon className="size-5" />
      </div>
      <h3 className="text-[20px] font-extrabold text-card-foreground" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>{title}</h3>
    </div>
  )
}

function TrustCardMobile({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex w-full items-center gap-4 rounded-xl border-2 border-[#B94A00] bg-card p-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#B94A00]/10 text-[#B94A00]">
        <Icon className="size-7" />
      </div>
      <h3 className="flex-1 text-[20px] font-extrabold text-card-foreground" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>{title}</h3>
    </div>
  )
}

export function TrustSection({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section className="py-20 bg-[#F1F1F1]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 text-center">
          <div className="mb-6 inline-flex items-center gap-4 rounded-full bg-primary/10 px-7 py-3">
            <span className="text-5xl font-bold text-primary">10+</span>
            <span className="text-xl font-medium text-foreground">Years Experience</span>
          </div>
        </div>
        <p className="mb-2 text-center text-[20px] font-extrabold uppercase tracking-[0.15em] text-primary" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
          {"Choosing a contractor doesn't have to be stressful"}
        </p>
        <h2 className="mb-4 text-center font-serif text-[24px] font-bold text-foreground md:text-4xl text-balance leading-tight">
          No more endless searching, hidden costs, or surprise delays
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-[20px] text-muted-foreground leading-relaxed font-bold" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
          {"Here's why homeowners trust us:"}
        </p>

        {/* Mobile: stacked list */}
        <div className="mx-auto flex max-w-md flex-col gap-5 md:hidden">
          {TRUST_ITEMS.map((item) => (
            <TrustCardMobile key={item.title} {...item} />
          ))}
        </div>

        {/* Desktop: scrolling carousel */}
        <div className="hidden overflow-hidden px-1 py-1 md:block">
          <div
            className="scroll-track"
            style={{ "--scroll-duration": "35s", "--scroll-gap": "1.5rem" } as React.CSSProperties}
          >
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <TrustCardDesktop key={`${item.title}-${i}`} {...item} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onGetQuote}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#B94A00] bg-transparent px-8 py-4 text-lg font-semibold text-[#B94A00] transition-all hover:bg-[#B94A00]/10"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Free In-Home Estimate
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
