import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json()
    
    // Map to standard field names for CRM compatibility
    const payload = {
      package: rawPayload["Which package interested you the most?"] || "",
      structure_location: rawPayload["Where will the structure go?"] || "",
      name: rawPayload.name || "",
      email: rawPayload.email || "",
      phone: rawPayload.phone || "",
      // Also include first_name/last_name for LeadConnector
      first_name: rawPayload.name?.split(" ")[0] || "",
      last_name: rawPayload.name?.split(" ").slice(1).join(" ") || "",
    }
    
    console.log("[v0] Form submission payload:", payload)

    const results = await Promise.allSettled([
      fetch(
        "https://services.leadconnectorhq.com/hooks/ZB6nXXWIks5IpbVwrpBH/webhook-trigger/PCrpaf7ac3JZa2nWIW4T",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      ),
      fetch(
        "https://hooks.zapier.com/hooks/catch/24750736/4yu2kxo/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      ),
    ])

    // Log detailed results including response bodies for debugging
    const detailedResults = await Promise.all(
      results.map(async (r, i) => {
        const webhookName = i === 0 ? "LeadConnector" : "Zapier"
        if (r.status === "fulfilled") {
          let responseBody = ""
          try {
            responseBody = await r.value.text()
          } catch {
            responseBody = "Could not read response"
          }
          return {
            webhook: webhookName,
            status: r.status,
            httpStatus: r.value.status,
            response: responseBody,
          }
        }
        return {
          webhook: webhookName,
          status: r.status,
          reason: r.reason?.message,
        }
      })
    )

    console.log("[v0] Webhook results:", detailedResults)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Form submission error:", error)
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 })
  }
}
