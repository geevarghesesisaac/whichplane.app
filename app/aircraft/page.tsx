'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { AIRCRAFT_DATABASE } from '@/data/aircraft';
import Link from 'next/link';

export default function FleetRadarPage() {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allAirframes = Object.values(AIRCRAFT_DATABASE);

  const filtered = allAirframes.filter(a => {
    if (selectedManufacturer !== 'all' && a.manufacturer !== selectedManufacturer) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.shortName.toLowerCase().includes(q) ||
        a.family.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.icaoCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header & Radar Pulse */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#0284c7] -ml-4" />
              <span className="font-mono-telemetry text-xs font-bold text-[#0284c7] uppercase tracking-[0.06em] pl-1">
                RADAR SPECTRUM LIVE
              </span>
            </div>
            <span className="font-mono-telemetry text-xs text-[#64748b] bg-[#eff4ff] border border-[#dce9ff] px-2.5 py-1 rounded tracking-[0.02em]">
              9,412 ACTIVE AIRFRAMES MONITORED
            </span>
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#0b1c30] tracking-normal leading-snug">
              Fleet Radar & Aircraft Taxonomy
            </h1>
            <p className="font-body text-xs sm:text-sm text-[#45464d] leading-relaxed mt-1">
              Discover where your bucket-list aircraft fly worldwide and hunt rare cabin architectures.
            </p>
          </div>
        </div>

        {/* Radar Telemetry Scope Visual Widget */}
        <div className="rounded-xl bg-white border border-[#e2e8f0] p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0284c7] text-[20px]">explore</span>
              <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30] uppercase tracking-[0.08em]">
                GLOBAL FLEET COVERAGE METRICS
              </span>
            </div>
            <span className="font-mono-telemetry text-xs font-bold text-[#0284c7] tracking-[0.04em]">
              ICAO // EN-ROUTE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#eff4ff] border border-[#dce9ff] p-3 rounded-lg flex flex-col">
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-[0.06em]">
                SUPERJUMBOS ACTIVE
              </span>
              <span className="font-display text-2xl font-bold text-[#0b1c30] mt-0.5 tracking-normal font-tabular">142</span>
              <span className="font-mono-telemetry text-xs text-[#0284c7] font-semibold tracking-[0.02em]">
                Airbus A380 + Boeing 747-8
              </span>
            </div>

            <div className="bg-[#eff4ff] border border-[#dce9ff] p-3 rounded-lg flex flex-col">
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-[0.06em]">
                COMPOSITE WIDEBODIES
              </span>
              <span className="font-display text-2xl font-bold text-[#0b1c30] mt-0.5 tracking-normal font-tabular">1,894</span>
              <span className="font-mono-telemetry text-xs text-[#0284c7] font-semibold tracking-[0.02em]">
                Airbus A350 + Boeing 787
              </span>
            </div>

            <div className="bg-[#eff4ff] border border-[#dce9ff] p-3 rounded-lg flex flex-col">
              <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase">
                FRIENDLY GEOMETRY (2-4-2)
              </span>
              <span className="font-display text-2xl font-bold text-[#0b1c30] mt-0.5">380</span>
              <span className="font-mono-telemetry text-xs text-[#0284c7] font-semibold">
                Airbus A330neo (Zero Middle Pairs)
              </span>
            </div>
          </div>
        </div>

        {/* Bucket List Aircraft Carousel / Showcase */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0284c7] text-[20px]">military_tech</span>
              <h2 className="font-headline text-base font-bold text-[#0b1c30]">
                AvGeek Bucket List Airframes
              </h2>
            </div>
            <span className="font-mono-telemetry text-xs text-[#64748b]">
              FLAGSHIP JETS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: A380 */}
            <div className="rounded-xl bg-white border border-[#e2e8f0] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#0284c7] transition-all">
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={AIRCRAFT_DATABASE['380'].heroImageUrl}
                  alt="Airbus A380"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#fef3c7] text-[#b45309] font-mono-telemetry text-[9px] font-bold uppercase">
                    DOUBLE-DECKER
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/90 text-[#0284c7] font-mono-telemetry text-[9px] font-bold">
                    A388
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-headline text-base font-bold">Airbus A380-800</h3>
                  <p className="text-xs text-slate-200">59 dB whisper quiet ambient</p>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-[#45464d] line-clamp-2">
                  {AIRCRAFT_DATABASE['380'].whyFlyThis}
                </p>
                <Link
                  href="/aircraft/380"
                  className="w-full py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-headline text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Explore A380 Profile</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Card 2: 747-8 */}
            <div className="rounded-xl bg-white border border-[#e2e8f0] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#0284c7] transition-all">
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={AIRCRAFT_DATABASE['748'].heroImageUrl}
                  alt="Boeing 747-8"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#fef3c7] text-[#b45309] font-mono-telemetry text-[9px] font-bold uppercase">
                    QUEEN OF SKIES
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/90 text-[#0284c7] font-mono-telemetry text-[9px] font-bold">
                    B748
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-headline text-base font-bold">Boeing 747-8i</h3>
                  <p className="text-xs text-slate-200">Upper Deck Hump & Nose Cone</p>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-[#45464d] line-clamp-2">
                  {AIRCRAFT_DATABASE['748'].whyFlyThis}
                </p>
                <Link
                  href="/aircraft/748"
                  className="w-full py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-headline text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Explore 747-8 Profile</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Card 3: A350-1000 */}
            <div className="rounded-xl bg-white border border-[#e2e8f0] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#0284c7] transition-all">
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={AIRCRAFT_DATABASE['351'].heroImageUrl}
                  alt="Airbus A350-1000"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#ecfdf5] text-[#047857] font-mono-telemetry text-[9px] font-bold uppercase">
                    5,800FT CABIN
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/90 text-[#0284c7] font-mono-telemetry text-[9px] font-bold">
                    A35K
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-headline text-base font-bold">Airbus A350-1000</h3>
                  <p className="text-xs text-slate-200">53% Carbon Composite Flagship</p>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-[#45464d] line-clamp-2">
                  {AIRCRAFT_DATABASE['351'].whyFlyThis}
                </p>
                <Link
                  href="/aircraft/351"
                  className="w-full py-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-headline text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Explore A350 Profile</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search & All Aircraft Catalog */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <span className="material-symbols-outlined text-[#64748b] text-[18px] absolute left-3 top-2.5">
                search
              </span>
              <input
                type="text"
                placeholder="Search by airframe, ICAO, variant or manufacturer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-[#cbd5e1] font-mono-telemetry text-xs focus:outline-none focus:border-[#0284c7]"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {['all', 'Airbus', 'Boeing'].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedManufacturer(m)}
                  className={`px-3 py-1.5 rounded-md font-mono-telemetry text-xs font-bold uppercase transition-colors cursor-pointer ${
                    selectedManufacturer === m
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-white border border-[#cbd5e1] text-[#45464d] hover:text-[#0b1c30]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map(a => (
              <div
                key={a.id}
                className="bg-white rounded-xl border border-[#e2e8f0] p-4 shadow-xs hover:border-[#0284c7] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-telemetry text-[10px] font-bold text-[#0284c7] uppercase">
                      {a.manufacturer} • {a.icaoCode}
                    </span>
                    <span className="font-mono-telemetry text-[10px] font-semibold text-[#64748b]">
                      {a.bodyType.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-headline text-sm font-bold text-[#0b1c30]">
                    {a.name}
                  </h4>
                  <p className="text-xs text-[#45464d] mt-1 line-clamp-2">
                    {a.whyFlyThis}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30]">
                    {a.cabinAltitudeFt ? `${a.cabinAltitudeFt.toLocaleString()} ft alt` : '8,000 ft'}
                  </span>
                  <Link
                    href={`/aircraft/${a.id}`}
                    className="font-mono-telemetry text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-0.5"
                  >
                    <span>View Specs</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
