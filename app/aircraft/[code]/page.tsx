import React from 'react';
import Navbar from '@/components/Navbar';
import AircraftCabinSchematic from '@/components/AircraftCabinSchematic';
import AircraftPassportLogger from '@/components/AircraftPassportLogger';
import { AIRCRAFT_DATABASE, IATA_CODE_ALIASES } from '@/data/aircraft';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Armchair,
  Gauge,
  Wind,
  Sparkles,
  Search,
  Building2,
  ArrowRight,
  ExternalLink,
  Flame,
  PlaneTakeoff
} from 'lucide-react';

interface AircraftDetailPageProps {
  params: Promise<{
    code: string;
  }>;
}

interface AirlineOperator {
  name: string;
  code: string;
  activeCount: string;
  hub: string;
  badge: string;
  description: string;
}

interface AircraftRoute {
  fromCity: string;
  fromIata: string;
  toCity: string;
  toIata: string;
  price: number;
  airline: string;
  flightNo: string;
  frequency: string;
}

// Operators catalog keyed by aircraft ID
const OPERATORS_MAP: Record<string, AirlineOperator[]> = {
  '380': [
    {
      name: 'Emirates',
      code: 'EK',
      activeCount: '116 Active',
      hub: 'DUBAI INTL (DXB)',
      badge: 'PREMIUM FLAGSHIP',
      description: 'Largest operator by far. Features Onboard Bar Lounge & First Class Shower Spas on all trunk routes.'
    },
    {
      name: 'Singapore Airlines',
      code: 'SQ',
      activeCount: '12 Active',
      hub: 'CHANGI AIRPORT (SIN)',
      badge: 'KANGAROO ROUTE',
      description: 'A380 launch customer (2007). Famous for standalone Upper Deck First Class Suites with double-bed joins.'
    },
    {
      name: 'British Airways',
      code: 'BA',
      activeCount: '12 Active',
      hub: 'LONDON HEATHROW (LHR)',
      badge: 'CLUB WORLD',
      description: 'Workhorse for high-demand transatlantic routes connecting London Heathrow to JFK, MIA, LAX, and SFO.'
    },
    {
      name: 'Qantas',
      code: 'QF',
      activeCount: '10 Active',
      hub: 'SYDNEY KINGFORD SMITH (SYD)',
      badge: 'TRANSPACIFIC',
      description: 'Refurbished with Marc Newson-designed upper lounge deck. Deployed on Sydney-LAX and Melbourne-London.'
    },
    {
      name: 'All Nippon Airways',
      code: 'NH',
      activeCount: '3 Active',
      hub: 'TOKYO NARITA (NRT)',
      badge: 'FLYING HONU',
      description: 'Iconic "Flying Honu" sea turtle liveries (Lani, Kai, and Ka La). Exclusively flies the Tokyo to Hawaii route.'
    },
    {
      name: 'Qatar Airways',
      code: 'QR',
      activeCount: '8 Active',
      hub: 'DOHA HAMAD (DOH)',
      badge: 'AL SAFWA SUITES',
      description: 'Re-entered service for ultra-dense trunk connections to London Heathrow, Paris CDG, and Sydney.'
    }
  ],
  '748': [
    {
      name: 'Lufthansa',
      code: 'LH',
      activeCount: '19 Active',
      hub: 'FRANKFURT (FRA)',
      badge: 'QUEEN OF SKIES',
      description: 'The world\'s largest passenger 747-8 operator. Daily transatlantic flagship connections to JFK, ORD, and IAD.'
    },
    {
      name: 'Korean Air',
      code: 'KE',
      activeCount: '9 Active',
      hub: 'SEOUL INCHEON (ICN)',
      badge: 'PACIFIC CROSSING',
      description: 'Operates Apex Suites business class and Kosmo Suites in the ultra-quiet nose cone on routes to Atlanta and Honolulu.'
    },
    {
      name: 'Air China',
      code: 'CA',
      activeCount: '7 Active',
      hub: 'BEIJING CAPITAL (PEK)',
      badge: 'VIP TRANSPORT',
      description: 'Flies high-density intercontinental routes connecting Beijing to Frankfurt, San Francisco, and domestic trunk lines.'
    }
  ],
  '351': [
    {
      name: 'Virgin Atlantic',
      code: 'VS',
      activeCount: '12 Active',
      hub: 'LONDON HEATHROW (LHR)',
      badge: 'THE LOFT LOUNGE',
      description: 'Flagship transatlantic airframe featuring "The Loft" social space and Upper Class suites with privacy doors.'
    },
    {
      name: 'British Airways',
      code: 'BA',
      activeCount: '18 Active',
      hub: 'LONDON HEATHROW (LHR)',
      badge: 'CLUB SUITE',
      description: 'Fitted with the modern Club Suite with closing doors, standard across long-haul flagship rotations.'
    },
    {
      name: 'Qatar Airways',
      code: 'QR',
      activeCount: '24 Active',
      hub: 'DOHA HAMAD (DOH)',
      badge: 'QSUITE FLAGSHIP',
      description: 'Launch customer for the A350-1000. Features industry-acclaimed Qsuite quad double beds in business.'
    },
    {
      name: 'Japan Airlines',
      code: 'JL',
      activeCount: '5 Active (Expanding)',
      hub: 'TOKYO HANEDA (HND)',
      badge: 'NEXT-GEN CABIN',
      description: 'New flagship aircraft replacing the 777-300ER with enclosed private First and Business class suites.'
    }
  ],
  '789': [
    {
      name: 'United Airlines',
      code: 'UA',
      activeCount: '38 Active',
      hub: 'SAN FRANCISCO (SFO)',
      badge: 'POLARIS SUITES',
      description: 'Workhorse for ultra-long haul transpacific sectors including the 17-hour San Francisco to Singapore flight.'
    },
    {
      name: 'British Airways',
      code: 'BA',
      activeCount: '18 Active',
      hub: 'LONDON HEATHROW (LHR)',
      badge: 'LONG-RANGE TWIN',
      description: 'Deployed on thin-to-medium long-haul routes connecting London to Austin, Santiago, and Tokyo.'
    },
    {
      name: 'Qantas',
      code: 'QF',
      activeCount: '14 Active',
      hub: 'PERTH (PER) / SYDNEY',
      badge: 'PROJECT SUNRISE BASE',
      description: 'Operated the historic non-stop London to Perth route, transforming Europe to Australia aviation.'
    },
    {
      name: 'ANA (All Nippon Airways)',
      code: 'NH',
      activeCount: '44 Active',
      hub: 'TOKYO HANEDA (HND)',
      badge: 'LAUNCH CUSTOMER',
      description: 'First airline in the world to fly the Dreamliner, operating an extensive domestic and international network.'
    }
  ]
};

