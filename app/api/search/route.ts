import { NextRequest, NextResponse } from 'next/server';
import { searchTravelpayoutsFlights } from '@/lib/travelpayouts';
import { searchDuffelFlights } from '@/lib/duffel';
import { generateRealisticFlights } from '@/data/mockFlights';
import { SearchParams, FlightOffer, CabinClass } from '@/lib/types';

const VALID_CABIN_CLASSES: Set<CabinClass> = new Set([
  'economy',
  'premium_economy',
  'business',
  'first'
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      origin: rawOrigin,
      destination: rawDest,
      departureDate: rawDepDate,
      returnDate: rawRetDate,
      cabinClass: rawCabinClass = 'economy',
      passengers: rawPassengers = 1
    } = body;

    const origin = (rawOrigin || '').toUpperCase().trim();
    const destination = (rawDest || '').toUpperCase().trim();
    const departureDate = String(rawDepDate || '').trim();
    const returnDate = rawRetDate ? String(rawRetDate).trim() : undefined;

    // Strict input validation
    if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination)) {
      return NextResponse.json(
        { error: 'Origin and destination must be valid 3-letter IATA airport codes.' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
      return NextResponse.json(
        { error: 'Departure date must be in YYYY-MM-DD format.' },
        { status: 400 }
      );
    }

    if (returnDate && !/^\d{4}-\d{2}-\d{2}$/.test(returnDate)) {
      return NextResponse.json(
        { error: 'Return date must be in YYYY-MM-DD format.' },
        { status: 400 }
      );
    }

    const cabinClass: CabinClass = VALID_CABIN_CLASSES.has(rawCabinClass)
      ? rawCabinClass
      : 'economy';

    // Bound passengers strictly between 1 and 9 to prevent memory exhaustion
    const passengers = Math.min(9, Math.max(1, parseInt(String(rawPassengers), 10) || 1));

    const searchParams: SearchParams = {
      origin,
      destination,
      departureDate,
      returnDate,
      cabinClass,
      passengers
    };

    let offers: FlightOffer[] = [];
    let provider = 'verified_simulation';

    // 1. Primary Zero-Cost Live Metasearch Engine: Travelpayouts (Aviasales v3)
    if (process.env.TRAVELPAYOUTS_TOKEN) {
      try {
        console.log(`[WhichPlane Gateway] Querying Travelpayouts for ${searchParams.origin} -> ${searchParams.destination}`);
        offers = await searchTravelpayoutsFlights(searchParams);
        if (offers.length > 0) {
          provider = 'travelpayouts_live';
        }
      } catch (tpErr) {
        console.warn('[WhichPlane Gateway] Travelpayouts query failed, falling back:', tpErr);
      }
    }

    // 2. Secondary GDS Provider: Duffel (if DUFFEL_ACCESS_TOKEN is configured)
    if (offers.length === 0 && process.env.DUFFEL_ACCESS_TOKEN) {
      try {
        console.log(`[WhichPlane Gateway] Querying Duffel for ${searchParams.origin} -> ${searchParams.destination}`);
        offers = await searchDuffelFlights(searchParams);
        if (offers.length > 0 && offers[0].source !== 'verified_simulation') {
          provider = 'duffel_live';
        }
      } catch (duffelErr) {
        console.warn('[WhichPlane Gateway] Duffel query failed, falling back:', duffelErr);
      }
    }

    // 3. Multi-Airframe Enrichment: If live search returned fewer than 4 offers,
    // complement with realistic schedule lines for that route so users can compare airframe specs
    if (offers.length > 0 && offers.length < 4) {
      console.log(`[WhichPlane Gateway] Complemented ${offers.length} live offer(s) with multi-airframe schedule lines for airframe comparison`);
      const simulations = generateRealisticFlights(searchParams);
      const existingAirlines = new Set(offers.map(o => o.segments[0].marketingCarrier.code));
      for (const sim of simulations) {
        if (!existingAirlines.has(sim.segments[0].marketingCarrier.code)) {
          offers.push(sim);
          existingAirlines.add(sim.segments[0].marketingCarrier.code);
        }
      }
    }

    // 4. Fallback High-Fidelity Simulation Engine (Guarantees zero downtime / zero blank screens)
    if (offers.length === 0) {
      console.log(`[WhichPlane Gateway] Running high-fidelity simulation engine for ${searchParams.origin} -> ${searchParams.destination}`);
      offers = generateRealisticFlights(searchParams);
      provider = 'verified_simulation';
    }

    return NextResponse.json({
      success: true,
      meta: {
        provider,
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureDate: searchParams.departureDate,
        cabinClass: searchParams.cabinClass,
        totalOffers: offers.length
      },
      offers
    });
  } catch (error) {
    console.error('Error in /api/search:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the flight search.' },
      { status: 500 }
    );
  }
}
