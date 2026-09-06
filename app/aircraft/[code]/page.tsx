import React from 'react';
import Navbar from '@/components/Navbar';
import { AIRCRAFT_DATABASE, IATA_CODE_ALIASES } from '@/data/aircraft';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Plane, 
  Wind, 
  Gauge, 
  Armchair, 
  Sparkles, 
  AlertTriangle, 
  Calendar, 
  Search, 
  ArrowLeft, 
  ShieldCheck 
} from 'lucide-react';

interface AircraftDetailPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function AircraftDetailPage({ params }: AircraftDetailPageProps) {
  const { code } = await params;
  const upperCode = code.toUpperCase();
  const canonicalId = IATA_CODE_ALIASES[upperCode] || upperCode;
  const aircraft = AIRCRAFT_DATABASE[canonicalId];

  if (!aircraft) {
    notFound();
  }

  // Sample known routes for popular aircraft
  const knownRoutesMap: Record<string, Array<{ from: string; to: string; airline: string; note: string }>> = {
    '380': [
      { from: 'DXB (Dubai)', to: 'LHR (London Heathrow)', airline: 'Emirates', note: 'Multiple daily scheduled flights' },
      { from: 'LHR (London)', to: 'JFK (New York)', airline: 'British Airways', note: 'Flagship daily transatlantic' },
      { from: 'SIN (Singapore)', to: 'LHR (London)', airline: 'Singapore Airlines', note: 'Iconic Suites Class with double beds' },
      { from: 'SYD (Sydney)', to: 'LAX (Los Angeles)', airline: 'Qantas', note: 'Long-haul transpacific A380' }
    ],
    '748': [
      { from: 'FRA (Frankfurt)', to: 'JFK (New York)', airline: 'Lufthansa', note: 'Daily passenger Queen of the Skies' },
      { from: 'FRA (Frankfurt)', to: 'ORD (Chicago)', airline: 'Lufthansa', note: 'Scheduled daily Boeing 747-8' },
      { from: 'ICN (Seoul)', to: 'ATL (Atlanta)', airline: 'Korean Air', note: 'Ultra long-haul 747-8' },
      { from: 'PEK (Beijing)', to: 'FRA (Frankfurt)', airline: 'Air China', note: 'Flagship Sino-European connection' }
    ],
    '351': [
      { from: 'LHR (London)', to: 'JFK (New York)', airline: 'Virgin Atlantic / British Airways', note: 'Both UK carriers fly A350-1000' },
      { from: 'DOH (Doha)', to: 'LHR (London)', airline: 'Qatar Airways', note: 'Qsuite on A350-1000' },
      { from: 'HND (Tokyo)', to: 'JFK (New York)', airline: 'Japan Airlines', note: 'New flagship cabin with enclosed doors' }
    ],
    '789': [
      { from: 'SFO (San Francisco)', to: 'SIN (Singapore)', airline: 'United Airlines', note: 'Composite 17h transpacific flight' },
      { from: 'LHR (London)', to: 'PER (Perth)', airline: 'Qantas', note: 'Historic non-stop UK to Australia' },
      { from: 'JFK (New York)', to: 'HND (Tokyo)', airline: 'ANA', note: 'The Room business suites' }
    ]
  };

  const knownRoutes = knownRoutesMap[aircraft.id] || [
    { from: 'JFK (New York)', to: 'LHR (London)', airline: 'Major International Carriers', note: 'Scheduled transatlantic service' },
    { from: 'LAX (Los Angeles)', to: 'NRT (Tokyo)', airline: 'Transpacific Operators', note: 'Long-haul scheduled service' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Back Link */}
        <Link
          href="/aircraft"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Aircraft Directory</span>
        </Link>

        {/* Hero Banner */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/30">
                {aircraft.manufacturer} • {aircraft.family}
              </span>
              {aircraft.isComposite && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Wind className="w-3.5 h-3.5" />
                  Composite Cabin (6,000 ft altitude)
                </span>
              )}
              {aircraft.productionStatus === 'discontinued' && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ⚠️ Production Ended
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {aircraft.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {aircraft.whyFlyThis}
            </p>

            {/* Quick Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/?search=${aircraft.id}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Flights on this Plane</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Specs & Cabin Comfort Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <Gauge className="w-4 h-4" />
              <span>Cabin Pressurization</span>
            </div>
            <span className="text-2xl font-black text-white block">
              {aircraft.cabinAltitudeFt ? `~${aircraft.cabinAltitudeFt.toLocaleString()} ft` : '8,000 ft'}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {aircraft.isComposite
                ? 'Pressurized to 6,000 ft instead of the usual 8,000 ft, significantly reducing dehydration, headaches, and jet lag fatigue.'
                : 'Standard commercial cabin altitude pressurization level.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Wind className="w-4 h-4" />
              <span>Cabin Relative Humidity</span>
            </div>
            <span className="text-2xl font-black text-white block">
              {aircraft.humidityPercent || '10-15%'}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {aircraft.isComposite
                ? 'Carbon fiber composite materials do not corrode, permitting higher cabin humidity (up to 25%) without structural damage.'
                : 'Typical aluminum airframe humidity level.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Armchair className="w-4 h-4" />
              <span>Fuselage & Aisle Count</span>
            </div>
            <span className="text-2xl font-black text-white block capitalize">
              {aircraft.bodyType}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {aircraft.aisles === 2
                ? 'Twin-aisle widebody layout with generous headroom and ample walking space.'
                : 'Single-aisle narrowbody layout.'}
            </p>
          </div>
        </div>

        {/* Fun Facts & Trivia */}
        {aircraft.funFacts && aircraft.funFacts.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Avgeek Notes & Aircraft Trivia
            </h2>
            <ul className="space-y-2.5">
              {aircraft.funFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Known Routes & Where to Fly It */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400" />
              Where You Can Still Fly This Aircraft
            </h2>
            <span className="text-xs text-slate-400">Scheduled Routes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {knownRoutes.map((route, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-white">{route.from} ⇄ {route.to}</span>
                  <span className="text-sky-400 font-semibold">{route.airline}</span>
                </div>
                <p className="text-[11px] text-slate-400">{route.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Airlines */}
        {aircraft.primaryAirlines && aircraft.primaryAirlines.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white">Major Airlines Operating the {aircraft.shortName}</h2>
            <div className="flex flex-wrap gap-2">
              {aircraft.primaryAirlines.map(airline => (
                <span
                  key={airline}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200"
                >
                  {airline}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
