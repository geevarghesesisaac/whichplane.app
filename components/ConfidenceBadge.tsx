'use client';

import React, { useState } from 'react';
import { ShieldCheck, Info, HelpCircle } from 'lucide-react';
import { AircraftConfidence } from '@/lib/types';

interface ConfidenceBadgeProps {
  confidence: AircraftConfidence;
  note?: string;
  aircraftName: string;
  percent?: number;
}

export default function ConfidenceBadge({ confidence, note, aircraftName, percent }: ConfidenceBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isConfirmed = confidence === 'confirmed_at_search_time';

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowTooltip(!showTooltip);
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono-telemetry text-[11px] font-bold border transition-colors cursor-pointer tracking-[0.03em] ${
          isConfirmed
            ? 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0] hover:bg-[#d1fae5]'
            : 'bg-[#fffbeb] text-[#92400e] border-[#fde68a] hover:bg-[#fef3c7]'
        }`}
        title="Click to learn about aircraft equipment confidence"
      >
        {isConfirmed ? (
          <ShieldCheck className="w-3.5 h-3.5 text-[#059669] shrink-0" />
        ) : (
          <HelpCircle className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
        )}
        <span>
          {isConfirmed
            ? percent ? `${percent}% Confirmed` : 'Confirmed at Search'
            : 'Typically Operates'}
        </span>
        <Info className="w-3 h-3 opacity-60 ml-0.5 shrink-0" />
      </button>

      {showTooltip && (
        <div 
          className="absolute z-50 bottom-full mb-2 right-0 sm:left-0 sm:right-auto w-72 sm:w-80 p-3.5 rounded-xl bg-[#0F172A] text-white border border-[#334155] shadow-2xl text-left pointer-events-none transition-opacity"
        >
          <div className="flex items-start gap-2.5">
            <div className={`p-1.5 rounded-lg ${isConfirmed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-100 mb-1">
                {isConfirmed ? 'Live Airline Stated Equipment' : 'Historical Schedule Estimate'}
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isConfirmed
                  ? `The airline has currently assigned a ${aircraftName} for this specific flight and date in their booking system.`
                  : note || `This flight historically operates with a ${aircraftName}, though live operational assignments may fluctuate.`}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>⚠️ Note: Airlines may swap equipment for operational reasons prior to departure.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
