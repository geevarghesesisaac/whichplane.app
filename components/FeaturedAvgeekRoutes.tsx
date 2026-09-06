'use client';

import React from 'react';

interface FeaturedAvgeekRoutesProps {
  onSelectRoute: (origin: string, destination: string) => void;
}

export default function FeaturedAvgeekRoutes({ onSelectRoute }: FeaturedAvgeekRoutesProps) {
  return (
    <section className="space-y-3 pt-6 border-t border-[#e2e8f0]">
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="font-mono-telemetry text-xs font-bold text-[#0284c7] uppercase tracking-[0.08em] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            FEATURED AVGEEK FLIGHT LINES
          </span>
          <p className="text-xs text-[#64748b] mt-0.5">
            Pre-configured flagship airframe routes with verified equipment data.
          </p>
        </div>
        <span className="font-mono-telemetry text-[11px] text-[#64748b] hidden sm:inline">
          1-Click Airframe Loader
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Queen of the Skies 747-8 */}
        <div
          onClick={() => onSelectRoute('FRA', 'JFK')}
          className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3.5 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
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
            <p className="text-[11px] text-[#64748b] line-clamp-2 mt-1">
              Lufthansa 4-engine flagship with iconic upper-deck hump.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
            <span>Load 747-8 Route</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </div>

        {/* Card 2: Superjumbo A380 */}
        <div
          onClick={() => onSelectRoute('DXB', 'LHR')}
          className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3.5 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
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
            <p className="text-[11px] text-[#64748b] line-clamp-2 mt-1">
              Emirates double-deck giant with whisper-quiet 59 dB acoustic cabin.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
            <span>Load A380 Route</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </div>

        {/* Card 3: Project Sunrise A350-1000 */}
        <div
          onClick={() => onSelectRoute('JFK', 'LHR')}
          className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3.5 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
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
            <p className="text-[11px] text-[#64748b] line-clamp-2 mt-1">
              Virgin Atlantic & British Airways 53% carbon-fiber airframe.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
            <span>Load A350 Route</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </div>

        {/* Card 4: Pacific Dreamliner 787-9 */}
        <div
          onClick={() => onSelectRoute('SFO', 'SIN')}
          className="group bg-white hover:bg-[#eff4ff] border border-[#e2e8f0] hover:border-[#0284c7] p-3.5 rounded-xl transition-all shadow-xs cursor-pointer flex flex-col justify-between"
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
            <p className="text-[11px] text-[#64748b] line-clamp-2 mt-1">
              United Airlines transpacific sector with 25% humidity air conditioning.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-[11px] font-mono-telemetry text-[#0284c7] font-bold">
            <span>Load 787-9 Route</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </div>
      </div>
    </section>
  );
}
