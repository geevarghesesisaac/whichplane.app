'use client';

import React from 'react';
import { X, Sparkles, Wind, Gauge, Armchair, ShieldCheck } from 'lucide-react';
import { AircraftType } from '@/lib/types';

interface SeatMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  aircraft: AircraftType;
  airlineName: string;
  flightNumber: string;
}

export default function SeatMapModal({
  isOpen,
  onClose,
  aircraft,
  airlineName,
  flightNumber
}: SeatMapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Armchair className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{aircraft.name}</h3>
                {aircraft.isComposite && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Composite Cabin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {airlineName} • Flight {flightNumber} • {aircraft.seatingTypicalLayout || 'Typical passenger config'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Environmental Cabin Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Cabin Pressurization</span>
                <span className="text-xs font-bold text-white">
                  {aircraft.cabinAltitudeFt ? `~${aircraft.cabinAltitudeFt.toLocaleString()} ft` : '8,000 ft standard'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Cabin Humidity</span>
                <span className="text-xs font-bold text-white">
                  {aircraft.humidityPercent || '10-15%'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Armchair className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Aisles & Configuration</span>
                <span className="text-xs font-bold text-white">
                  {aircraft.aisles === 2 ? 'Twin Aisle (Widebody)' : 'Single Aisle (Narrowbody)'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Cabin Cross-Section Visualizer */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-4">
              Fuselage Cross-Section & Seat Geometry
            </span>

            {/* A380 Double Deck Visualizer */}
            {aircraft.family === 'A380' && (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                  <div className="text-xs font-semibold text-indigo-300 mb-2">Upper Deck (2 - 4 - 2 / Premium)</div>
                  <div className="flex justify-center gap-2 items-center text-xs font-mono">
                    <div className="flex gap-1 bg-slate-800 p-1.5 rounded"><span>💺</span><span>💺</span></div>
                    <div className="text-[10px] text-slate-500">AISLE</div>
                    <div className="flex gap-1 bg-slate-800 p-1.5 rounded"><span>💺</span><span>💺</span><span>💺</span><span>💺</span></div>
                    <div className="text-[10px] text-slate-500">AISLE</div>
                    <div className="flex gap-1 bg-slate-800 p-1.5 rounded"><span>💺</span><span>💺</span></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 mb-2">Main Deck (3 - 4 - 3 / Vast Cabin)</div>
                  <div className="flex justify-center gap-1.5 items-center text-xs font-mono">
                    <div className="flex gap-1 bg-slate-800 p-1.5 rounded"><span>💺</span><span>💺</span><span>💺</span></div>
                    <div className="text-[10px] text-slate-500">AISLE</div>
                    <div className="flex gap-1 bg-slate-800 p-1.5 rounded"><span>💺</span><span>💺</span><span>💺</span><span>💺</span></div>
                    <div className="text-[10px] text-slate-500">AISLE</div>
                    <div className="flex gap-1 bg-slate-800 p-1.5 rounded"><span>💺</span><span>💺</span><span>💺</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* A350 / 787 3-3-3 Widebody Visualizer */}
            {(aircraft.family === 'A350' || aircraft.family === '787 Dreamliner' || aircraft.family === '777') && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-md mx-auto">
                <div className="text-xs font-semibold text-slate-300 mb-3">
                  Twin-Aisle Widebody (3 - 3 - 3 Layout)
                </div>
                <div className="flex justify-center gap-3 items-center text-xs font-mono">
                  <div className="flex gap-1.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                    <span title="Window">💺</span><span>💺</span><span title="Aisle">💺</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">AISLE</div>
                  <div className="flex gap-1.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                    <span title="Aisle">💺</span><span>💺</span><span title="Aisle">💺</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">AISLE</div>
                  <div className="flex gap-1.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                    <span title="Aisle">💺</span><span>💺</span><span title="Window">💺</span>
                  </div>
                </div>
                {aircraft.family === 'A350' && (
                  <p className="text-[11px] text-sky-300 mt-3">
                    ✨ Airbus Airspace: 221-inch width allows full 18-inch seat width even in 9-abreast coach.
                  </p>
                )}
                {aircraft.family === '787 Dreamliner' && (
                  <p className="text-[11px] text-sky-300 mt-3">
                    ✨ Dreamliner: Electrochromic dimmable windows are 65% larger than standard airliners.
                  </p>
                )}
              </div>
            )}

            {/* A330 2-4-2 Visualizer */}
            {aircraft.family === 'A330' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-md mx-auto">
                <div className="text-xs font-semibold text-emerald-300 mb-2">
                  ✨ Avgeek Favorite: 2 - 4 - 2 Eight-Abreast Layout
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Couples never have a stranger between them, and 75% of all seats are either window or aisle.
                </p>
                <div className="flex justify-center gap-3 items-center text-xs font-mono">
                  <div className="flex gap-1.5 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                    <span title="Window">💺</span><span title="Aisle">💺</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">AISLE</div>
                  <div className="flex gap-1.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                    <span>💺</span><span>💺</span><span>💺</span><span>💺</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">AISLE</div>
                  <div className="flex gap-1.5 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                    <span title="Aisle">💺</span><span title="Window">💺</span>
                  </div>
                </div>
              </div>
            )}

            {/* Single Aisle (3-3 or 2-3) */}
            {(aircraft.bodyType === 'narrowbody' || aircraft.bodyType === 'regional') && aircraft.family !== 'A330' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-md mx-auto">
                <div className="text-xs font-semibold text-slate-300 mb-3">
                  {aircraft.family === 'A220' ? '2 - 3 Layout (80% Window or Aisle)' : 'Standard Single Aisle (3 - 3 Layout)'}
                </div>
                <div className="flex justify-center gap-4 items-center text-xs font-mono">
                  <div className="flex gap-1.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                    <span title="Window">💺</span>
                    {aircraft.family !== 'A220' && <span>💺</span>}
                    <span title="Aisle">💺</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">AISLE</div>
                  <div className="flex gap-1.5 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                    <span title="Aisle">💺</span><span>💺</span><span title="Window">💺</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Avgeek Intelligence & Notes */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Avgeek Notes: {aircraft.name}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {aircraft.whyFlyThis}
            </p>
            {aircraft.funFacts && aircraft.funFacts.length > 0 && (
              <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 pt-1">
                {aircraft.funFacts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Exact seat selection is finalized on the airline website during booking.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
