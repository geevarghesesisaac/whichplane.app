import { FlightOffer, FlightSegment, SearchParams } from '@/lib/types';
import { matchAircraftForFlight, getAirlineInfo } from '@/lib/aircraftMatcher';
import { MAJOR_AIRPORTS } from '@/data/airports';

const TRAVELPAYOUTS_API_BASE = 'https://api.travelpayouts.com';

interface TravelpayoutsTicket {
  flight_number: string | number;
  airline: string;
  price: number;
  departure_at: string;
  return_at?: string;
  expires_at?: string;
  transfers?: number;
  link?: string;
  origin?: string;
  destination?: string;
  duration?: number;
}

interface TravelpayoutsResponse {
  success?: boolean;
  data?: TravelpayoutsTicket[];
  currency?: string;
  error?: string;
}

/**
 * Searches real-world live commercial flight prices via Travelpayouts (Aviasales v3) Flight Data API.
 * 100% free to access with no per-search fees and no credit card required.
 */
export async function searchTravelpayoutsFlights(params: SearchParams): Promise<FlightOffer[]> {
  const token = process.env.TRAVELPAYOUTS_TOKEN;
  const marker = process.env.TRAVELPAYOUTS_MARKER || 'whichplane';

  if (!token) {
    throw new Error('TRAVELPAYOUTS_TOKEN is not configured.');
  }

  const origin = params.origin.toUpperCase().trim();
  const destination = params.destination.toUpperCase().trim();
  const departureAt = params.departureDate; // YYYY-MM-DD

  // Format search URL
  const searchUrl = new URL(`${TRAVELPAYOUTS_API_BASE}/aviasales/v3/prices_for_dates`);
  searchUrl.searchParams.set('origin', origin);
  searchUrl.searchParams.set('destination', destination);
  searchUrl.searchParams.set('departure_at', departureAt);
  if (params.returnDate) {
    searchUrl.searchParams.set('return_at', params.returnDate);
  }
  searchUrl.searchParams.set('currency', 'USD');
  searchUrl.searchParams.set('sorting', 'price');
  searchUrl.searchParams.set('market', 'us');
  searchUrl.searchParams.set('limit', '30');

  console.log(`[WhichPlane] Querying Travelpayouts API: ${origin} -> ${destination} on ${departureAt}`);

  const response = await fetch(searchUrl.toString(), {
    method: 'GET',
    headers: {
      'x-access-token': token,
      Accept: 'application/json',
      'User-Agent': 'WhichPlane-AeroAggregator/2.0'
    },
    // Cache at edge for 3 minutes to optimize metasearch speed and reduce load
    next: { revalidate: 180 }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Travelpayouts API error (${response.status}):`, errorText);
    throw new Error(`Travelpayouts API responded with status ${response.status}: ${errorText}`);
  }

  const json: TravelpayoutsResponse = await response.json();

  if (!json.data || !Array.isArray(json.data) || json.data.length === 0) {
    console.log(`[WhichPlane] Travelpayouts returned 0 ticket offers for ${origin} -> ${destination}`);
    return [];
  }

  // Airport metadata helpers
  const originAirport = MAJOR_AIRPORTS.find(a => a.code === origin) || {
    code: origin,
    name: `${origin} International Airport`,
    city: origin
  };

  const destAirport = MAJOR_AIRPORTS.find(a => a.code === destination) || {
    code: destination,
    name: `${destination} International Airport`,
    city: destination
  };

  return json.data.map((ticket, index) => {
    const airlineInfo = getAirlineInfo(ticket.airline);
    const flightNum = ticket.flight_number ? String(ticket.flight_number) : `${100 + index}`;
    const durationMinutes = ticket.duration || 420; // default to 7 hours if not returned

    // Calculate departure & arrival dates
    const depDate = ticket.departure_at ? new Date(ticket.departure_at) : new Date(departureAt);
    const arrDate = new Date(depDate.getTime() + durationMinutes * 60 * 1000);

    // Match physical aircraft airframe intelligence
    const aero = matchAircraftForFlight({
      airlineCode: ticket.airline,
      flightNumber: flightNum,
      origin,
      destination,
      durationMinutes
    });

    const segment: FlightSegment = {
      id: `tp_seg_${index}_${flightNum}`,
      origin: {
        code: origin,
        name: originAirport.name,
        city: originAirport.city
      },
      destination: {
        code: destination,
        name: destAirport.name,
        city: destAirport.city
      },
      departureTime: depDate.toISOString(),
      arrivalTime: arrDate.toISOString(),
      durationMinutes,
      flightNumber: `${ticket.airline} ${flightNum}`,
      marketingCarrier: {
        code: ticket.airline,
        name: airlineInfo.name,
        logoLetter: airlineInfo.logoLetter
      },
      operatingCarrier: {
        code: ticket.airline,
        name: airlineInfo.name,
        isCodeshare: false
      },
      aircraftIataCode: aero.aircraft.id,
      aircraftName: aero.aircraft.name,
      aircraft: aero.aircraft,
      confidence: aero.confidence,
      confidenceNote: aero.confidenceNote,
      confidencePercent: aero.confidencePercent,
      tailRegistration: aero.tailRegistration,
      seatPitch: aero.seatPitch,
      seatModel: aero.seatModel,
      wifiGeneration: aero.wifiGeneration,
      engineVariant: aero.engineVariant,
      cabinClass: params.cabinClass
    };

    // Construct outbound affiliate booking link
    let bookingUrl = '';
    if (ticket.link) {
      if (ticket.link.startsWith('http')) {
        bookingUrl = ticket.link.includes('marker=')
          ? ticket.link
          : `${ticket.link}${ticket.link.includes('?') ? '&' : '?'}marker=${encodeURIComponent(marker)}`;
      } else {
        const cleanPath = ticket.link.startsWith('/') ? ticket.link : `/${ticket.link}`;
        const separator = cleanPath.includes('?') ? '&' : '?';
        bookingUrl = `https://www.aviasales.com${cleanPath}${separator}marker=${encodeURIComponent(marker)}`;
      }
    } else {
      // Fallback deep-search link with affiliate marker
      bookingUrl = `https://www.aviasales.com/search/${origin}${departureAt.replace(/-/g, '').slice(2)}${destination}1?marker=${encodeURIComponent(marker)}`;
    }

    const directAirlineUrl = `https://www.google.com/search?q=${encodeURIComponent(`${airlineInfo.name} book flight ${origin} to ${destination} ${flightNum}`)}`;

    const amount = Math.round(ticket.price);

    return {
      id: `tp_offer_${index}_${ticket.airline}_${flightNum}`,
      searchId: `tp_${Date.now()}`,
      source: 'travelpayouts_live',
      price: {
        amount,
        currency: 'USD',
        formatted: `$${amount.toLocaleString()}`
      },
      totalDurationMinutes: durationMinutes,
      stops: ticket.transfers !== undefined ? ticket.transfers : 0,
      segments: [segment],
      primaryAircraft: aero.aircraft,
      allAircraft: [aero.aircraft],
      containsComposite: aero.aircraft.isComposite,
      containsBoeing737Max: aero.aircraft.family === '737 MAX',
      containsA380: aero.aircraft.family === 'A380',
      contains747: aero.aircraft.family.includes('747'),
      bookingUrl,
      directAirlineUrl,
      deeplinkType: 'aggregator',
      hasSeatMap: aero.hasSeatMap
    };
  });
}
