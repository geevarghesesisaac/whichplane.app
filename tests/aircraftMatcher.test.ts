import { describe, it, expect } from 'vitest';
import { lookupAircraft, UNKNOWN_AIRFRAME, AIRCRAFT_DATABASE } from '@/data/aircraft';
import { matchAircraftForFlight } from '@/lib/aircraftMatcher';
import { formatTime, formatDate } from '@/lib/utils';

describe('Aviation Taxonomy & Airframe Lookup Engine', () => {
  it('correctly looks up confirmed aircraft by direct IATA ID', () => {
    const a350 = lookupAircraft('351');
    expect(a350.id).toBe('351');
    expect(a350.shortName).toBe('A350-1000');
    expect(a350.isComposite).toBe(true);
    expect(a350.cabinAltitudeFt).toBe(5800);

    const a380 = lookupAircraft('380');
    expect(a380.id).toBe('380');
    expect(a380.family).toBe('A380');
    expect(a380.maxPassengers).toBe(615);
  });

  it('correctly maps IATA and ICAO aliases to canonical airframes', () => {
    expect(lookupAircraft('A380').id).toBe('380');
    expect(lookupAircraft('388').id).toBe('380');
    expect(lookupAircraft('A388').id).toBe('380');

    expect(lookupAircraft('B748').id).toBe('748');
    expect(lookupAircraft('B789').id).toBe('789');
    expect(lookupAircraft('A35K').id).toBe('351');
    expect(lookupAircraft('A21N').id).toBe('32Q');
  });

  it('returns UNKNOWN_AIRFRAME for unlisted or regional aircraft rather than falling back to A350', () => {
    const regional = lookupAircraft('CRJ9');
    expect(regional.id).toBe('UNK');
    expect(regional.isComposite).toBe(false);
    expect(regional.bodyType).toBe('narrowbody');
    expect(regional.cabinAltitudeFt).toBe(8000);

    const turboprop = lookupAircraft('AT7');
    expect(turboprop.id).toBe('UNK');
    expect(turboprop.isComposite).toBe(false);

    const randomCode = lookupAircraft('NON_EXISTENT_CODE_999');
    expect(randomCode.id).toBe('UNK');
    expect(randomCode).toBe(UNKNOWN_AIRFRAME);
  });
});

describe('Prestige Flight Number & Fleet Heuristics Matcher', () => {
  it('accurately identifies Virgin Atlantic VS4 flagship transatlantic sector', () => {
    const result = matchAircraftForFlight({
      airlineCode: 'VS',
      flightNumber: 'VS4',
      origin: 'JFK',
      destination: 'LHR',
      durationMinutes: 420
    });

    expect(result.aircraft.id).toBe('351');
    expect(result.aircraft.name).toContain('Airbus A350-1000');
    expect(result.confidence).toBe('confirmed_at_search_time');
    expect(result.confidencePercent).toBe(98);
  });

  it('accurately identifies Emirates EK201 as A380 Superjumbo', () => {
    const result = matchAircraftForFlight({
      airlineCode: 'EK',
      flightNumber: 'EK201',
      origin: 'JFK',
      destination: 'DXB',
      durationMinutes: 720
    });

    expect(result.aircraft.id).toBe('380');
    expect(result.aircraft.family).toBe('A380');
    expect(result.confidence).toBe('confirmed_at_search_time');
  });
});

describe('Cabin Altitude & Passenger Comfort Filter Invariants', () => {
  it('correctly includes both 787-9 and A350-900 under the sub-6,000ft filter', () => {
    const a350_1000 = AIRCRAFT_DATABASE['351']; // 5800 ft
    const a350_900 = AIRCRAFT_DATABASE['359'];  // 6000 ft
    const b787_9 = AIRCRAFT_DATABASE['789'];    // 6000 ft
    const b777_300 = AIRCRAFT_DATABASE['77W'];  // 8000 ft

    // Rule: sub-6,000 ft filter retains aircraft with cabin altitude <= 6,000 ft (i.e. alt <= 6000, excludes alt > 6000)
    const isSub6000 = (alt?: number) => !alt || alt <= 6000;

    expect(isSub6000(a350_1000.cabinAltitudeFt)).toBe(true);
    expect(isSub6000(a350_900.cabinAltitudeFt)).toBe(true);
    expect(isSub6000(b787_9.cabinAltitudeFt)).toBe(true);
    expect(isSub6000(b777_300.cabinAltitudeFt)).toBe(false);
  });
});

describe('Airport Scheduled Time & Date Determinism', () => {
  it('extracts local scheduled airport clock time without timezone offset distortion', () => {
    // 18:30 departure scheduled from JFK should display as 6:30 PM everywhere
    const formattedDep = formatTime('2026-09-20T18:30:00.000Z');
    expect(formattedDep).toBe('6:30 PM');

    const formattedArr = formatTime('2026-09-21T06:15:00.000Z');
    expect(formattedArr).toBe('6:15 AM');

    const formattedNoon = formatTime('2026-09-20T12:00:00');
    expect(formattedNoon).toBe('12:00 PM');
  });

  it('formats ISO dates deterministically across environments', () => {
    const formatted = formatDate('2026-09-20');
    expect(formatted).toBe('Sep 20, 2026');
  });
});
