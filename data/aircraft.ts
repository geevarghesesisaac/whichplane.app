import { AircraftType } from '@/lib/types';

export const AIRCRAFT_DATABASE: Record<string, AircraftType> = {
  // --- A350-1000 FLAGSHIP ---
  '351': {
    id: '351',
    icaoCode: 'A35K',
    name: 'Airbus A350-1000 XWB',
    shortName: 'A350-1000',
    manufacturer: 'Airbus',
    family: 'A350',
    bodyType: 'widebody',
    isComposite: true,
    compositePercent: '53% Carbon Composite',
    cabinAltitudeFt: 5800,
    acousticRating: '68 dB Quiet',
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Airspace by Airbus)',
    aisles: 2,
    engineVariants: ['Rolls-Royce Trent XWB-97'],
    wakeTurbulence: 'HEAVY',
    wingspan: '64.75 m (212 ft 5 in)',
    maxPassengers: 480,
    funFacts: [
      '53% composite airframe made of carbon-fiber reinforced polymer, titanium, and advanced aluminum alloys.',
      'Airspace cabin features continuous full-spectrum LED circadian mood lighting reducing jet lag.',
      'Equipped with twin 6-wheel main landing gear bogies and massive 97,000 lbf Trent XWB engines.',
      'Selected for Project Sunrise non-stop flights from Sydney/Melbourne to London and New York.'
    ],
    whyFlyThis: 'Aerodynamic flagship widebody with sub-6,000ft cabin altitude, 221-inch wide fuselage, and the quietest twin-aisle cabin in commercial aviation.',
    primaryAirlines: ['Virgin Atlantic', 'British Airways', 'Qatar Airways', 'Cathay Pacific', 'Japan Airlines', 'Delta Air Lines'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9_HHsjEih_2aDkbMGIziQDiOIRjIxWvrWiYaL4ZsFpLX06m1prvpyzpVFk4uTMzGvHHIff7Wp_wA8sj5im2Vdqh0lHrsI91jF4_P8sqbqMGqLa0RNLtYu46thVb7FP9Iln7SuHZDnMp99PKUX2uGqx1dSpGmZKdEFL59C87vCJ_yjP_eXAIVmduz82YS_oRIiFBYscmZCLcbymugO0g6HOJ5xx5IvIqqaChfjE5DS_bq23VIakCxDwA'
  },

  '359': {
    id: '359',
    icaoCode: 'A359',
    name: 'Airbus A350-900 XWB',
    shortName: 'A350-900',
    manufacturer: 'Airbus',
    family: 'A350',
    bodyType: 'widebody',
    isComposite: true,
    compositePercent: '53% Carbon Composite',
    cabinAltitudeFt: 6000,
    acousticRating: '69 dB Quiet',
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Airspace)',
    aisles: 2,
    engineVariants: ['Rolls-Royce Trent XWB-84'],
    wakeTurbulence: 'HEAVY',
    wingspan: '64.75 m (212 ft 5 in)',
    maxPassengers: 440,
    funFacts: [
      'Singapore Airlines flies the special A350-900ULR on the world\'s longest flights: Singapore ⇄ JFK (18h 40m).',
      'Curved sharklet wingtips blend aerodynamic efficiency with dramatic visual aesthetics.'
    ],
    whyFlyThis: 'Smoothest and quietest twin-aisle aircraft flying today with 18-inch seat width in standard 9-abreast economy.',
    primaryAirlines: ['Singapore Airlines', 'Delta Air Lines', 'Qatar Airways', 'Cathay Pacific', 'Lufthansa', 'Air France', 'Finnair'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9_HHsjEih_2aDkbMGIziQDiOIRjIxWvrWiYaL4ZsFpLX06m1prvpyzpVFk4uTMzGvHHIff7Wp_wA8sj5im2Vdqh0lHrsI91jF4_P8sqbqMGqLa0RNLtYu46thVb7FP9Iln7SuHZDnMp99PKUX2uGqx1dSpGmZKdEFL59C87vCJ_yjP_eXAIVmduz82YS_oRIiFBYscmZCLcbymugO0g6HOJ5xx5IvIqqaChfjE5DS_bq23VIakCxDwA'
  },

  // --- AIRBUS A380-800 SUPERJUMBO ---
  '380': {
    id: '380',
    icaoCode: 'A388',
    name: 'Airbus A380-800 Superjumbo',
    shortName: 'A380-800',
    manufacturer: 'Airbus',
    family: 'A380',
    bodyType: 'widebody',
    isComposite: false,
    compositePercent: '25% GLARE & Carbon Fiber',
    cabinAltitudeFt: 6100,
    acousticRating: '59 dB Whisper Ambient',
    humidityPercent: '16-18%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-4-3 (Main deck) / 2-4-2 (Upper deck)',
    aisles: 2,
    engineVariants: ['Engine Alliance GP7200', 'Rolls-Royce Trent 900'],
    wakeTurbulence: 'SUPER HEAVY',
    wingspan: '79.75 m (261 ft 8 in)',
    maxPassengers: 615,
    funFacts: [
      'The largest passenger airliner in history with 5,920 sq ft of usable floor space across two full decks.',
      'Hosts onboard shower spas and cocktail bar lounges (Emirates), and double-bed Suites (Singapore Airlines).',
      'So whisper quiet that pilots report hearing whispers in the first rows during cruise.',
      'Discontinued from production in Dec 2021 (MSN 272 to Emirates); active airline service anticipated through 2038+.'
    ],
    whyFlyThis: 'A once-in-a-generation double-decker experience. Whisper-quiet acoustic insulation and unmatched cabin volume.',
    retirementRisk: 'High. Production ended; catch it while Emirates, British Airways, Singapore Airlines, and Qantas operate it.',
    primaryAirlines: ['Emirates', 'British Airways', 'Singapore Airlines', 'Qantas', 'Qatar Airways', 'Lufthansa', 'All Nippon Airways (ANA)'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcqzhp9VFS03wyEvOCs0T1TGKRFH3cIhbNl5ORVRex4D5lh3wgiHSehiGAxTMVNqa3AfGRWfczCjMc1-K-NcrcPSdbuRGRB4KjqFsTzMBzO8W8T-7QlHItvdBJ12dPs-O5uc8q-OoScb9U0U8bW4PagQeS5DYfbzROal-51hvIgiuQWX2YNin9l-3EdpHJc50kFewDyuw8cnx33vkKTKPRZ_H49RwQEE5Qg74ahMwUJ5LrximynMTJSg',
    subdeckSchematic: {
      upperDeckName: 'Upper Deck (2 - 4 - 2 / Premium Sanctuaries)',
      upperDeckDesc: 'Hosts onboard shower spas (Emirates), cocktail lounges, and 1-2-1 direct-aisle access suites.',
      mainDeckName: 'Main Deck (3 - 4 - 3 / Vast Open Cross-Section)',
      mainDeckDesc: 'Expansive 21-ft fuselage width providing exceptional shoulder room and headroom.'
    }
  },

  // --- BOEING 747-8 INTERCONTINENTAL ---
  '748': {
    id: '748',
    icaoCode: 'B748',
    name: 'Boeing 747-8 Intercontinental',
    shortName: 'Boeing 747-8',
    manufacturer: 'Boeing',
    family: '747 Queen of the Skies',
    bodyType: 'widebody',
    isComposite: false,
    compositePercent: 'Advanced Al-Li & Composites',
    cabinAltitudeFt: 7000,
    acousticRating: '71 dB Chevron Engine',
    humidityPercent: '14-17%',
    productionStatus: 'discontinued',
    seatingTypicalLayout: '3-4-3 (Main deck) / 2-2 (Upper deck hump)',
    aisles: 2,
    engineVariants: ['General Electric GEnx-2B67 with Chevrons'],
    wakeTurbulence: 'HEAVY',
    wingspan: '68.4 m (224 ft 7 in)',
    maxPassengers: 467,
    funFacts: [
      'The longest passenger airliner in service at 250 ft 2 in (76.25 m).',
      'Features distinctive serrated chevron engine nacelles for acoustic noise dampening.',
      'Sitting in the nose cone (Row 1) puts passengers ahead of the flight crew!'
    ],
    whyFlyThis: 'One of civil aviation’s greatest romantic milestones. Flying in the upper deck or the nose cone is legendary.',
    retirementRisk: 'Extremely rare. Only 3 commercial airlines fly passenger 747-8s: Lufthansa, Korean Air, Air China.',
    primaryAirlines: ['Lufthansa', 'Korean Air', 'Air China'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApfygGtaUmntXstgSbHXnGXFfN_nGHJT2-p3PPqeRHyWKwL74nju-6IPUtibmsrMSEpyPJ1amDc2G8467aslKkn7vZIYwWrxGgAqpsas7lTYsmOQrnxKqBu8vxDzb5X02c-Y4589U9cK3qTlTc3DFW7Vbe8D1gAhbXHzUZtph3bzJz3MT4iUd8-xkXy6sXhgMCXGMYNDBMyOTxFOWknf7vC7W7IGCWgO2bTy5AUGM_NcZ0juo3Xs2a4g'
  },

  // --- BOEING 787-9 DREAMLINER ---
  '789': {
    id: '789',
    icaoCode: 'B789',
    name: 'Boeing 787-9 Dreamliner',
    shortName: 'Boeing 787-9',
    manufacturer: 'Boeing',
    family: '787 Dreamliner',
    bodyType: 'widebody',
    isComposite: true,
    compositePercent: '50% Carbon Fiber Polymer',
    cabinAltitudeFt: 6000,
    acousticRating: '70 dB Chevron Engine',
    humidityPercent: '20-25%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3-3 (Economy)',
    aisles: 2,
    engineVariants: ['Rolls-Royce Trent 1000', 'General Electric GEnx-1B'],
    wakeTurbulence: 'HEAVY',
    wingspan: '60.12 m (197 ft 3 in)',
    maxPassengers: 296,
    funFacts: [
      '50% composite airframe allows higher cabin pressure and 25% humidity without structural oxidation.',
      'Windows are 65% larger than conventional aircraft and dim electrically via electrochromic gel buttons.',
      'Equipped with raked wingtips and serrated engine chevrons.'
    ],
    whyFlyThis: 'Noticeably reduced jet lag fatigue, gentle pressurization, dimmable windows, and dynamic HEPA air filtration.',
    primaryAirlines: ['British Airways', 'Virgin Atlantic', 'United Airlines', 'Qantas', 'ANA', 'Qatar Airways', 'Air Canada', 'KLM'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DUWSivQt0T8c-Wn_8FyBdLwDx3wC5ECwUM3AU8lkDoI5y-YVOQdOq2EKbrB_HzOzMaXpLKnxsR_EjntKCvVXqecsm0tPoPi4eGTplDyClWGZgWBsORgPuulGMftYzZKwiyELCi3FC1YZXalNDxK-ujR38sRrXo4Pv7tIuBGkydUB7mz7pkZX8rnbWITgX1U_MxS1xoIYa9jG-ztSttq4T7-v5MFDY7wMoI7G_0KtrlHeiu-1LXE6PQ'
  },

  // --- BOEING 777-300ER TRIPLE SEVEN ---
  '77W': {
    id: '77W',
    icaoCode: 'B77W',
    name: 'Boeing 777-300ER',
    shortName: 'Boeing 777-300ER',
    manufacturer: 'Boeing',
    family: '777',
    bodyType: 'widebody',
    isComposite: false,
    compositePercent: 'Al-Li & Composite Empennage',
    cabinAltitudeFt: 8000,
    acousticRating: '74 dB Powerful Rumble',
    humidityPercent: '10-14%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-4-3 (10-abreast) or 3-3-3',
    aisles: 2,
    engineVariants: ['General Electric GE90-115B'],
    wakeTurbulence: 'HEAVY',
    wingspan: '64.8 m (212 ft 7 in)',
    maxPassengers: 396,
    funFacts: [
      'Powered by GE90 engines whose fan diameter is as wide as the fuselage of an entire Boeing 737!',
      'The undisputed twin-engine workhorse of international long-haul aviation.'
    ],
    whyFlyThis: 'Pure aviation power, expansive cabin width, and unmistakable thrust on takeoff.',
    primaryAirlines: ['Emirates', 'Qatar Airways', 'British Airways', 'American Airlines', 'Air France', 'Cathay Pacific'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVyRF-Rt5Iq8Sx3zPzMPVt4FCggZO5zjd4CL5JwNBMaYx-cIc2IiyxOzYq4MdjEgbM2mQEHhoFiYHatK7O9owtzBICnT79IRO7-s96wCKEq2iNlighm2dVZc9poapMCd3gJ_sSwaw4IyuDTObCwSJ_9VQXsYdoCRGdDeGnTdC0J6W2o7t3ZVfLTpsSi1bVnxrNldZjXR5ncsJad2bSCM8VWTh81Gb9uKvkSSPzE7Vi8ExzmyRTncfyFQ'
  },

  // --- AIRBUS A330-900NEO ---
  '339': {
    id: '339',
    icaoCode: 'A339',
    name: 'Airbus A330-900neo',
    shortName: 'Airbus A330neo',
    manufacturer: 'Airbus',
    family: 'A330',
    bodyType: 'widebody',
    isComposite: false,
    compositePercent: 'Composite Sharklets & Advanced Alloys',
    cabinAltitudeFt: 7000,
    acousticRating: '70 dB Quiet',
    humidityPercent: '15-18%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '2-4-2 (Zero Middle Seat Pairs!)',
    aisles: 2,
    engineVariants: ['Rolls-Royce Trent 7000'],
    wakeTurbulence: 'HEAVY',
    wingspan: '64.0 m (210 ft 0 in)',
    maxPassengers: 287,
    funFacts: [
      'Retains the coveted 2-4-2 layout where traveling companions never have a stranger between them.',
      'Equipped with A350-inspired high-aspect curved composite sharklet wings.'
    ],
    whyFlyThis: '2-4-2 seating geometry is widely hailed by travelers as the friendliest economy layout in commercial skies.',
    primaryAirlines: ['Delta Air Lines', 'TAP Air Portugal', 'Virgin Atlantic', 'Condor', 'ITA Airways'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9_HHsjEih_2aDkbMGIziQDiOIRjIxWvrWiYaL4ZsFpLX06m1prvpyzpVFk4uTMzGvHHIff7Wp_wA8sj5im2Vdqh0lHrsI91jF4_P8sqbqMGqLa0RNLtYu46thVb7FP9Iln7SuHZDnMp99PKUX2uGqx1dSpGmZKdEFL59C87vCJ_yjP_eXAIVmduz82YS_oRIiFBYscmZCLcbymugO0g6HOJ5xx5IvIqqaChfjE5DS_bq23VIakCxDwA'
  },

  // --- BOEING 737 MAX 8 ---
  '7M8': {
    id: '7M8',
    icaoCode: 'B38M',
    name: 'Boeing 737 MAX 8',
    shortName: 'Boeing 737 MAX 8',
    manufacturer: 'Boeing',
    family: '737 MAX',
    bodyType: 'narrowbody',
    isComposite: false,
    compositePercent: 'Aluminum Structure',
    cabinAltitudeFt: 8000,
    acousticRating: '74 dB',
    humidityPercent: '10-12%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3 (Single aisle)',
    aisles: 1,
    engineVariants: ['CFM LEAP-1B with Chevrons'],
    wakeTurbulence: 'MEDIUM',
    wingspan: '35.9 m (117 ft 10 in)',
    maxPassengers: 189,
    funFacts: [
      'Advanced Technology dual-feather split-scimitar winglets for fuel optimization.',
      'Equipped with Boeing Sky Interior and sculpted LED sidewall lighting.'
    ],
    whyFlyThis: 'Modern single-aisle narrowbody with Boeing Sky Interior lighting.',
    primaryAirlines: ['Southwest Airlines', 'Ryanair', 'American Airlines', 'United Airlines', 'Flydubai'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApfygGtaUmntXstgSbHXnGXFfN_nGHJT2-p3PPqeRHyWKwL74nju-6IPUtibmsrMSEpyPJ1amDc2G8467aslKkn7vZIYwWrxGgAqpsas7lTYsmOQrnxKqBu8vxDzb5X02c-Y4589U9cK3qTlTc3DFW7Vbe8D1gAhbXHzUZtph3bzJz3MT4iUd8-xkXy6sXhgMCXGMYNDBMyOTxFOWknf7vC7W7IGCWgO2bTy5AUGM_NcZ0juo3Xs2a4g'
  },

  // --- AIRBUS A321NEO / XLR ---
  '32Q': {
    id: '32Q',
    icaoCode: 'A21N',
    name: 'Airbus A321neo / XLR',
    shortName: 'A321neo',
    manufacturer: 'Airbus',
    family: 'A320neo',
    bodyType: 'narrowbody',
    isComposite: false,
    compositePercent: 'Advanced Alloys & Sharklets',
    cabinAltitudeFt: 7500,
    acousticRating: '71 dB Quiet',
    humidityPercent: '14-16%',
    productionStatus: 'in_production',
    seatingTypicalLayout: '3-3 (18-inch seat width)',
    aisles: 1,
    engineVariants: ['CFM LEAP-1A', 'Pratt & Whitney PW1100G'],
    wakeTurbulence: 'MEDIUM',
    wingspan: '35.8 m (117 ft 5 in)',
    maxPassengers: 244,
    funFacts: [
      'The A321XLR can fly up to 4,700 nautical miles (11 hours!) non-stop on single-aisle routes.',
      'Airspace cabin provides 40% larger overhead bins and a full 18-inch seat width in coach.'
    ],
    whyFlyThis: 'Widest single-aisle cross-section in its category, 7 inches wider than Boeing 737.',
    primaryAirlines: ['American Airlines', 'Delta Air Lines', 'United Airlines', 'IndiGo', 'Wizz Air', 'Iberia'],
    heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DUWSivQt0T8c-Wn_8FyBdLwDx3wC5ECwUM3AU8lkDoI5y-YVOQdOq2EKbrB_HzOzMaXpLKnxsR_EjntKCvVXqecsm0tPoPi4eGTplDyClWGZgWBsORgPuulGMftYzZKwiyELCi3FC1YZXalNDxK-ujR38sRrXo4Pv7tIuBGkydUB7mz7pkZX8rnbWITgX1U_MxS1xoIYa9jG-ztSttq4T7-v5MFDY7wMoI7G_0KtrlHeiu-1LXE6PQ'
  }
};

export const IATA_CODE_ALIASES: Record<string, string> = {
  '388': '380',
  'A388': '380',
  'A380': '380',
  '748': '748',
  'B748': '748',
  '789': '789',
  'B789': '789',
  '788': '789',
  '781': '789',
  '359': '359',
  'A359': '359',
  '351': '351',
  '35K': '351',
  'A35K': '351',
  '77W': '77W',
  'B77W': '77W',
  '339': '339',
  'A339': '339',
  '7M8': '7M8',
  'B38M': '7M8',
  '7M9': '7M8',
  '32Q': '32Q',
  'A21N': '32Q',
  '32N': '32Q',
  '320': '32Q'
};

export function lookupAircraft(iataOrName: string): AircraftType {
  const clean = iataOrName.toUpperCase().trim();
  const directId = IATA_CODE_ALIASES[clean] || clean;

  if (AIRCRAFT_DATABASE[directId]) {
    return AIRCRAFT_DATABASE[directId];
  }

  const found = Object.values(AIRCRAFT_DATABASE).find(a => 
    a.name.toUpperCase().includes(clean) ||
    a.shortName.toUpperCase().includes(clean) ||
    a.family.toUpperCase().includes(clean) ||
    a.id.toUpperCase() === clean ||
    a.icaoCode.toUpperCase() === clean
  );

  if (found) {
    return found;
  }

  return AIRCRAFT_DATABASE['351'];
}
