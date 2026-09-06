import { AircraftType } from '@/lib/types';

export const AIRCRAFT_DATABASE: Record<string, AircraftType> = {
  // --- ICONIC JUMBOS & HEAVIES ---
  '380': {
    id: '380',
    name: 'Airbus A380-800 Superjumbo',
    shortName: 'Airbus A380',
    manufacturer: 'Airbus',
    family: 'A380',
    bodyType: 'widebody',
    isComposite: false,
    cabinAltitudeFt: 6500,
    humidityPercent: '15-18%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-4-3 (Main deck) / 2-4-2 (Upper deck)',
    aisles: 2,
    funFacts: [
      'The largest passenger airliner ever built, with 5,920 sq ft of usable floor space across two full decks.',
      'So quiet inside that pilots report hearing passengers snoring in the first few rows.',
      'Production officially ended in 2021 with the 251st airframe delivered to Emirates.'
    ],
    whyFlyThis: 'A once-in-a-generation double-decker experience with bar lounges, showers (Emirates first class), and unparalleled quietness.',
    retirementRisk: 'High. Airlines (Air France, Thai, Malaysia) have retired their fleets. Catch it while Emirates, Singapore, British Airways, and Qantas still fly it.',
    iconType: 'quad_jet_double_deck',
    primaryAirlines: ['Emirates', 'British Airways', 'Singapore Airlines', 'Qantas', 'Qatar Airways', 'Lufthansa', 'All Nippon Airways (ANA)']
  },

  '748': {
    id: '748',
    name: 'Boeing 747-8 Intercontinental',
    shortName: 'Boeing 747-8',
    manufacturer: 'Boeing',
    family: '747 Queen of the Skies',
    bodyType: 'widebody',
    isComposite: false,
    cabinAltitudeFt: 7000,
    humidityPercent: '14-17%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-4-3 (Main deck) / 2-2 (Upper deck hump)',
    aisles: 2,
    funFacts: [
      'The longest passenger airliner in service at 250 ft 2 in (76.25 m).',
      'Uses GEnx engines with serrated chevron nacelles for reduced engine noise.',
      'Only 3 airlines in the world fly passenger 747-8s: Lufthansa, Korean Air, and Air China.'
    ],
    whyFlyThis: 'Sitting in the nose (Row 1 is ahead of the pilots!) or up the spiral stairs in the upper deck is the pinnacle of civil aviation romance.',
    retirementRisk: 'Extremely high rarity. One of the last remaining 4-engine passenger aircraft in active commercial service.',
    iconType: 'quad_wide',
    primaryAirlines: ['Lufthansa', 'Korean Air', 'Air China']
  },

  '744': {
    id: '744',
    name: 'Boeing 747-400',
    shortName: 'Boeing 747-400',
    manufacturer: 'Boeing',
    family: '747 Queen of the Skies',
    bodyType: 'widebody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-4-3 (Main) / 2-2 (Upper deck)',
    aisles: 2,
    funFacts: [
      'The definitive 1990s long-haul flagship with distinctive 6-foot canted winglets.',
      'Virtually all major international airlines (BA, KLM, Qantas, United) retired their passenger fleets during 2020.'
    ],
    whyFlyThis: 'Historic avgeek bucket-list flight; rarely available outside niche seasonal charters (e.g., Mahan Air, Atlas charters).',
    retirementRisk: 'Practically extinct in scheduled scheduled commercial passenger operations.',
    iconType: 'quad_wide',
    primaryAirlines: ['Charter / Specialized operators']
  },

  // --- COMPOSITE WIDEBODIES (LOW CABIN ALTITUDE / HIGH HUMIDITY) ---
  '789': {
    id: '789',
    name: 'Boeing 787-9 Dreamliner',
    shortName: 'Boeing 787-9',
    manufacturer: 'Boeing',
    family: '787 Dreamliner',
    bodyType: 'widebody',
    isComposite: true,
    cabinAltitudeFt: 6000,
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Economy) / 1-2-1 (Business)',
    aisles: 2,
    funFacts: [
      '50% of the airframe by weight is carbon-fiber reinforced polymer, allowing higher cabin pressurization without structural fatigue.',
      'Windows are 65% larger than standard airliners and dim electronically using electrochromic gel at the touch of a button.',
      'HEPA filtration and gaseous gaseous filtration remove volatile compounds, leaving passengers significantly less fatigued.'
    ],
    whyFlyThis: 'Noticeably lower fatigue and jet lag thanks to 6,000 ft cabin altitude and 20%+ humidity (standard planes are 8,000 ft and 10% dry air).',
    iconType: 'twin_wide',
    primaryAirlines: ['United Airlines', 'British Airways', 'Virgin Atlantic', 'Qantas', 'ANA', 'Qatar Airways', 'Air Canada', 'KLM']
  },

  '788': {
    id: '788',
    name: 'Boeing 787-8 Dreamliner',
    shortName: 'Boeing 787-8',
    manufacturer: 'Boeing',
    family: '787 Dreamliner',
    bodyType: 'widebody',
    isComposite: true,
    cabinAltitudeFt: 6000,
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Economy)',
    aisles: 2,
    funFacts: [
      'The pioneer base model of the Dreamliner family, entering service in 2011 with ANA.',
      'Revolutionized "point-to-point" long-thin routes that previously could not support a 777 or 747.'
    ],
    whyFlyThis: 'Composite comfort benefits (lower cabin altitude & humidity) on medium to long-haul routes.',
    iconType: 'twin_wide',
    primaryAirlines: ['American Airlines', 'United Airlines', 'Japan Airlines', 'Air India', 'Ethiopian Airlines', 'Avianca']
  },

  '781': {
    id: '781',
    name: 'Boeing 787-10 Dreamliner',
    shortName: 'Boeing 787-10',
    manufacturer: 'Boeing',
    family: '787 Dreamliner',
    bodyType: 'widebody',
    isComposite: true,
    cabinAltitudeFt: 6000,
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Economy)',
    aisles: 2,
    funFacts: [
      'The stretched 224-foot variant carrying up to 330 passengers in typical 2-class layouts.',
      '25% better fuel per seat than the aircraft it replaces.'
    ],
    whyFlyThis: 'Newest and longest Dreamliner with the highest capacity and latest cabin interiors.',
    iconType: 'twin_wide',
    primaryAirlines: ['Singapore Airlines', 'United Airlines', 'British Airways', 'Saudia', 'EVA Air', 'KLM']
  },

  '359': {
    id: '359',
    name: 'Airbus A350-900',
    shortName: 'Airbus A350-900',
    manufacturer: 'Airbus',
    family: 'A350',
    bodyType: 'widebody',
    isComposite: true,
    cabinAltitudeFt: 6000,
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Economy) / 1-2-1 (Business)',
    aisles: 2,
    funFacts: [
      'Built with 53% carbon-composite materials, featuring elegant upward curved sharklet wingtips.',
      'The "Airspace by Airbus" cabin is 221 inches wide—providing a full 18-inch seat width even in 9-abreast economy.',
      'Singapore Airlines operates the special A350-900ULR on the world\'s longest flights: SIN ⇄ JFK (18h 40m, non-stop).'
    ],
    whyFlyThis: 'Regarded by many avgeeks as the smoothest, quietest, and most comfortable twin-aisle aircraft flying today.',
    iconType: 'twin_wide',
    primaryAirlines: ['Singapore Airlines', 'Delta Air Lines', 'Qatar Airways', 'Cathay Pacific', 'Lufthansa', 'Air France', 'Finnair', 'Japan Airlines']
  },

  '351': {
    id: '351',
    name: 'Airbus A350-1000',
    shortName: 'Airbus A350-1000',
    manufacturer: 'Airbus',
    family: 'A350',
    bodyType: 'widebody',
    isComposite: true,
    cabinAltitudeFt: 6000,
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Economy)',
    aisles: 2,
    funFacts: [
      'The 242-foot flagship stretch equipped with massive 6-wheel main landing gear bogies and 97,000 lbf Trent XWB-97 engines.',
      'Selected by Qantas for "Project Sunrise" non-stop flights from Sydney/Melbourne to London and New York.'
    ],
    whyFlyThis: 'State-of-the-art long-haul widebody combining maximum cabin width, composite humidity, and silent cabin technology.',
    iconType: 'twin_wide',
    primaryAirlines: ['Qatar Airways', 'British Airways', 'Virgin Atlantic', 'Cathay Pacific', 'Japan Airlines', 'Delta Air Lines']
  },

  // --- POPULAR TWIN WIDEBODIES ---
  '77W': {
    id: '77W',
    name: 'Boeing 777-300ER',
    shortName: 'Boeing 777-300ER',
    manufacturer: 'Boeing',
    family: '777',
    bodyType: 'widebody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-14%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-4-3 (10-abreast) or 3-3-3 (older 9-abreast)',
    aisles: 2,
    funFacts: [
      'Powered by GE90-115B engines whose engine nacelle is wider than the entire fuselage of a Boeing 737!',
      'The undisputed long-haul flagship for airlines like Emirates, British Airways, EVA Air, and Cathay Pacific.'
    ],
    whyFlyThis: 'Pure aviation power and expansive widebody space; unmistakable deep rumble on takeoff.',
    iconType: 'twin_wide',
    primaryAirlines: ['Emirates', 'Qatar Airways', 'British Airways', 'American Airlines', 'Air France', 'Cathay Pacific', 'Turkish Airlines']
  },

  '772': {
    id: '772',
    name: 'Boeing 777-200ER / LR',
    shortName: 'Boeing 777-200',
    manufacturer: 'Boeing',
    family: '777',
    bodyType: 'widebody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-3-3 or 3-4-3',
    aisles: 2,
    funFacts: [
      'The 777-200LR "Worldliner" holds the commercial distance record flying 13,422 miles non-stop from Hong Kong to London the long way (eastbound).'
    ],
    whyFlyThis: 'Classic widebody comfort, especially when configured in 9-abreast (3-3-3) economy.',
    iconType: 'twin_wide',
    primaryAirlines: ['United Airlines', 'American Airlines', 'Delta Air Lines', 'Austrian Airlines']
  },

  '339': {
    id: '339',
    name: 'Airbus A330-900neo',
    shortName: 'Airbus A330neo',
    manufacturer: 'Airbus',
    family: 'A330',
    bodyType: 'widebody',
    isComposite: false,
    cabinAltitudeFt: 7000,
    humidityPercent: '15-18%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '2-4-2 (Economy)',
    aisles: 2,
    funFacts: [
      'Features high-aspect composite sharklets inspired by the A350, and Rolls-Royce Trent 7000 engines.',
      'Retains the coveted 2-4-2 eight-abreast layout: couples never have a middle seat between them, and only 2 out of 8 seats are middle seats!'
    ],
    whyFlyThis: '2-4-2 economy layout is widely considered the friendliest seating geometry in commercial aviation.',
    iconType: 'twin_wide',
    primaryAirlines: ['Delta Air Lines', 'TAP Air Portugal', 'Virgin Atlantic', 'ITA Airways', 'Condor', 'Garuda Indonesia']
  },

  '333': {
    id: '333',
    name: 'Airbus A330-300',
    shortName: 'Airbus A330-300',
    manufacturer: 'Airbus',
    family: 'A330',
    bodyType: 'widebody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '12-14%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '2-4-2 (Economy)',
    aisles: 2,
    funFacts: [
      'The workhorse twin-aisle aircraft that established Airbus\'s presence in international long-haul travel.'
    ],
    whyFlyThis: '2-4-2 seating arrangement without middle-seat pairs for traveling companions.',
    iconType: 'twin_wide',
    primaryAirlines: ['Lufthansa', 'Swiss', 'Turkish Airlines', 'Korean Air', 'Cathay Pacific', 'Delta Air Lines']
  },

  // --- BOEING 737 MAX (AVOIDANCE / SAFETY SENTIMENT FILTERS) ---
  '7M8': {
    id: '7M8',
    name: 'Boeing 737 MAX 8',
    shortName: 'Boeing 737 MAX 8',
    manufacturer: 'Boeing',
    family: '737 MAX',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3 (Single aisle)',
    aisles: 1,
    funFacts: [
      'Equipped with CFM LEAP-1B engines and distinctive split-scimitar Advanced Technology winglets.',
      'Features Boeing Sky Interior with sculpted sidewalls and modern LED mood lighting.',
      'Grounded worldwide from March 2019 to late 2020 following two fatal accidents and MCAS software revisions.'
    ],
    whyFlyThis: 'Fuel-efficient, modern cabin lighting, but frequently filtered out by safety-conscious travelers.',
    iconType: 'narrow',
    primaryAirlines: ['Southwest Airlines', 'Ryanair', 'American Airlines', 'United Airlines', 'Flydubai', 'Air Canada', 'Turkish Airlines']
  },

  '7M9': {
    id: '7M9',
    name: 'Boeing 737 MAX 9',
    shortName: 'Boeing 737 MAX 9',
    manufacturer: 'Boeing',
    family: '737 MAX',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3 (Single aisle)',
    aisles: 1,
    funFacts: [
      'Stretched MAX variant. Subject to emergency FAA inspection in Jan 2024 regarding mid-cabin door plug assemblies.',
      'Includes LEAP-1B engines and enhanced sound dampening compared to 737 Next Gen.'
    ],
    whyFlyThis: 'Newer interior appointments, though subject to high customer sentiment avoidance.',
    iconType: 'narrow',
    primaryAirlines: ['United Airlines', 'Alaska Airlines', 'Copa Airlines', 'Flydubai', 'Aeromexico']
  },

  '7MJ': {
    id: '7MJ',
    name: 'Boeing 737 MAX 10',
    shortName: 'Boeing 737 MAX 10',
    manufacturer: 'Boeing',
    family: '737 MAX',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3 (Single aisle)',
    aisles: 1,
    funFacts: [
      'The longest variant of the 737 family with telescoping landing gear.',
      'Features up to 230 passenger capacity to compete with the Airbus A321neo.'
    ],
    whyFlyThis: 'Highest density 737 variant with modern Sky Interior.',
    iconType: 'narrow',
    primaryAirlines: ['United Airlines', 'Ryanair', 'Delta Air Lines']
  },

  // --- BOEING 737 NEXT GEN ---
  '738': {
    id: '738',
    name: 'Boeing 737-800',
    shortName: 'Boeing 737-800',
    manufacturer: 'Boeing',
    family: '737NG',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-3 (Single aisle)',
    aisles: 1,
    funFacts: [
      'Over 5,000 built, making it one of the most commercially successful airliners in aviation history.',
      'Standard CFM56-7B engines with an exemplary decades-long global safety record.'
    ],
    whyFlyThis: 'The battle-tested classic narrowbody standard for domestic and short-haul flights.',
    iconType: 'narrow',
    primaryAirlines: ['Ryanair', 'Southwest Airlines', 'American Airlines', 'Delta Air Lines', 'United Airlines', 'Qantas']
  },

  '739': {
    id: '739',
    name: 'Boeing 737-900ER',
    shortName: 'Boeing 737-900ER',
    manufacturer: 'Boeing',
    family: '737NG',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-3 (Single aisle)',
    aisles: 1,
    funFacts: [
      'Added flat aft pressure bulkhead and auxiliary fuel tanks for transcontinental US routes.'
    ],
    whyFlyThis: 'High capacity narrowbody with proven CFM56 propulsion.',
    iconType: 'narrow',
    primaryAirlines: ['Delta Air Lines', 'United Airlines', 'Alaska Airlines', 'Lion Air']
  },

  // --- AIRBUS A320 FAMILY & NEXT GEN ---
  '32Q': {
    id: '32Q',
    name: 'Airbus A321neo / XLR',
    shortName: 'Airbus A321neo',
    manufacturer: 'Airbus',
    family: 'A320neo',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 7500,
    humidityPercent: '14-16%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3 (18-inch seat width)',
    aisles: 1,
    funFacts: [
      'The A321XLR (Extra Long Range) can fly up to 4,700 nautical miles (11 hours!) non-stop.',
      'Airbus Airspace cabin features 40% larger overhead bins and customizable full-color LED mood lighting.',
      'Standard economy seat width is 18 inches, a full inch wider than Boeing 737\'s 17 inches.'
    ],
    whyFlyThis: 'Widest single-aisle fuselage in its class with whisper-quiet PW1100G or CFM LEAP-1A engines.',
    iconType: 'narrow',
    primaryAirlines: ['American Airlines', 'Delta Air Lines', 'United Airlines', 'IndiGo', 'Wizz Air', 'Lufthansa', 'Iberia']
  },

  '32N': {
    id: '32N',
    name: 'Airbus A320neo',
    shortName: 'Airbus A320neo',
    manufacturer: 'Airbus',
    family: 'A320neo',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 7500,
    humidityPercent: '14-16%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3 (18-inch seat width)',
    aisles: 1,
    funFacts: [
      'Equipped with 7.9-foot tall blended Sharklets and high-bypass turbofans reducing noise footprint by nearly 50%.',
      'The fastest-selling commercial aircraft in aviation history.'
    ],
    whyFlyThis: 'Wider cabin cross-section (7 inches wider than Boeing 737), noticeably reducing elbow clash.',
    iconType: 'narrow',
    primaryAirlines: ['IndiGo', 'easyJet', 'Lufthansa', 'Frontier Airlines', 'British Airways', 'Spirit Airlines']
  },

  '320': {
    id: '320',
    name: 'Airbus A320-200',
    shortName: 'Airbus A320',
    manufacturer: 'Airbus',
    family: 'A320',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-3 (18-inch seat width)',
    aisles: 1,
    funFacts: [
      'Pioneered digital fly-by-wire flight control systems and sidestick controllers in commercial airliners in 1988.'
    ],
    whyFlyThis: 'Standard reliable 18-inch economy seats with spacious cabin geometry.',
    iconType: 'narrow',
    primaryAirlines: ['Delta Air Lines', 'United Airlines', 'Air France', 'British Airways', 'LATAM']
  },

  // --- REGIONAL / CLEAN-SHEET FAN FAVORITES ---
  '223': {
    id: '223',
    name: 'Airbus A220-300 (Bombardier CS300)',
    shortName: 'Airbus A220-300',
    manufacturer: 'Airbus',
    family: 'A220',
    bodyType: 'narrowbody',
    isComposite: true,
    cabinAltitudeFt: 6000,
    humidityPercent: '18-22%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '2-3 (No middle seat on the left!)',
    aisles: 1,
    funFacts: [
      'Originally designed from a blank sheet of paper by Bombardier as the CSeries.',
      'Features a unique 2-3 seating layout: 80% of all passengers sit in either a window or aisle seat!',
      'Middle seats on the 3-seat side are a lavish 19 inches wide—the widest economy seats in the sky.',
      'Windows are larger than any other narrowbody, letting natural light flood the cabin.'
    ],
    whyFlyThis: 'Avgeek and traveler favorite! Only 1 middle seat per row, oversized windows, and whisper-quiet Pratt & Whitney GTF engines.',
    iconType: 'narrow',
    primaryAirlines: ['Delta Air Lines', 'airBaltic', 'Air France', 'Breeze Airways', 'Swiss', 'JetBlue']
  },

  '221': {
    id: '221',
    name: 'Airbus A220-100',
    shortName: 'Airbus A220-100',
    manufacturer: 'Airbus',
    family: 'A220',
    bodyType: 'narrowbody',
    isComposite: true,
    cabinAltitudeFt: 6000,
    humidityPercent: '18-22%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '2-3',
    aisles: 1,
    funFacts: [
      'Certified for steep approach into challenging downtown airports like London City (LCY).',
      'Extremely high composite proportion in wings, empennage, and aft fuselage.'
    ],
    whyFlyThis: '2-3 seating layout with gigantic panoramic windows on boutique routes.',
    iconType: 'narrow',
    primaryAirlines: ['Delta Air Lines', 'Swiss', 'ITA Airways']
  },

  '295': {
    id: '295',
    name: 'Embraer E195-E2 "Profit Hunter"',
    shortName: 'Embraer E195-E2',
    manufacturer: 'Embraer',
    family: 'E-Jets E2',
    bodyType: 'regional',
    isComposite: false,
    cabinAltitudeFt: 7000,
    humidityPercent: '15-18%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '2-2 (Zero middle seats)',
    aisles: 1,
    funFacts: [
      'True 2-2 seating across the entire aircraft—literally zero middle seats on the entire airplane!',
      'Under-seat luggage rails allow personal items to slide completely under the seat without shin interference.'
    ],
    whyFlyThis: 'Every seat is either window or aisle. Zero middle seats guaranteed.',
    iconType: 'regional',
    primaryAirlines: ['KLM Cityhopper', 'Azul Brazilian Airlines', 'Porter Airlines', 'Binter Canarias']
  },

  'E75': {
    id: 'E75',
    name: 'Embraer E175',
    shortName: 'Embraer E175',
    manufacturer: 'Embraer',
    family: 'E-Jets',
    bodyType: 'regional',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-12%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '2-2 (Zero middle seats in Economy) / 1-2 (First)',
    aisles: 1,
    funFacts: [
      'The king of US regional flying under scope-clause agreements.',
      'Far more comfortable than older CRJ regional jets due to high double-bubble fuselage.'
    ],
    whyFlyThis: 'No middle seats in coach, and solo seats (1A, 2A, 3A) in domestic first class.',
    iconType: 'regional',
    primaryAirlines: ['SkyWest', 'Republic Airways', 'Envoy Air', 'Horizon Air', 'Mesa Airlines']
  }
};

