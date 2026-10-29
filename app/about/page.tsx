import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'About WhichPlane — Aircraft-First Flight Metasearch',
  description: 'Learn why the physical aircraft matters as much as the ticket price. Discover the science behind cabin altitude, composite airframes, and acoustics.'
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Hero Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#dce9ff] text-xs font-mono-telemetry font-bold text-[#0284c7]">
            <span className="material-symbols-outlined text-[16px]">airlines</span>
            <span>AIRCRAFT-FIRST FLIGHT INTELLIGENCE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0b1c30] tracking-normal leading-tight">
            Fly the plane you <span className="text-[#0284c7]">actually</span> want to fly.
          </h1>
          <p className="text-sm sm:text-base text-[#64748b] leading-relaxed">
            Every mainstream search tool — Google Flights, Skyscanner, Kayak — treats air travel as a commodity sorted solely by price and schedule. Aircraft type is buried in tiny text. We believe the physical airplane is the single most important factor determining your comfort, fatigue, and journey experience.
          </p>
        </div>

        {/* Prominent Hobby & Non-Commercial Disclaimer */}
        <div className="bg-[#fffbeb] border-2 border-[#fcd34d] rounded-2xl p-6 sm:p-7 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-[#b45309]">
            <span className="material-symbols-outlined text-[24px]">warning</span>
            <h2 className="font-headline text-base sm:text-lg font-bold uppercase tracking-wide">
              Important Disclaimer: Hobby Project & Inactive Status
            </h2>
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-[#92400e] leading-relaxed">
            <p>
              <strong>Hobby &amp; Educational Project:</strong> WhichPlane is an independent, non-commercial hobbyist concept and open research project created solely for educational exploration of aircraft taxonomy, aviation telemetry, and cabin comfort metrics.
            </p>
            <p>
              <strong>Currently Inactive / No Booking Functionality:</strong> WhichPlane is <strong>currently inactive as a commercial service</strong>. Users are <strong>not intended or expected to book flights through this platform</strong>.
            </p>
            <p>
              <strong>No Responsibility or Liability:</strong> WhichPlane is not a travel agency, airline broker, or ticketing merchant. We do not sell airline tickets, issue reservations, or process payments. We hold <strong>absolutely no responsibility, liability, or warranty</strong> for any flight schedules, fare quotes, equipment substitutions, or third-party transactions. All data and route schedules are provided strictly for demonstration purposes.
            </p>
          </div>
        </div>

        {/* The 4 Aviation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Cabin Altitude */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">air</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#0b1c30]">
              1. Cabin Pressurization &amp; Jet Lag
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Older aluminum airliners (like Boeing 777-200s or A330s) are pressurized to 8,000 feet because higher pressure causes metal fatigue and structural oxidation. Carbon-composite aircraft like the <strong>Airbus A350</strong> and <strong>Boeing 787 Dreamliner</strong> are pressurized to <strong>5,800–6,000 feet</strong>. Your body absorbs 8% more oxygen, measurably reducing headaches, dehydration, and transatlantic exhaustion.
            </p>
          </div>

          {/* Card 2: Humidity & Air Filtration */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0284c7] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">humidity_mid</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#0b1c30]">
              2. Cabin Humidity &amp; Fresh Air
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Metal airframes rust if the air is humid, forcing airlines to pump bone-dry air (often under 10% humidity). Composite aircraft don&apos;t rust, allowing cabin air conditioning systems to maintain <strong>20% to 25% relative humidity</strong>. You wake up after an 11-hour flight with clear eyes, moist skin, and no scratchy throat.
            </p>
          </div>

          {/* Card 3: Acoustic Decibels */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#d97706] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">volume_down</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#0b1c30]">
              3. Cabin Acoustics &amp; Engine Sound
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Continuous low-frequency engine drone causes profound cognitive fatigue. The <strong>Airbus A380 Superjumbo</strong> is the quietest passenger aircraft ever flown at <strong>59 dB</strong> in cruise. Modern serrated chevron engines (like GEnx on the 787) reduce acoustic decibels by 50% compared to legacy turbofans.
            </p>
          </div>

          {/* Card 4: Safety & AvGeek Bucket Lists */}
          <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fdf2f8] text-[#db2777] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">shield_check</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#0b1c30]">
              4. Traveler Sentiment &amp; Bucket Lists
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Whether you want to <strong>exclude the Boeing 737 MAX</strong> for safety peace of mind, chase the remaining routes for the double-decker <strong>Airbus A380</strong> and <strong>Boeing 747 Queen of the Skies</strong> before they retire, or pick the Airbus A330 for its 2-4-2 couple seats, WhichPlane gives you complete control over your airframe.
            </p>
          </div>
        </div>

        {/* Metasearch Model */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7] text-[24px]">hub</span>
            <h2 className="font-headline text-xl font-bold text-[#0b1c30]">
              How WhichPlane Works (The Metasearch Model)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
            WhichPlane is modeled as an <strong>aircraft metasearch aggregator</strong>. We do not sell airline tickets, we do not handle customer credit cards, and we never process passenger transactions.
          </p>
          <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
            When you find a flight on an aircraft you love, clicking <strong>&quot;Select Flight&quot;</strong> connects you directly to the airline&apos;s official booking portal or verified ticketing platform.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-headline text-xs font-bold transition-all shadow-xs"
            >
              <span>Explore Flight Lines on WhichPlane</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
