'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ApiKeyModal from '@/components/ApiKeyModal';
import BoardingPassFontToggle from '@/components/BoardingPassFontToggle';

interface NavbarProps {
  onTokenChange?: (token: string) => void;
  customToken?: string;
  activeAirframe?: string;
}

export default function Navbar({ onTokenChange, customToken, activeAirframe = 'A350-1000' }: NavbarProps) {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [token, setToken] = useState(customToken || '');

  useEffect(() => {
    if (customToken !== undefined) {
      setToken(customToken);
    } else {
      const saved = localStorage.getItem('whichplane_duffel_token');
      if (saved) setToken(saved);
    }
  }, [customToken]);

  const handleSaveToken = (newToken: string) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('whichplane_duffel_token', newToken);
    } else {
      localStorage.removeItem('whichplane_duffel_token');
    }
    if (onTokenChange) {
      onTokenChange(newToken);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Telemetry Indicator */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Aerodynamic Jet Mark */}
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center shadow-sm shrink-0 group-hover:bg-[#1E293B] transition-colors">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M7 21L16 9L25 21L16 18L7 21Z" fill="#38BDF8" />
                  <path d="M16 9V18" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="16" cy="18" r="1.5" fill="#FFFFFF" />
                  <circle cx="11.5" cy="22" r="1" fill="#38BDF8" />
                  <circle cx="20.5" cy="22" r="1" fill="#38BDF8" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-lg font-bold leading-none tracking-tight text-[#0b1c30]">
                  Which<span className="text-[#0284c7]">Plane</span>
                </span>
                <span className="font-mono-telemetry text-[9px] font-bold text-[#0284c7] uppercase tracking-widest mt-0.5">
                  AV-OPS // SCAN
                </span>
              </div>
            </Link>

            {/* Active Airframe Telemetry Tag */}
            <div className="hidden lg:flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-2.5 py-1 rounded-md">
              <span className="font-mono-telemetry text-[10px] font-bold text-[#45464d] uppercase">
                ACTIVE
              </span>
              <span className="font-mono-telemetry text-xs font-semibold text-[#0284c7] flex items-center gap-1.5">
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
              className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 text-xs px-2 py-0.5 rounded bg-[#fef3c7] text-[#b45309] font-mono-telemetry font-bold border border-[#fde68a]"
            >
              <span>A380 Superjumbo</span>
            </Link>
            <Link
              href="/aircraft/748"
              className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5 text-xs px-2 py-0.5 rounded bg-[#eff4ff] text-[#0284c7] font-mono-telemetry font-bold border border-[#cce5ff]"
            >
              <span>747-8 Queen</span>
            </Link>
          </nav>

          {/* Right Action: Duffel API & Font Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <BoardingPassFontToggle />
            <span className="hidden lg:inline-flex font-mono-telemetry text-[11px] text-[#45464d] px-2 py-1 bg-[#eff4ff] border border-[#dce9ff] rounded">
              SYS.LIVE
            </span>
            <button
              type="button"
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-[#cbd5e1] hover:border-[#0284c7] hover:bg-[#eff4ff] transition-all text-[#0b1c30] shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#0284c7]">key</span>
              <span className="hidden sm:inline">Duffel API:</span>
              {token ? (
                <span className="text-[#10b981] font-mono-telemetry font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  Live
                </span>
              ) : (
                <span className="text-[#0284c7] font-mono-telemetry font-bold">
                  Sim Engine
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Embedded ApiKeyModal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaveToken={handleSaveToken}
        currentToken={token}
      />
    </>
  );
}