// Quick lookup alias map for common Duffel/IATA variants and codes
export const IATA_CODE_ALIASES: Record<string, string> = {
  '388': '380',
  'A388': '380',
  'A380': '380',
  '748': '748',
  'B748': '748',
  '744': '744',
  'B744': '744',
  '788': '788',
  'B788': '788',
  '789': '789',
  'B789': '789',
  '781': '781',
  '78J': '781',
  'B78X': '781',
  '359': '359',
  'A359': '359',
  '351': '351',
  '35K': '351',
  'A35K': '351',
  '77W': '77W',
  'B77W': '77W',
  '773': '77W',
  '772': '772',
  'B772': '772',
  '77L': '772',
  '339': '339',
  'A339': '339',
  '338': '339',
  '333': '333',
  'A333': '333',
  '332': '333',
  '7M8': '7M8',
  'B38M': '7M8',
  '7M9': '7M9',
  'B39M': '7M9',
  '7MJ': '7MJ',
  '7M7': '7M8',
  '738': '738',
  'B738': '738',
  '739': '739',
  'B739': '739',
  '73H': '738',
  '73G': '738',
  '32Q': '32Q',
  'A21N': '32Q',
  '32N': '32N',
  'A20N': '32N',
  '320': '320',
  'A320': '320',
  '321': '32Q',
  'A321': '32Q',
  '319': '320',
  'A319': '320',
  '223': '223',
  'BCS3': '223',
  'A223': '223',
  '221': '221',
  'BCS1': '221',
  '295': '295',
  'E295': '295',
  'E75': 'E75',
  'E175': 'E75'
};

