'use client';

import React, { useState } from 'react';
import { AircraftType } from '@/lib/types';
import { CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface AircraftCabinSchematicProps {
  aircraft: AircraftType;
}

export default function AircraftCabinSchematic({ aircraft }: AircraftCabinSchematicProps) {
  const isDoubleDeck = aircraft.id === '380' || aircraft.id === '748';
  const [activeDeck, setActiveDeck] = useState<'upper' | 'main'>(isDoubleDeck ? 'upper' : 'main');

  // Specific dimensions based on aircraft
  const getDeckSpecs = () => {
    if (aircraft.id === '380') {
      if (activeDeck === 'upper') {
        return {
          title: 'Upper Deck Sanctuaries',
          subtitle: 'Hosts onboard shower spas (Emirates), cocktail lounges, and 1-2-1 direct-aisle suites.',
          width: '5.92 m',
          layout: '1-2-1 / 2-4-2',
          cabinAlt: '6,100 ft',
          icon: 'bathtub',
          seatConfig: [
            ['A', 'B'],
            ['D', 'E', 'F', 'G'],
            ['J', 'K']
          ],
          recommendedRow: 'Row 12 — Forward quiet sanctuary, zero galley noise.',
          cautionRow: 'Row 26 — Last row before aft galley and spiral staircase.'
        };
      } else {
        return {
          title: 'Main Widebody Hull',
          subtitle: 'The widest passenger cabin in aviation history. 10-abreast Economy with 18.5" seat pans.',
          width: '6.54 m',
          layout: '3-4-3 Coach',
          cabinAlt: '6,100 ft',
          icon: 'airline_seat_flat',
          seatConfig: [
            ['A', 'B', 'C'],
            ['D', 'E', 'F', 'G'],
            ['H', 'J', 'K']
          ],
          recommendedRow: 'Row 41 — Emergency exit door row with infinite forward legroom.',
          cautionRow: 'Row 88 — Aft taper recline limit near main rear lavatories.'
        };
      }
    } else if (aircraft.id === '748') {
      if (activeDeck === 'upper') {
        return {
          title: 'Upper Deck Hump Sanctuary',
          subtitle: 'Legendary private cabin with 2-2 executive business seating and extra side-wall storage bins.',
          width: '3.42 m',
          layout: '2-2 Executive',
          cabinAlt: '7,000 ft',
          icon: 'stars',
          seatConfig: [
            ['A', 'C'],
            ['H', 'K']
          ],
          recommendedRow: 'Row 84 — Pure private aviation feel, whisper quiet forward of engines.',
          cautionRow: 'Row 88 — Directly ahead of upper deck crew staircase.'
        };
      } else {
        return {
          title: 'Main Deck & Nose Cone',
          subtitle: 'Iconic widebody hull. Sitting in Row 1 puts you ahead of the cockpit captain!',
          width: '6.13 m',
          layout: '3-4-3 Main / 1-1 Nose',
          cabinAlt: '7,000 ft',
          icon: 'airline_seat_flat',
          seatConfig: [
            ['A', 'B', 'C'],
            ['D', 'E', 'F', 'G'],
            ['H', 'J', 'K']
          ],
          recommendedRow: 'Row 1 (Nose Cone) — Ahead of the pilots, extreme quiet and panoramic view.',
          cautionRow: 'Row 53 — Wing box obstruction restricts downward sightseeing.'
        };
      }
    } else if (aircraft.id === '339') {
      return {
        title: 'Airspace 2-4-2 Twin-Aisle Architecture',
        subtitle: 'Celebrated as the most passenger-friendly widebody layout: no stranger trapped between pairs.',
        width: '5.28 m',
        layout: '2-4-2 No Middle-Seat Pairs',
        cabinAlt: '7,000 ft',
        icon: 'favorite',
        seatConfig: [
          ['A', 'C'],
          ['D', 'E', 'F', 'G'],
          ['H', 'K']
        ],
        recommendedRow: 'Rows 14-16 — Window pairs ideal for couples with 18-inch cushion width.',
        cautionRow: 'Row 42 — Middle quad adjacent to rear lavatory queue.'
      };
    } else if (aircraft.bodyType === 'narrowbody') {
      return {
        title: `${aircraft.shortName} Single-Aisle Architecture`,
        subtitle: `${aircraft.name} configured with high-aspect sculpted sidewalls and modern LED lighting.`,
        width: '3.53 m',
        layout: '3-3 Single Aisle',
        cabinAlt: `${aircraft.cabinAltitudeFt?.toLocaleString() || '7,500'} ft`,
        icon: 'airline_seat_recline_extra',
        seatConfig: [
          ['A', 'B', 'C'],
          ['D', 'E', 'F']
        ],
        recommendedRow: 'Row 14 — Overwing emergency exit row with expanded 36" pitch.',
        cautionRow: 'Last Row — Fixed bulkhead with zero seat recline and engine acoustics.'
      };
    } else {
      // Standard Twin Aisle Widebody (A350, 787, 777)
      return {
        title: `${aircraft.family} Widebody Architecture`,
        subtitle: `${aircraft.name} featuring ${aircraft.compositePercent || 'advanced composite design'} and ultra-quiet cabin acoustics.`,
        width: aircraft.id.startsWith('77') ? '5.87 m' : '5.61 m',
        layout: aircraft.seatingTypicalLayout || '3-3-3 Cross-Section',
        cabinAlt: `${aircraft.cabinAltitudeFt?.toLocaleString() || '6,000'} ft`,
        icon: 'spa',
        seatConfig: [
          ['A', 'B', 'C'],
          ['D', 'E', 'F'],
          ['H', 'J', 'K']
        ],
        recommendedRow: 'Row 45 — Bulkhead with unbounded leg extension and immediate meal service.',
        cautionRow: 'Row 61 — Fuselage curvature creates blank window pane.'
      };
    }
  };

  const deckSpecs = getDeckSpecs();

  return (
    <div className="instrument-card p-5 sm:p-6 rounded-2xl bg-white flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="font-mono-telemetry text-[10px] uppercase font-bold tracking-wider text-sky-700 block">
            CROSS-SECTION SCHEMATIC
          </span>
          <h3 className="font-headline text-lg sm:text-xl font-bold text-slate-900">
            {isDoubleDeck ? 'Dual-Deck Architecture' : 'Cabin Cross-Section Schematic'}
          </h3>
        </div>

        {isDoubleDeck && (
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveDeck('upper')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-telemetry font-bold transition-all ${
                activeDeck === 'upper'
                  ? 'bg-white text-sky-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upper Deck
            </button>
            <button
              onClick={() => setActiveDeck('main')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-telemetry font-bold transition-all ${
                activeDeck === 'main'
                  ? 'bg-white text-sky-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Main Deck
            </button>
          </div>
        )}
      </div>

      {/* Active Deck Overview Pill */}
      <div className="flex items-start gap-3 p-3.5 bg-sky-50/60 rounded-xl border border-sky-100">
        <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Layers className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-900 font-headline">{deckSpecs.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{deckSpecs.subtitle}</p>
        </div>
      </div>

      {/* Geometry Telemetry Row */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="font-mono-telemetry text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            USABLE WIDTH
          </span>
          <span className="font-mono-telemetry text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
            {deckSpecs.width}
          </span>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="font-mono-telemetry text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            TYPICAL LAYOUT
          </span>
          <span className="font-mono-telemetry text-sm sm:text-base font-bold text-sky-700 mt-0.5 block truncate">
            {deckSpecs.layout}
          </span>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <span className="font-mono-telemetry text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            EFFECTIVE CABIN ALT
          </span>
          <span className="font-mono-telemetry text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
            {deckSpecs.cabinAlt}
          </span>
        </div>
      </div>

      {/* Interactive Cabin Cross-Section Visual */}
      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
        <div className="text-center mb-3">
          <span className="font-mono-telemetry text-[10px] uppercase font-bold tracking-wider text-slate-500">
            TRANSVERSE CROSS-SECTION (REAR LOOKING FORWARD)
          </span>
        </div>

        <div className="flex justify-center items-center gap-2 sm:gap-4 py-3 px-2 bg-white rounded-xl border border-slate-200/80 shadow-inner overflow-x-auto">
          {deckSpecs.seatConfig.map((group, gIdx) => (
            <React.Fragment key={gIdx}>
              <div className="flex gap-1 sm:gap-1.5 shrink-0">
                {group.map((seatLetter) => (
                  <div
                    key={seatLetter}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 border border-sky-200/80 flex items-center justify-center font-mono-telemetry text-xs font-bold text-sky-950 shadow-xs hover:bg-sky-600 hover:text-white transition-colors cursor-default"
                    title={`Seat Column ${seatLetter}`}
                  >
                    {seatLetter}
                  </div>
                ))}
              </div>
              {gIdx < deckSpecs.seatConfig.length - 1 && (
                <div className="px-1 flex flex-col items-center justify-center text-slate-300">
                  <div className="w-0.5 h-7 sm:h-8 bg-slate-300 border-dashed" />
                  <span className="font-mono-telemetry text-[9px] text-slate-500 font-bold uppercase tracking-[0.08em] mt-1">
                    AISLE
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Expert AvGeek Seat Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-emerald-950 block font-headline">Recommended Row</span>
            <span className="text-emerald-800 leading-snug mt-0.5 block">{deckSpecs.recommendedRow}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-950 block font-headline">Caution Row</span>
            <span className="text-amber-800 leading-snug mt-0.5 block">{deckSpecs.cautionRow}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
