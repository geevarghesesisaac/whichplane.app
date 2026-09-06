'use client';

import React, { useState } from 'react';
import { ShieldCheck, Info, HelpCircle } from 'lucide-react';
import { AircraftConfidence } from '@/lib/types';

interface ConfidenceBadgeProps {
  confidence: AircraftConfidence;
  note?: string;
  aircraftName: string;
}

export default function ConfidenceBadge({ confidence, note, aircraftName }: ConfidenceBadgeProps) {
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
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
          isConfirmed
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
        }`}
        title="Click to learn about aircraft equipment confidence"
      >
        {isConfirmed ? (
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
        )}
        <span>{isConfirmed ? 'Confirmed at Search' : 'Typically Operates'}</span>
        <Info className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {showTooltip && (
        <div 
          className="absolute z-50 bottom-full mb-2 left-0 w-72 sm:w-80 p-3.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-2xl text-left pointer-events-none transition-opacity"
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
                  : note || `This flight number historically operates with a ${aircraftName}, though live assignment may fluctuate.`}
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
