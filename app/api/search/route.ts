import { NextRequest, NextResponse } from 'next/server';
import { searchDuffelFlights } from '@/lib/duffel';
import { SearchParams } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { origin, destination, departureDate, cabinClass = 'economy', passengers = 1, customToken } = body;

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
      cabinClass,
      passengers: Number(passengers) || 1
    };

    const offers = await searchDuffelFlights(searchParams, customToken);

    return NextResponse.json({
      success: true,
      meta: {
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
