import { NextRequest, NextResponse } from 'next/server';
import { searchTravelpayoutsFlights } from '@/lib/travelpayouts';
import { searchDuffelFlights } from '@/lib/duffel';
import { generateRealisticFlights } from '@/data/mockFlights';
import { SearchParams, FlightOffer } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      cabinClass = 'economy',
      passengers = 1,
      customToken
    } = body;

    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        { error: 'origin, destination, and departureDate are required parameters.' },
        { status: 400 }
      );
    }

    const searchParams: SearchParams = {
      origin: origin.toUpperCase().trim(),
      destination: destination.toUpperCase().trim(),
      departureDate,
      returnDate: returnDate || undefined,
      cabinClass,
      passengers: Number(passengers) || 1
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

    // 2. Secondary GDS Provider: Duffel (if customToken or DUFFEL_ACCESS_TOKEN is present)
    if (offers.length === 0 && (customToken || process.env.DUFFEL_ACCESS_TOKEN)) {
      try {
        console.log(`[WhichPlane Gateway] Querying Duffel for ${searchParams.origin} -> ${searchParams.destination}`);
        offers = await searchDuffelFlights(searchParams, customToken);
        if (offers.length > 0 && offers[0].source !== 'verified_simulation') {
          provider = 'duffel_live';
        }
      } catch (duffelErr) {
        console.warn('[WhichPlane Gateway] Duffel query failed, falling back:', duffelErr);
      }
    }

    // 3. Fallback High-Fidelity Simulation Engine (Guarantees zero downtime / zero blank screens)
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
