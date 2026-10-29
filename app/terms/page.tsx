import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service — WhichPlane',
  description: 'Read the terms and conditions governing the use of WhichPlane flight metasearch aggregator.'
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-2 border-b border-[#e2e8f0] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#eff4ff] text-[#0284c7] font-mono-telemetry text-xs font-bold uppercase tracking-wider">
            LEGAL TERMS & CONDITIONS
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0b1c30]">
            Terms of Service & Metasearch Disclaimer
          </h1>
          <p className="text-xs text-[#64748b] font-mono-telemetry">
            Last Updated: September 2026 • Applies to WhichPlane
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-6 text-xs sm:text-sm text-[#45464d] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              1. Acceptance of Terms & Hobby Status
            </h2>
            <p>
              By accessing or using WhichPlane (<strong>WhichPlane</strong>), you acknowledge and agree that this is an independent, non-commercial educational demonstration and hobbyist project. WhichPlane is currently inactive as a commercial booking service, and users are not intended or expected to complete travel transactions through this platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              2. Metasearch Aggregator Role (Not a Travel Agency)
            </h2>
            <p>
              WhichPlane is an <strong>independent flight metasearch discovery concept</strong>. We display aircraft airframe specifications, flight schedules, and estimated fares provided by airlines and partner distribution networks.
            </p>
            <p className="p-3 bg-[#eff4ff] border border-[#dce9ff] rounded-lg text-[#0b1c30] font-medium">
              ✈️ <strong>No Ticket Sales or Customer Payments:</strong> WhichPlane does not sell flight tickets, does not establish fares, does not issue boarding passes, and does not accept or process payments. All flight bookings, changes, cancellations, baggage fees, and customer service inquiries are handled solely by the operating airline or third-party booking vendor where your purchase is finalized.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              3. Aircraft Equipment & Confidence Disclaimer
            </h2>
            <p>
              WhichPlane displays aircraft models (such as Airbus A350, Boeing 787, Airbus A380, and Boeing 747), cabin altitudes, acoustic decibels, and seat configurations based on published airline schedules and airline equipment lines at search time.
            </p>
            <p className="p-3 bg-[#fef3c7] border border-[#fde68a] rounded-lg text-[#92400e]">
              ⚠️ <strong>Operational Equipment Swaps:</strong> Commercial airlines reserve the legal right under their contract of carriage to substitute airframes or change aircraft models at any time prior to departure due to mechanical maintenance, weather disruptions, crew scheduling, or fleet operational demands. WhichPlane cannot guarantee that an airline will not substitute an aircraft after your ticket is purchased.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              4. Accuracy of Fares & Availability
            </h2>
            <p>
              Airfares, seat availability, and flight times fluctuate rapidly based on global airline dynamic pricing. While WhichPlane strives to display current pricing from our affiliate partners, final ticket prices and availability are verified and confirmed on the airline or seller&apos;s checkout page. WhichPlane is not liable for price discrepancies between search results and checkout totals.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              5. Limitation of Liability & Non-Responsibility
            </h2>
            <p>
              To the fullest extent permitted by law, WhichPlane and its operators shall not be liable for any direct, indirect, punitive, or consequential damages resulting from flight delays, missed connections, cancellations, equipment substitutions, or issues arising from transactions made with third-party airlines or travel agencies. WhichPlane is provided &quot;as is&quot; without any warranty of any kind.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              6. Permitted Use & Intellectual Property
            </h2>
            <p>
              All content, design tokens, AeroPrecision visual systems, aircraft taxonomies, and software interfaces on WhichPlane are protected by copyright and intellectual property laws. You agree not to scrape, reverse engineer, or perform automated queries against our API routes without written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              7. Contact & Legal Notices
            </h2>
            <p>
              For legal inquiries regarding these Terms of Service, please reach out to:
            </p>
            <div className="p-3 bg-[#f8f9fc] border border-[#e2e8f0] rounded-lg font-mono-telemetry text-xs text-[#0b1c30]">
              Email: contact@creddio.co • Project: WhichPlane
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
