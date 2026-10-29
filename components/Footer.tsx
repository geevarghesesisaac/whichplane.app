import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#e2e8f0] bg-white mt-12 text-[#45464d]">
      {/* Top 4-Column Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
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
                <span className="font-headline text-lg font-bold leading-none tracking-[0.02em] text-[#0b1c30]">
                  Which<span className="text-[#0284c7]">Plane</span>
                </span>
                <span className="font-mono-telemetry text-[9px] font-bold text-[#0284c7] uppercase tracking-[0.08em] mt-1">
                  AERO // PRECISION METASEARCH
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Fly on the plane you actually want to fly. WhichPlane is an aircraft-first flight discovery concept, putting cabin altitude, composite airframes, and acoustics on equal footing with price and schedule.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#eff4ff] border border-[#dce9ff] text-[11px] font-mono-telemetry font-semibold text-[#0284c7]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>RADAR LIVE // 250+ HUBS MONITORED</span>
            </div>
          </div>

          {/* Col 2: Aircraft Taxonomy */}
          <div className="space-y-3">
            <h4 className="font-mono-telemetry text-xs font-bold text-[#0b1c30] uppercase tracking-[0.08em]">
              AIRCRAFT TAXONOMY
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/aircraft/351" className="text-[#64748b] hover:text-[#0284c7] transition-colors flex items-center justify-between">
                  <span>Airbus A350-1000 XWB</span>
                  <span className="font-mono-telemetry text-[10px] text-[#10b981] font-bold">5,800 FT</span>
                </Link>
              </li>
              <li>
                <Link href="/aircraft/380" className="text-[#64748b] hover:text-[#0284c7] transition-colors flex items-center justify-between">
                  <span>Airbus A380-800 Superjumbo</span>
                  <span className="font-mono-telemetry text-[10px] text-[#0284c7] font-bold">59 DB QUIET</span>
                </Link>
              </li>
              <li>
                <Link href="/aircraft/748" className="text-[#64748b] hover:text-[#0284c7] transition-colors flex items-center justify-between">
                  <span>Boeing 747-8 Queen of Skies</span>
                  <span className="font-mono-telemetry text-[10px] text-[#f59e0b] font-bold">UPPER DECK</span>
                </Link>
              </li>
              <li>
                <Link href="/aircraft/789" className="text-[#64748b] hover:text-[#0284c7] transition-colors flex items-center justify-between">
                  <span>Boeing 787-9 Dreamliner</span>
                  <span className="font-mono-telemetry text-[10px] text-[#10b981] font-bold">COMPOSITE</span>
                </Link>
              </li>
              <li>
                <Link href="/aircraft/339" className="text-[#64748b] hover:text-[#0284c7] transition-colors flex items-center justify-between">
                  <span>Airbus A330-900neo</span>
                  <span className="font-mono-telemetry text-[10px] text-[#64748b] font-bold">2-4-2 PAIRS</span>
                </Link>
              </li>
              <li>
                <Link href="/aircraft" className="text-[#0284c7] font-bold hover:underline flex items-center gap-1 pt-1">
                  <span>View Full Airframe Catalog</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Aviation Science & Super-Filters */}
          <div className="space-y-3">
            <h4 className="font-mono-telemetry text-xs font-bold text-[#0b1c30] uppercase tracking-[0.08em]">
              AVGEEK FILTERS & SCIENCE
            </h4>
            <ul className="space-y-2 text-xs text-[#64748b]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#10b981]">spa</span>
                <span>Composite Only (6,000 ft Cabin Alt)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">shield_lock</span>
                <span>Exclude Boeing 737 MAX Toggle</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#f59e0b]">flight_class</span>
                <span>Chase Superjumbo A380 & 747</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#0284c7]">volume_down</span>
                <span>Acoustic Serrated Chevron Engines</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#64748b]">grid_view</span>
                <span>Twin-Aisle Widebody Comfort</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-mono-telemetry text-xs font-bold text-[#0b1c30] uppercase tracking-[0.08em]">
              LEGAL & TRANSPARENCY
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-[#64748b] hover:text-[#0284c7] transition-colors">
                  About WhichPlane
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#64748b] hover:text-[#0284c7] transition-colors">
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#64748b] hover:text-[#0284c7] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-[#64748b]">
                  US DOT Operating Carrier Compliant
                </span>
              </li>
            </ul>
            <div className="pt-1">
              <span className="text-[11px] text-[#64748b] font-mono-telemetry block">
                Educational Demonstration
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Legal & Disclaimer Strip */}
      <div className="border-t border-[#f1f5f9] bg-[#f8f9fc] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3 text-[11px] leading-relaxed text-[#64748b]">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[16px] text-[#0284c7] shrink-0 mt-0.5">info</span>
            <p>
              <strong className="text-[#0b1c30]">Hobby Project &amp; Inactive Status:</strong> WhichPlane is an independent educational hobby project and aircraft discovery demonstration. It is not an active travel booking service. Users are not intended to purchase flights through this platform, and WhichPlane does not sell tickets, process payments, or assume liability for travel arrangements.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[16px] text-[#f59e0b] shrink-0 mt-0.5">warning</span>
            <p>
              <strong className="text-[#0b1c30]">Aircraft Equipment Confidence Disclaimer:</strong> Aircraft types, tail numbers, and seat configurations are derived from published airline dispatch lines and historical schedule matrices. Commercial airlines reserve the legal right to substitute airframes and reassign equipment for maintenance, weather, or operational requirements prior to departure. Always confirm the scheduled aircraft during airport check-in.
            </p>
          </div>

          <div className="pt-2 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p className="font-mono-telemetry">
              &copy; {new Date().getFullYear()} WhichPlane. All rights reserved. AeroPrecision Design System.
            </p>
            <div className="flex items-center gap-4 text-[#64748b]">
              <Link href="/about" className="hover:text-[#0284c7]">About</Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-[#0284c7]">Privacy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#0284c7]">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
