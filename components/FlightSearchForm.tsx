'use client';

import React, { useState, useEffect, useRef } from 'react';
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

  // Synchronize internal state when initialParams updates externally
  useEffect(() => {
    if (initialParams?.origin) setOrigin(initialParams.origin);
    if (initialParams?.destination) setDestination(initialParams.destination);
    if (initialParams?.departureDate) setDepartureDate(initialParams.departureDate);
    if (initialParams?.returnDate) setReturnDate(initialParams.returnDate);
    if (initialParams?.cabinClass) setCabinClass(initialParams.cabinClass);
    if (initialParams?.passengers) setPassengers(initialParams.passengers);
  }, [initialParams]);

  // Dropdown Autocomplete States & Refs
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');

  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Reliable click-outside handler using React refs (No full-screen blur backdrop)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectOrigin = (code: string) => {
    setOrigin(code);
    setShowOriginDropdown(false);
    setOriginQuery('');
  };

  const selectDest = (code: string) => {
    setDestination(code);
    setShowDestDropdown(false);
    setDestQuery('');
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let resolvedOrigin = origin;
    let resolvedDest = destination;

    // Auto-commit active search query if user typed into input without explicitly clicking dropdown
    if (showOriginDropdown && originQuery.trim()) {
      const matches = findAirport(originQuery.trim());
      if (matches.length > 0) {
        resolvedOrigin = matches[0].code;
        setOrigin(matches[0].code);
      }
      setShowOriginDropdown(false);
      setOriginQuery('');
    }

    if (showDestDropdown && destQuery.trim()) {
      const matches = findAirport(destQuery.trim());
      if (matches.length > 0) {
        resolvedDest = matches[0].code;
        setDestination(matches[0].code);
      }
      setShowDestDropdown(false);
      setDestQuery('');
    }

    if (!resolvedOrigin || !resolvedDest || !departureDate) return;

    onSearch({
      origin: resolvedOrigin.toUpperCase().trim(),
      destination: resolvedDest.toUpperCase().trim(),
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
      {/* Interactive Route & Itinerary Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xs border border-[#e2e8f0] p-4 sm:p-5 flex flex-col gap-3 relative"
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

        {/* Quick AvGeek Preset Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[10px] font-mono-telemetry font-bold text-[#64748b] shrink-0 uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#0284c7]">bolt</span>
            PRESETS:
          </span>
          <button
            type="button"
            onClick={() => handleLoadCurated('FRA', 'JFK')}
            className="shrink-0 px-2 py-0.5 rounded text-[11px] font-mono-telemetry font-semibold bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] hover:text-[#0284c7] border border-[#dce9ff] transition-all cursor-pointer"
          >
            FRA ⇄ JFK <span className="text-[#b45309] font-bold">(747-8)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadCurated('DXB', 'LHR')}
            className="shrink-0 px-2 py-0.5 rounded text-[11px] font-mono-telemetry font-semibold bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] hover:text-[#0284c7] border border-[#dce9ff] transition-all cursor-pointer"
          >
            DXB ⇄ LHR <span className="text-[#0284c7] font-bold">(A380)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadCurated('JFK', 'LHR')}
            className="shrink-0 px-2 py-0.5 rounded text-[11px] font-mono-telemetry font-semibold bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] hover:text-[#0284c7] border border-[#dce9ff] transition-all cursor-pointer"
          >
            JFK ⇄ LHR <span className="text-[#059669] font-bold">(A350)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadCurated('SFO', 'SIN')}
            className="shrink-0 px-2 py-0.5 rounded text-[11px] font-mono-telemetry font-semibold bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] hover:text-[#0284c7] border border-[#dce9ff] transition-all cursor-pointer"
          >
            SFO ⇄ SIN <span className="text-[#7c3aed] font-bold">(787-9)</span>
          </button>
        </div>

        {/* Origin & Destination Split Node */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 relative">
          {/* Origin Node */}
          <div
            ref={originRef}
            className={`relative flex-1 ${showOriginDropdown ? 'z-50' : 'z-10'}`}
          >
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

            {/* Origin Dropdown */}
            {showOriginDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-72 overflow-y-auto rounded-lg bg-white border border-[#cbd5e1] shadow-2xl z-50 p-2 space-y-1">
                <input
                  type="text"
                  placeholder="Type airport code or city (e.g. London, DEL, SFO)..."
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setShowOriginDropdown(false);
                    } else if (e.key === 'Enter' && originList.length > 0) {
                      e.preventDefault();
                      setOrigin(originList[0].code);
                      setShowOriginDropdown(false);
                      setOriginQuery('');
                    }
                  }}
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
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectOrigin(a.code);
                    }}
                    onClick={() => selectOrigin(a.code)}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-[#eff4ff] active:bg-[#dbeafe] flex items-center justify-between text-xs text-[#0b1c30] transition-colors cursor-pointer group"
                  >
                    <div className="truncate pr-2">
                      <span className="font-ocr font-bold text-[#0284c7] group-hover:text-[#0b1c30] mr-2 text-sm tracking-[0.06em]">
                        {a.code}
                      </span>
                      <span className="font-semibold text-[#0b1c30]">{a.city}</span>
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
          <div
            ref={destRef}
            className={`relative flex-1 ${showDestDropdown ? 'z-50' : 'z-10'}`}
          >
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

            {/* Destination Dropdown */}
            {showDestDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-72 overflow-y-auto rounded-lg bg-white border border-[#cbd5e1] shadow-2xl z-50 p-2 space-y-1">
                <input
                  type="text"
                  placeholder="Type airport code or city (e.g. Dubai, Tokyo, CDG)..."
                  value={destQuery}
                  onChange={(e) => setDestQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setShowDestDropdown(false);
                    } else if (e.key === 'Enter' && destList.length > 0) {
                      e.preventDefault();
                      selectDest(destList[0].code);
                    }
                  }}
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
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectDest(a.code);
                    }}
                    onClick={() => selectDest(a.code)}
                    className="w-full text-left px-2.5 py-2 rounded hover:bg-[#eff4ff] active:bg-[#dbeafe] flex items-center justify-between text-xs text-[#0b1c30] transition-colors cursor-pointer group"
                  >
                    <div className="truncate pr-2">
                      <span className="font-ocr font-bold text-[#0284c7] group-hover:text-[#0b1c30] mr-2 text-sm tracking-[0.06em]">
                        {a.code}
                      </span>
                      <span className="font-semibold text-[#0b1c30]">{a.city}</span>
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
    </div>
  );
}
