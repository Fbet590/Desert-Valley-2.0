import Image from "next/image"

const SERVICES = [
  {
    title: "Solid Top",
    description:
      "Provides full shade and complete rain protection for ultimate comfort.",
    image: "/images/solid-top-new.jpg",
    objectPosition: "center 25%",
  },
  {
    title: "Lattice",
    description:
      "Offers partial shade, perfect for adding style while still enjoying some sunlight.",
    image: "/images/lattice-new.jpg",
    objectPosition: "center 20%",
  },
  {
    title: "Arcova",
    description:
      "Our ultra-luxury option built with premium-grade materials and an unmatched finish. Adjustable louvered panels give you full control over sunlight and ventilation. The finest style and craftsmanship available -- and our most exclusive offering.",
    image: "/images/louvered-new.jpg",
    objectPosition: "center 15%",
  },
]

export function ServicesSection({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-center text-[20px] font-semibold uppercase tracking-[0.15em] text-primary" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
          Ready to Reimagine Your Outdoor Living Space?
        </p>
        <h2 className="mb-4 text-center font-serif text-[30px] font-bold text-foreground md:text-4xl text-balance leading-tight">
          Our Expert Contractor Services
        </h2>
        <p className="mx-auto mb-14 max-w-3xl text-center text-[20px] text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
          Our skilled team specializes in patio cover projects of all sizes,
          delivering precise craftsmanship, clear communication, and results
          that go above and beyond your expectations.
        </p>

        <div className="mb-12 text-center">
          <button
            onClick={onGetQuote}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Book Your Free Consultation
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={`${s.title} patio cover`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: s.objectPosition }}
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-[20px] font-bold text-card-foreground" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  {s.title}
                </h3>
                <p className="text-[16px] text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
