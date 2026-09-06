import { FlightOffer, FlightSegment, SearchParams } from '@/lib/types';
import { lookupAircraft } from '@/data/aircraft';

interface RouteArchetype {
  airlineCode: string;
  airlineName: string;
  airlineLogoLetter: string;
  flightNumber: string;
  aircraftCode: string;
  operatingCarrierName: string;
  isCodeshare?: boolean;
  codeshareNotice?: string;
  basePrice: number;
  durationMins: number;
  departureHour: number;
  departureMinute: number;
  confidence: 'confirmed_at_search_time' | 'typically_operates';
  confidencePercent: number;
  confidenceNote: string;
  tailRegistration: string;
  seatPitch: string;
  seatModel: string;
  wifiGeneration: string;
  engineVariant: string;
  hasSeatMap: boolean;
}

export const FAMOUS_AIRCRAFT_ROUTES: Record<string, RouteArchetype[]> = {
  // JFK <-> LHR (High-density prestige transatlantic)
  'JFK-LHR': [
    {
      airlineCode: 'VS',
      airlineName: 'Virgin Atlantic',
      airlineLogoLetter: 'VA',
      flightNumber: 'VS 004',
      aircraftCode: '351',
      operatingCarrierName: 'Virgin Atlantic Airways',
      isCodeshare: false,
      basePrice: 684,
      durationMins: 435, // 7h 15m
      departureHour: 18,
      departureMinute: 30,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 98,
      confidenceNote: 'Airframe tail registration locked on flight line. Operational swaps on <2% of scheduled sectors.',
      tailRegistration: 'G-VLUX "Red Velvet"',
      seatPitch: '34" Pitch (Main) / 78" Bed',
      seatModel: 'Safran Cirrus Suite',
      wifiGeneration: 'Viasat 2 Ka-Band',
      engineVariant: 'RR Trent XWB-97',
      hasSeatMap: true
    },
    {
      airlineCode: 'BA',
      airlineName: 'British Airways',
      airlineLogoLetter: 'BA',
      flightNumber: 'BA 178',
      aircraftCode: '789',
      operatingCarrierName: 'British Airways',
      isCodeshare: false,
      basePrice: 642,
      durationMins: 425, // 7h 05m
      departureHour: 8,
      departureMinute: 15,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 96,
      confidenceNote: 'Daytime transatlantic arrival. 6,000-ft optimized pressurization.',
      tailRegistration: 'G-ZBKM',
      seatPitch: '33" Pitch (Main) / Club Suite',
      seatModel: 'Collins Horizon Suite',
      wifiGeneration: '.air High-Speed Satellite',
      engineVariant: 'RR Trent 1000 with Chevrons',
      hasSeatMap: true
    },
    {
      airlineCode: 'BA',
      airlineName: 'British Airways',
      airlineLogoLetter: 'BA',
      flightNumber: 'BA 112',
      aircraftCode: '351',
      operatingCarrierName: 'British Airways',
      isCodeshare: false,
      basePrice: 710,
      durationMins: 430,
      departureHour: 19,
      departureMinute: 45,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 97,
      confidenceNote: 'Airbus Airspace cabin with Club Suite with sliding doors.',
      tailRegistration: 'G-XWBA',
      seatPitch: '34" Pitch (Main)',
      seatModel: 'Collins Super Diamond',
      wifiGeneration: 'Ka-Band Satellite',
      engineVariant: 'RR Trent XWB-97',
      hasSeatMap: true
    },
    {
      airlineCode: 'AA',
      airlineName: 'American Airlines',
      airlineLogoLetter: 'AA',
      flightNumber: 'AA 100',
      aircraftCode: '77W',
      operatingCarrierName: 'American Airlines Inc.',
      isCodeshare: true,
      codeshareNotice: 'BA 1502 Codeshare',
      basePrice: 650,
      durationMins: 430,
      departureHour: 19,
      departureMinute: 10,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 94,
      confidenceNote: 'Flagship Boeing 777-300ER service with GE90 twin turbofans.',
      tailRegistration: 'N736AT',
      seatPitch: '32" Pitch (Main) / Flagship Suite',
      seatModel: 'Safran Aries',
      wifiGeneration: 'Panasonic Ku-Band',
      engineVariant: 'GE90-115B (115,000 lbf)',
      hasSeatMap: true
    },
    {
      airlineCode: 'B6',
      airlineName: 'JetBlue',
      airlineLogoLetter: 'B6',
      flightNumber: 'B6 007',
      aircraftCode: '32Q',
      operatingCarrierName: 'JetBlue Airways',
      isCodeshare: false,
      basePrice: 590,
      durationMins: 440,
      departureHour: 22,
      departureMinute: 15,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 95,
      confidenceNote: 'Single-aisle transatlantic with Mint Suite with privacy doors.',
      tailRegistration: 'N2105J',
      seatPitch: '33" Even More Space',
      seatModel: 'Thompson VantageSOLO',
      wifiGeneration: 'Free High-Speed Fly-Fi',
      engineVariant: 'Pratt & Whitney PW1100G-JM',
      hasSeatMap: true
    }
  ],

  // DXB <-> LHR (Capital of A380s!)
  'DXB-LHR': [
    {
      airlineCode: 'EK',
      airlineName: 'Emirates',
      airlineLogoLetter: 'EK',
      flightNumber: 'EK 001',
      aircraftCode: '380',
      operatingCarrierName: 'Emirates',
      isCodeshare: false,
      basePrice: 840,
      durationMins: 470,
      departureHour: 7,
      departureMinute: 45,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 99,
      confidenceNote: 'Scheduled daily A380 Superjumbo with onboard shower spa & lounge.',
      tailRegistration: 'A6-EVS (Final A380 Built)',
      seatPitch: '33-34" Economy / 79" Flat Bed',
      seatModel: 'Emirates Custom Suite',
      wifiGeneration: 'OnAir Satellite Wi-Fi',
      engineVariant: 'Engine Alliance GP7200',
      hasSeatMap: true
    },
    {
      airlineCode: 'EK',
      airlineName: 'Emirates',
      airlineLogoLetter: 'EK',
      flightNumber: 'EK 003',
      aircraftCode: '380',
      operatingCarrierName: 'Emirates',
      isCodeshare: false,
      basePrice: 890,
      durationMins: 465,
      departureHour: 14,
      departureMinute: 15,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 99,
      confidenceNote: 'Double-decker flagship operation with 59 dB whisper quiet ambient.',
      tailRegistration: 'A6-EEA',
      seatPitch: '33" Pitch',
      seatModel: 'Recaro CL3710',
      wifiGeneration: 'Inmarsat GX Aviation',
      engineVariant: 'Engine Alliance GP7200',
      hasSeatMap: true
    },
    {
      airlineCode: 'BA',
      airlineName: 'British Airways',
      airlineLogoLetter: 'BA',
      flightNumber: 'BA 106',
      aircraftCode: '351',
      operatingCarrierName: 'British Airways',
      isCodeshare: false,
      basePrice: 795,
      durationMins: 480,
      departureHour: 1,
      departureMinute: 30,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 96,
      confidenceNote: 'Carbon composite A350 widebody with 5,800 ft cabin altitude.',
      tailRegistration: 'G-XWBD',
      seatPitch: '34" Pitch (Main)',
      seatModel: 'Collins Club Suite',
      wifiGeneration: 'Ka-Band Satellite',
      engineVariant: 'RR Trent XWB-97',
      hasSeatMap: true
    },
    {
      airlineCode: 'EK',
      airlineName: 'Emirates',
      airlineLogoLetter: 'EK',
      flightNumber: 'EK 029',
      aircraftCode: '77W',
      operatingCarrierName: 'Emirates',
      isCodeshare: false,
      basePrice: 720,
      durationMins: 475,
      departureHour: 9,
      departureMinute: 40,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 95,
      confidenceNote: 'Boeing 777 Game Changer suites available.',
      tailRegistration: 'A6-EQH',
      seatPitch: '33" Pitch',
      seatModel: 'Rockwell Collins',
      wifiGeneration: 'High-Speed Broadband',
      engineVariant: 'GE90-115B',
      hasSeatMap: true
    }
  ],

  // FRA <-> JFK (The iconic 747-8 route!)
  'FRA-JFK': [
    {
      airlineCode: 'LH',
      airlineName: 'Lufthansa',
      airlineLogoLetter: 'LH',
      flightNumber: 'LH 400',
      aircraftCode: '748',
      operatingCarrierName: 'Deutsche Lufthansa AG',
      isCodeshare: false,
      basePrice: 820,
      durationMins: 525,
      departureHour: 11,
      departureMinute: 0,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 97,
      confidenceNote: 'Rare Boeing 747 Queen of the Skies! Row 1 is in the nose cone ahead of flight deck.',
      tailRegistration: 'D-ABYM "Bayern"',
      seatPitch: '32" Economy / Upper Deck 2-2',
      seatModel: 'Zodiac Aerospace',
      wifiGeneration: 'FlyNet Broadband',
      engineVariant: 'GEnx-2B67 with Chevrons',
      hasSeatMap: true
    },
    {
      airlineCode: 'SQ',
      airlineName: 'Singapore Airlines',
      airlineLogoLetter: 'SQ',
      flightNumber: 'SQ 026',
      aircraftCode: '77W',
      operatingCarrierName: 'Singapore Airlines',
      isCodeshare: false,
      basePrice: 790,
      durationMins: 520,
      departureHour: 8,
      departureMinute: 35,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 98,
      confidenceNote: 'Fifth-freedom transatlantic flight with world-renowned service.',
      tailRegistration: '9V-SWT',
      seatPitch: '34" Pitch (Main)',
      seatModel: 'Jamco / Stelia',
      wifiGeneration: 'SITA Ka-Band',
      engineVariant: 'GE90-115B',
      hasSeatMap: true
    },
    {
      airlineCode: 'DE',
      airlineName: 'Condor',
      airlineLogoLetter: 'DE',
      flightNumber: 'DE 2016',
      aircraftCode: '339',
      operatingCarrierName: 'Condor Flugdienst GmbH',
      isCodeshare: false,
      basePrice: 610,
      durationMins: 535,
      departureHour: 12,
      departureMinute: 20,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 94,
      confidenceNote: '2-4-2 economy seating geometry with striped livery and zero middle seat pairs.',
      tailRegistration: 'D-ANRA',
      seatPitch: '32" Economy / 2-4-2',
      seatModel: 'Safran Airspace',
      wifiGeneration: 'FlyCondor Satellite',
      engineVariant: 'RR Trent 7000',
      hasSeatMap: true
    }
  ],

  // SFO <-> SIN (Ultra-Long Haul Transpacific)
  'SFO-SIN': [
    {
      airlineCode: 'SQ',
      airlineName: 'Singapore Airlines',
      airlineLogoLetter: 'SQ',
      flightNumber: 'SQ 031',
      aircraftCode: '359',
      operatingCarrierName: 'Singapore Airlines',
      isCodeshare: false,
      basePrice: 1150,
      durationMins: 1010,
      departureHour: 9,
      departureMinute: 30,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 99,
      confidenceNote: 'Non-stop ultra-long-haul on composite A350. Highest comfort cabin pressure (5,800 ft).',
      tailRegistration: '9V-SGA (A350-900ULR)',
      seatPitch: '38" Premium Economy / 78" Bed',
      seatModel: 'Safran / Jamco',
      wifiGeneration: 'Inmarsat GX High-Speed',
      engineVariant: 'RR Trent XWB-84',
      hasSeatMap: true
    },
    {
      airlineCode: 'UA',
      airlineName: 'United Airlines',
      airlineLogoLetter: 'UA',
      flightNumber: 'UA 001',
      aircraftCode: '789',
      operatingCarrierName: 'United Airlines Inc.',
      isCodeshare: false,
      basePrice: 990,
      durationMins: 1025,
      departureHour: 23,
      departureMinute: 15,
      confidence: 'confirmed_at_search_time',
      confidencePercent: 97,
      confidenceNote: 'Direct transpacific Dreamliner with Polaris business class suites.',
      tailRegistration: 'N2749U',
      seatPitch: '34" Economy Plus',
      seatModel: 'Safran Polaris',
      wifiGeneration: 'United Wi-Fi (Viasat)',
      engineVariant: 'GEnx-1B with Chevrons',
      hasSeatMap: true
    }
  ]
};