// Scheduled routes catalog keyed by aircraft ID
const ROUTES_MAP: Record<string, AircraftRoute[]> = {
  '380': [
    {
      fromCity: 'London',
      fromIata: 'LHR',
      toCity: 'Dubai',
      toIata: 'DXB',
      price: 580,
      airline: 'Emirates',
      flightNo: 'EK 002 / 030',
      frequency: '6x Daily'
    },
    {
      fromCity: 'New York',
      fromIata: 'JFK',
      toCity: 'London',
      toIata: 'LHR',
      price: 642,
      airline: 'British Airways',
      flightNo: 'BA 178',
      frequency: 'Daily Nonstop'
    },
    {
      fromCity: 'Sydney',
      fromIata: 'SYD',
      toCity: 'Los Angeles',
      toIata: 'LAX',
      price: 1120,
      airline: 'Qantas',
      flightNo: 'QF 11',
      frequency: '13h 50m Transpacific'
    },
    {
      fromCity: 'Singapore',
      fromIata: 'SIN',
      toCity: 'London',
      toIata: 'LHR',
      price: 890,
      airline: 'Singapore Airlines',
      flightNo: 'SQ 308 / 322',
      frequency: '2x Daily'
    },
    {
      fromCity: 'Tokyo',
      fromIata: 'NRT',
      toCity: 'Honolulu',
      toIata: 'HNL',
      price: 740,
      airline: 'ANA All Nippon',
      flightNo: 'NH 184 "Flying Honu"',
      frequency: 'Resort Flagship'
    },
    {
      fromCity: 'Munich',
      fromIata: 'MUC',
      toCity: 'New York',
      toIata: 'JFK',
      price: 695,
      airline: 'Lufthansa',
      flightNo: 'LH 410',
      frequency: 'Daily Flagship'
    }
  ],
  '748': [
    {
      fromCity: 'Frankfurt',
      fromIata: 'FRA',
      toCity: 'New York',
      toIata: 'JFK',
      price: 685,
      airline: 'Lufthansa',
      flightNo: 'LH 400',
      frequency: 'Daily 747-8'
    },
    {
      fromCity: 'Frankfurt',
      fromIata: 'FRA',
      toCity: 'Chicago',
      toIata: 'ORD',
      price: 730,
      airline: 'Lufthansa',
      flightNo: 'LH 430',
      frequency: 'Daily Transatlantic'
    },
    {
      fromCity: 'Seoul',
      fromIata: 'ICN',
      toCity: 'Atlanta',
      toIata: 'ATL',
      price: 1250,
      airline: 'Korean Air',
      flightNo: 'KE 035',
      frequency: '14h 20m Nonstop'
    },
    {
      fromCity: 'Beijing',
      fromIata: 'PEK',
      toCity: 'Frankfurt',
      toIata: 'FRA',
      price: 840,
      airline: 'Air China',
      flightNo: 'CA 931',
      frequency: 'Scheduled Service'
    }
  ],
  '351': [
    {
      fromCity: 'London',
      fromIata: 'LHR',
      toCity: 'New York',
      toIata: 'JFK',
      price: 520,
      airline: 'Virgin Atlantic',
      flightNo: 'VS 3 / 4 "Red Velvet"',
      frequency: '4x Daily'
    },
    {
      fromCity: 'Doha',
      fromIata: 'DOH',
      toCity: 'London',
      toIata: 'LHR',
      price: 710,
      airline: 'Qatar Airways',
      flightNo: 'QR 007 (Qsuite)',
      frequency: '6x Daily'
    },
    {
      fromCity: 'Tokyo',
      fromIata: 'HND',
      toCity: 'New York',
      toIata: 'JFK',
      price: 1190,
      airline: 'Japan Airlines',
      flightNo: 'JL 006',
      frequency: 'Daily Flagship'
    },
    {
      fromCity: 'Hong Kong',
      fromIata: 'HKG',
      toCity: 'San Francisco',
      toIata: 'SFO',
      price: 940,
      airline: 'Cathay Pacific',
      flightNo: 'CX 870',
      frequency: 'Daily Transpacific'
    }
  ],
  '789': [
    {
      fromCity: 'San Francisco',
      fromIata: 'SFO',
      toCity: 'Singapore',
      toIata: 'SIN',
      price: 860,
      airline: 'United Airlines',
      flightNo: 'UA 1',
      frequency: '17h 20m Nonstop'
    },
    {
      fromCity: 'London',
      fromIata: 'LHR',
      toCity: 'Perth',
      toIata: 'PER',
      price: 1350,
      airline: 'Qantas',
      flightNo: 'QF 10',
      frequency: '16h 45m Nonstop'
    },
    {
      fromCity: 'New York',
      fromIata: 'JFK',
      toCity: 'Tokyo',
      toIata: 'HND',
      price: 980,
      airline: 'ANA',
      flightNo: 'NH 159',
      frequency: 'Daily Service'
    }
  ]
};

