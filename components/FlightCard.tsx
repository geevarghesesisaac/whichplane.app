'use client';

import React, { useState } from 'react';
import { FlightOffer } from '@/lib/types';
import { formatDuration, formatTime } from '@/lib/utils';
import FlightDetailModal from '@/components/FlightDetailModal';

interface FlightCardProps {
  offer: FlightOffer;
}

export default function FlightCard({ offer }: FlightCardProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const primarySegment = offer.segments[0];
  const lastSegment = offer.segments[offer.segments.length - 1];
  const aircraft = primarySegment.aircraft;

  const isCodeshare = primarySegment.operatingCarrier?.isCodeshare;

  return (
    <>
      <article className="instrument-card rounded-xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden bg-white">
        {/* TOP ROW: Carrier, Flight Number, Direct Fare */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white font-headline text-xs font-black shrink-0">
              {primarySegment.marketingCarrier.logoLetter || primarySegment.marketingCarrier.code.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-xs font-bold text-[#0b1c30]">
                  {primarySegment.operatingCarrier.name}
                </span>
                {isCodeshare && (
                  <span className="font-mono-telemetry text-[10px] text-[#0284c7] bg-[#eff4ff] px-1.5 py-0.2 rounded border border-[#dce9ff]">
                    {primarySegment.operatingCarrier.codeshareNotice || 'Codeshare'}
                  </span>
                )}
              </div>
              <div className="font-mono-telemetry text-[11px] text-[#64748b]">
                {primarySegment.flightNumber} • {offer.stops === 0 ? 'Nonstop' : `${offer.stops} Stop`}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-display text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-normal font-tabular">
              {offer.price.formatted}
            </div>
            <div className="font-mono-telemetry text-[10px] text-[#64748b] tracking-[0.06em] uppercase font-bold">
              ROUNDTRIP TOTAL
            </div>
          </div>
        </div>

        {/* AERODYNAMIC AIRFRAME HERO BADGE */}
        <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-lg p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#5bb8fe]/30 text-[#00476e] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">airlines</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-headline text-xs sm:text-sm font-bold text-[#0b1c30] tracking-normal">
                  {aircraft.name}
                </span>
                <span className="bg-[#0284c7] text-white px-2 py-0.5 rounded font-mono-telemetry text-[10px] uppercase font-bold tracking-[0.06em]">
                  {aircraft.aisles === 2 ? 'Twin Aisle' : 'Single Aisle'}
                </span>
                {aircraft.isComposite && (
                  <span className="bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] px-2 py-0.5 rounded font-mono-telemetry text-[10px] uppercase font-bold tracking-[0.06em]">
                    Composite
                  </span>
                )}
                {aircraft.family === '737 MAX' && (
                  <span className="bg-[#fff1f2] text-[#ba1a1a] border border-[#fecdd3] px-2 py-0.5 rounded font-mono-telemetry text-[10px] uppercase font-bold tracking-[0.06em]">
                    737 MAX
                  </span>
                )}
              </div>
              <div className="text-xs text-[#0284c7] truncate font-medium mt-0.5">
                {aircraft.isComposite ? 'Aerodynamic Flagship • Sub-6,000ft Cabin Altitude' : aircraft.family === 'A380' ? 'Double-Decker Superjumbo • Whisper Quiet Cabin' : aircraft.family.includes('747') ? 'Queen of the Skies • Upper Deck Hump' : 'Standard Scheduled Commercial Airliner'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-2" title="Stated by airline booking equipment line">
            <span className="material-symbols-outlined text-[#0284c7] text-[18px]">verified</span>
            <span className="font-mono-telemetry text-[10px] text-[#0284c7] font-bold tracking-[0.05em] hidden sm:inline">
              {primarySegment.confidencePercent || 98}% LOCK
            </span>
          </div>
        </div>

        {/* ROUTE VECTOR TIMELINE */}
        <div className="flex items-center justify-between py-1">
          {/* Departure */}
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold text-[#0b1c30] tracking-normal font-tabular">
              {formatTime(primarySegment.departureTime)}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-ocr text-base sm:text-lg font-bold text-[#0b1c30] tracking-[0.08em]">
                {primarySegment.origin.code}
              </span>
              <span className="font-body text-xs text-[#64748b]">
                {primarySegment.origin.terminal || 'T4'}
              </span>
            </div>
          </div>

          {/* Vector Progress Bar */}
          <div className="flex-1 px-4 flex flex-col items-center">
            <span className="font-mono-telemetry text-xs text-[#64748b] mb-1 font-medium tracking-[0.02em]">
              {formatDuration(offer.totalDurationMinutes)} nonstop
            </span>
            <div className="w-full flex items-center relative">
              <div className="w-2 h-2 rounded-full bg-[#0284c7]" />
              <div className="h-[2px] flex-1 bg-[#dce9ff]" />
              <span className="material-symbols-outlined text-[#0284c7] text-[16px] absolute left-1/2 -translate-x-1/2 transform rotate-90">
                flight
              </span>
              <div className="w-2 h-2 rounded-full bg-[#0284c7]" />
            </div>
            <span className="font-mono-telemetry text-[10px] text-[#0284c7] font-bold tracking-[0.06em] mt-1">
              3,451 NM • HIGH EFFICIENCY
            </span>
          </div>

          {/* Arrival */}
          <div className="flex flex-col text-right">
            <div className="flex items-center justify-end gap-1">
              <span className="font-display text-lg sm:text-xl font-bold text-[#0b1c30] tracking-normal font-tabular">
                {formatTime(lastSegment.arrivalTime)}
              </span>
              <span className="font-mono-telemetry text-[10px] text-[#ba1a1a] font-bold">+1</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="font-ocr text-base sm:text-lg font-bold text-[#0b1c30] tracking-[0.08em]">
                {lastSegment.destination.code}
              </span>
              <span className="font-body text-xs text-[#64748b]">
                {lastSegment.destination.terminal || 'T3'}
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM DECK: TECHNICAL SPEC BAR (MOMENTS OF DELIGHT) */}
        <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-2 flex flex-wrap items-center gap-1.5">
          {aircraft.compositePercent && (
            <span className="bg-white border border-[#cbd5e1] px-2.5 py-1 rounded-md font-mono-telemetry text-[11px] text-[#0b1c30] flex items-center gap-1.5 tracking-[0.02em]">
              <span className="material-symbols-outlined text-[13px] text-[#0284c7]">layers</span>
              {aircraft.compositePercent}
            </span>
          )}
          {primarySegment.engineVariant && (
            <span className="bg-white border border-[#cbd5e1] px-2.5 py-1 rounded-md font-mono-telemetry text-[11px] text-[#0b1c30] flex items-center gap-1.5 tracking-[0.02em]">
              <span className="material-symbols-outlined text-[13px] text-[#0284c7]">volume_down</span>
              {primarySegment.engineVariant}
            </span>
          )}
          {aircraft.cabinAltitudeFt && (
            <span className="bg-white border border-[#cbd5e1] px-2.5 py-1 rounded-md font-mono-telemetry text-[11px] text-[#0b1c30] flex items-center gap-1.5 tracking-[0.02em]">
              <span className="material-symbols-outlined text-[13px] text-[#0284c7]">air</span>
              {aircraft.cabinAltitudeFt.toLocaleString()} ft Altitude
            </span>
          )}
          {primarySegment.seatPitch && (
            <span className="bg-white border border-[#cbd5e1] px-2.5 py-1 rounded-md font-mono-telemetry text-[11px] text-[#0b1c30] flex items-center gap-1.5 tracking-[0.02em]">
              <span className="material-symbols-outlined text-[13px] text-[#0284c7]">airline_seat_recline_normal</span>
              {primarySegment.seatPitch}
            </span>
          )}
          {primarySegment.wifiGeneration && (
            <span className="bg-white border border-[#cbd5e1] px-2.5 py-1 rounded-md font-mono-telemetry text-[11px] text-[#0b1c30] flex items-center gap-1.5 tracking-[0.02em]">
              <span className="material-symbols-outlined text-[13px] text-[#0284c7]">wifi</span>
              {primarySegment.wifiGeneration}
            </span>
          )}
          <span className="bg-white border border-[#cbd5e1] px-2.5 py-1 rounded-md font-mono-telemetry text-[11px] text-[#0b1c30] flex items-center gap-1.5 tracking-[0.02em]">
            <span className="material-symbols-outlined text-[13px] text-[#0284c7]">videocam</span>
            Live HD Tail Cam
          </span>
        </div>

        {/* CALL TO ACTION ROW */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setIsDetailModalOpen(true)}
            className="font-mono-telemetry text-xs text-[#0284c7] hover:underline flex items-center gap-1 font-bold cursor-pointer tracking-[0.03em]"
          >
            <span>Airframe Specs & Seat Map</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <a
            href={offer.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2 rounded-lg font-headline text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer tracking-[0.03em]"
          >
            <span>Select Flight</span>
            <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
          </a>
        </div>
      </article>

      {/* Itinerary & Airframe Spec Detail Modal */}
      {isDetailModalOpen && (
        <FlightDetailModal
          isOpen={true}
          onClose={() => setIsDetailModalOpen(false)}
          offer={offer}
        />
      )}
    </>
  );
}
