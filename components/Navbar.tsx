'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plane, Compass, Key, Sparkles } from 'lucide-react';
import ApiKeyModal from '@/components/ApiKeyModal';

interface NavbarProps {
  onTokenChange?: (token: string) => void;
  customToken?: string;
}

export default function Navbar({ onTokenChange, customToken }: NavbarProps) {
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
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors">
                  WhichPlane
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  app
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal hidden sm:block">
                Fly the aircraft you actually want to fly
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link
              href="/"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Plane className="w-4 h-4 text-sky-400" />
              <span>Search</span>
            </Link>
            <Link
              href="/aircraft"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Aircraft Taxonomy</span>
            </Link>
            <Link
              href="/aircraft/380"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>A380 Routes</span>
            </Link>
          </nav>

          {/* Right Action: Duffel API Key / Engine Status */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700/70 hover:border-sky-500/40 hover:bg-slate-800 transition-all text-slate-300 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Duffel API:</span>
              {token ? (
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Key
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Demo / Ready
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
