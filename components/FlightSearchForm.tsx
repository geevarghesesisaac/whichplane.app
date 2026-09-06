'use client';

import React, { useState } from 'react';
import { SearchParams, CabinClass } from '@/lib/types';
import { MAJOR_AIRPORTS, findAirport } from '@/data/airports';
import { PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowRightLeft, Search, Sparkles } from 'lucide-react';

interface FlightSearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
  initialParams: SearchParams;
}

export default function FlightSearchForm({
  onSearch,
  isLoading,
  initialParams
}: FlightSearchFormProps) {
  const [origin, setOrigin] = useState(initialParams.origin || 'JFK');
  const [destination, setDestination] = useState(initialParams.destination || 'LHR');
  const [departureDate, setDepartureDate] = useState(
    initialParams.departureDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [cabinClass, setCabinClass] = useState<CabinClass>(initialParams.cabinClass || 'economy');
  const [passengers, setPassengers] = useState(initialParams.passengers || 1);

  // Dropdown states for airport search
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !departureDate) return;

    onSearch({
      origin: origin.toUpperCase().trim(),
      destination: destination.toUpperCase().trim(),
      departureDate,
      cabinClass,
      passengers: Number(passengers) || 1
    });
  };

  const handlePreset = (orig: string, dest: string) => {
    setOrigin(orig);
    setDestination(dest);
    onSearch({
      origin: orig,
      destination: dest,
      departureDate,
      cabinClass,
      passengers
    });
  };

  const originAirports = findAirport(originQuery);
  const destAirports = findAirport(destQuery);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Search Container */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 backdrop-blur-2xl shadow-2xl relative z-20 space-y-4"
      >
        {/* Top Controls: Cabin Class & Passengers */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/80 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['economy', 'premium_economy', 'business', 'first'] as CabinClass[]).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCabinClass(c)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  cabinClass === c
                    ? 'bg-sky-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400">Travelers:</span>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} Adult{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin */}
          <div className="md:col-span-4 relative">
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Departure Airport
            </label>
            <div className="relative">
              <PlaneTakeoff className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value.toUpperCase());
                  setOriginQuery(e.target.value);
                  setShowOriginDropdown(true);
                }}
                onFocus={() => setShowOriginDropdown(true)}
                placeholder="Airport code (e.g. JFK)"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-sm text-white font-bold placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Dropdown Autocomplete */}
            {showOriginDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-56 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-1.5 space-y-1">
                {originAirports.map(a => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setOrigin(a.code);
                      setShowOriginDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800 flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <div>
                      <span className="font-extrabold text-sky-400 mr-2">{a.code}</span>
                      <span className="text-white font-medium">{a.city}</span>
                      <span className="text-slate-400 ml-1 text-[11px]">({a.name})</span>
                    </div>
                    <span>{a.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-5 md:pt-0">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all transform hover:rotate-180 duration-200"
              title="Swap origin and destination"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-4 relative">
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Destination Airport
            </label>
            <div className="relative">
              <PlaneLanding className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value.toUpperCase());
                  setDestQuery(e.target.value);
                  setShowDestDropdown(true);
                }}
                onFocus={() => setShowDestDropdown(true)}
                placeholder="Airport code (e.g. LHR)"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-sm text-white font-bold placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Dropdown Autocomplete */}
            {showDestDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-56 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-1.5 space-y-1">
                {destAirports.map(a => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setDestination(a.code);
                      setShowDestDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800 flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <div>
                      <span className="font-extrabold text-sky-400 mr-2">{a.code}</span>
                      <span className="text-white font-medium">{a.city}</span>
                      <span className="text-slate-400 ml-1 text-[11px]">({a.name})</span>
                    </div>
                    <span>{a.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div className="md:col-span-3">
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Departure Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-sm text-white font-bold focus:outline-none focus:border-sky-500 [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Submit & Avgeek Quick Route Presets */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          {/* Quick Route Shortcuts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Avgeek Presets:
            </span>
            <button
              type="button"
              onClick={() => handlePreset('DXB', 'LHR')}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-950/30 text-indigo-300 transition-colors"
            >
              👑 DXB ⇄ LHR (A380)
            </button>
            <button
              type="button"
              onClick={() => handlePreset('FRA', 'JFK')}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-950/30 text-amber-300 transition-colors"
            >
              👑 FRA ⇄ JFK (747-8)
            </button>
            <button
              type="button"
              onClick={() => handlePreset('JFK', 'LHR')}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950 border border-slate-800 hover:border-sky-500/50 hover:bg-sky-950/30 text-sky-300 transition-colors"
            >
              ✨ JFK ⇄ LHR (A350/787)
            </button>
            <button
              type="button"
              onClick={() => handlePreset('SFO', 'SIN')}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/30 text-emerald-300 transition-colors"
            >
              🌿 SFO ⇄ SIN (18h ULR)
            </button>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching Equipment...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search Flights by Aircraft</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
