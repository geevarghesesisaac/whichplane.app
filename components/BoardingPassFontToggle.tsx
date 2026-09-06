'use client';

import React, { useState, useEffect } from 'react';
import { Ticket, Terminal } from 'lucide-react';

export default function BoardingPassFontToggle() {
  const [fontMode, setFontMode] = useState<'authentic' | 'terminal'>('authentic');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('whichplane_font_mode') as 'authentic' | 'terminal' | null;
      if (saved === 'terminal' || saved === 'authentic') {
        setFontMode(saved);
        document.documentElement.setAttribute('data-font-mode', saved);
      } else {
        document.documentElement.setAttribute('data-font-mode', 'authentic');
      }
    } catch {
      // ignore
    }
  }, []);

  const handleToggle = () => {
    const nextMode = fontMode === 'authentic' ? 'terminal' : 'authentic';
    setFontMode(nextMode);
    document.documentElement.setAttribute('data-font-mode', nextMode);
    try {
      localStorage.setItem('whichplane_font_mode', nextMode);
    } catch {
      // ignore
    }
  };

  if (!mounted) {
    return (
      <div className="h-7 w-36 rounded-lg bg-slate-100 animate-pulse hidden sm:block" />
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`group px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1.5 shadow-xs ${
        fontMode === 'authentic'
          ? 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100 hover:border-sky-300'
          : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
      }`}
      title={
        fontMode === 'authentic'
          ? 'Currently in Option A: Authentic Boarding Pass (Helvetica Headlines + OCR-B Telemetry). Click to switch to Option B.'
          : 'Currently in Option B: Terminal Machine (OCR-B Headlines + Helvetica Telemetry). Click to switch to Option A.'
      }
    >
      {fontMode === 'authentic' ? (
        <>
          <Ticket className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span className="font-mono-telemetry font-bold tracking-tight">
            OPTION A: <span className="underline decoration-sky-400">AUTHENTIC PASS</span>
          </span>
        </>
      ) : (
        <>
          <Terminal className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-mono-telemetry font-bold tracking-tight">
            OPTION B: <span className="underline decoration-amber-500">TERMINAL MACHINE</span>
          </span>
        </>
      )}
    </button>
  );
}
