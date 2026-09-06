'use client';

import React from 'react';
import Link from 'next/link';
import { AircraftType } from '@/lib/types';
import { Wind, Plane, ChevronRight, Gauge } from 'lucide-react';

interface AircraftCardProps {
  aircraft: AircraftType;
}

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  return (
    <div className="rounded-xl bg-white border border-[#e2e8f0] hover:border-[#0284c7]/40 p-5 shadow-xs transition-all duration-200 hover:shadow-md flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-[0.06em] font-extrabold px-2 py-0.5 rounded bg-[#eff4ff] text-[#0284c7] font-mono-telemetry border border-[#dce9ff]">
            {aircraft.manufacturer} • {aircraft.bodyType}
          </span>
          {aircraft.isComposite ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] tracking-[0.04em]">
              <Wind className="w-3 h-3" />
              Composite Fuselage
            </span>
          ) : aircraft.productionStatus === 'discontinued' ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] border border-[#fde68a] tracking-[0.04em]">
              Discontinued Giant
            </span>
          ) : (
            <span className="text-[10px] font-medium text-[#64748b] tracking-[0.04em]">
              In Production
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#0284c7] transition-colors mb-1 font-headline tracking-[0.01em]">
          {aircraft.name}
        </h3>
        <p className="text-xs text-[#45464d] line-clamp-2 mb-4 font-body leading-relaxed">
          {aircraft.whyFlyThis}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs">
            <div className="flex items-center gap-1 text-[#64748b] mb-0.5">
              <Gauge className="w-3 h-3 text-[#0284c7]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.05em] font-mono-telemetry">Cabin Alt</span>
            </div>
            <span className="font-bold text-[#0b1c30] font-mono-telemetry tracking-[0.02em]">
              {aircraft.cabinAltitudeFt ? `${aircraft.cabinAltitudeFt.toLocaleString()} ft` : '8,000 ft'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] text-xs">
            <div className="flex items-center gap-1 text-[#64748b] mb-0.5">
              <Plane className="w-3 h-3 text-[#0284c7]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.05em] font-mono-telemetry">Config</span>
            </div>
            <span className="font-bold text-[#0b1c30] truncate block font-mono-telemetry tracking-[0.02em]">
              {aircraft.aisles === 2 ? 'Twin Aisle' : 'Single Aisle'}
            </span>
          </div>
        </div>

        {/* Primary Airlines */}
        {aircraft.primaryAirlines && aircraft.primaryAirlines.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] uppercase font-bold text-[#64748b] block mb-1.5 tracking-[0.06em] font-mono-telemetry">
              Key Operators:
            </span>
            <div className="flex flex-wrap gap-1">
              {aircraft.primaryAirlines.slice(0, 4).map(airline => (
                <span
                  key={airline}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-[#f8f9ff] border border-[#e2e8f0] text-[#0b1c30] font-mono-telemetry tracking-[0.02em]"
                >
                  {airline}
                </span>
              ))}
              {aircraft.primaryAirlines.length > 4 && (
                <span className="text-[11px] px-1.5 py-0.5 text-[#64748b] font-mono-telemetry">
                  +{aircraft.primaryAirlines.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
        <span className="text-xs text-[#64748b] font-ocr tracking-[0.06em]">IATA: {aircraft.id}</span>
        <Link
          href={`/aircraft/${aircraft.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:underline font-mono-telemetry tracking-[0.03em]"
        >
          <span>View Avgeek Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
