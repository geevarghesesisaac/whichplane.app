'use client';

import React, { useState } from 'react';
import { FlightOffer } from '@/lib/types';
import { formatDuration, formatTime } from '@/lib/utils';
import ConfidenceBadge from '@/components/ConfidenceBadge';
import SeatMapModal from '@/components/SeatMapModal';
import { 
  Plane, 
  ExternalLink, 
  Wind, 
  Armchair, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight, 
  Building2, 
  Clock 
} from 'lucide-react';

interface FlightCardProps {
  offer: FlightOffer;
}

export default function FlightCard({ offer }: FlightCardProps) {
  const [selectedSeatMapSegment, setSelectedSeatMapSegment] = useState<number | null>(null);

  const primarySegment = offer.segments[0];
  const lastSegment = offer.segments[offer.segments.length - 1];
  const aircraft = primarySegment.aircraft;

  // DOT Operating Carrier Notice
  const isCodeshare =
    primarySegment.operatingCarrier.name.toLowerCase() !==
    primarySegment.marketingCarrier.name.toLowerCase();

  return (
    <>
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/30 backdrop-blur-xl p-5 shadow-xl transition-all duration-200 hover:shadow-sky-500/5 group">
        {/* Top Highlight Bar: Aircraft Badge & Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Aircraft Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-xs font-bold text-white tracking-wide">
                {aircraft.name}
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {aircraft.bodyType}
              </span>
            </div>

            {/* Composite Cabin Badge */}
            {aircraft.isComposite && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                <span>6,000 ft Cabin (Less Jet Lag)</span>
              </span>
            )}

            {/* Boeing 737 MAX Warning Badge */}
            {aircraft.family === '737 MAX' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>737 MAX Airframe</span>
              </span>
            )}

            {/* A380 Superjumbo Badge */}
            {aircraft.family === 'A380' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Double-Decker Giant</span>
              </span>
            )}

            {/* 747 Queen of the Skies Badge */}
            {aircraft.family.includes('747') && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Queen of the Skies</span>
              </span>
            )}
          </div>

          {/* Equipment Confidence Badge */}
          <ConfidenceBadge
            confidence={primarySegment.confidence}
            note={primarySegment.confidenceNote}
            aircraftName={aircraft.name}
          />
        </div>

        {/* Main Flight Timeline & Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Airline & Flight Number */}
          <div className="md:col-span-3 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">
                {primarySegment.operatingCarrier.name}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Flight {primarySegment.flightNumber}
            </div>

            {/* DOT Mandated Operating Carrier Disclosure */}
            {isCodeshare && (
              <div className="pt-1 text-[11px] text-amber-400/90 flex items-center gap-1">
                <Building2 className="w-3 h-3 shrink-0" />
                <span>Operated by {primarySegment.operatingCarrier.name}</span>
              </div>
            )}
          </div>

          {/* Route & Times */}
          <div className="md:col-span-6 flex items-center justify-between gap-4">
            {/* Origin */}
            <div className="text-left">
              <span className="text-xl font-extrabold text-white block">
                {formatTime(primarySegment.departureTime)}
              </span>
              <span className="text-xs font-bold text-sky-400 block">
                {primarySegment.origin.code}
              </span>
              <span className="text-[11px] text-slate-400 block truncate max-w-[100px]">
                {primarySegment.origin.city}
              </span>
            </div>

            {/* Flight Path Graphic */}
            <div className="flex-1 flex flex-col items-center px-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1 font-medium">
                <Clock className="w-3 h-3 text-slate-500" />
                {formatDuration(offer.totalDurationMinutes)}
              </span>
              <div className="w-full relative flex items-center justify-center">
                <div className="w-full h-0.5 bg-slate-800 rounded relative">
                  {offer.stops > 0 && (
                    <div className="absolute left-1/2 -top-1 w-2 h-2 rounded-full bg-amber-400 transform -translate-x-1/2" />
                  )}
                </div>
                <Plane className="w-3.5 h-3.5 text-sky-400 transform rotate-90 absolute" />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 font-medium">
                {offer.stops === 0 ? 'Non-stop' : `${offer.stops} stop${offer.stops > 1 ? 's' : ''}`}
              </span>
            </div>

            {/* Destination */}
            <div className="text-right">
              <span className="text-xl font-extrabold text-white block">
                {formatTime(lastSegment.arrivalTime)}
              </span>
              <span className="text-xs font-bold text-sky-400 block">
                {lastSegment.destination.code}
              </span>
              <span className="text-[11px] text-slate-400 block truncate max-w-[100px]">
                {lastSegment.destination.city}
              </span>
            </div>
          </div>

          {/* Price & Action Button */}
          <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
            <div>
              <span className="text-2xl font-black text-white block text-right">
                {offer.price.formatted}
              </span>
              <span className="text-[10px] text-slate-400 block text-right">
                round-trip / total
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Seat Map Trigger */}
              <button
                type="button"
                onClick={() => setSelectedSeatMapSegment(0)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                title="Preview cabin cross-section & layout"
              >
                <Armchair className="w-4 h-4 text-sky-400" />
              </button>

              {/* Direct Deep Link */}
              <a
                href={offer.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-lg shadow-sky-500/20 flex items-center gap-1.5"
              >
                <span>Book Direct</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Multiple segments display if flight has connections */}
        {offer.segments.length > 1 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Connecting Flight Segments ({offer.segments.length} Legs):
            </span>
            <div className="space-y-1.5">
              {offer.segments.map((seg, idx) => (
                <div
                  key={seg.id}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/40 border border-slate-800/60"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400">Leg {idx + 1}:</span>
                    <span className="font-bold text-slate-200">
                      {seg.origin.code} → {seg.destination.code}
                    </span>
                    <span className="text-slate-400">({seg.flightNumber})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-300 font-medium">{seg.aircraft.name}</span>
                    <button
                      onClick={() => setSelectedSeatMapSegment(idx)}
                      className="text-[11px] text-slate-400 hover:text-sky-400 underline"
                    >
                      Cabin View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Seat Map / Cabin Modal */}
      {selectedSeatMapSegment !== null && (
        <SeatMapModal
          isOpen={true}
          onClose={() => setSelectedSeatMapSegment(null)}
          aircraft={offer.segments[selectedSeatMapSegment]?.aircraft || aircraft}
          airlineName={offer.segments[selectedSeatMapSegment]?.operatingCarrier.name || primarySegment.operatingCarrier.name}
          flightNumber={offer.segments[selectedSeatMapSegment]?.flightNumber || primarySegment.flightNumber}
        />
      )}
    </>
  );
}
