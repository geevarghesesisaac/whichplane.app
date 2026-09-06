'use client';

import React, { useMemo } from 'react';
import { FlightOffer, FilterState } from '@/lib/types';
import { useCurrency } from '@/lib/currency';

interface SkyscannerSortTabsProps {
  offers: FlightOffer[];
  currentSort: FilterState['sortBy'];
  onSortChange: (sort: FilterState['sortBy']) => void;
}

export function calculateBestScore(offer: FlightOffer, allOffers: FlightOffer[]): number {
  if (allOffers.length === 0) return 0;

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let minDur = Infinity;
  let maxDur = -Infinity;

  for (const o of allOffers) {
    if (o.price.amount < minPrice) minPrice = o.price.amount;
    if (o.price.amount > maxPrice) maxPrice = o.price.amount;
    if (o.totalDurationMinutes < minDur) minDur = o.totalDurationMinutes;
    if (o.totalDurationMinutes > maxDur) maxDur = o.totalDurationMinutes;
  }

  const priceRange = Math.max(maxPrice - minPrice, 1);
  const durRange = Math.max(maxDur - minDur, 1);

  // Normalized: 1 = best (lowest), 0 = worst (highest)
  const priceScore = 1 - (offer.price.amount - minPrice) / priceRange;
  const durScore = 1 - (offer.totalDurationMinutes - minDur) / durRange;

  // Stops penalty
  const stopsPenalty = (offer.stops || 0) * 0.25;

  // Airframe quality bonuses (WhichPlane aviation intelligence)
  let airframeBonus = 0;
  if (offer.primaryAircraft?.isComposite) airframeBonus += 0.15;
  if (offer.containsA380 || offer.contains747) airframeBonus += 0.15;
  if (offer.primaryAircraft?.bodyType === 'widebody') airframeBonus += 0.10;
  if ((offer.primaryAircraft?.cabinAltitudeFt || 8000) <= 6000) airframeBonus += 0.10;

  // Weighted sum: 45% Price, 35% Duration, 20% Spec Quality minus Stops
  return 0.45 * priceScore + 0.35 * durScore + airframeBonus - stopsPenalty;
}

function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function SkyscannerSortTabs({
  offers,
  currentSort,
  onSortChange
}: SkyscannerSortTabsProps) {
  const { formatPrice } = useCurrency();

  // 1. Cheapest offer
  const cheapestOffer = useMemo(() => {
    if (!offers || offers.length === 0) return null;
    return [...offers].sort((a, b) => a.price.amount - b.price.amount)[0];
  }, [offers]);

  // 2. Fastest offer
  const fastestOffer = useMemo(() => {
    if (!offers || offers.length === 0) return null;
    return [...offers].sort((a, b) => a.totalDurationMinutes - b.totalDurationMinutes)[0];
  }, [offers]);

  // 3. Best offer (Skyscanner learning-to-rank style score)
  const bestOffer = useMemo(() => {
    if (!offers || offers.length === 0) return null;
    return [...offers].sort(
      (a, b) => calculateBestScore(b, offers) - calculateBestScore(a, offers)
    )[0];
  }, [offers]);

  if (!offers || offers.length === 0) {
    return null;
  }

  const isBestActive = currentSort === 'best_spec';
  const isCheapestActive = currentSort === 'price_asc';
  const isFastestActive = currentSort === 'duration_asc';

  return (
    <div className="w-full space-y-1.5">
      {/* 3 Skyscanner Category Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white p-1.5 sm:p-2 rounded-xl border border-[#e2e8f0] shadow-xs">
        {/* Tab 1: Best */}
        <button
          type="button"
          onClick={() => onSortChange('best_spec')}
          className={`p-2.5 sm:p-3 rounded-lg text-left transition-all cursor-pointer relative flex flex-col justify-between border ${
            isBestActive
              ? 'bg-[#eff4ff] border-[#0284c7] shadow-xs ring-1 ring-[#0284c7]/20'
              : 'bg-white hover:bg-[#f8fafc] border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          {isBestActive && (
            <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-[#0284c7] text-white text-[9px] font-mono-telemetry font-bold rounded-full uppercase tracking-wider shadow-xs">
              ACTIVE
            </span>
          )}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#0284c7]">
                  stars
                </span>
                BEST
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-1 sm:gap-1.5">
              <span className="font-ocr text-sm sm:text-base font-bold text-[#0b1c30]">
                {bestOffer ? formatPrice(bestOffer.price.amount) : '—'}
              </span>
              <span className="text-[11px] sm:text-xs font-mono-telemetry text-[#64748b]">
                · {bestOffer ? formatDuration(bestOffer.totalDurationMinutes) : '—'}
              </span>
            </div>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#64748b] truncate mt-1 hidden sm:block">
            Optimal balance of price, duration & airframe spec
          </p>
        </button>

        {/* Tab 2: Cheapest */}
        <button
          type="button"
          onClick={() => onSortChange('price_asc')}
          className={`p-2.5 sm:p-3 rounded-lg text-left transition-all cursor-pointer relative flex flex-col justify-between border ${
            isCheapestActive
              ? 'bg-[#eff4ff] border-[#0284c7] shadow-xs ring-1 ring-[#0284c7]/20'
              : 'bg-white hover:bg-[#f8fafc] border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          {isCheapestActive && (
            <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-[#0284c7] text-white text-[9px] font-mono-telemetry font-bold rounded-full uppercase tracking-wider shadow-xs">
              ACTIVE
            </span>
          )}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#10b981]">
                  payments
                </span>
                CHEAPEST
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-1 sm:gap-1.5">
              <span className="font-ocr text-sm sm:text-base font-bold text-[#10b981]">
                {cheapestOffer ? formatPrice(cheapestOffer.price.amount) : '—'}
              </span>
              <span className="text-[11px] sm:text-xs font-mono-telemetry text-[#64748b]">
                · {cheapestOffer ? formatDuration(cheapestOffer.totalDurationMinutes) : '—'}
              </span>
            </div>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#64748b] truncate mt-1 hidden sm:block">
            Lowest direct fare available on market
          </p>
        </button>

        {/* Tab 3: Fastest */}
        <button
          type="button"
          onClick={() => onSortChange('duration_asc')}
          className={`p-2.5 sm:p-3 rounded-lg text-left transition-all cursor-pointer relative flex flex-col justify-between border ${
            isFastestActive
              ? 'bg-[#eff4ff] border-[#0284c7] shadow-xs ring-1 ring-[#0284c7]/20'
              : 'bg-white hover:bg-[#f8fafc] border-[#e2e8f0] hover:border-[#cbd5e1]'
          }`}
        >
          {isFastestActive && (
            <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-[#0284c7] text-white text-[9px] font-mono-telemetry font-bold rounded-full uppercase tracking-wider shadow-xs">
              ACTIVE
            </span>
          )}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono-telemetry text-xs font-bold text-[#0b1c30] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#8b5cf6]">
                  speed
                </span>
                FASTEST
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-baseline gap-1 sm:gap-1.5">
              <span className="font-ocr text-sm sm:text-base font-bold text-[#8b5cf6]">
                {fastestOffer ? formatDuration(fastestOffer.totalDurationMinutes) : '—'}
              </span>
              <span className="text-[11px] sm:text-xs font-mono-telemetry text-[#64748b]">
                · {fastestOffer ? formatPrice(fastestOffer.price.amount) : '—'}
              </span>
            </div>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#64748b] truncate mt-1 hidden sm:block">
            Shortest airtime & direct transit routing
          </p>
        </button>
      </div>
    </div>
  );
}