export default async function AircraftDetailPage({ params }: AircraftDetailPageProps) {
  const { code } = await params;
  const upperCode = code.toUpperCase();
  const canonicalId = IATA_CODE_ALIASES[upperCode] || upperCode;
  const aircraft = AIRCRAFT_DATABASE[canonicalId];

  if (!aircraft) {
    notFound();
  }

  // Operators list fallback
  const operators = OPERATORS_MAP[aircraft.id] || (aircraft.primaryAirlines || []).map((airline, idx) => ({
    name: airline,
    code: airline.slice(0, 2).toUpperCase(),
    activeCount: 'Active Fleet',
    hub: 'PRIMARY HUB',
    badge: 'SCHEDULED SERVICE',
    description: `Major international carrier deploying the ${aircraft.shortName} across scheduled route sectors.`
  }));

  // Routes fallback
  const routes = ROUTES_MAP[aircraft.id] || [
    {
      fromCity: 'New York',
      fromIata: 'JFK',
      toCity: 'London',
      toIata: 'LHR',
      price: 590,
      airline: aircraft.primaryAirlines[0] || 'International Carrier',
      flightNo: `${aircraft.shortName} Scheduled`,
      frequency: 'Daily Nonstop'
    },
    {
      fromCity: 'San Francisco',
      fromIata: 'SFO',
      toCity: 'Tokyo',
      toIata: 'HND',
      price: 820,
      airline: aircraft.primaryAirlines[1] || 'Transpacific Carrier',
      flightNo: `${aircraft.shortName} Long-Haul`,
      frequency: 'Daily Transpacific'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Contextual Breadcrumb & Telemetry Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/aircraft"
            className="inline-flex items-center gap-1.5 text-xs font-mono-telemetry font-bold text-slate-500 hover:text-sky-700 transition-colors py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>FLEET DATABASE</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="bg-slate-200/80 text-slate-800 font-mono-telemetry text-xs font-bold px-2.5 py-1 rounded-lg">
              ICAO: {aircraft.icaoCode}
            </span>
            <span
              className={`font-mono-telemetry text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                aircraft.wakeTurbulence === 'SUPER HEAVY'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              {aircraft.wakeTurbulence === 'SUPER HEAVY' && <AlertTriangle className="w-3.5 h-3.5" />}
              WAKE: {aircraft.wakeTurbulence}
            </span>
          </div>
        </div>

        {/* Hero Airframe Showcase Card */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-white border border-slate-200">
          <div className="relative w-full h-72 sm:h-96 overflow-hidden bg-slate-950">
            {/* High-res airframe photo */}
            <img
              src={aircraft.heroImageUrl}
              alt={aircraft.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top floating technical pills */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-sky-600/90 backdrop-blur-md text-white font-mono-telemetry text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                {aircraft.id === '380'
                  ? 'DOUBLE-DECKER FLAGSHIP'
                  : aircraft.isComposite
                  ? 'CFRP COMPOSITE AIRFRAME'
                  : `${aircraft.bodyType.toUpperCase()} AIRLINER`}
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 font-mono-telemetry text-[11px] font-bold px-3 py-1 rounded-full border border-slate-700/50">
                IATA: {aircraft.id}
              </span>
            </div>

            {/* Aircraft Titles over Hero Base */}
            <div className="absolute bottom-5 inset-x-5 flex flex-col gap-1 text-white">
              <div className="flex items-center gap-2">
                <span className="font-mono-telemetry text-xs text-sky-300 font-bold uppercase tracking-[0.08em]">
                  {aircraft.manufacturer.toUpperCase()} COMMERCIAL AIRCRAFT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="font-mono-telemetry text-xs text-slate-300 font-bold tracking-[0.04em]">
                  {aircraft.family}
                </span>
              </div>
              <h1 className="font-headline text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[0.015em] leading-tight text-white drop-shadow-sm">
                {aircraft.name}
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 italic font-body max-w-2xl line-clamp-2 mt-1 leading-relaxed">
                "{aircraft.whyFlyThis}"
              </p>
            </div>
          </div>

          {/* Sub-hero Technical Metadata Bar */}
          <div className="p-5 sm:p-6 flex flex-col gap-4 bg-white">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-telemetry text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/80">
                ORIGIN: {aircraft.manufacturer === 'Airbus' ? 'TOULOUSE, FRANCE' : 'SEATTLE / CHARLESTON, USA'}
              </span>
              <span className="font-mono-telemetry text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200/80">
                {aircraft.aisles === 2 ? 'TWIN-AISLE WIDEBODY' : 'SINGLE-AISLE NARROWBODY'}
              </span>
              <span className="font-mono-telemetry text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/80">
                {aircraft.compositePercent || (aircraft.isComposite ? '53% CARBON FIBER MATRIX' : 'ALUMINUM-LITHIUM ALLOY')}
              </span>
            </div>

            {/* Production Status Amber or Emerald Callout */}
            {aircraft.productionStatus === 'discontinued' ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="font-mono-telemetry uppercase tracking-wider font-bold text-amber-900">
                    Fleet Life Cycle Status: Discontinued from Production
                  </span>
                  <p className="text-amber-800 leading-relaxed font-body">
                    <strong>Production Concluded</strong> — {aircraft.retirementRisk || 'Active airline commercial service remains scheduled through 2035+.'} Fly this historic airframe while active fleets remain in flagship service.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="font-mono-telemetry uppercase tracking-wider font-bold text-emerald-900">
                    Fleet Life Cycle Status: Active Series Production
                  </span>
                  <p className="text-emerald-800 leading-relaxed font-body">
                    Modern flagship in continuous manufacturing and airline delivery with multi-year order backlogs across premier global airlines.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Primary Specification Bento Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Stat 1: Max Passengers */}
          <div className="instrument-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono-telemetry text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                MAX PASSENGERS
              </span>
              <Armchair className="w-4 h-4 text-sky-600" />
            </div>
            <div className="mt-3">
              <span className="font-headline text-xl sm:text-2xl font-bold text-slate-900 block">
                {aircraft.maxPassengers} Max
              </span>
              <p className="font-mono-telemetry text-xs text-slate-500 truncate mt-0.5">
                {aircraft.seatingTypicalLayout?.split('(')[0] || 'Standard Config'}
              </p>
            </div>
          </div>

          {/* Stat 2: Wingspan & Area */}
          <div className="instrument-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono-telemetry text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                WINGSPAN
              </span>
              <PlaneTakeoff className="w-4 h-4 text-sky-600" />
            </div>
            <div className="mt-3">
              <span className="font-headline text-xl sm:text-2xl font-bold text-slate-900 block truncate">
                {aircraft.wingspan.split('(')[0].trim()}
              </span>
              <p className="font-mono-telemetry text-xs text-slate-500 truncate mt-0.5">
                {aircraft.wingspan.includes('(') ? aircraft.wingspan.split('(')[1].replace(')', '') : 'High-Aspect Wings'}
              </p>
            </div>
          </div>

          {/* Stat 3: Cabin Altitude */}
          <div className="instrument-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono-telemetry text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                CABIN ALTITUDE
              </span>
              <Gauge className="w-4 h-4 text-sky-600" />
            </div>
            <div className="mt-3">
              <span className="font-headline text-xl sm:text-2xl font-bold text-slate-900 block">
                {aircraft.cabinAltitudeFt ? `${aircraft.cabinAltitudeFt.toLocaleString()} ft` : '8,000 ft'}
              </span>
              <p className="font-mono-telemetry text-xs text-sky-700 truncate mt-0.5">
                {aircraft.acousticRating || 'Standard pressurization'}
              </p>
            </div>
          </div>

          {/* Stat 4: Propulsion */}
          <div className="instrument-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="font-mono-telemetry text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                PROPULSION PODS
              </span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-3">
              <span className="font-headline text-xl sm:text-2xl font-bold text-slate-900 block truncate">
                {aircraft.id === '380' || aircraft.id === '748' ? '4x Turbofans' : '2x High-Bypass'}
              </span>
              <p className="font-mono-telemetry text-xs text-slate-500 truncate mt-0.5">
                {aircraft.engineVariants && aircraft.engineVariants.length > 0
                  ? aircraft.engineVariants[0]
                  : 'High-thrust turbofans'}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Cabin Cross-Section Schematic Micro-widget */}
        <AircraftCabinSchematic aircraft={aircraft} />

        {/* AvGeek Flagship Trivia / Aircraft Encyclopedia */}
        {aircraft.funFacts && aircraft.funFacts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono-telemetry text-[10px] uppercase font-bold tracking-wider text-sky-700 block">
                  AIRCRAFT ENCYCLOPEDIA
                </span>
                <h2 className="font-headline text-xl font-bold text-slate-900">
                  AvGeek Flagship Trivia & Insights
                </h2>
              </div>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {aircraft.funFacts.map((fact, i) => (
                <div
                  key={i}
                  className="instrument-card p-5 rounded-2xl bg-white flex items-start gap-3.5 shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100 font-mono-telemetry font-bold text-xs mt-0.5">
                    {`#${i + 1}`}
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
                      {fact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Airlines Still Flying This Aircraft */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono-telemetry text-[10px] uppercase font-bold tracking-wider text-sky-700 block">
                ACTIVE OPERATORS
              </span>
              <h2 className="font-headline text-xl font-bold text-slate-900">
                Airlines Operating the {aircraft.shortName}
              </h2>
            </div>
            <span className="font-mono-telemetry text-xs text-slate-500">
              {operators.length} Key Carriers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {operators.map((carrier, idx) => (
              <div
                key={idx}
                className="instrument-card p-5 rounded-2xl bg-white flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-sm font-bold text-slate-900">
                      {carrier.name}
                    </span>
                    <span className="bg-sky-100 text-sky-900 font-mono-telemetry text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {carrier.code}
                    </span>
                  </div>
                  <span className="font-mono-telemetry text-xs font-bold text-sky-700">
                    {carrier.activeCount}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  {carrier.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                  <span className="font-mono-telemetry text-[10px] truncate max-w-[140px]">
                    {carrier.hub}
                  </span>
                  <span className="font-mono-telemetry text-[10px] text-sky-700 font-bold uppercase">
                    {carrier.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Routes You Can Still Catch This Aircraft On */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono-telemetry text-[10px] uppercase font-bold tracking-wider text-sky-700 block">
                FLIGHT LOCATOR MATRIX
              </span>
              <h2 className="font-headline text-xl font-bold text-slate-900">
                Active Routes Flying the {aircraft.shortName}
              </h2>
            </div>
            <span className="font-mono-telemetry text-xs text-slate-500">
              Direct Airframe Searches
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {routes.map((route, i) => (
              <div
                key={i}
                className="instrument-card p-5 rounded-2xl bg-white flex flex-col gap-3 shadow-xs hover:border-sky-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-base font-bold text-slate-900">
                      {route.fromCity} ({route.fromIata})
                    </span>
                    <ArrowRight className="w-4 h-4 text-sky-600" />
                    <span className="font-headline text-base font-bold text-slate-900">
                      {route.toCity} ({route.toIata})
                    </span>
                  </div>
                  <span className="font-mono-telemetry text-base font-bold text-sky-700">
                    From ${route.price}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-telemetry text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                      {route.airline} · {route.flightNo}
                    </span>
                    <span className="font-mono-telemetry text-xs text-slate-500">
                      {route.frequency}
                    </span>
                  </div>

                  <Link
                    href={`/?origin=${route.fromIata}&destination=${route.toIata}&search=${aircraft.id}`}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-sky-600 text-white rounded-lg font-mono-telemetry text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Find Flights</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom AvGeek Passport Action Bar */}
        <AircraftPassportLogger
          aircraftId={aircraft.id}
          aircraftName={aircraft.name}
          shortName={aircraft.shortName}
        />
      </main>
    </div>
  );
}
