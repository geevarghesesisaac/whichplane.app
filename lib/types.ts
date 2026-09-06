export type Manufacturer = 'Airbus' | 'Boeing' | 'Embraer' | 'Bombardier' | 'ATR' | 'Other';

export type BodyType = 'widebody' | 'narrowbody' | 'regional';

export type ProductionStatus = 'in_production' | 'discontinued';

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

export type AircraftConfidence = 'confirmed_at_search_time' | 'typically_operates';

export interface AircraftType {
  id: string; // IATA code or canonical key (e.g., '380', '789', '359', '7M8', '748')
  name: string; // e.g. "Airbus A380-800"
  shortName: string; // e.g. "A380"
  manufacturer: Manufacturer;
  family: string; // e.g. "A380", "787 Dreamliner", "737 MAX", "A350", "747 Queen of the Skies"
  bodyType: BodyType;
  isComposite: boolean; // 787 & A350 lower cabin altitude (6,000ft) & higher humidity
  cabinAltitudeFt?: number; // e.g. 6000 for composite, 8000 for standard aluminum
  humidityPercent?: string; // e.g. "Up to 20-25%" vs "10-15%"
  productionStatus: ProductionStatus;
  seatingTypicalLayout?: string; // e.g. "3-4-3 (Main deck) / 2-4-2 (Upper deck)" or "3-3-3" or "3-3"
  aisles: 1 | 2;
  funFacts: string[];
  whyFlyThis: string;
  retirementRisk?: string; // e.g. "Production ended 2021; retiring across multiple fleets"
  iconType: 'quad_jet_double_deck' | 'twin_wide' | 'quad_wide' | 'narrow' | 'regional';
  primaryAirlines?: string[];
}

export interface FlightSegment {
  id: string;
  origin: {
    code: string;
    name: string;
    city: string;
    terminal?: string;
  };
  destination: {
    code: string;
    name: string;
    city: string;
    terminal?: string;
  };
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  durationMinutes: number;
  flightNumber: string;
  marketingCarrier: {
    code: string;
    name: string;
    logoUrl?: string;
  };
  operatingCarrier: {
    code: string;
    name: string;
  };
  aircraftIataCode: string;
  aircraftName: string;
  aircraft: AircraftType;
  confidence: AircraftConfidence;
  confidenceNote?: string;
  cabinClass: CabinClass;
}

export interface FlightOffer {
  id: string;
  searchId?: string;
  source: 'duffel_live' | 'duffel_test' | 'verified_simulation';
  price: {
    amount: number;
    currency: string;
    formatted: string;
  };
  totalDurationMinutes: number;
  stops: number;
  segments: FlightSegment[];
  primaryAircraft: AircraftType;
  allAircraft: AircraftType[];
  containsComposite: boolean;
  containsBoeing737Max: boolean;
  containsA380: boolean;
  contains747: boolean;
  bookingUrl: string;
  directAirlineUrl?: string;
  deeplinkType: 'airline_direct' | 'aggregator';
  hasSeatMap?: boolean;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  cabinClass: CabinClass;
  passengers: number;
}

export interface FilterState {
  manufacturers: Manufacturer[];
  families: string[];
  bodyTypes: BodyType[];
  compositeOnly: boolean;
  excludeBoeing737Max: boolean;
  chaseA380Or747: boolean;
  newGenOnly: boolean; // 787, A350, A321neo, 737 MAX, A220
  maxStops: number | null; // null = any, 0 = non-stop, 1 = max 1 stop
  maxPrice: number | null;
  selectedAirlines: string[];
  sortBy: 'price_asc' | 'duration_asc' | 'departure_time' | 'widebody_first' | 'newest_aircraft';
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  flag: string;
}
