# WhichPlane — Project Masterplan

> **Purpose of this document:** This is a complete, standalone brief for an AI coding agent (or a human developer) to pick up cold and start building. It contains the problem statement, the product decision, the full technical plan, API research findings (as of Sept 2026), data model, build phases, and open questions. No prior context is assumed.

---

## 1. Problem Statement

Every mainstream flight search tool — Google Flights, Skyscanner, Kayak, airline sites — is built around **airline, price, and schedule** as the primary axes of search. Aircraft type is, at best, a secondary detail you discover after clicking into a specific flight, buried in the fare details screen.

But a growing (if niche) set of travelers actually care which **physical aircraft** they fly on, for several distinct reasons:

1. **Safety/trust sentiment** — post-2018/2019 737 MAX crashes and Boeing's 2024 quality-control crisis, a meaningful share of travelers say they'd actively choose or avoid a manufacturer. Surveys found ~36–54% expressing an Airbus preference or Boeing avoidance in some form, and roughly half willing to pay $50–150 more for a flight on a "safer"-perceived aircraft. (Sentiment-driven, may fade over time — see Section 9.)
2. **Comfort** — composite widebodies (787 Dreamliner, A350) fly at lower cabin altitude and higher humidity, which measurably reduces jet lag/fatigue. Frequent long-haul flyers actively seek these out.
3. **Avgeek / enthusiast demand** — a small, passionate, vocal community wants to specifically fly (or "chase") certain aircraft types before they're retired: the **A380** (production ended 2021, many airlines retiring fleets), the **747** (almost entirely retired from passenger service), or conversely wants the *newest* type on a route (787-10, A350-1000, A321XLR).
4. **Seat/cabin geometry** — wider fuselage (A330/A350/A380) vs narrower (737/A320), 2-4-2 vs 3-3-3 seating, etc. — matters to tall or wide passengers regardless of manufacturer politics.

**The gap:** there is currently no consumer tool where "show me flights JFK→LHR that are specifically on an A380, or specifically NOT a 737 MAX, or specifically a composite widebody" is a first-class search filter — the way "1 stop or fewer" or "morning departure" already is on every major aggregator.

There's a second, harder problem underneath the product idea: **airlines don't guarantee aircraft type at booking time.** Equipment gets swapped for maintenance/scheduling reasons regularly. Any tool in this space has to be honest about "usually operates X" vs. "confirmed at booking" vs. "confirmed at check-in," or it will actively mislead the exact enthusiast audience it's trying to serve.

---

## 2. The Solution — Product Concept

**WhichPlane** (whichplane.app): a flight search tool that puts **aircraft type, cabin, and equipment** on equal footing with price and schedule — everything a Skyscanner/Kayak already does, plus a genuinely new filtering and browsing dimension.

### Core differentiator
A search experience where a user can say:
- "JFK → LAX, only show me A321neo or newer" (avoid older/legacy narrowbodies)
- "LHR → SIN, only A380 or 777" (chase specific widebodies)
- "Anywhere → anywhere, show me every remaining scheduled 747 passenger route in the world" (enthusiast bucket-list mode)
- "Show me only composite aircraft (787/A350) on this route for comfort"
- "Exclude 737 MAX" (safety/sentiment-driven filter)

...and get real, bookable (or at least link-out-able) flight results, not just a spec sheet.

### What makes this different from "just Kayak with a filter"
Kayak/Skyscanner technically already let you filter by aircraft on desktop in some markets — but it's buried, coverage is inconsistent, and it's bolted onto an airline-first mental model. This product is aircraft-first:
- **Aircraft-type landing pages** ("Everywhere you can still fly an A380 in 2026", "Every 787-10 route from the US") — genuinely useful, shareable, SEO-friendly content that doesn't exist elsewhere in this form.
- **Confidence-labeled equipment data** — every result is honest about whether the aircraft type is a live commitment from the airline's booking system (high confidence) vs. a "usually operates" historical pattern (medium confidence). This is the trust wedge for the enthusiast audience, who will absolutely notice and call out a tool that lies to them.
- **Enthusiast-specific metadata**: airframe age (via tail number where available), specific variant (787-8 vs -9 vs -10, A350-900 vs -1000), retirement-tracking ("last scheduled A380 routes"), and cabin configuration hints.
- **All the base features of a normal aggregator**: multi-city, price sorting, stops, times, duration, airline filter, calendar/flexible-date view.

