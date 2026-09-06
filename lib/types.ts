export type Manufacturer = 'Airbus' | 'Boeing' | 'Embraer' | 'Bombardier' | 'ATR' | 'Other';

export type BodyType = 'widebody' | 'narrowbody' | 'regional';

export type ProductionStatus = 'in_production' | 'discontinued';

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

export type AircraftConfidence = 'confirmed_at_search_time' | 'typically_operates';

export interface AircraftType {
  id: string; // IATA code or canonical key (e.g. '380', '789', '351', '7M8', '748')
  icaoCode: string; // ICAO code (e.g. 'A388', 'B789', 'A35K', 'B748')
  name: string; // e.g. "Airbus A350-1000 XWB"
  shortName: string; // e.g. "A350-1000"
  manufacturer: Manufacturer;
  family: string; // e.g. "A350", "787 Dreamliner", "A380", "777", "747 Queen of the Skies"
  bodyType: BodyType;
  isComposite: boolean;
  compositePercent?: string; // e.g. "53% Carbon Composite"
  cabinAltitudeFt?: number; // e.g. 5800, 6000, 8000
  acousticRating?: string; // e.g. "68 dB Quiet"
  humidityPercent?: string; // e.g. "20-25%"
  productionStatus: ProductionStatus;
  seatingTypicalLayout?: string;
  aisles: 1 | 2;
  engineVariants: string[]; // e.g. ["Rolls-Royce Trent XWB-97"]
  wakeTurbulence: 'SUPER HEAVY' | 'HEAVY' | 'MEDIUM' | 'LIGHT';
  wingspan: string; // e.g. "64.75 m (212 ft 5 in)"
  maxPassengers: number; // e.g. 480
  funFacts: string[];
  whyFlyThis: string;
  retirementRisk?: string;
  primaryAirlines: string[];
  heroImageUrl: string;
  subdeckSchematic?: {
    upperDeckName?: string;
    upperDeckDesc?: string;
    mainDeckName?: string;
    mainDeckDesc?: string;
  };
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
    logoLetter?: string;
  };
  operatingCarrier: {
    code: string;
    name: string;
    isCodeshare?: boolean;
    codeshareNotice?: string;
  };
  aircraftIataCode: string;
  aircraftName: string;
  aircraft: AircraftType;
  confidence: AircraftConfidence;
  confidenceNote?: string;
  confidencePercent?: number; // e.g. 98
  tailRegistration?: string; // e.g. "G-VLUX 'Red Velvet'"
  seatPitch?: string; // e.g. '34"'
  seatModel?: string; // e.g. 'Collins Horizon'
  wifiGeneration?: string; // e.g. 'Ka-Band Satellite'
  engineVariant?: string; // e.g. 'RR Trent XWB-97'
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
  acousticChevronsOnly: boolean;
  sub6000FtAltitudeOnly: boolean;
  maxStops: number | null;
  maxPrice: number | null;
  selectedAirlines: string[];
  sortBy: 'best_spec' | 'price_asc' | 'duration_asc' | 'departure_time';
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  flag: string;
}
