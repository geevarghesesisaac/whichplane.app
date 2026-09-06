'use client';

import React, { useState } from 'react';
import { SearchParams, CabinClass } from '@/lib/types';
import { MAJOR_AIRPORTS, findAirport } from '@/data/airports';

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

  // Airport dropdown search state
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

  const handleLoadCurated = (orig: string, dest: string) => {
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

  const originAirport = MAJOR_AIRPORTS.find(a => a.code === origin) || { city: 'New York', name: 'Kennedy Intl' };
  const destAirport = MAJOR_AIRPORTS.find(a => a.code === destination) || { city: 'London', name: 'Heathrow Airport' };

  const originList = findAirport(originQuery);
  const destList = findAirport(destQuery);

  return (
    <div className="w-full space-y-4">
      {/* Interactive Route & Itinerary Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xs border border-[#e2e8f0] p-4 sm:p-5 flex flex-col gap-3 relative"
      >
        {/* Card Header Telemetry Tag */}
        <div className="flex items-center justify-between pb-1 border-b border-[#f1f5f9]">
          <span className="font-mono-telemetry text-[10px] font-bold text-[#0284c7] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
            FLIGHT TELEMETRY SECTOR
          </span>
          <div className="flex items-center gap-1 bg-[#eff4ff] px-2 py-0.5 rounded text-[#45464d] font-mono-telemetry text-[11px] border border-[#dce9ff]">
            <span>RT</span>
            <span className="text-[#cbd5e1]">/</span>
            <span>{passengers} PAX</span>
            <span className="text-[#cbd5e1]">/</span>
            <span className="font-bold text-[#0284c7] uppercase">{cabinClass.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Origin & Destination Split Node */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 relative">
          {/* Origin Node */}
          <div className="relative flex-1">
            <div
              onClick={() => setShowOriginDropdown(true)}
              className="bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] p-3 rounded-lg text-left transition-colors flex flex-col cursor-pointer"
            >
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
                ORIGIN WAYPOINT
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
                {origin}
              </span>
              <span className="text-xs text-[#45464d] truncate font-medium">
                {originAirport.city} ({originAirport.name})
              </span>
            </div>

            {/* Dropdown */}
            {showOriginDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto rounded-lg bg-white border border-[#cbd5e1] shadow-xl z-50 p-1.5 space-y-1">
                <input
                  type="text"
                  placeholder="Search airport or city..."
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded text-xs border border-[#cbd5e1] mb-1 font-mono-telemetry focus:outline-none focus:border-[#0284c7]"
                  autoFocus
                />
                {originList.map(a => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setOrigin(a.code);
                      setShowOriginDropdown(false);
                      setOriginQuery('');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center justify-between text-xs text-[#0b1c30] transition-colors"
                  >
                    <div>
                      <span className="font-mono-telemetry font-bold text-[#0284c7] mr-2">{a.code}</span>
                      <span className="font-medium">{a.city}</span>
                      <span className="text-[#64748b] ml-1 text-[11px]">({a.name})</span>
                    </div>
                    <span>{a.flag}</span>
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
              onClick={() => setShowDestDropdown(true)}
              className="bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] p-3 rounded-lg text-left transition-colors flex flex-col cursor-pointer"
            >
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
                DESTINATION WAYPOINT
              </span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
                {destination}
              </span>
              <span className="text-xs text-[#45464d] truncate font-medium">
                {destAirport.city} ({destAirport.name})
              </span>
            </div>

            {/* Dropdown */}
            {showDestDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto rounded-lg bg-white border border-[#cbd5e1] shadow-xl z-50 p-1.5 space-y-1">
                <input
                  type="text"
                  placeholder="Search airport or city..."
                  value={destQuery}
                  onChange={(e) => setDestQuery(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded text-xs border border-[#cbd5e1] mb-1 font-mono-telemetry focus:outline-none focus:border-[#0284c7]"
                  autoFocus
                />
                {destList.map(a => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setDestination(a.code);
                      setShowDestDropdown(false);
                      setDestQuery('');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#eff4ff] flex items-center justify-between text-xs text-[#0b1c30] transition-colors"
                  >
                    <div>
                      <span className="font-mono-telemetry font-bold text-[#0284c7] mr-2">{a.code}</span>
                      <span className="font-medium">{a.city}</span>
                      <span className="text-[#64748b] ml-1 text-[11px]">({a.name})</span>
                    </div>
                    <span>{a.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date, Cabin & Flight Vector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {/* Date Picker */}
          <div className="flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined text-[18px] text-[#0284c7]">calendar_today</span>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-mono-telemetry text-[9px] font-bold text-[#64748b] uppercase">TRAVEL DATE</span>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="font-mono-telemetry text-xs font-bold text-[#0b1c30] bg-transparent focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Cabin Class & Pax */}
          <div className="flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined text-[18px] text-[#0284c7]">airline_seat_recline_normal</span>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-mono-telemetry text-[9px] font-bold text-[#64748b] uppercase">CABIN // PAX</span>
              <div className="flex items-center gap-2">
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                  className="font-mono-telemetry text-xs font-semibold text-[#0b1c30] bg-transparent focus:outline-none cursor-pointer capitalize"
                >
                  <option value="economy">Economy</option>
                  <option value="premium_economy">Prem Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="font-mono-telemetry text-xs font-semibold text-[#0b1c30] bg-transparent focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} Pax</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-2.5 rounded-lg font-headline text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-mono-telemetry text-xs">SCANNING RADAR...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Scan Flight Equipment</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Curated AvGeek Itineraries Module */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#0284c7]">trending_up</span>
            Curated AvGeek Itineraries
          </span>
          <span className="font-mono-telemetry text-[11px] text-[#0284c7] font-semibold">
            INSTANT SCAN
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Card 1: A380 */}
          <div
            onClick={() => handleLoadCurated('DXB', 'LHR')}
            className="bg-white rounded-lg border border-[#e2e8f0] p-3 hover:border-[#0284c7] transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono-telemetry text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                  SUPERJUMBO QUAD
                </span>
                <span className="font-mono-telemetry text-[10px] text-[#64748b]">EK0001</span>
              </div>
              <h4 className="font-headline text-xs font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                A380 Over the Atlantic
              </h4>
              <p className="text-[11px] text-[#45464d] mt-0.5">DXB ⇄ LHR • Emirates Double Decker with Lounge</p>
            </div>
            <div className="pt-2 mt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px]">
              <span className="font-mono-telemetry font-bold text-[#0b1c30]">$840</span>
              <span className="font-mono-telemetry text-[#0284c7] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                LOAD AIRFRAME <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 2: 747-8 Queen */}
          <div
            onClick={() => handleLoadCurated('FRA', 'JFK')}
            className="bg-white rounded-lg border border-[#e2e8f0] p-3 hover:border-[#0284c7] transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono-telemetry text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                  QUEEN OF SKIES
                </span>
                <span className="font-mono-telemetry text-[10px] text-[#64748b]">LH400</span>
              </div>
              <h4 className="font-headline text-xs font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                Boeing 747-8 Intercontinental
              </h4>
              <p className="text-[11px] text-[#45464d] mt-0.5">FRA ⇄ JFK • Upper Deck & Nose Cone Flights</p>
            </div>
            <div className="pt-2 mt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px]">
              <span className="font-mono-telemetry font-bold text-[#0b1c30]">$820</span>
              <span className="font-mono-telemetry text-[#0284c7] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                LOAD AIRFRAME <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 3: A350-1000 XWB */}
          <div
            onClick={() => handleLoadCurated('JFK', 'LHR')}
            className="bg-white rounded-lg border border-[#e2e8f0] p-3 hover:border-[#0284c7] transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono-telemetry text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                  5,800FT CABIN
                </span>
                <span className="font-mono-telemetry text-[10px] text-[#64748b]">VS0004</span>
              </div>
              <h4 className="font-headline text-xs font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                Airbus A350-1000 Flagship
              </h4>
              <p className="text-[11px] text-[#45464d] mt-0.5">JFK ⇄ LHR • Carbon Composite Trent XWB</p>
            </div>
            <div className="pt-2 mt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px]">
              <span className="font-mono-telemetry font-bold text-[#0b1c30]">$684</span>
              <span className="font-mono-telemetry text-[#0284c7] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                LOAD AIRFRAME <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </span>
            </div>
          </div>

          {/* Card 4: 787 Dreamliner */}
          <div
            onClick={() => handleLoadCurated('SFO', 'SIN')}
            className="bg-white rounded-lg border border-[#e2e8f0] p-3 hover:border-[#0284c7] transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono-telemetry text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#0284c7] border border-[#cce5ff]">
                  DIMMABLE WINDOWS
                </span>
                <span className="font-mono-telemetry text-[10px] text-[#64748b]">UA001</span>
              </div>
              <h4 className="font-headline text-xs font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors">
                Dreamliner Ultra Long-Haul
              </h4>
              <p className="text-[11px] text-[#45464d] mt-0.5">SFO ⇄ SIN • 17h Non-Stop HEPA Filtration</p>
            </div>
            <div className="pt-2 mt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px]">
              <span className="font-mono-telemetry font-bold text-[#0b1c30]">$990</span>
              <span className="font-mono-telemetry text-[#0284c7] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                LOAD AIRFRAME <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