### Target Audience & Commercial Positioning
- **Primary Users**: Any traveler booking flights who cares about cabin air quality, seating comfort (e.g. avoiding 3-4-3 10-abreast cramming), aircraft noise, or manufacturer preference (e.g. avoiding the 737 MAX or chasing the A350/A380/787).
- **Secondary Users**: AvGeeks, frequent flyers, and aviation enthusiasts hunting rare or flagship airframes.
- **Product Model**: A pure **Consumer Flight Metasearch Engine** (similar to Skyscanner, Google Flights, and Kayak). End-users never see or provide API keys. The platform seamlessly queries server-side airline data pipelines and aggregates real-world fares and equipment types.

---

## 3. Commercial Aggregator Architecture: How Skyscanner Operates & How WhichPlane Scales

To operate like Skyscanner or Google Flights, WhichPlane uses a centralized **server-side metasearch architecture**:

### 3.1 Centralized Server-Side API Gateway
* **Zero Client-Side Friction**: End-users simply visit `whichplane.app`, enter origin and destination, and receive live results. No user-facing API modals or developer tokens.
* **Server-Managed Credentials**: All airline connections (Duffel, GDS, or affiliate flight APIs) are managed strictly on the server (`process.env.DUFFEL_ACCESS_TOKEN`), keeping credentials secure and centralized.

### 3.2 Metasearch Economics & Revenue Model (Why Search is Free for Users)
Skyscanner, Kayak, and Google Flights do not charge users to search, nor do they force users to book directly inside their app. They operate on a **Metasearch Referral Model**:
1. **Cost-Per-Acquisition (CPA) / Affiliate Booking Commission**: When a user clicks "Select Flight" or "Book with British Airways", WhichPlane appends an affiliate referral tag (via networks like CJ Affiliate, Awin, Impact, or airline direct partner programs). When the traveler books on the airline portal, WhichPlane earns **1% to 3% commission** on the ticket price.
2. **Cost-Per-Click (CPC) / OTA Referrals**: Major Online Travel Agencies (Expedia, Trip.com, Booking.com, Priceline) pay metasearch engines **$0.20 to $0.80 per click-out**.

### 3.3 Flight Data Provider Strategy for Production
For a production flight aggregator, there are 4 viable data pipeline options:

1. **Option A: Duffel API (Enterprise Wholesale)**
   - **Capabilities**: Connects to 300+ airlines via modern NDC and GDS connections. Returns real-time bookable prices, schedules, and native aircraft equipment codes (`aircraft.iata_code: "380"`).
   - **Cost Structure**: Free search allocation of 1,500 searches per 1 booking. Excess searches cost $0.005 (half a cent).
   - **Fit for WhichPlane**: Excellent primary engine when paired with server-side caching and affiliate monetization.
2. **Option B: Travelpayouts / Aviasales Data API**
   - **Capabilities**: Built specifically for metasearch flight aggregators. Provides live flight search data and calendar matrices across hundreds of airlines.
   - **Cost Structure**: Free to search because the platform is natively tied into their global airline affiliate monetization network.
3. **Option C: Skyscanner for Partners (Travel API)**
   - **Capabilities**: B2B affiliate access to Skyscanner's own live cached fare network.
   - **Fit for WhichPlane**: Allows WhichPlane to query Skyscanner's pricing index and overlay its unique aircraft-first intelligence on top.
4. **Option D: Hybrid Pre-Indexed Schedule & Aircraft Cache (OAG / Cirium + Live Fare Cache)**
   - **Insight**: Airlines publish their seasonal flight schedules and aircraft assignments (e.g. BA 178 is scheduled as a Boeing 787-9) months in advance through official aviation registries (OAG/Cirium/AviationStack).
   - **Architecture**: Pre-indexing scheduled routes by aircraft type allows instant sub-millisecond filtering ("Show me all A380 routes from London") without burning live GDS API queries on every keystroke.

### 3.4 Aggregator Caching Layer (Slashing API Costs by 85–90%)
Commercial flight aggregators never send redundant queries to live GDS backends. 
* **Redis / Edge Response Cache**: Popular city-pairs (e.g. `JFK → LHR`, `DXB → LHR`, `SFO → SIN`) for the next 30–90 days are cached on the server for 1 to 6 hours.
* If 50 users search `JFK → LHR` within 2 hours, only 1 live API call is made; the remaining 49 users get sub-second instant cached results.

---

## 4. Business & Product Model: Search & Deep-Link, Don't Book

