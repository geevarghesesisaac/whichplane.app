'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import AircraftCard from '@/components/AircraftCard';
import { AIRCRAFT_DATABASE } from '@/data/aircraft';
import { Manufacturer, BodyType } from '@/lib/types';
import { Plane, Compass, Sparkles, Wind, SlidersHorizontal, Search } from 'lucide-react';
import Link from 'next/link';

export default function AircraftDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('all');
  const [selectedBodyType, setSelectedBodyType] = useState<string>('all');
  const [compositeOnly, setCompositeOnly] = useState(false);

  const aircraftList = Object.values(AIRCRAFT_DATABASE);

  const filtered = aircraftList.filter(a => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        a.name.toLowerCase().includes(q) ||
        a.shortName.toLowerCase().includes(q) ||
        a.family.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedManufacturer !== 'all' && a.manufacturer !== selectedManufacturer) {
      return false;
    }
    if (selectedBodyType !== 'all' && a.bodyType !== selectedBodyType) {
      return false;
    }
    if (compositeOnly && !a.isComposite) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Aircraft Taxonomy & Avgeek Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Explore Commercial Aircraft
          </h1>
          <p className="text-sm text-slate-400">
            Compare cabin altitude, humidity percentages, seating geometries, and discover which airlines still operate iconic airframes.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search airframe (e.g. A380, Dreamliner, 747, A350)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Manufacturer select */}
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Manufacturers</option>
              <option value="Airbus">Airbus</option>
              <option value="Boeing">Boeing</option>
              <option value="Embraer">Embraer</option>
            </select>

            {/* Body Type select */}
            <select
              value={selectedBodyType}
              onChange={(e) => setSelectedBodyType(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Fuselage Types</option>
              <option value="widebody">Widebody (Twin Aisle)</option>
              <option value="narrowbody">Narrowbody (Single Aisle)</option>
              <option value="regional">Regional</option>
            </select>

            {/* Composite toggle */}
            <button
              type="button"
              onClick={() => setCompositeOnly(!compositeOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                compositeOnly
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              <span>Composite Only</span>
            </button>
          </div>
        </div>

        {/* Aircraft Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(aircraft => (
            <AircraftCard key={aircraft.id} aircraft={aircraft} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            No aircraft matched your criteria.
          </div>
        )}
      </main>
    </div>
  );
}
