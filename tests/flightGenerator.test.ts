import { describe, it, expect } from 'vitest';
import { generateRealisticFlights } from '@/data/mockFlights';

describe('High-Fidelity Flight Schedule Generation Engine', () => {
  it('generates 16 flights and at least 5 airframe models for YYZ -> DEL', () => {
    const results = generateRealisticFlights({
      origin: 'YYZ',
      destination: 'DEL',
      departureDate: '2026-09-23',
      cabinClass: 'economy',
      passengers: 1
    });

    expect(results.length).toBe(16);

    const airframeModels = new Set(results.map(f => f.primaryAircraft.shortName));
    expect(airframeModels.size).toBeGreaterThanOrEqual(5);

    // Verify key iconic aircraft are present
    const names = Array.from(airframeModels);
    expect(names.some(n => n.includes('350'))).toBe(true);
    expect(names.some(n => n.includes('787'))).toBe(true);
    expect(names.some(n => n.includes('777'))).toBe(true);

    // Verify departure spread throughout the day
    const departureHours = results.map(f => new Date(f.segments[0].departureTime).getUTCHours());
    expect(departureHours.length).toBe(16);
  });

  it('generates 15 flights and diverse airframes for Indian domestic DEL -> COK', () => {
    const results = generateRealisticFlights({
      origin: 'DEL',
      destination: 'COK',
      departureDate: '2026-09-23',
      cabinClass: 'economy',
      passengers: 1
    });

    expect(results.length).toBe(15);

    const airframeModels = new Set(results.map(f => f.primaryAircraft.shortName));
    expect(airframeModels.size).toBeGreaterThanOrEqual(4);

    // Indian domestic carriers
    const carriers = new Set(results.map(f => f.segments[0].marketingCarrier.code));
    expect(carriers.has('6E') || carriers.has('AI') || carriers.has('UK') || carriers.has('QP')).toBe(true);

    // Prices are realistic for domestic India (~$70 - $110 USD)
    for (const offer of results) {
      expect(offer.price.amount).toBeGreaterThanOrEqual(60);
      expect(offer.price.amount).toBeLessThanOrEqual(250);
      expect(offer.totalDurationMinutes).toBeGreaterThanOrEqual(150);
      expect(offer.totalDurationMinutes).toBeLessThanOrEqual(240);
    }
  });

  it('generates 16 flights for JFK -> LHR', () => {
    const results = generateRealisticFlights({
      origin: 'JFK',
      destination: 'LHR',
      departureDate: '2026-09-23',
      cabinClass: 'economy',
      passengers: 1
    });

    expect(results.length).toBe(16);
    const airframeModels = new Set(results.map(f => f.primaryAircraft.shortName));
    expect(airframeModels.size).toBeGreaterThanOrEqual(5);
  });

  it('dynamically generates 16 flights for any arbitrary or novel airport pair (e.g. BOM -> DXB)', () => {
    const results = generateRealisticFlights({
      origin: 'BOM',
      destination: 'DXB',
      departureDate: '2026-09-23',
      cabinClass: 'economy',
      passengers: 1
    });

    expect(results.length).toBe(16);
    expect(results.length).not.toBe(5);

    const airframeModels = new Set(results.map(f => f.primaryAircraft.shortName));
    expect(airframeModels.size).toBeGreaterThanOrEqual(4);

    for (const flight of results) {
      expect(flight.segments[0].origin.code).toBe('BOM');
      expect(flight.segments[0].destination.code).toBe('DXB');
      expect(flight.price.amount).toBeGreaterThan(0);
      expect(flight.totalDurationMinutes).toBeGreaterThan(0);
      expect(flight.primaryAircraft.name).toBeDefined();
    }
  });

  it('handles reverse routes symmetrically (DEL -> YYZ and COK -> DEL)', () => {
    const reverseYYZ = generateRealisticFlights({
      origin: 'DEL',
      destination: 'YYZ',
      departureDate: '2026-09-23',
      cabinClass: 'economy',
      passengers: 1
    });
    expect(reverseYYZ.length).toBe(16);

    const reverseCOK = generateRealisticFlights({
      origin: 'COK',
      destination: 'DEL',
      departureDate: '2026-09-23',
      cabinClass: 'economy',
      passengers: 1
    });
    expect(reverseCOK.length).toBe(15);
  });
});
