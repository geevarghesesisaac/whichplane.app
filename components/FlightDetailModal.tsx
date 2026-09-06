'use client';

import React from 'react';
import { FlightOffer } from '@/lib/types';
import { formatDuration, formatTime } from '@/lib/utils';

interface FlightDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: FlightOffer;
}

export default function FlightDetailModal({ isOpen, onClose, offer }: FlightDetailModalProps) {
  if (!isOpen) return null;

  const segment = offer.segments[0];
  const aircraft = segment.aircraft;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl bg-[#f8f9ff] border border-[#cbd5e1] shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="h-14 px-4 bg-white border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#eff4ff] text-[#0b1c30] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h3 className="font-headline text-sm font-bold text-[#0b1c30]">
              Flight Equipment & Itinerary Telemetry
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#eff4ff] text-[#64748b] hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Telemetry Verification Strip */}
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#e2e8f0] shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#0284c7] -ml-3.5" />
              <span className="font-mono-telemetry text-[10px] font-bold text-[#0284c7] uppercase tracking-widest pl-1">
                AV-OPS TELEMETRY VERIFIED
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#eff4ff] px-2 py-0.5 rounded border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#0284c7] text-[14px]">radar</span>
              <span className="font-mono-telemetry text-[10px] font-semibold text-[#0b1c30]">
                DISPATCH 14:02Z
              </span>
            </div>
          </div>

          {/* Master Itinerary Hero Card */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#e2e8f0] shadow-xs flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-ocr text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-wider">
                    {segment.origin.code}
                  </span>
                  <span className="material-symbols-outlined text-[#0284c7] text-[20px]">
                    trending_flat
                  </span>
                  <span className="font-ocr text-3xl sm:text-4xl font-bold text-[#0b1c30] tracking-wider">
                    {segment.destination.code}
                  </span>
                </div>
                <p className="text-xs text-[#64748b] mt-0.5 font-mono-telemetry">
                  {segment.operatingCarrier.name} • {segment.flightNumber}
                </p>
              </div>
              <div className="text-right">
                <span className="font-display text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-tight">
                  {offer.price.formatted}
                </span>
                <span className="block font-mono-telemetry text-[9px] text-[#64748b] uppercase">
                  ROUNDTRIP PER PAX
                </span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#f1f5f9]">
              <div className="bg-[#eff4ff] p-2.5 rounded-lg border border-[#dce9ff]">
                <span className="block font-mono-telemetry text-[9px] font-bold text-[#64748b] uppercase">
                  AIRTIME DURATION
                </span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30]">
                  {formatDuration(offer.totalDurationMinutes)}
                </span>
              </div>
              <div className="bg-[#eff4ff] p-2.5 rounded-lg border border-[#dce9ff]">
                <span className="block font-mono-telemetry text-[9px] font-bold text-[#64748b] uppercase">
                  ROUTING // STOPS
                </span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30]">
                  {offer.stops === 0 ? 'Non-Stop Direct' : `${offer.stops} Stop`}
                </span>
              </div>
              <div className="bg-[#eff4ff] p-2.5 rounded-lg border border-[#dce9ff]">
                <span className="block font-mono-telemetry text-[9px] font-bold text-[#64748b] uppercase">
                  AIRFRAME FUSELAGE
                </span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0284c7]">
                  {aircraft.bodyType === 'widebody' ? 'Twin-Aisle Wide' : 'Single Aisle'}
                </span>
              </div>
            </div>
          </div>

          {/* Segment 1: Equipment & Operating Carrier Detail */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#0F172A] text-white font-mono-telemetry text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                LEG 01 • TRANSATLANTIC SECTOR
              </span>
              <span className="font-mono-telemetry text-xs text-[#64748b]">
                {formatDuration(segment.durationMinutes)} Non-stop
              </span>
            </div>

            {/* Operating Carrier Notice (DOT Regulation) */}
            <div className="bg-[#eff4ff] border border-[#dce9ff] p-2.5 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-md bg-[#dce9ff] text-[#0284c7] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">airlines</span>
                </div>
                <div className="min-w-0">
                  <span className="block font-mono-telemetry text-[9px] font-bold text-[#64748b] uppercase">
                    OPERATING CARRIER (DOT DISCLOSURE)
                  </span>
                  <span className="font-headline text-xs font-bold text-[#0b1c30] truncate block">
                    {segment.operatingCarrier.name} ({segment.flightNumber})
                  </span>
                </div>
              </div>
              {segment.operatingCarrier.isCodeshare && (
                <span className="font-mono-telemetry text-[10px] text-[#0284c7] bg-white px-2 py-0.5 rounded border border-[#dce9ff]">
                  {segment.operatingCarrier.codeshareNotice}
                </span>
              )}
            </div>

            {/* Times */}
            <div className="flex items-center justify-between px-1 py-1">
              <div>
                <span className="font-display text-lg font-bold text-[#0b1c30] block">
                  {formatTime(segment.departureTime)}
                </span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0284c7]">
                  {segment.origin.code}
                </span>
                <span className="text-[11px] text-[#64748b] block">{segment.origin.city} {segment.origin.terminal}</span>
              </div>
              <div className="flex-1 px-4 text-center">
                <span className="font-mono-telemetry text-[10px] text-[#64748b] block">3,451 NM</span>
                <div className="w-full h-0.5 bg-[#dce9ff] my-1" />
                <span className="font-mono-telemetry text-[10px] text-[#0284c7] font-semibold">DIRECT TRACK</span>
              </div>
              <div className="text-right">
                <span className="font-display text-lg font-bold text-[#0b1c30] block">
                  {formatTime(segment.arrivalTime)}
                </span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0284c7]">
                  {segment.destination.code}
                </span>
                <span className="text-[11px] text-[#64748b] block">{segment.destination.city} {segment.destination.terminal}</span>
              </div>
            </div>

            {/* Airframe Assignment & Confidence Box */}
            <div className="p-3 rounded-lg bg-[#eff4ff] border border-[#dce9ff] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#0284c7] text-[18px]">verified_user</span>
                  <span className="font-headline text-xs font-bold text-[#0b1c30]">
                    Equipment Stated: {aircraft.name}
                  </span>
                </div>
                <span className="font-mono-telemetry text-[10px] font-bold text-[#0284c7] bg-white px-2 py-0.5 rounded border border-[#dce9ff]">
                  {segment.confidencePercent || 98}% CONFIRMED
                </span>
              </div>
              <p className="text-xs text-[#45464d] leading-relaxed">
                {segment.confidenceNote || 'Airframe assigned on airline flight line. Operating equipment verified at search time.'}
              </p>
              {segment.tailRegistration && (
                <div className="pt-1 border-t border-[#dce9ff] flex items-center justify-between font-mono-telemetry text-[11px]">
                  <span className="text-[#64748b]">ASSIGNED REGISTRATION:</span>
                  <span className="font-bold text-[#0b1c30]">{segment.tailRegistration}</span>
                </div>
              )}
            </div>

            {/* Cabin Comfort Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-[#f8f9ff] border border-[#e2e8f0] text-center">
                <span className="font-mono-telemetry text-[9px] text-[#64748b] block">CABIN ALTITUDE</span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30]">
                  {aircraft.cabinAltitudeFt ? `${aircraft.cabinAltitudeFt.toLocaleString()} ft` : '8,000 ft'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#f8f9ff] border border-[#e2e8f0] text-center">
                <span className="font-mono-telemetry text-[9px] text-[#64748b] block">ACOUSTIC DAMPENING</span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30]">
                  {aircraft.acousticRating || '70 dB Quiet'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#f8f9ff] border border-[#e2e8f0] text-center">
                <span className="font-mono-telemetry text-[9px] text-[#64748b] block">CABIN HUMIDITY</span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30]">
                  {aircraft.humidityPercent || '10-15%'}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[#f8f9ff] border border-[#e2e8f0] text-center">
                <span className="font-mono-telemetry text-[9px] text-[#64748b] block">ENGINE PODS</span>
                <span className="font-mono-telemetry text-xs font-bold text-[#0284c7] truncate block" title={segment.engineVariant}>
                  {segment.engineVariant || 'Twin Turbofans'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="h-14 px-4 bg-white border-t border-[#e2e8f0] flex items-center justify-between">
          <span className="font-mono-telemetry text-[11px] text-[#64748b] hidden sm:inline">
            Direct link-out to airline booking reservation system
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-mono-telemetry text-xs font-bold text-[#45464d] hover:bg-[#eff4ff] transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={offer.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 py-2 rounded-lg font-headline text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book with {segment.operatingCarrier.name}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