export function lookupAircraft(iataOrName: string): AircraftType {
  const clean = iataOrName.toUpperCase().trim();
  const directId = IATA_CODE_ALIASES[clean] || clean;

  if (AIRCRAFT_DATABASE[directId]) {
    return AIRCRAFT_DATABASE[directId];
  }

  // Substring matching against names or families
  const found = Object.values(AIRCRAFT_DATABASE).find(a => 
    a.name.toUpperCase().includes(clean) ||
    a.shortName.toUpperCase().includes(clean) ||
    a.family.toUpperCase().includes(clean) ||
    a.id.toUpperCase() === clean
  );

  if (found) {
    return found;
  }

  // Fallback generic aircraft if not in detailed database
  const isAirbus = clean.includes('AIRBUS') || clean.startsWith('A3') || clean.startsWith('3');
  const isBoeing = clean.includes('BOEING') || clean.startsWith('B7') || clean.startsWith('7');
  const isMax = clean.includes('MAX') || clean.includes('7M');

  return {
    id: clean,
    name: iataOrName || 'Commercial Airliner',
    shortName: iataOrName || 'Airliner',
    manufacturer: isAirbus ? 'Airbus' : isBoeing ? 'Boeing' : 'Other',
    family: isMax ? '737 MAX' : 'Standard Fleet',
    bodyType: 'narrowbody',
    isComposite: false,
    cabinAltitudeFt: 8000,
    humidityPercent: '10-15%',
    productionStatus: 'in_production',
    aisles: 1,
    funFacts: ['Standard commercial equipment operating scheduled passenger service.'],
    whyFlyThis: 'Standard scheduled passenger flight.',
    iconType: 'narrow'
  };
}
