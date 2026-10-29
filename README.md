# WhichPlane ✈️

> **Fly on the plane you actually want to fly.**

WhichPlane is an aircraft-first flight search and discovery exploration platform that puts **aircraft type, cabin comfort, and equipment confidence** on equal footing with price and schedule.

> [!NOTE]
> **Hobby / Educational Project Disclaimer**: WhichPlane is an independent, non-commercial hobbyist research and educational project. It is currently inactive for commercial bookings, and users are not intended to purchase flights through this platform. WhichPlane holds no responsibility or liability for flight schedules, pricing, or third-party airline services.

---

## 🌟 Core Features

- **Aircraft-First Super-Filters**:
  - 🌿 **Composite Cabin Only**: Filter for carbon-composite aircraft (Boeing 787 Dreamliner & Airbus A350) pressurized to 6,000 ft with 20–25% humidity for measurably reduced jet lag.
  - 🛡️ **Exclude Boeing 737 MAX**: 1-click filter for travelers with safety or manufacturer sentiment preferences.
  - 👑 **A380 & 747 Hunters**: Track and chase remaining scheduled routes for double-decker Airbus A380s and the Boeing 747 Queen of the Skies before they retire.
  - ✈️ **Widebody Only**: Twin-aisle comfort filtering.
  - 🛋️ **Fuselage Geometry**: Highlight traveler favorites like the 2-4-2 layout on the Airbus A330neo (zero middle-seat pairs) or 2-3 on the Airbus A220.

- **Aircraft Confidence & Trust Rating**:
  - Distinguishes between **"Confirmed at Search Time"** (airline's live stated equipment in booking system) vs. **"Typically Operates"** (historical schedule estimates).
  - Prominent interactive disclaimers about operational equipment swaps.

- **Compliance & Deep-Linking**:
  - **US DOT Regulation Compliance**: Prominent operating-carrier disclosures on all codeshare segments.
  - **Search & Deep-Link Paradigm**: Outbound deep links directly to airline portals or Google Flights prefilled parameters (no direct payments or booking risk).

- **Avgeek Intelligence & Interactive Cabin Visualizer**:
  - Interactive fuselage cross-sections and seating geometry diagrams.
  - Dedicated aircraft taxonomy and reference pages (`/aircraft` and `/aircraft/[code]`).

- **Duffel API + Zero-Config Realistic Simulation**:
  - Queries Duffel Flight API natively when `DUFFEL_ACCESS_TOKEN` is provided.
  - Automatically falls back to high-fidelity route simulations matching authentic airline fleet schedules when running offline or without an API key.

---

## 🔑 Server-Side Flight Data Gateway

WhichPlane operates as a centralized metasearch discovery aggregator. End-users never carry or provide API keys. All airline data feeds are securely resolved server-side through Next.js route handlers.

### Option A: 100% Free Travelpayouts Flight Data (Recommended)
WhichPlane includes native integration with the **Travelpayouts (Aviasales v3) Flight Data API**:
- **100% Free API access** for registered affiliate partners.
- **Zero per-search fees** and **no credit card required**.
- **Monetized Outbound Links**: Earn 50%–70% affiliate commission share on user flight bookings.

Add your credentials to `.env.local`:
```env
TRAVELPAYOUTS_TOKEN=your_free_travelpayouts_api_token
TRAVELPAYOUTS_MARKER=your_affiliate_marker_id
```

### Option B: Duffel GDS API (Optional)
If you operate with a Duffel wholesale account:
```env
DUFFEL_ACCESS_TOKEN=duffel_live_YOUR_TOKEN_HERE
```

*When no external server tokens are configured (such as during initial local development or testing), WhichPlane's high-fidelity simulation engine automatically activates to ensure the entire flight discovery UI and aircraft taxonomy remain fully operational without breaking.*

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Deployment**: Cloudflare Workers (via OpenNext & Wrangler)
- **Language**: TypeScript
- **Design System**: AeroPrecision (Daylight Aviation Canvas `#F8F9FF` & Obsidian Stratosphere `#0F172A`)
- **Typography**: B612 (Airbus Avionics Cockpit) + OCR-B (Boarding Pass Stamps) + Helvetica Neue (Stationery & Micro-Labels)
- **Styling**: Tailwind CSS v4
- **Iconography**: Google Material Symbols Outlined & Lucide React
- **Flight Data**: Duffel API & Aviation Taxonomy Engine
- **License**: MIT
