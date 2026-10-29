import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy & Cookie Disclosures — WhichPlane',
  description: 'Learn how WhichPlane handles telemetry data, affiliate tracking cookies, and your privacy rights under GDPR and CCPA.'
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-2 border-b border-[#e2e8f0] pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#eff4ff] text-[#0284c7] font-mono-telemetry text-xs font-bold uppercase tracking-wider">
            LEGAL COMPLIANCE // GDPR & CCPA
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0b1c30]">
            Privacy Policy & Cookie Disclosures
          </h1>
          <p className="text-xs text-[#64748b] font-mono-telemetry">
            Last Updated: September 2026 • Applies to WhichPlane and related services
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-xs space-y-6 text-xs sm:text-sm text-[#45464d] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              1. Overview & Our Core Privacy Commitment
            </h2>
            <p>
              WhichPlane (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the flight metasearch discovery platform known as <strong>WhichPlane</strong>. We respect your privacy and are committed to transparent data practices. 
            </p>
            <p className="p-3 bg-[#eff4ff] border border-[#dce9ff] rounded-lg text-[#0b1c30] font-medium">
              🛡️ <strong>We Never Collect Payment or Passenger Identity Data:</strong> WhichPlane is a search and discovery demonstration. We do not process transactions, we do not store credit card details, and we do not request passport numbers or sensitive traveler profiles. All purchases take place directly on third-party airline or travel agency booking sites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              2. Information We Collect
            </h2>
            <p>When you use WhichPlane, we may automatically process non-personally identifiable technical information, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#64748b]">
              <li><strong>Flight Search Queries:</strong> Origin airport, destination airport, departure dates, cabin class, and passenger counts.</li>
              <li><strong>Device & Network Telemetry:</strong> IP address, browser type and version, operating system, and language settings.</li>
              <li><strong>Interaction Logs:</strong> Clicks on flight cards, aircraft filter selections, and referral timestamps.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              3. Affiliate Tracking & Cookies
            </h2>
            <p>
              WhichPlane participates in travel affiliate networks, including <strong>Travelpayouts</strong> and the <strong>Aviasales Partner Program</strong>. 
            </p>
            <p>
              When you click an outbound link such as <em>&quot;Select Flight&quot;</em> or <em>&quot;Airframe Specs &amp; Seat Map,&quot;</em> a tracking parameter (such as a Partner Marker ID) is attached to the destination URL. A 30-day tracking cookie may be deposited on your device by the affiliate network or merchant. This cookie records that you were referred by WhichPlane so that we may receive a commission if you complete a flight purchase. These cookies do not store personal identification or financial information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              4. Third-Party Links & External Platforms
            </h2>
            <p>
              WhichPlane contains links to third-party airline websites, global distribution systems, and online travel agencies. Once you click an outbound link and leave WhichPlane, your activities and purchases are governed exclusively by that third party&apos;s privacy policy and terms of service. We encourage you to review their policies prior to completing transactions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              5. Your Privacy Rights (GDPR &amp; CCPA / CPRA)
            </h2>
            <p>
              Depending on your location, you may have legal rights under the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#64748b]">
              <li>The right to know what personal telemetry data is collected about you.</li>
              <li>The right to request deletion or restriction of your data.</li>
              <li>The right to opt-out of non-essential cookies via your browser settings.</li>
            </ul>
            <p>We do not sell personal data to data brokers or third parties.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-headline text-base font-bold text-[#0b1c30]">
              6. Contact Us
            </h2>
            <p>
              If you have questions or concerns regarding this Privacy Policy, please contact our team at:
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