**Decision: WhichPlane is a pure metasearch discovery platform, identical to Skyscanner's core model.**

1. **Metasearch vs. OTA**: Online Travel Agencies (OTAs) take passenger payments, require PCI-DSS compliance, IATA accreditation, and 24/7 customer support for missed flights. Metasearch aggregators (Skyscanner, Google Flights) do not touch customer payments; they direct the traveler to book directly with the airline.
2. **User Trust**: Travelers prefer booking directly with airlines for loyalty points, seat selection, and simpler ticket management.
3. **Deep-Linking**: Every result card provides a calibrated outbound deep-link to the operating airline's official booking portal or verified OTA.

---

## 5. Technical Stack

Optimized for: rapid commercial deployment, high performance, SEO discoverability, and server-side aggregation.

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | **Next.js 16 (App Router), TypeScript** | Single unified codebase; Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR) for SEO-friendly aircraft-type landing pages; robust serverless API routes. |
| Styling | **Tailwind CSS v4** | Calibrated **AeroPrecision** design system with aeronautical tokens, daylight surfaces, and glassmorphic telemetry cards. |
| Backend/API layer | **Next.js Route Handlers (`/api/search`)** | Server-side multi-provider flight gateway managing upstream affiliate integrations and credentials. |
| Aircraft/flight data | **Travelpayouts (Aviasales v3 API) + Duffel + AeroMatcher** | **Primary**: 100% free Travelpayouts flight data with $0 API fees and monetized affiliate commission links. **Secondary**: Duffel GDS API. **Safety Net**: High-fidelity flight line simulation. |
| Aircraft intelligence | **WhichPlane AeroPrecision Matcher (`lib/aircraftMatcher.ts`)** | Cross-references flight numbers, airline fleets, and route distances to accurately tag physical aircraft airframes, cabin altitude, acoustic decibels, and seat layouts. |
| Database / Caching | **Edge Caching (`next: { revalidate: 180 }`) / Redis** | Caches high-volume route queries (e.g. JFK-LHR) to deliver sub-second response times. |
| Hosting | **Netlify free tier** (frontend + API routes) | Zero-cost, zero-ops for a Next.js app; generous enough free tier for hobby traffic. Builder already runs several Astro projects on Netlify — same account, no conflict, each site deploys independently. **Important:** Netlify supports Next.js (SSR, Route Handlers, ISR, middleware) via its official `@netlify/plugin-nextjs` adapter. As of recent Netlify versions this is auto-detected and auto-installed on deploy when it sees a Next.js project — no manual config needed for the standard case. If anything behaves unexpectedly (a Route Handler not running as a serverless/edge function, ISR not revalidating, etc.), explicitly check: (1) that `@netlify/plugin-nextjs` is listed in the site's dependencies/plugins, (2) the Netlify build log to confirm it detected "Next.js" as the framework, (3) Netlify's official Next.js support docs for the current adapter version, since this tooling evolves. Netlify's Next.js support is solid but trails Vercel (who builds Next.js) by a bit on brand-new features — irrelevant for this project's needs (search, filters, SSR/ISR pages), but worth knowing if something obscure doesn't work as expected. |
| DB hosting | **Supabase free tier** or **Turso free tier** | Both have functional free tiers suitable for hobby scale. |
| Mobile (phase 2) | **Same Next.js app wrapped as a PWA** first (near-zero extra work: manifest.json + service worker), then **React Native (Expo)** later only if a true native app is wanted | Avoids building/maintaining two separate frontends at hobby-project bandwidth. PWA gets you "installable on phone" for free. |
| Aircraft SVG/diagrams (for cabin/seat visuals) | Hand-authored simple SVGs per major aircraft family (787, A350, A380, 747, 737, A320 families) stored as static assets | Real per-airline seat maps come from Duffel's seat-map endpoint when available; the hand-authored SVGs are a fallback/illustrative "what this aircraft generally looks like inside" view when Duffel has no seat map for that flight. |

**Explicitly avoid for v1:** microservices, Kubernetes, a separate mobile codebase, a custom auth system, a payments integration — all unnecessary scope for what this is.

---

## 6. Data Model (initial sketch)

This isn't a full schema, just enough for an agent to start scaffolding tables/types.