export function generateRealisticFlights(params: SearchParams): FlightOffer[] {
  const routeKey = `${params.origin.toUpperCase()}-${params.destination.toUpperCase()}`;
  const reverseKey = `${params.destination.toUpperCase()}-${params.origin.toUpperCase()}`;

  let archetypes = FAMOUS_AIRCRAFT_ROUTES[routeKey] || FAMOUS_AIRCRAFT_ROUTES[reverseKey];

  if (!archetypes) {
    // Dynamic fallback matching major widebodies and narrowbodies
    archetypes = [
      {
        airlineCode: 'VS',
        airlineName: 'Virgin Atlantic',
        airlineLogoLetter: 'VA',
        flightNumber: 'VS 004',
        aircraftCode: '351',
        operatingCarrierName: 'Virgin Atlantic Airways',
        basePrice: 684,
        durationMins: 435,
        departureHour: 18,
        departureMinute: 30,
        confidence: 'confirmed_at_search_time',
        confidencePercent: 98,
        confidenceNote: 'Locked on flight line. Operational swaps on <2% of scheduled long-haul sectors.',
        tailRegistration: 'G-VLUX "Red Velvet"',
        seatPitch: '34" Pitch / 78" Bed',
        seatModel: 'Safran Cirrus',
        wifiGeneration: 'Ka-Band Satellite',
        engineVariant: 'RR Trent XWB-97',
        hasSeatMap: true
      },
      {
        airlineCode: 'BA',
        airlineName: 'British Airways',
        airlineLogoLetter: 'BA',
        flightNumber: 'BA 178',
        aircraftCode: '789',
        operatingCarrierName: 'British Airways',
        basePrice: 642,
        durationMins: 425,
        departureHour: 8,
        departureMinute: 15,
        confidence: 'confirmed_at_search_time',
        confidencePercent: 96,
        confidenceNote: 'Daytime arrival with 6,000-ft optimized pressurization.',
        tailRegistration: 'G-ZBKM',
        seatPitch: '33" Pitch',
        seatModel: 'Collins Horizon',
        wifiGeneration: '.air Satellite',
        engineVariant: 'RR Trent 1000 with Chevrons',
        hasSeatMap: true
      },
      {
        airlineCode: 'LH',
        airlineName: 'Lufthansa',
        airlineLogoLetter: 'LH',
        flightNumber: 'LH 400',
        aircraftCode: '748',
        operatingCarrierName: 'Deutsche Lufthansa AG',
        basePrice: 820,
        durationMins: 525,
        departureHour: 11,
        departureMinute: 0,
        confidence: 'confirmed_at_search_time',
        confidencePercent: 97,
        confidenceNote: 'Four-engine Queen of the Skies.',
        tailRegistration: 'D-ABYM',
        seatPitch: '32" Economy / 2-2 Hump',
        seatModel: 'Zodiac Aerospace',
        wifiGeneration: 'FlyNet Broadband',
        engineVariant: 'GEnx-2B67 with Chevrons',
        hasSeatMap: true
      },
      {
        airlineCode: 'EK',
        airlineName: 'Emirates',
        airlineLogoLetter: 'EK',
        flightNumber: 'EK 001',
        aircraftCode: '380',
        operatingCarrierName: 'Emirates',
        basePrice: 840,
        durationMins: 470,
        departureHour: 7,
        departureMinute: 45,
        confidence: 'confirmed_at_search_time',
        confidencePercent: 99,
        confidenceNote: 'Full double-deck A380 service with onboard lounge.',
        tailRegistration: 'A6-EVS',
        seatPitch: '34" Economy',
        seatModel: 'Emirates Custom',
        wifiGeneration: 'OnAir Satellite',
        engineVariant: 'Engine Alliance GP7200',
        hasSeatMap: true
      },
      {
        airlineCode: 'UA',
        airlineName: 'United Airlines',
        airlineLogoLetter: 'UA',
        flightNumber: 'UA 1290',
        aircraftCode: '7M8',
        operatingCarrierName: 'United Airlines Inc.',
        basePrice: 480,
        durationMins: 450,
        departureHour: 16,
        departureMinute: 20,
        confidence: 'confirmed_at_search_time',
        confidencePercent: 92,
        confidenceNote: 'Single-aisle narrowbody with CFM LEAP-1B engines.',
        tailRegistration: 'N27251',
        seatPitch: '30" Economy',
        seatModel: 'Collins Meridian',
        wifiGeneration: 'United Wi-Fi',
        engineVariant: 'CFM LEAP-1B with Chevrons',
        hasSeatMap: true
      }
    ];
  }

  const baseDate = new Date(params.departureDate || new Date().toISOString().split('T')[0]);

  return archetypes.map((arch, index) => {
    const aircraft = lookupAircraft(arch.aircraftCode);

    const depDate = new Date(baseDate);
    depDate.setHours(arch.departureHour, arch.departureMinute, 0, 0);

    const arrDate = new Date(depDate.getTime() + arch.durationMins * 60 * 1000);

    const cabinMultiplier =
      params.cabinClass === 'first'
        ? 4.2
        : params.cabinClass === 'business'
        ? 2.8
        : params.cabinClass === 'premium_economy'
        ? 1.5
        : 1.0;

    const passengerCount = params.passengers || 1;
    const finalPrice = Math.round(arch.basePrice * cabinMultiplier * passengerCount);

    const segment: FlightSegment = {
      id: `seg_${arch.flightNumber.replace(/\s+/g, '')}_${index}`,
      origin: {
        code: params.origin.toUpperCase(),
        name: `${params.origin.toUpperCase()} Airport`,
        city: params.origin.toUpperCase(),
        terminal: params.origin.toUpperCase() === 'JFK' ? 'T4' : 'T1'
      },
      destination: {
        code: params.destination.toUpperCase(),
        name: `${params.destination.toUpperCase()} Airport`,
        city: params.destination.toUpperCase(),
        terminal: params.destination.toUpperCase() === 'LHR' ? 'T3' : 'T2'
      },
      departureTime: depDate.toISOString(),
      arrivalTime: arrDate.toISOString(),
      durationMinutes: arch.durationMins,
      flightNumber: arch.flightNumber,
      marketingCarrier: {
        code: arch.airlineCode,
        name: arch.airlineName,
        logoLetter: arch.airlineLogoLetter
      },
      operatingCarrier: {
        code: arch.airlineCode,
        name: arch.operatingCarrierName,
        isCodeshare: arch.isCodeshare,
        codeshareNotice: arch.codeshareNotice
      },
      aircraftIataCode: arch.aircraftCode,
      aircraftName: aircraft.name,
      aircraft: aircraft,
      confidence: arch.confidence,
      confidenceNote: arch.confidenceNote,
      confidencePercent: arch.confidencePercent,
      tailRegistration: arch.tailRegistration,
      seatPitch: arch.seatPitch,
      seatModel: arch.seatModel,
      wifiGeneration: arch.wifiGeneration,
      engineVariant: arch.engineVariant,
      cabinClass: params.cabinClass || 'economy'
    };

    const googleFlightsUrl = `https://www.google.com/travel/flights?q=flights%20from%20${params.origin.toUpperCase()}%20to%20${params.destination.toUpperCase()}%20on%20${params.departureDate}`;

    return {
      id: `off_${arch.flightNumber.replace(/\s+/g, '')}_${Date.now()}_${index}`,
      source: 'verified_simulation',
      price: {
        amount: finalPrice,
        currency: 'USD',
        formatted: `$${finalPrice.toLocaleString()}`
      },
      totalDurationMinutes: arch.durationMins,
      stops: 0,
      segments: [segment],
      primaryAircraft: aircraft,
      allAircraft: [aircraft],
      containsComposite: aircraft.isComposite,
      containsBoeing737Max: aircraft.family === '737 MAX',
      containsA380: aircraft.family === 'A380',
      contains747: aircraft.family.includes('747'),
      bookingUrl: googleFlightsUrl,
      directAirlineUrl: `https://www.google.com/search?q=${encodeURIComponent(`${arch.airlineName} book flight ${params.origin} to ${params.destination}`)}`,
      deeplinkType: 'airline_direct',
      hasSeatMap: arch.hasSeatMap
    };
  });
}
