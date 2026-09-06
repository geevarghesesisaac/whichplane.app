'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, Search } from 'lucide-react';

interface AircraftPassportLoggerProps {
  aircraftId: string;
  aircraftName: string;
  shortName: string;
}

export default function AircraftPassportLogger({
  aircraftId,
  aircraftName,
  shortName
}: AircraftPassportLoggerProps) {
  const [logged, setLogged] = useState(false);
  const [loggedCount, setLoggedCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`whichplane_passport_${aircraftId}`);
      if (stored) {
        setLogged(true);
      }
      const totalStored = localStorage.getItem('whichplane_passport_total') || '0';
      setLoggedCount(parseInt(totalStored, 10));
    } catch {
      // ignore SSR or restricted localStorage
    }
  }, [aircraftId]);

  const handleTogglePassport = () => {
    try {
      if (!logged) {
        localStorage.setItem(`whichplane_passport_${aircraftId}`, new Date().toISOString());
        const newCount = loggedCount + 1;
        localStorage.setItem('whichplane_passport_total', newCount.toString());
        setLogged(true);
        setLoggedCount(newCount);
      } else {
        localStorage.removeItem(`whichplane_passport_${aircraftId}`);
        const newCount = Math.max(0, loggedCount - 1);
        localStorage.setItem('whichplane_passport_total', newCount.toString());
        setLogged(false);
        setLoggedCount(newCount);
      }
    } catch {
      setLogged(!logged);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 rounded-2xl text-white shadow-xl border border-slate-800 relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none select-none text-9xl font-mono-telemetry font-black text-sky-400">
        {shortName}
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sky-400">
            <Award className="w-5 h-5" />
            <span className="font-mono-telemetry text-xs uppercase tracking-[0.08em] font-bold">
              AVGEEK PASSPORT LOGBOOK
            </span>
          </div>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-[0.015em] leading-snug">
            Flown on the {shortName}?
          </h3>
          <p className="font-body text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Add the {aircraftName} to your personal WhichPlane logged aircraft fleet. Stamp your tail badge, track your flight hours, and build your certified AvGeek airframe passport.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            onClick={handleTogglePassport}
            className={`py-3 px-5 rounded-xl font-mono-telemetry text-xs font-bold tracking-[0.04em] flex items-center justify-center gap-2 transition-all shadow-md ${
              logged
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
            }`}
          >
            {logged ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Stamped in My AvGeek Passport!</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                <span>Log {shortName} to My Passport</span>
              </>
            )}
          </button>

          <Link
            href={`/?search=${aircraftId}`}
            className="py-3 px-5 rounded-xl font-mono-telemetry text-xs font-bold tracking-[0.04em] bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-all"
          >
            <Search className="w-4 h-4 text-sky-300" />
            <span>Search All {shortName} Flights</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
