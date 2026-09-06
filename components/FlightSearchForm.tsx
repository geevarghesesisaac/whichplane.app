'use client';

import React, { useState, useEffect } from 'react';
import { SearchParams, CabinClass } from '@/lib/types';
import { getAirport, findAirport } from '@/data/airports';

interface FlightSearchFormProps {
  onSearch: (params: SearchParams) => void;
  defaultOrigin?: string;
  defaultDestination?: string;
  defaultDepartureDate?: string;
  isLoading?: boolean;
  initialParams?: SearchParams;
}

export default function FlightSearchForm({
  onSearch,
  defaultOrigin = 'JFK',
  defaultDestination = 'LHR',
  defaultDepartureDate,
  isLoading = false,
  initialParams
}: FlightSearchFormProps) {
  const [isRoundtrip, setIsRoundtrip] = useState(true);
  const [origin, setOrigin] = useState(initialParams?.origin || defaultOrigin);
  const [destination, setDestination] = useState(initialParams?.destination || defaultDestination);

  // Default departure date (14 days from today)
  const [departureDate, setDepartureDate] = useState(() => {
    if (initialParams?.departureDate) return initialParams.departureDate;
    if (defaultDepartureDate) return defaultDepartureDate;
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });

  // Default return date (21 days from today)
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().split('T')[0];
  });

  const [cabinClass, setCabinClass] = useState<CabinClass>('economy');
  const [passengers, setPassengers] = useState(1);

  // Dropdown Autocomplete States
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');

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
      returnDate: isRoundtrip ? returnDate : undefined,
      cabinClass,
      passengers: Number(passengers) || 1
    });
  };

  const handleLoadCurated = (orig: string, dest: string) => {
    setOrigin(orig);
    setDestination(dest);
    onSearch({
      origin: orig,
      destination: dest,
      departureDate,
      returnDate: isRoundtrip ? returnDate : undefined,
      cabinClass,
      passengers
    });
  };

  const originAirport = getAirport(origin);
  const destAirport = getAirport(destination);

  const originList = findAirport(originQuery);
  const destList = findAirport(destQuery);

  return (
    <div className="w-full space-y-4">
      {/* Backdrop for closing dropdowns on outside click */}
      {(showOriginDropdown || showDestDropdown) && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
          onClick={() => {
            setShowOriginDropdown(false);
            setShowDestDropdown(false);
          }}
        />
      )}

      {/* Interactive Route & Itinerary Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xs border border-[#e2e8f0] p-4 sm:p-5 flex flex-col gap-3 relative z-30"
      >
        {/* Card Header Telemetry Tag & Roundtrip Toggle */}
        <div className="flex flex-wrap items-center justify-between pb-2 border-b border-[#f1f5f9] gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono-telemetry text-xs font-bold text-[#0284c7] uppercase tracking-[0.08em] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
              FLIGHT TELEMETRY SECTOR
            </span>
          </div>

          {/* Trip Type & Passenger Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#f1f5f9] p-0.5 rounded-lg border border-[#e2e8f0]">
              <button
                type="button"
                onClick={() => setIsRoundtrip(true)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono-telemetry font-bold tracking-[0.04em] transition-all cursor-pointer ${
                  isRoundtrip
                    ? 'bg-white text-[#0284c7] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0b1c30]'
                }`}
              >
                ROUNDTRIP
              </button>
              <button
                type="button"
                onClick={() => setIsRoundtrip(false)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono-telemetry font-bold tracking-[0.04em] transition-all cursor-pointer ${
                  !isRoundtrip
                    ? 'bg-white text-[#0284c7] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0b1c30]'
                }`}
              >
                ONE-WAY
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1 rounded text-[#45464d] font-mono-telemetry text-xs font-semibold tracking-[0.04em] border border-[#dce9ff]">
              <span>{passengers} PAX</span>
              <span className="text-[#cbd5e1]">/</span>
              <span className="font-bold text-[#0284c7] uppercase">{cabinClass.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Origin & Destination Split Node */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 relative">
          {/* Origin Node */}
          <div className="relative flex-1">
            <div
              onClick={() => {
                setShowOriginDropdown(true);
                setShowDestDropdown(false);
              }}
              className="bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] p-3 rounded-lg text-left transition-colors flex flex-col cursor-pointer"
            >
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] tracking-[0.08em] uppercase">
                ORIGIN WAYPOINT
              </span>
              <span className="font-ocr text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-[0.08em]">
                {origin}
              </span>
              <span className="text-xs text-[#45464d] truncate font-medium">
                {originAirport.city} ({originAirport.name})
              </span>
            </div>

            {/* Dropdown */}
            {showOriginDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-72 overflow-y-auto rounded-lg bg-white border border-[#cbd5e1] shadow-2xl z-50 p-2 space-y-1">
                <input
                  type="text"
                  placeholder="Type airport code or city (e.g. London, DEL, SFO)..."
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  className="w-full px-2.5 py-2 rounded text-xs border border-[#cbd5e1] mb-1 font-mono-telemetry focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7]"
                  autoFocus
                />
                <div className="text-[10px] font-mono-telemetry font-bold text-[#64748b] px-1 py-0.5 uppercase tracking-wider">
                  {originQuery ? 'Matching Airports' : 'Popular Global Hubs'}
                </div>
                {originList.map((a) => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setOrigin(a.code);
                      setShowOriginDropdown(false);
                      setOriginQuery('');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center justify-between text-xs text-[#0b1c30] transition-colors cursor-pointer group"
                  >
                    <div className="truncate pr-2">
                      <span className="font-ocr font-bold text-[#0284c7] group-hover:text-[#0b1c30] mr-2 text-sm tracking-[0.06em]">
                        {a.code}
                      </span>
                      <span className="font-medium text-[#0b1c30]">{a.city}</span>
                      <span className="text-[#64748b] ml-1 text-[11px] truncate">({a.name})</span>
                    </div>
                    <span className="text-sm shrink-0">{a.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Waypoint Button */}
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap route origin and destination"
            className="w-9 h-9 rounded-full bg-[#e5eeff] hover:bg-[#0284c7] hover:text-white text-[#0284c7] flex items-center justify-center shadow-xs shrink-0 transition-all active:rotate-180 cursor-pointer border border-[#cce5ff]"
          >
            <span className="material-symbols-outlined text-[18px]">sync_alt</span>
          </button>

          {/* Destination Node */}
          <div className="relative flex-1">
            <div
              onClick={() => {
                setShowDestDropdown(true);
                setShowOriginDropdown(false);
              }}
              className="bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] p-3 rounded-lg text-left transition-colors flex flex-col cursor-pointer"
            >
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] tracking-[0.08em] uppercase">
                DESTINATION WAYPOINT
              </span>
              <span className="font-ocr text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-[0.08em]">
                {destination}
              </span>
              <span className="text-xs text-[#45464d] truncate font-medium">
                {destAirport.city} ({destAirport.name})
              </span>
            </div>

            {/* Dropdown */}
            {showDestDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-72 overflow-y-auto rounded-lg bg-white border border-[#cbd5e1] shadow-2xl z-50 p-2 space-y-1">
                <input
                  type="text"
                  placeholder="Type airport code or city (e.g. Dubai, Tokyo, CDG)..."
                  value={destQuery}
                  onChange={(e) => setDestQuery(e.target.value)}
                  className="w-full px-2.5 py-2 rounded text-xs border border-[#cbd5e1] mb-1 font-mono-telemetry focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7]"
                  autoFocus
                />
                <div className="text-[10px] font-mono-telemetry font-bold text-[#64748b] px-1 py-0.5 uppercase tracking-wider">
                  {destQuery ? 'Matching Airports' : 'Popular Global Hubs'}
                </div>
                {destList.map((a) => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setDestination(a.code);
                      setShowDestDropdown(false);
                      setDestQuery('');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center justify-between text-xs text-[#0b1c30] transition-colors cursor-pointer group"
                  >
                    <div className="truncate pr-2">
                      <span className="font-ocr font-bold text-[#0284c7] group-hover:text-[#0b1c30] mr-2 text-sm tracking-[0.06em]">
                        {a.code}
                      </span>
                      <span className="font-medium text-[#0b1c30]">{a.city}</span>
                      <span className="text-[#64748b] ml-1 text-[11px] truncate">({a.name})</span>
                    </div>
                    <span className="text-sm shrink-0">{a.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date, Cabin & Flight Vector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {/* Departure Date Picker */}
          <div className="flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined text-[18px] text-[#0284c7]">calendar_today</span>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-[0.06em]">
                {isRoundtrip ? 'DEPARTURE DATE' : 'TRAVEL DATE'}
              </span>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="font-mono-telemetry text-xs font-bold text-[#0b1c30] bg-transparent focus:outline-none cursor-pointer tracking-[0.02em]"
              />
            </div>
          </div>

          {/* Return Date Picker (When Roundtrip is active) OR Cabin Class on Mobile */}
          {isRoundtrip ? (
            <div className="flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-2 rounded-lg">
              <span className="material-symbols-outlined text-[18px] text-[#0284c7]">event_repeat</span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-[0.06em]">
                  RETURN DATE
                </span>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="font-mono-telemetry text-xs font-bold text-[#0b1c30] bg-transparent focus:outline-none cursor-pointer tracking-[0.02em]"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-[#f8f9fc] border border-[#e2e8f0] px-3 py-2 rounded-lg opacity-60">
              <span className="material-symbols-outlined text-[18px] text-[#94a3b8]">flight_land</span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-mono-telemetry text-[10px] font-bold text-[#94a3b8] uppercase tracking-[0.06em]">
                  RETURN SECTOR
                </span>
                <span className="font-mono-telemetry text-xs text-[#94a3b8]">One-Way Selected</span>
              </div>
            </div>
          )}

          {/* Cabin Class & Passengers */}
          <div className="flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined text-[18px] text-[#0284c7]">airline_seat_recline_normal</span>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-[0.06em]">
                CABIN // PASSENGERS
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                  className="font-mono-telemetry text-xs font-semibold text-[#0b1c30] bg-transparent focus:outline-none cursor-pointer capitalize tracking-[0.02em]"
                >
                  <option value="economy">Economy</option>
                  <option value="premium_economy">Prem Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="font-mono-telemetry text-xs font-semibold text-[#0b1c30] bg-transparent focus:outline-none cursor-pointer tracking-[0.02em]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Pax' : 'Pax'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-1 bg-[#0F172A] hover:bg-[#1E293B] disabled:opacity-75 disabled:cursor-not-allowed text-white py-3 rounded-lg font-headline text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] tracking-[0.03em]"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-[#38BDF8] border-t-transparent rounded-full animate-spin" />
              <span>SCANNING FLIGHT LINES & CABIN SPECS...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px] text-[#38BDF8]">radar</span>
              <span>SCAN FLIGHT LINE & AIRCRAFT EQUIPMENT</span>
            </>
          )}
        </button>
      </form>

      {/* AvGeek Bucket List Itineraries */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono-telemetry text-xs font-bold text-[#0284c7] uppercase tracking-[0.08em] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            FEATURED AVGEEK FLIGHT LINES
          </span>
          <span className="font-mono-telemetry text-[11px] text-[#64748b]">1-Click Airframe Loader</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Card 1: Queen of the Skies 747-8 */}
          <div
            onClick={() => handleLoadCurated('FRA', 'JFK')}
            className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-1.5">
                <span className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] px-2 py-0.5 rounded font-mono-telemetry text-[10px] uppercase font-bold tracking-[0.06em]">
                  QUEEN OF SKIES
                </span>
                <span className="font-mono-telemetry text-[11px] text-[#64748b]">FRA ⇄ JFK</span>
              </div>
              <div className="font-headline text-sm font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                Boeing 747-8 Intercontinental
              </div>
              <p className="text-[11px] text-[#64748b] line-clamp-2 mt-0.5">
                Lufthansa 4-engine flagship with iconic upper-deck hump.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
              <span>Load 747-8 Route</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>

          {/* Card 2: Superjumbo A380 */}
          <div
            onClick={() => handleLoadCurated('DXB', 'LHR')}
            className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-1.5">
                <span className="bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe] px-2 py-0.5 rounded font-mono-telemetry text-[10px] uppercase font-bold tracking-[0.06em]">
                  SUPERJUMBO QUAD
                </span>
                <span className="font-mono-telemetry text-[11px] text-[#64748b]">DXB ⇄ LHR</span>
              </div>
              <div className="font-headline text-sm font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                Airbus A380-800 Double Decker
              </div>
              <p className="text-[11px] text-[#64748b] line-clamp-2 mt-0.5">
                Emirates double-deck giant with whisper-quiet 59 dB acoustic cabin.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
              <span>Load A380 Route</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>

          {/* Card 3: Project Sunrise A350-1000 */}
          <div
            onClick={() => handleLoadCurated('JFK', 'LHR')}
            className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-1.5">
                <span className="bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] px-2 py-0.5 rounded font-mono-telemetry text-[10px] uppercase font-bold tracking-[0.06em]">
                  5,800FT CABIN
                </span>
                <span className="font-mono-telemetry text-[11px] text-[#64748b]">JFK ⇄ LHR</span>
              </div>
              <div className="font-headline text-sm font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                Airbus A350-1000 XWB Flagship
              </div>
              <p className="text-[11px] text-[#64748b] line-clamp-2 mt-0.5">
                Virgin Atlantic & British Airways 53% carbon-fiber airframe.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
              <span>Load A350 Route</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>

          {/* Card 4: Pacific Dreamliner 787-9 */}
          <div
            onClick={() => handleLoadCurated('SFO', 'SIN')}
            className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-1.5">
                <span className="bg-[#f3e8ff] text-[#6b21a8] border border-[#e9d5ff] px-2 py-0.5 rounded font-mono-telemetry text-[10px] uppercase font-bold tracking-[0.06em]">
                  DIMMABLE WINDOWS
                </span>
                <span className="font-mono-telemetry text-[11px] text-[#64748b]">SFO ⇄ SIN</span>
              </div>
              <div className="font-headline text-sm font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                Boeing 787-9 Dreamliner
              </div>
              <p className="text-[11px] text-[#64748b] line-clamp-2 mt-0.5">
                United Airlines transpacific sector with 25% humidity air conditioning.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
              <span>Load 787-9 Route</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
