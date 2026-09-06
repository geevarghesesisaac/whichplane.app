'use client';

import React from 'react';
import { FilterState, Manufacturer } from '@/lib/types';
import { ShieldAlert, Sparkles, Wind, SlidersHorizontal, Plane, Check, ArrowUpDown } from 'lucide-react';

interface AircraftFilterPanelProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  totalResults: number;
  filteredResults: number;
}

export default function AircraftFilterPanel({
  filters,
  onChange,
  totalResults,
  filteredResults
}: AircraftFilterPanelProps) {
  const toggleQuickFilter = (key: keyof FilterState) => {
    onChange({
      ...filters,
      [key]: !filters[key]
    });
  };

  const toggleManufacturer = (m: Manufacturer) => {
    const exists = filters.manufacturers.includes(m);
    onChange({
      ...filters,
      manufacturers: exists
        ? filters.manufacturers.filter(x => x !== m)
        : [...filters.manufacturers, m]
    });
  };

  const toggleFamily = (fam: string) => {
    const exists = filters.families.includes(fam);
    onChange({
      ...filters,
      families: exists
        ? filters.families.filter(x => x !== fam)
        : [...filters.families, fam]
    });
  };

  const clearAllFilters = () => {
    onChange({
      manufacturers: [],
      families: [],
      bodyTypes: [],
      compositeOnly: false,
      excludeBoeing737Max: false,
      chaseA380Or747: false,
      newGenOnly: false,
      maxStops: null,
      maxPrice: null,
      selectedAirlines: [],
      sortBy: 'price_asc'
    });
  };

  const hasActiveFilters =
    filters.compositeOnly ||
    filters.excludeBoeing737Max ||
    filters.chaseA380Or747 ||
    filters.newGenOnly ||
    filters.manufacturers.length > 0 ||
    filters.families.length > 0 ||
    filters.bodyTypes.length > 0;

  const popularFamilies = [
    { id: 'A380', label: 'Airbus A380', icon: '👑' },
    { id: 'A350', label: 'Airbus A350', icon: '✨' },
    { id: '787 Dreamliner', label: 'Boeing 787', icon: '🌿' },
    { id: '777', label: 'Boeing 777', icon: '✈️' },
    { id: '747 Queen of the Skies', label: 'Boeing 747', icon: '👑' },
    { id: 'A330', label: 'Airbus A330 (2-4-2)', icon: '🛋️' },
    { id: 'A320neo', label: 'A320neo / XLR', icon: '⚡' },
    { id: 'A220', label: 'Airbus A220', icon: '🌟' },
    { id: '737 MAX', label: 'Boeing 737 MAX', icon: '⚠️' }
  ];

  return (
    <div className="space-y-4">
      {/* Quick Power Filters Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Aircraft Super-Filters
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing <strong className="text-sky-400">{filteredResults}</strong> of {totalResults} flights
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Exclude 737 MAX */}
          <button
            type="button"
            onClick={() => toggleQuickFilter('excludeBoeing737Max')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
              filters.excludeBoeing737Max
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <ShieldAlert className={`w-4 h-4 shrink-0 ${filters.excludeBoeing737Max ? 'text-amber-400' : 'text-slate-400'}`} />
            <div>
              <span className="block leading-tight">Exclude 737 MAX</span>
              <span className="text-[10px] text-slate-400 font-normal">Avoid MAX airframes</span>
            </div>
          </button>

          {/* Composite Only */}
          <button
            type="button"
            onClick={() => toggleQuickFilter('compositeOnly')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
              filters.compositeOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Wind className={`w-4 h-4 shrink-0 ${filters.compositeOnly ? 'text-emerald-400' : 'text-slate-400'}`} />
            <div>
              <span className="block leading-tight">Composite Cabin Only</span>
              <span className="text-[10px] text-slate-400 font-normal">787 & A350 lower jet lag</span>
            </div>
          </button>

          {/* Chase A380 & 747 */}
          <button
            type="button"
            onClick={() => toggleQuickFilter('chaseA380Or747')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
              filters.chaseA380Or747
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Sparkles className={`w-4 h-4 shrink-0 ${filters.chaseA380Or747 ? 'text-indigo-400' : 'text-slate-400'}`} />
            <div>
              <span className="block leading-tight">A380 & 747 Hunters</span>
              <span className="text-[10px] text-slate-400 font-normal">Fly the iconic giants</span>
            </div>
          </button>

          {/* Widebody Only */}
          <button
            type="button"
            onClick={() => {
              const wideSelected = filters.bodyTypes.includes('widebody');
              onChange({
                ...filters,
                bodyTypes: wideSelected ? [] : ['widebody']
              });
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
              filters.bodyTypes.includes('widebody')
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-lg shadow-sky-500/10'
                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Plane className={`w-4 h-4 shrink-0 ${filters.bodyTypes.includes('widebody') ? 'text-sky-400' : 'text-slate-400'}`} />
            <div>
              <span className="block leading-tight">Widebody Only</span>
              <span className="text-[10px] text-slate-400 font-normal">Twin-aisle comfort</span>
            </div>
          </button>
        </div>

        {/* Detailed Family & Manufacturer Chips */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Airframe:</span>
          {popularFamilies.map(fam => {
            const isSelected = filters.families.includes(fam.id);
            return (
              <button
                key={fam.id}
                type="button"
                onClick={() => toggleFamily(fam.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : 'bg-slate-950/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{fam.icon}</span>
                <span>{fam.label}</span>
                {isSelected && <Check className="w-3 h-3 ml-0.5 text-sky-400" />}
              </button>
            );
          })}
        </div>

        {/* Manufacturer & Sorting Row */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
          {/* Manufacturer Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Maker:</span>
            {(['Airbus', 'Boeing', 'Embraer'] as Manufacturer[]).map(m => {
              const isSelected = filters.manufacturers.includes(m);
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleManufacturer(m)}
                  className={`px-2 py-0.5 rounded text-xs font-medium border transition-colors ${
                    isSelected
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] font-semibold text-slate-400">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="price_asc">Lowest Price ($)</option>
              <option value="widebody_first">✈️ Widebody First</option>
              <option value="newest_aircraft">✨ Newest Tech (Composite/neo)</option>
              <option value="duration_asc">Shortest Duration</option>
              <option value="departure_time">Departure Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
