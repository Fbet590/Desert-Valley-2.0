export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-2 font-serif text-lg font-bold text-foreground">
          Desert Valley Patio Covers
        </p>
        <p className="text-sm text-muted-foreground">
          {`\u00A9 ${new Date().getFullYear()} Desert Valley Patio Covers. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
