import { Airport } from '@/lib/types';

export const MAJOR_AIRPORTS: Airport[] = [
  // North America
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States', flag: '🇺🇸' },
  { code: 'EWR', name: 'Newark Liberty International Airport', city: 'New York / Newark', country: 'United States', flag: '🇺🇸' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States', flag: '🇺🇸' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', flag: '🇺🇸' },
  { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States', flag: '🇺🇸' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States', flag: '🇺🇸' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States', flag: '🇺🇸' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States', flag: '🇺🇸' },
  { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States', flag: '🇺🇸' },
  { code: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States', flag: '🇺🇸' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States', flag: '🇺🇸' },
  { code: 'IAD', name: 'Washington Dulles International Airport', city: 'Washington D.C.', country: 'United States', flag: '🇺🇸' },
  { code: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada', flag: '🇨🇦' },
  { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada', flag: '🇨🇦' },

  // Europe
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', flag: '🇫🇷' },
  { code: 'FRA', name: 'Frankfurt am Main Airport', city: 'Frankfurt', country: 'Germany', flag: '🇩🇪' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany', flag: '🇩🇪' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas Airport', city: 'Madrid', country: 'Spain', flag: '🇪🇸' },
  { code: 'BCN', name: 'Josep Tarradellas Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain', flag: '🇪🇸' },
  { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino Airport', city: 'Rome', country: 'Italy', flag: '🇮🇹' },
  { code: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Ireland', flag: '🇮🇪' },

  // Middle East
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'AUH', name: 'Zayed International Airport', city: 'Abu Dhabi', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', flag: '🇶🇦' },
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', flag: '🇹🇷' },

  // Asia & Pacific
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
  { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  { code: 'NRT', name: 'Tokyo Narita Airport', city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', flag: '🇰🇷' },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong SAR', flag: '🇭🇰' },
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', flag: '🇦🇺' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', flag: '🇦🇺' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', flag: '🇹🇭' },
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', flag: '🇮🇳' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India', flag: '🇮🇳' }
];

export function findAirport(query: string): Airport[] {
  if (!query) return MAJOR_AIRPORTS.slice(0, 8);
  const q = query.toLowerCase().trim();
  return MAJOR_AIRPORTS.filter(
    a =>
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
  );
}