```
AircraftType
- id (e.g. duffel iata_code: "380", "789", "35K", "7M8")
- name ("Airbus A380-800")
- manufacturer ("Airbus" | "Boeing" | "Embraer" | "Other")
- family ("A380" | "787" | "A350" | "737 MAX" | "737NG" | "747" | ... )
- body_type ("widebody" | "narrowbody" | "regional")
- is_composite (bool)  -- 787/A350 = true, marketing hook for comfort angle
- production_status ("in_production" | "discontinued")  -- A380/747 = discontinued
- fun_facts (text)     -- avgeek content: "Last A380 delivered 2021", etc.
- image_url

Airline
- id (IATA code)
- name
- fleet[] -> AircraftType[] (many-to-many, via cached AeroDataBox fleet lookups, v2)

CachedOfferSearch
- id
- origin, destination, date, cabin_class, pax_count (search params, hashed as cache key)
- raw_duffel_response (jsonb)
- fetched_at
- expires_at

Offer (derived/flattened from Duffel response, for filtering/display)
- id (duffel offer id)
- search_id (fk -> CachedOfferSearch)
- airline_id
- price, currency
- departure_time, arrival_time, duration
- stops (int)
- segments[]:
  - origin, destination
  - operating_carrier (must be shown prominently per DOT rule, see 3.1)
  - marketing_carrier
  - aircraft_type_id (fk -> AircraftType)
  - aircraft_confidence ("confirmed" | "typical")  -- see Section 7
  - flight_number
  - duration

SeatMap (cached, from Duffel /air/seat_maps, keyed by offer)
- offer_id
- raw_response (jsonb)
- has_seat_map (bool)

UserSavedSearch (v2, optional)
- user_id
- search params
- alert preferences
```

---

## 7. The "Aircraft Confidence" Problem — Must Be Solved Explicitly

This is the single most important non-obvious design requirement, flagged in Section 1. **Do not skip this.**

- When Duffel returns a live offer with an `aircraft` field, that's the airline's **current stated equipment for that specific flight/date** — treat this as `confidence: "confirmed_at_search_time"`. Still show a disclaimer: *"Aircraft type is provided by the airline and can change before departure due to maintenance or scheduling."*
- If, in a v2 enrichment feature, the app infers "this flight number usually operates on an A350" from historical AeroDataBox data rather than a live quote, label it clearly as `confidence: "typically_operates"` and visually distinguish it (e.g., different badge color/icon) from the confirmed case.
- Never present a "typically operates" inference with the same visual weight as a live-quoted aircraft type. This is exactly the kind of tool where the target audience (avgeeks, safety-conscious flyers) will lose trust immediately if the tool overstates certainty — and that trust is the entire value proposition.
- Add a persistent, simple explainer (tooltip or FAQ link) describing why aircraft type isn't 100% guaranteed even when "confirmed," and recommend users reverify at check-in for anything mission-critical (e.g., someone specifically booking to fly an A380 before retirement).

---

## 8. Build Phases

