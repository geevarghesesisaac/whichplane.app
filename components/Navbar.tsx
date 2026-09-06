'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCurrency, CURRENCIES, CurrencyCode } from '@/lib/currency';

interface NavbarProps {
  activeAirframe?: string;
}

export default function Navbar({ activeAirframe = 'A350-1000' }: NavbarProps) {
  const { currency, setCurrency, userTimeZone } = useCurrency();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [localClock, setLocalClock] = useState('');
  const currencyRef = useRef<HTMLDivElement>(null);

  // Live local clock updating every minute
  useEffect(() => {
    function updateClock() {
      const d = new Date();
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      setLocalClock(timeStr);
    }
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  // Click outside listener for currency dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCurrency = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Telemetry Indicator */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Aerodynamic Jet Mark */}
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center shadow-xs shrink-0 group-hover:bg-[#1E293B] transition-colors">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M7 21L16 9L25 21L16 18L7 21Z" fill="#38BDF8" />
                <path d="M16 9V18" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="16" cy="18" r="1.5" fill="#FFFFFF" />
                <circle cx="11.5" cy="22" r="1" fill="#38BDF8" />
                <circle cx="20.5" cy="22" r="1" fill="#38BDF8" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-lg font-bold leading-none tracking-[0.02em] text-[#0b1c30]">
                Which<span className="text-[#0284c7]">Plane</span>
              </span>
              <span className="font-mono-telemetry text-[10px] font-bold text-[#0284c7] uppercase tracking-[0.08em] mt-1">
                AV-OPS // METASEARCH
              </span>
            </div>
          </Link>

          {/* Active Airframe Telemetry Tag */}
          <div className="hidden lg:flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-2.5 py-1 rounded-md">
            <span className="font-mono-telemetry text-[10px] font-bold text-[#45464d] uppercase tracking-[0.06em]">
              ACTIVE
            </span>
            <span className="font-mono-telemetry text-xs font-bold text-[#0284c7] tracking-[0.04em] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
              {activeAirframe}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#45464d]">
          <Link
            href="/"
            className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 font-semibold text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0284c7]">flight</span>
            <span>Flight Search</span>
          </Link>
          <Link
            href="/aircraft"
            className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0284c7]">radar</span>
            <span>Fleet Radar</span>
          </Link>
          <Link
            href="/aircraft/380"
            className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-[#fef3c7] text-[#b45309] font-mono-telemetry font-bold border border-[#fde68a] tracking-[0.04em]"
          >
            <span>A380 Superjumbo</span>
          </Link>
          <Link
            href="/aircraft/748"
            className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-[#eff4ff] text-[#0284c7] font-mono-telemetry font-bold border border-[#cce5ff] tracking-[0.04em]"
          >
            <span>747-8 Queen</span>
          </Link>
        </nav>

        {/* Right Action: Local Timezone Clock & Currency Selector */}
        <div className="flex items-center gap-2">
          {/* User's Local Time & Telemetry Tag */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono-telemetry text-[11px] text-[#0284c7] font-bold px-2.5 py-1 bg-[#eff4ff] border border-[#dce9ff] rounded-md tracking-[0.04em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>{localClock ? `${localClock} ${userTimeZone.shortName}` : 'RADAR // LIVE'}</span>
          </div>

          {/* Interactive Currency Selector */}
          <div ref={currencyRef} className="relative">
            <button
              type="button"
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="flex items-center gap-1 font-mono-telemetry text-xs font-bold text-[#0b1c30] px-2.5 py-1 bg-white hover:bg-[#eff4ff] border border-[#cbd5e1] hover:border-[#0284c7] rounded-md tracking-[0.03em] transition-colors cursor-pointer shadow-xs"
              title="Change display currency"
            >
              <span className="text-[#0284c7] font-semibold">{activeCurrency.symbol.trim()}</span>
              <span>{currency}</span>
              <span className="material-symbols-outlined text-[14px] text-[#64748b]">
                expand_more
              </span>
            </button>

            {/* Currency Dropdown Menu */}
            {isCurrencyOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-[#cbd5e1] rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-mono-telemetry font-bold text-[#64748b] uppercase border-b border-[#f1f5f9]">
                  Select Currency ({userTimeZone.shortName} Auto-detected)
                </div>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const item = CURRENCIES[code];
                  const isSelected = code === currency;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setCurrency(code);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#eff4ff] text-[#0284c7] font-bold'
                          : 'text-[#0b1c30] hover:bg-[#f8fafc]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono-telemetry font-bold w-4 text-center">
                          {item.symbol.trim()}
                        </span>
                        <span>{item.code}</span>
                      </div>
                      <span className="text-[11px] text-[#64748b] font-normal truncate max-w-[80px]">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

