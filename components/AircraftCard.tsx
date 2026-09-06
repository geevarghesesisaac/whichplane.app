'use client';

import React from 'react';
import Link from 'next/link';
import { AircraftType } from '@/lib/types';
import { Wind, Plane, Sparkles, ChevronRight, Gauge } from 'lucide-react';

interface AircraftCardProps {
  aircraft: AircraftType;
}

export default function AircraftCard({ aircraft }: AircraftCardProps) {
  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/30 p-5 backdrop-blur-xl shadow-xl transition-all duration-200 hover:shadow-sky-500/10 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {aircraft.manufacturer} • {aircraft.bodyType}
          </span>
          {aircraft.isComposite ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Wind className="w-3 h-3" />
              Composite Fuselage
            </span>
          ) : aircraft.productionStatus === 'discontinued' ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
              Discontinued Giant
            </span>
          ) : (
            <span className="text-[10px] font-medium text-slate-400">
              In Production
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-white group-hover:text-sky-400 transition-colors mb-1">
          {aircraft.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mb-4">
          {aircraft.whyFlyThis}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Gauge className="w-3 h-3 text-sky-400" />
              <span className="text-[10px] font-medium">Cabin Alt</span>
            </div>
            <span className="font-bold text-white">
              {aircraft.cabinAltitudeFt ? `${aircraft.cabinAltitudeFt.toLocaleString()} ft` : '8,000 ft'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Plane className="w-3 h-3 text-sky-400" />
              <span className="text-[10px] font-medium">Config</span>
            </div>
            <span className="font-bold text-white truncate block">
              {aircraft.aisles === 2 ? 'Twin Aisle' : 'Single Aisle'}
            </span>
          </div>
        </div>

        {/* Primary Airlines */}
        {aircraft.primaryAirlines && aircraft.primaryAirlines.length > 0 && (
          <div className="mb-4">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1.5">
              Key Operators:
            </span>
            <div className="flex flex-wrap gap-1">
              {aircraft.primaryAirlines.slice(0, 4).map(airline => (
                <span
                  key={airline}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {airline}
                </span>
              ))}
              {aircraft.primaryAirlines.length > 4 && (
                <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                  +{aircraft.primaryAirlines.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono">IATA: {aircraft.id}</span>
        <Link
          href={`/aircraft/${aircraft.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
        >
          <span>View Avgeek Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