### Phase 0 — Setup (½–1 day)
- Next.js + TypeScript + Tailwind scaffold, deployed to Netlify (even empty) to validate the pipeline early — confirm the Netlify Next.js plugin auto-detects correctly on this very first deploy, before any real feature work, so adapter issues surface immediately rather than mid-build.
- Duffel account signup; get test token; get live token (verify current signup requirements at build time — this may require identity verification steps, check Duffel's current dashboard flow).
- Supabase or Turso project created; empty schema from Section 6 migrated.
- Confirm: a basic authenticated `curl` to Duffel's `/air/offer_requests` and `/air/aircraft` works end-to-end from a Node script.

### Phase 1 — Core Search Loop (MVP, the whole point of the project)
- Search form: origin, destination, date(s), cabin class, pax count — standard aggregator UX.
- Call Duffel `POST /air/offer_requests` → poll/stream offers.
- Flatten offers into the `Offer`/segment shape from Section 6, extracting `aircraft` per segment.
- Results list UI: price, times, duration, stops, **aircraft type badge per segment** (this is the differentiator — make it prominent, not an afterthought detail).
- **Aircraft filter**: multi-select filter panel — by manufacturer (Airbus/Boeing/Other), by specific family (A320 family, A350, 787, 737 MAX, 747, A380, etc.), by body type (widebody/narrowbody), by "composite only" toggle, by "exclude 737 MAX" quick-toggle.
- Sort options: price, duration, departure time (standard), plus a novelty sort like "widebody first."
- Deep-link out to airline booking site per Section 4 (no booking flow built in-house).
- Cache layer wired in per Section 5/6 to avoid re-hitting Duffel unnecessarily.
- Operating-carrier disclosure shown prominently per segment (compliance requirement, Section 3.1).

**Definition of done for Phase 1:** a user can search JFK→LAX, filter to "only Airbus," see real live-ish priced results with correct aircraft badges, and click through to book on the airline's site.

### Phase 2 — Avgeek Depth Features
- Aircraft-type reference pages (`/aircraft/a380`, `/aircraft/747`, etc.) — static/SSR pages with fun facts, retirement status, which airlines still fly it, "routes you can still catch it on" (derived from recent successful searches or a periodic background job hitting Duffel for known A380/747 routes).
- Seat map preview pulled from Duffel's `/air/seat_maps` where available; fallback to the hand-authored generic SVG per aircraft family (Section 5) when Duffel has none.
- "Confidence" labeling system from Section 7 fully implemented and visually distinct.
- Optional: AeroDataBox integration for tail-number/airframe-age lookups on a per-flight basis (clearly labeled as supplementary/best-effort data, separate from the core Duffel-sourced confirmed data).

### Phase 3 — Nice-to-haves (only if the hobby project has legs)
- PWA manifest + service worker for "install to home screen" mobile experience.
- Saved searches / alerts ("tell me if an A380 route reopens between X and Y") — requires basic auth (Supabase Auth free tier) and a scheduled job. On Netlify this means **Netlify Scheduled Functions** (the Netlify equivalent of Vercel Cron) — free tier has limited invocations, check current quota before relying on frequent schedules.
- Live aircraft tracking widget via OpenSky for a selected flight, for fun.
- Shareable "flight card" images (e.g., "I'm flying an A350 to Tokyo ✈️") for social sharing — organic marketing for a project like this.
- True React Native app only if PWA adoption/interest justifies the extra maintenance.

---

## 9. Known Risks & Honest Caveats (carry into the build, don't ignore)

- **Aircraft-type sentiment (Boeing avoidance) may fade** as a cultural moment — don't build the core value prop *solely* around "avoid Boeing." The comfort angle (composite aircraft) and the enthusiast angle (chase the A380/747) are more durable motivations and should be equally prominent in the product, not just a manufacturer toggle.
- **Aircraft swaps are common** — equipment shown at search time is not a guarantee. This is handled by the confidence-labeling system (Section 7), but it needs to be genuinely respected in the UI, not just mentioned in fine print.
- **Duffel airline coverage isn't universal** — ~300+ airlines is a lot, but confirm specific carriers of interest (especially ones known for A380/747 operations — Emirates, Qantas, Lufthansa, etc.) are actually present in Duffel's live inventory before assuming full route coverage. Do this check in Phase 0.
- **Free-tier terms can change** — this entire plan is built on Duffel's search being free and AeroDataBox having a usable free tier as of Sept 2026. Both are third-party businesses that can change pricing. Re-verify before investing heavy build time, and design the caching layer generously so a pricing change doesn't immediately break the app in production.
- **Not a real business plan** — this document deliberately does not include monetization, growth, or legal/regulatory scope beyond the DOT operating-carrier disclosure rule, because the brief was explicit: hobby project, not a company.

---

## 10. Open Questions for the Human Builder (flag these, don't guess silently)

An agent picking this up should ask the human before proceeding if:
1. Duffel's live-mode signup process (as encountered at actual build time) requires identity/business verification that a hobby builder can't easily complete — if so, decide whether to build against test mode only (fake data, UI-only) or find an alternative.
2. The specific airlines the builder cares most about (e.g., "I really want Emirates A380 data to work well") aren't present in Duffel's inventory — may need a scope conversation.
3. Whether AeroDataBox's actual current free-tier quota (verify at signup — pricing pages change) is sufficient for the enrichment features in Phase 2, or whether those features should be deferred/cut.

---

## 11. Summary for the Building Agent

1. Sign up for Duffel, get a token, confirm `/air/offer_requests` returns `aircraft` per segment for real routes.
2. Scaffold Next.js + Tailwind + Supabase/Turso per Section 5.
3. Build the Phase 1 search loop — this alone delivers the entire core value proposition (aircraft-type-first flight search). Everything in Phase 2/3 is enrichment, not foundation.
4. Respect the confidence-labeling requirement (Section 7) from day one of showing aircraft data — it's cheap to build in early and expensive to retrofit trust into later.
5. Don't build booking, payments, or auth until/unless Phase 3 is reached and justified.
