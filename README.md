# WhichPlane — whichplane.app ✈️

> **Fly the plane you actually want to fly.**

WhichPlane is an aircraft-first flight search and discovery platform that puts **aircraft type, cabin comfort, and equipment confidence** on equal footing with price and schedule.

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Creddio-Platforms/whichplane.app.git
cd whichplane.app

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🔑 Optional Duffel API Configuration

You can configure a live Duffel API access token either:
1. In the UI via the **Duffel API** button in the top navbar.
2. In a `.env.local` file:
   ```env
   DUFFEL_ACCESS_TOKEN=your_duffel_token_here
   ```

*(If omitted, WhichPlane automatically runs with the realistic flight simulator).*

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Aviation Dark Cockpit Theme)
- **Iconography**: Lucide React
- **Flight Data**: Duffel API & Aviation Taxonomy Engine
- **License**: MIT
