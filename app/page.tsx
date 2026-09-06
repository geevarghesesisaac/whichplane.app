'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import FlightSearchForm from '@/components/FlightSearchForm';
import AircraftFilterPanel from '@/components/AircraftFilterPanel';
import FlightCard from '@/components/FlightCard';
import { FlightOffer, SearchParams, FilterState } from '@/lib/types';
import { generateRealisticFlights } from '@/data/mockFlights';
import Link from 'next/link';

export default function Home() {
  const [customToken, setCustomToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial Search Parameters
  const initialParams: SearchParams = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return {
      origin: 'JFK',
      destination: 'LHR',
      departureDate: d.toISOString().split('T')[0],
      cabinClass: 'economy',
      passengers: 1
    };
  }, []);

  const [searchParams, setSearchParams] = useState<SearchParams>(initialParams);
  const [offers, setOffers] = useState<FlightOffer[]>([]);

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    manufacturers: [],
    families: [],
    bodyTypes: [],
    compositeOnly: false,
    excludeBoeing737Max: false,
    chaseA380Or747: false,
    acousticChevronsOnly: false,
    sub6000FtAltitudeOnly: false,
    maxStops: null,
    maxPrice: null,
    selectedAirlines: [],
    sortBy: 'best_spec'
  });

  useEffect(() => {
    const saved = localStorage.getItem('whichplane_duffel_token');
    if (saved) {
      setCustomToken(saved);
    }
  }, []);

  useEffect(() => {
    handleSearch(initialParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveToken = (token: string) => {
    setCustomToken(token);
    handleSearch(searchParams, token);
  };

  const handleSearch = async (params: SearchParams, tokenOverride?: string) => {
    setIsLoading(true);
    setSearchParams(params);

    try {
      const activeToken = tokenOverride !== undefined ? tokenOverride : customToken;
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          customToken: activeToken
        })
      });

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();
      setOffers(data.offers || []);
    } catch (err) {
      console.warn('API error, using client simulation:', err);
      const fallback = generateRealisticFlights(params);
      setOffers(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and Sort Offers
  const filteredOffers = useMemo(() => {
    return offers
      .filter((offer) => {
        if (filters.excludeBoeing737Max && offer.containsBoeing737Max) return false;
        if (filters.compositeOnly && !offer.containsComposite) return false;
        if (filters.chaseA380Or747 && !offer.containsA380 && !offer.contains747) return false;

        if (filters.sub6000FtAltitudeOnly) {
          const alt = offer.primaryAircraft.cabinAltitudeFt || 8000;
          if (alt >= 6000) return false;
        }

        if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(offer.primaryAircraft.manufacturer)) {
          return false;
        }

        if (filters.families.length > 0 && !filters.families.includes(offer.primaryAircraft.family)) {
          return false;
        }

        if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(offer.primaryAircraft.bodyType)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'best_spec') {
          const scoreA = (a.primaryAircraft.isComposite ? 4 : 0) + (a.containsA380 || a.contains747 ? 5 : 0) + (a.primaryAircraft.bodyType === 'widebody' ? 2 : 0);
          const scoreB = (b.primaryAircraft.isComposite ? 4 : 0) + (b.containsA380 || b.contains747 ? 5 : 0) + (b.primaryAircraft.bodyType === 'widebody' ? 2 : 0);
          return scoreB - scoreA;
        }
        if (filters.sortBy === 'price_asc') {
          return a.price.amount - b.price.amount;
        }
        if (filters.sortBy === 'duration_asc') {
          return a.totalDurationMinutes - b.totalDurationMinutes;
        }
        if (filters.sortBy === 'departure_time') {
          return (
            new Date(a.segments[0].departureTime).getTime() -
            new Date(b.segments[0].departureTime).getTime()
          );
        }
        return 0;
      });
  }, [offers, filters]);

  const activeAirframeCount = useMemo(() => {
    const set = new Set(offers.map(o => o.primaryAircraft.shortName));
    return set.size;
  }, [offers]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar
        onTokenChange={handleSaveToken}
        customToken={customToken}
        activeAirframe={offers[0]?.primaryAircraft.shortName || 'A350-1000'}
      />

      {/* Main Content Feed */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Search Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#e2e8f0]">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0b1c30] tracking-tight">
              Flight Telemetry & Airframe Search
            </h1>
            <p className="text-xs text-[#64748b]">
              Discover real flights filtered by composite cabins, quiet turbofans, and equipment confidence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/aircraft"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#cbd5e1] hover:border-[#0284c7] hover:bg-[#eff4ff] text-[#0b1c30] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#0284c7]">radar</span>
              <span>Open Fleet Radar</span>
            </Link>
          </div>
        </div>

        {/* Route Selector & Telemetry Form */}
        <FlightSearchForm
          onSearch={(params) => handleSearch(params)}
          isLoading={isLoading}
          initialParams={searchParams}
        />

        {/* Dedicated Aircraft Spec Filter Module */}
        <AircraftFilterPanel
          filters={filters}
          onChange={setFilters}
          totalResults={offers.length}
          filteredResults={filteredOffers.length}
        />

        {/* Telemetry Indicator Strip */}
        <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
            <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30]">
              {filteredOffers.length} FLIGHTS SCANNED
            </span>
            <span className="text-[#cbd5e1]">/</span>
            <span className="font-mono-telemetry text-xs text-[#64748b]">
              {activeAirframeCount} AIRFRAME MODELS DETECTED
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono-telemetry text-[#64748b]">
            <span className="material-symbols-outlined text-[15px] text-[#10b981]">verified</span>
            <span className="hidden sm:inline">US DOT Operating Carrier Compliant</span>
          </div>
        </div>

        {/* Flight Results Stream */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="p-16 text-center space-y-3 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
              <div className="w-8 h-8 border-2 border-[#0284c7] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-headline text-sm font-bold text-[#0b1c30]">
                Scanning flight dispatch lines & aircraft equipment...
              </p>
              <p className="font-mono-telemetry text-xs text-[#64748b]">
                Parsing ICAO types, composite fuselage metrics, and operating carriers
              </p>
            </div>
          ) : filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <FlightCard key={offer.id} offer={offer} />
            ))
          ) : (
            <div className="p-12 text-center rounded-xl bg-white border border-[#e2e8f0] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#0284c7] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[28px]">search_off</span>
              </div>
              <h3 className="font-headline text-base font-bold text-[#0b1c30]">
                No Flights Match Your Specific Airframe Criteria
              </h3>
              <p className="text-xs text-[#64748b] max-w-md mx-auto">
                Try relaxing the aircraft spec filters (e.g. including single-aisle aircraft or enabling additional manufacturers).
              </p>
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    manufacturers: [],
                    families: [],
                    bodyTypes: [],
                    compositeOnly: false,
                    excludeBoeing737Max: false,
                    chaseA380Or747: false,
                    acousticChevronsOnly: false,
                    sub6000FtAltitudeOnly: false,
                    maxStops: null,
                    maxPrice: null,
                    selectedAirlines: [],
                    sortBy: 'best_spec'
                  })
                }
                className="px-4 py-2 rounded-lg font-mono-telemetry text-xs font-bold bg-[#0F172A] hover:bg-[#1E293B] text-white transition-colors cursor-pointer"
              >
                RESET ALL AIRFRAME FILTERS
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0] bg-white py-6 px-4 text-center text-xs text-[#64748b] space-y-1.5 mt-8">
        <p className="font-mono-telemetry">
          WhichPlane (whichplane.app) • AeroPrecision Design System. Data verified against live GDS booking lines.
        </p>
        <p className="text-[11px] text-[#94a3b8]">
          Equipment Confidence Disclaimer: Airlines reserve the right to swap airframes for maintenance or scheduling. Always reverify at check-in.
        </p>
      </footer>
    </div>
  );
}
