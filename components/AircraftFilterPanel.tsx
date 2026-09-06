'use client';

import React from 'react';
import { FilterState, Manufacturer, BodyType } from '@/lib/types';

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

  const setBodyType = (bt: 'all' | 'widebody' | 'narrowbody') => {
    onChange({
      ...filters,
      bodyTypes: bt === 'all' ? [] : [bt]
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

  const resetAll = () => {
    onChange({
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
  };

  const currentBodyType =
    filters.bodyTypes.includes('widebody')
      ? 'widebody'
      : filters.bodyTypes.includes('narrowbody')
      ? 'narrowbody'
      : 'all';

  const familiesList = [
    { id: 'A350', label: 'Airbus A350', tag: 'XWB' },
    { id: '787 Dreamliner', label: 'Boeing 787', tag: 'DREAMLINER' },
    { id: 'A380', label: 'Airbus A380', tag: 'SUPERJUMBO' },
    { id: '777', label: 'Boeing 777', tag: 'TRIPLE 7' },
    { id: '747 Queen of the Skies', label: 'Boeing 747-8', tag: 'QUEEN' },
    { id: 'A330', label: 'Airbus A330neo', tag: '2-4-2' },
    { id: '737 MAX', label: 'Boeing 737 MAX', tag: 'MAX' },
    { id: 'A320neo', label: 'Airbus A320neo', tag: 'NEO' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#e2e8f0] p-4 sm:p-5 space-y-4">
      {/* Module Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0284c7] text-[22px]">tune</span>
          <div>
            <h2 className="font-headline text-sm font-bold text-[#0b1c30] leading-tight">
              Aircraft Spec Filter
            </h2>
            <span className="font-mono-telemetry text-[10px] text-[#64748b] tracking-wider uppercase">
              AIRFRAME PARAMETERS & CABIN ARCHITECTURE
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-telemetry text-xs text-[#64748b]">
            <strong className="text-[#0284c7] font-bold">{filteredResults}</strong> of {totalResults} active
          </span>
          <button
            type="button"
            onClick={resetAll}
            className="font-mono-telemetry text-[10px] font-bold text-[#0284c7] bg-[#eff4ff] hover:bg-[#dce9ff] px-2 py-1 rounded transition-colors uppercase cursor-pointer"
          >
            RESET SPEC
          </button>
        </div>
      </div>

      {/* Fuselage Layout Segmented Control */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
            Fuselage Architecture
          </span>
          <span className="font-mono-telemetry text-[11px] text-[#0284c7] font-semibold">
            {currentBodyType === 'widebody' ? 'TWIN AISLE EMPHASIS' : currentBodyType === 'narrowbody' ? 'SINGLE AISLE' : 'ALL CONFIGS'}
          </span>
        </div>
        <div className="grid grid-cols-3 p-0.5 bg-[#eff4ff] rounded-lg gap-1 border border-[#dce9ff]">
          <button
            type="button"
            onClick={() => setBodyType('all')}
            className={`py-1.5 rounded font-mono-telemetry text-xs font-semibold transition-all cursor-pointer ${
              currentBodyType === 'all'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            ALL TYPES
          </button>
          <button
            type="button"
            onClick={() => setBodyType('widebody')}
            className={`py-1.5 rounded font-mono-telemetry text-xs font-semibold transition-all cursor-pointer ${
              currentBodyType === 'widebody'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            WIDEBODY (TWIN)
          </button>
          <button
            type="button"
            onClick={() => setBodyType('narrowbody')}
            className={`py-1.5 rounded font-mono-telemetry text-xs font-semibold transition-all cursor-pointer ${
              currentBodyType === 'narrowbody'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            NARROWBODY
          </button>
        </div>
      </div>

      {/* Manufacturer OEM / Maker */}
      <div className="space-y-1.5">
        <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
          Airframe OEM / Maker
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(['Airbus', 'Boeing', 'Embraer'] as Manufacturer[]).map(m => {
            const isSelected = filters.manufacturers.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleManufacturer(m)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono-telemetry text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] border-[#dce9ff]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#5bb8fe]' : 'bg-[#cbd5e1]'}`} />
                <span>{m.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Aircraft Families Multi-Select Chips */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
            Aircraft Lineage & Sub-Families
          </span>
          <span className="font-mono-telemetry text-[11px] text-[#64748b]">
            {filters.families.length > 0 ? `${filters.families.length} Selected` : 'Multi-Select'}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {familiesList.map(fam => {
            const isSelected = filters.families.includes(fam.id);
            return (
              <button
                key={fam.id}
                type="button"
                onClick={() => toggleFamily(fam.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-telemetry text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#dce9ff] text-[#0b1c30] border-[#5bb8fe] font-bold shadow-xs'
                    : 'bg-[#eff4ff] text-[#45464d] hover:text-[#0b1c30] border-[#dce9ff]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#0284c7]' : 'bg-[#94a3b8]'}`} />
                <span>{fam.label}</span>
                {fam.tag && (
                  <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-white text-[#0284c7]">
                    {fam.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Aviation Tech & Passenger Well-Being Switches */}
      <div className="space-y-2 pt-1 border-t border-[#f1f5f9]">
        <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">
          Aviation Tech & Passenger Well-Being
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Switch 1: Composite */}
          <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] cursor-pointer hover:bg-[#e5eeff] transition-colors">
            <div className="flex items-start gap-2 pr-2">
              <span className="material-symbols-outlined text-[#0284c7] text-[20px] mt-0.5">layers</span>
              <div className="flex flex-col">
                <span className="font-headline text-xs font-bold text-[#0b1c30]">Carbon Composite Only</span>
                <span className="text-[11px] text-[#64748b]">Lightweight CFRP airframe (A350 & B787)</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.compositeOnly}
              onChange={() => toggleQuickFilter('compositeOnly')}
              className="w-4 h-4 accent-[#0284c7] rounded cursor-pointer shrink-0"
            />
          </label>

          {/* Switch 2: Cabin Altitude */}
          <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] cursor-pointer hover:bg-[#e5eeff] transition-colors">
            <div className="flex items-start gap-2 pr-2">
              <span className="material-symbols-outlined text-[#0284c7] text-[20px] mt-0.5">air</span>
              <div className="flex flex-col">
                <span className="font-headline text-xs font-bold text-[#0b1c30]">Sub-6,000ft Cabin Alt</span>
                <span className="text-[11px] text-[#64748b]">Reduced jet lag & higher cabin humidity</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.sub6000FtAltitudeOnly}
              onChange={() => toggleQuickFilter('sub6000FtAltitudeOnly')}
              className="w-4 h-4 accent-[#0284c7] rounded cursor-pointer shrink-0"
            />
          </label>

          {/* Switch 3: Exclude 737 MAX */}
          <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#fff1f2] border border-[#fecdd3] cursor-pointer hover:bg-[#ffe4e6] transition-colors">
            <div className="flex items-start gap-2 pr-2">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] mt-0.5">gpp_bad</span>
              <div className="flex flex-col">
                <span className="font-headline text-xs font-bold text-[#ba1a1a]">Exclude Boeing 737 MAX</span>
                <span className="text-[11px] text-[#9f1239]">Filter out all 737 MAX airframes</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.excludeBoeing737Max}
              onChange={() => toggleQuickFilter('excludeBoeing737Max')}
              className="w-4 h-4 accent-[#ba1a1a] rounded cursor-pointer shrink-0"
            />
          </label>

          {/* Switch 4: Chase A380 & 747 */}
          <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#fefce8] border border-[#fef08a] cursor-pointer hover:bg-[#fef9c3] transition-colors">
            <div className="flex items-start gap-2 pr-2">
              <span className="material-symbols-outlined text-[#b45309] text-[20px] mt-0.5">military_tech</span>
              <div className="flex flex-col">
                <span className="font-headline text-xs font-bold text-[#b45309]">A380 & 747 Hunters</span>
                <span className="text-[11px] text-[#854d0e]">Double-deckers and Queens of the skies</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.chaseA380Or747}
              onChange={() => toggleQuickFilter('chaseA380Or747')}
              className="w-4 h-4 accent-[#b45309] rounded cursor-pointer shrink-0"
            />
          </label>
        </div>
      </div>

      {/* Sort Telemetry Row */}
      <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0284c7] text-[18px]">sort</span>
          <span className="font-mono-telemetry text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
            SORT TELEMETRY:
          </span>
        </div>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
          className="font-mono-telemetry text-xs font-bold text-[#0b1c30] bg-[#eff4ff] border border-[#dce9ff] px-2.5 py-1 rounded-md focus:outline-none focus:border-[#0284c7] cursor-pointer"
        >
          <option value="best_spec">Best Aircraft Spec (A350 / 787 / A380)</option>
          <option value="price_asc">Lowest Direct Fare ($)</option>
          <option value="duration_asc">Shortest Airtime</option>
          <option value="departure_time">Departure Timeline</option>
        </select>
      </div>
    </div>
  );
}
