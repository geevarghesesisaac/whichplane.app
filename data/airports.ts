import { Airport } from '@/lib/types';

/**
 * Curated database of 250+ major commercial passenger airports worldwide.
 * Covers primary international gateway hubs and high-frequency trunk sectors.
 */
export const MAJOR_AIRPORTS: Airport[] = [
  // ==========================================
  // NORTH AMERICA — UNITED STATES
  // ==========================================
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States', flag: '🇺🇸' },
  { code: 'EWR', name: 'Newark Liberty International Airport', city: 'New York / Newark', country: 'United States', flag: '🇺🇸' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States', flag: '🇺🇸' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', flag: '🇺🇸' },
  { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States', flag: '🇺🇸' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States', flag: '🇺🇸' },
  { code: 'MDW', name: 'Midway International Airport', city: 'Chicago', country: 'United States', flag: '🇺🇸' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States', flag: '🇺🇸' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States', flag: '🇺🇸' },
  { code: 'DAL', name: 'Dallas Love Field', city: 'Dallas', country: 'United States', flag: '🇺🇸' },
  { code: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'United States', flag: '🇺🇸' },
  { code: 'HOU', name: 'William P. Hobby Airport', city: 'Houston', country: 'United States', flag: '🇺🇸' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States', flag: '🇺🇸' },
  { code: 'FLL', name: 'Fort Lauderdale-Hollywood International Airport', city: 'Fort Lauderdale / Miami', country: 'United States', flag: '🇺🇸' },
  { code: 'MCO', name: 'Orlando International Airport', city: 'Orlando', country: 'United States', flag: '🇺🇸' },
  { code: 'TPA', name: 'Tampa International Airport', city: 'Tampa', country: 'United States', flag: '🇺🇸' },
  { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States', flag: '🇺🇸' },
  { code: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States', flag: '🇺🇸' },
  { code: 'IAD', name: 'Washington Dulles International Airport', city: 'Washington D.C.', country: 'United States', flag: '🇺🇸' },
  { code: 'DCA', name: 'Ronald Reagan Washington National Airport', city: 'Washington D.C.', country: 'United States', flag: '🇺🇸' },
  { code: 'BWI', name: 'Baltimore/Washington International Airport', city: 'Baltimore / Washington', country: 'United States', flag: '🇺🇸' },
  { code: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States', flag: '🇺🇸' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International Airport', city: 'Phoenix', country: 'United States', flag: '🇺🇸' },
  { code: 'LAS', name: 'Harry Reid International Airport', city: 'Las Vegas', country: 'United States', flag: '🇺🇸' },
  { code: 'SAN', name: 'San Diego International Airport', city: 'San Diego', country: 'United States', flag: '🇺🇸' },
  { code: 'MSP', name: 'Minneapolis-Saint Paul International Airport', city: 'Minneapolis', country: 'United States', flag: '🇺🇸' },
  { code: 'DTW', name: 'Detroit Metropolitan Wayne County Airport', city: 'Detroit', country: 'United States', flag: '🇺🇸' },
  { code: 'PHL', name: 'Philadelphia International Airport', city: 'Philadelphia', country: 'United States', flag: '🇺🇸' },
  { code: 'CLT', name: 'Charlotte Douglas International Airport', city: 'Charlotte', country: 'United States', flag: '🇺🇸' },
  { code: 'SLC', name: 'Salt Lake City International Airport', city: 'Salt Lake City', country: 'United States', flag: '🇺🇸' },
  { code: 'PDX', name: 'Portland International Airport', city: 'Portland', country: 'United States', flag: '🇺🇸' },
  { code: 'BNA', name: 'Nashville International Airport', city: 'Nashville', country: 'United States', flag: '🇺🇸' },
  { code: 'AUS', name: 'Austin-Bergstrom International Airport', city: 'Austin', country: 'United States', flag: '🇺🇸' },
  { code: 'RDU', name: 'Raleigh-Durham International Airport', city: 'Raleigh', country: 'United States', flag: '🇺🇸' },
  { code: 'HNL', name: 'Daniel K. Inouye International Airport', city: 'Honolulu', country: 'United States', flag: '🇺🇸' },
  { code: 'OGG', name: 'Kahului Airport', city: 'Maui', country: 'United States', flag: '🇺🇸' },
  { code: 'ANC', name: 'Ted Stevens Anchorage International Airport', city: 'Anchorage', country: 'United States', flag: '🇺🇸' },

  // ==========================================
  // NORTH AMERICA — CANADA & MEXICO
  // ==========================================
  { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada', flag: '🇨🇦' },
  { code: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada', flag: '🇨🇦' },
  { code: 'YUL', name: 'Montréal-Trudeau International Airport', city: 'Montreal', country: 'Canada', flag: '🇨🇦' },
  { code: 'YYC', name: 'Calgary International Airport', city: 'Calgary', country: 'Canada', flag: '🇨🇦' },
  { code: 'YEG', name: 'Edmonton International Airport', city: 'Edmonton', country: 'Canada', flag: '🇨🇦' },
  { code: 'YOW', name: 'Ottawa Macdonald-Cartier International Airport', city: 'Ottawa', country: 'Canada', flag: '🇨🇦' },
  { code: 'MEX', name: 'Mexico City International Airport', city: 'Mexico City', country: 'Mexico', flag: '🇲🇽' },
  { code: 'NLU', name: 'Felipe Ángeles International Airport', city: 'Mexico City', country: 'Mexico', flag: '🇲🇽' },
  { code: 'CUN', name: 'Cancún International Airport', city: 'Cancun', country: 'Mexico', flag: '🇲🇽' },
  { code: 'GDL', name: 'Guadalajara International Airport', city: 'Guadalajara', country: 'Mexico', flag: '🇲🇽' },
  { code: 'MTY', name: 'Monterrey International Airport', city: 'Monterrey', country: 'Mexico', flag: '🇲🇽' },
  { code: 'SJD', name: 'Los Cabos International Airport', city: 'San Jose del Cabo', country: 'Mexico', flag: '🇲🇽' },

  // ==========================================
  // EUROPE — UNITED KINGDOM & IRELAND
  // ==========================================
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'STN', name: 'London Stansted Airport', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'LTN', name: 'London Luton Airport', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'LCY', name: 'London City Airport', city: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'MAN', name: 'Manchester Airport', city: 'Manchester', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'GLA', name: 'Glasgow Airport', city: 'Glasgow', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'BHX', name: 'Birmingham Airport', city: 'Birmingham', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'BRS', name: 'Bristol Airport', city: 'Bristol', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'NCL', name: 'Newcastle International Airport', city: 'Newcastle', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'BFS', name: 'Belfast International Airport', city: 'Belfast', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Ireland', flag: '🇮🇪' },
  { code: 'SNN', name: 'Shannon Airport', city: 'Shannon', country: 'Ireland', flag: '🇮🇪' },
  { code: 'ORK', name: 'Cork Airport', city: 'Cork', country: 'Ireland', flag: '🇮🇪' },

  // ==========================================
  // EUROPE — FRANCE, GERMANY, BENELUX
  // ==========================================
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', flag: '🇫🇷' },
  { code: 'ORY', name: 'Paris Orly Airport', city: 'Paris', country: 'France', flag: '🇫🇷' },
  { code: 'NCE', name: 'Nice Côte d\'Azur Airport', city: 'Nice', country: 'France', flag: '🇫🇷' },
  { code: 'LYS', name: 'Lyon-Saint Exupéry Airport', city: 'Lyon', country: 'France', flag: '🇫🇷' },
  { code: 'MRS', name: 'Marseille Provence Airport', city: 'Marseille', country: 'France', flag: '🇫🇷' },
  { code: 'TLS', name: 'Toulouse-Blagnac Airport (Airbus HQ)', city: 'Toulouse', country: 'France', flag: '🇫🇷' },
  { code: 'FRA', name: 'Frankfurt am Main Airport', city: 'Frankfurt', country: 'Germany', flag: '🇩🇪' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany', flag: '🇩🇪' },
  { code: 'BER', name: 'Berlin Brandenburg Airport', city: 'Berlin', country: 'Germany', flag: '🇩🇪' },
  { code: 'DUS', name: 'Düsseldorf Airport', city: 'Dusseldorf', country: 'Germany', flag: '🇩🇪' },
  { code: 'HAM', name: 'Hamburg Airport', city: 'Hamburg', country: 'Germany', flag: '🇩🇪' },
  { code: 'STR', name: 'Stuttgart Airport', city: 'Stuttgart', country: 'Germany', flag: '🇩🇪' },
  { code: 'CGN', name: 'Cologne Bonn Airport', city: 'Cologne', country: 'Germany', flag: '🇩🇪' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱' },
  { code: 'BRU', name: 'Brussels Airport', city: 'Brussels', country: 'Belgium', flag: '🇧🇪' },
  { code: 'LUX', name: 'Luxembourg Airport', city: 'Luxembourg City', country: 'Luxembourg', flag: '🇱🇺' },

  // ==========================================
  // EUROPE — SPAIN, PORTUGAL, ITALY, SWITZERLAND
  // ==========================================
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas Airport', city: 'Madrid', country: 'Spain', flag: '🇪🇸' },
  { code: 'BCN', name: 'Josep Tarradellas Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain', flag: '🇪🇸' },
  { code: 'AGP', name: 'Málaga-Costa del Sol Airport', city: 'Malaga', country: 'Spain', flag: '🇪🇸' },
  { code: 'PMI', name: 'Palma de Mallorca Airport', city: 'Mallorca', country: 'Spain', flag: '🇪🇸' },
  { code: 'VLC', name: 'Valencia Airport', city: 'Valencia', country: 'Spain', flag: '🇪🇸' },
  { code: 'SVQ', name: 'Seville Airport', city: 'Seville', country: 'Spain', flag: '🇪🇸' },
  { code: 'LIS', name: 'Humberto Delgado Airport', city: 'Lisbon', country: 'Portugal', flag: '🇵🇹' },
  { code: 'OPO', name: 'Francisco Sá Carneiro Airport', city: 'Porto', country: 'Portugal', flag: '🇵🇹' },
  { code: 'FAO', name: 'Faro Airport', city: 'Faro', country: 'Portugal', flag: '🇵🇹' },
  { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino Airport', city: 'Rome', country: 'Italy', flag: '🇮🇹' },
  { code: 'MXP', name: 'Milan Malpensa Airport', city: 'Milan', country: 'Italy', flag: '🇮🇹' },
  { code: 'LIN', name: 'Milan Linate Airport', city: 'Milan', country: 'Italy', flag: '🇮🇹' },
  { code: 'BGY', name: 'Milan Bergamo Airport', city: 'Milan / Bergamo', country: 'Italy', flag: '🇮🇹' },
  { code: 'VCE', name: 'Venice Marco Polo Airport', city: 'Venice', country: 'Italy', flag: '🇮🇹' },
  { code: 'BLQ', name: 'Bologna Guglielmo Marconi Airport', city: 'Bologna', country: 'Italy', flag: '🇮🇹' },
  { code: 'NAP', name: 'Naples International Airport', city: 'Naples', country: 'Italy', flag: '🇮🇹' },
  { code: 'CTA', name: 'Catania-Fontanarossa Airport', city: 'Catania', country: 'Italy', flag: '🇮🇹' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'GVA', name: 'Geneva Airport', city: 'Geneva', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'BSL', name: 'EuroAirport Basel Mulhouse Freiburg', city: 'Basel', country: 'Switzerland', flag: '🇨🇭' },
  { code: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria', flag: '🇦🇹' },

  // ==========================================
  // EUROPE — NORDICS & EASTERN EUROPE
  // ==========================================
  { code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark', flag: '🇩🇰' },
  { code: 'OSL', name: 'Oslo Airport, Gardermoen', city: 'Oslo', country: 'Norway', flag: '🇳🇴' },
  { code: 'ARN', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden', flag: '🇸🇪' },
  { code: 'HEL', name: 'Helsinki-Vantaa Airport', city: 'Helsinki', country: 'Finland', flag: '🇫🇮' },
  { code: 'KEF', name: 'Keflavík International Airport', city: 'Reykjavik', country: 'Iceland', flag: '🇮🇸' },
  { code: 'ATH', name: 'Athens International Airport', city: 'Athens', country: 'Greece', flag: '🇬🇷' },
  { code: 'HER', name: 'Heraklion International Airport', city: 'Crete', country: 'Greece', flag: '🇬🇷' },
  { code: 'SKG', name: 'Thessaloniki Airport', city: 'Thessaloniki', country: 'Greece', flag: '🇬🇷' },
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', flag: '🇹🇷' },
  { code: 'SAW', name: 'Istanbul Sabiha Gökçen Airport', city: 'Istanbul', country: 'Turkey', flag: '🇹🇷' },
  { code: 'AYT', name: 'Antalya Airport', city: 'Antalya', country: 'Turkey', flag: '🇹🇷' },
  { code: 'WAW', name: 'Warsaw Chopin Airport', city: 'Warsaw', country: 'Poland', flag: '🇵🇱' },
  { code: 'KRK', name: 'Kraków John Paul II Airport', city: 'Krakow', country: 'Poland', flag: '🇵🇱' },
  { code: 'PRG', name: 'Václav Havel Airport Prague', city: 'Prague', country: 'Czech Republic', flag: '🇨🇿' },
  { code: 'BUD', name: 'Budapest Ferenc Liszt International Airport', city: 'Budapest', country: 'Hungary', flag: '🇭🇺' },
  { code: 'OTP', name: 'Henri Coandă International Airport', city: 'Bucharest', country: 'Romania', flag: '🇷🇴' },
  { code: 'SOF', name: 'Sofia Airport', city: 'Sofia', country: 'Bulgaria', flag: '🇧🇬' },
  { code: 'BEG', name: 'Belgrade Nikola Tesla Airport', city: 'Belgrade', country: 'Serbia', flag: '🇷🇸' },
  { code: 'ZAG', name: 'Zagreb Airport', city: 'Zagreb', country: 'Croatia', flag: '🇭🇷' },

  // ==========================================
  // MIDDLE EAST
  // ==========================================
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'DWC', name: 'Al Maktoum International Airport', city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'AUH', name: 'Zayed International Airport', city: 'Abu Dhabi', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SHJ', name: 'Sharjah International Airport', city: 'Sharjah', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', flag: '🇶🇦' },
  { code: 'RUH', name: 'King Khalid International Airport', city: 'Riyadh', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'JED', name: 'King Abdulaziz International Airport', city: 'Jeddah', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'DMM', name: 'King Fahd International Airport', city: 'Dammam', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'MED', name: 'Prince Mohammad Bin Abdulaziz Airport', city: 'Medina', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'KWI', name: 'Kuwait International Airport', city: 'Kuwait City', country: 'Kuwait', flag: '🇰🇼' },
  { code: 'BAH', name: 'Bahrain International Airport', city: 'Manama', country: 'Bahrain', flag: '🇧🇭' },
  { code: 'MCT', name: 'Muscat International Airport', city: 'Muscat', country: 'Oman', flag: '🇴🇲' },
  { code: 'AMM', name: 'Queen Alia International Airport', city: 'Amman', country: 'Jordan', flag: '🇯🇴' },
  { code: 'BEY', name: 'Beirut-Rafic Hariri International Airport', city: 'Beirut', country: 'Lebanon', flag: '🇱🇧' },
  { code: 'TLV', name: 'Ben Gurion Airport', city: 'Tel Aviv', country: 'Israel', flag: '🇮🇱' },

  // ==========================================
  // SOUTH ASIA & INDIA
  // ==========================================
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', flag: '🇮🇳' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India', flag: '🇮🇳' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', country: 'India', flag: '🇮🇳' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India', flag: '🇮🇳' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India', flag: '🇮🇳' },
  { code: 'CCU', name: 'Netaji Subhash Chandra Bose International Airport', city: 'Kolkata', country: 'India', flag: '🇮🇳' },
  { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India', flag: '🇮🇳' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad', country: 'India', flag: '🇮🇳' },
  { code: 'GOI', name: 'Dabolim Airport', city: 'Goa', country: 'India', flag: '🇮🇳' },
  { code: 'GOX', name: 'Manohar International Airport', city: 'Goa', country: 'India', flag: '🇮🇳' },
  { code: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India', flag: '🇮🇳' },
  { code: 'TRV', name: 'Thiruvananthapuram International Airport', city: 'Trivandrum', country: 'India', flag: '🇮🇳' },
  { code: 'CCJ', name: 'Calicut International Airport', city: 'Kozhikode', country: 'India', flag: '🇮🇳' },
  { code: 'IXC', name: 'Shaheed Bhagat Singh International Airport', city: 'Chandigarh', country: 'India', flag: '🇮🇳' },
  { code: 'ATQ', name: 'Sri Guru Ram Dass Jee International Airport', city: 'Amritsar', country: 'India', flag: '🇮🇳' },
  { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', country: 'India', flag: '🇮🇳' },
  { code: 'LKO', name: 'Chaudhary Charan Singh International Airport', city: 'Lucknow', country: 'India', flag: '🇮🇳' },
  { code: 'GAU', name: 'Lokpriya Gopinath Bordoloi International Airport', city: 'Guwahati', country: 'India', flag: '🇮🇳' },
  { code: 'CMB', name: 'Bandaranaike International Airport', city: 'Colombo', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'MLE', name: 'Velana International Airport', city: 'Male', country: 'Maldives', flag: '🇲🇻' },
  { code: 'DAC', name: 'Hazrat Shahjalal International Airport', city: 'Dhaka', country: 'Bangladesh', flag: '🇧🇩' },
  { code: 'KTM', name: 'Tribhuvan International Airport', city: 'Kathmandu', country: 'Nepal', flag: '🇳🇵' },
  { code: 'KHI', name: 'Jinnah International Airport', city: 'Karachi', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'LHE', name: 'Allama Iqbal International Airport', city: 'Lahore', country: 'Pakistan', flag: '🇵🇰' },
  { code: 'ISB', name: 'Islamabad International Airport', city: 'Islamabad', country: 'Pakistan', flag: '🇵🇰' },

  // ==========================================
  // EAST ASIA — JAPAN, KOREA, CHINA, TAIWAN
  // ==========================================
  { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  { code: 'NRT', name: 'Tokyo Narita Airport', city: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  { code: 'KIX', name: 'Kansai International Airport', city: 'Osaka', country: 'Japan', flag: '🇯🇵' },
  { code: 'ITM', name: 'Osaka Itami Airport', city: 'Osaka', country: 'Japan', flag: '🇯🇵' },
  { code: 'FUK', name: 'Fukuoka Airport', city: 'Fukuoka', country: 'Japan', flag: '🇯🇵' },
  { code: 'CTS', name: 'New Chitose Airport', city: 'Sapporo', country: 'Japan', flag: '🇯🇵' },
  { code: 'NGO', name: 'Chubu Centrair International Airport', city: 'Nagoya', country: 'Japan', flag: '🇯🇵' },
  { code: 'OKA', name: 'Naha Airport', city: 'Okinawa', country: 'Japan', flag: '🇯🇵' },
  { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', flag: '🇰🇷' },
  { code: 'GMP', name: 'Gimpo International Airport', city: 'Seoul', country: 'South Korea', flag: '🇰🇷' },
  { code: 'PUS', name: 'Gimhae International Airport', city: 'Busan', country: 'South Korea', flag: '🇰🇷' },
  { code: 'CJU', name: 'Jeju International Airport', city: 'Jeju', country: 'South Korea', flag: '🇰🇷' },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong SAR', flag: '🇭🇰' },
  { code: 'TPE', name: 'Taiwan Taoyuan International Airport', city: 'Taipei', country: 'Taiwan', flag: '🇹🇼' },
  { code: 'TSA', name: 'Taipei Songshan Airport', city: 'Taipei', country: 'Taiwan', flag: '🇹🇼' },
  { code: 'KHH', name: 'Kaohsiung International Airport', city: 'Kaohsiung', country: 'Taiwan', flag: '🇹🇼' },
  { code: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', flag: '🇨🇳' },
  { code: 'PKX', name: 'Beijing Daxing International Airport', city: 'Beijing', country: 'China', flag: '🇨🇳' },
  { code: 'PVG', name: 'Shanghai Pudong International Airport', city: 'Shanghai', country: 'China', flag: '🇨🇳' },
  { code: 'SHA', name: 'Shanghai Hongqiao International Airport', city: 'Shanghai', country: 'China', flag: '🇨🇳' },
  { code: 'CAN', name: 'Guangzhou Baiyun International Airport', city: 'Guangzhou', country: 'China', flag: '🇨🇳' },
  { code: 'SZX', name: 'Shenzhen Bao\'an International Airport', city: 'Shenzhen', country: 'China', flag: '🇨🇳' },
  { code: 'CTU', name: 'Chengdu Shuangliu International Airport', city: 'Chengdu', country: 'China', flag: '🇨🇳' },
  { code: 'TFU', name: 'Chengdu Tianfu International Airport', city: 'Chengdu', country: 'China', flag: '🇨🇳' },

  // ==========================================
  // SOUTHEAST ASIA
  // ==========================================
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', flag: '🇹🇭' },
  { code: 'DMK', name: 'Don Mueang International Airport', city: 'Bangkok', country: 'Thailand', flag: '🇹🇭' },
  { code: 'HKT', name: 'Phuket International Airport', city: 'Phuket', country: 'Thailand', flag: '🇹🇭' },
  { code: 'CNX', name: 'Chiang Mai International Airport', city: 'Chiang Mai', country: 'Thailand', flag: '🇹🇭' },
  { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'PEN', name: 'Penang International Airport', city: 'Penang', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'BKI', name: 'Kota Kinabalu International Airport', city: 'Kota Kinabalu', country: 'Malaysia', flag: '🇲🇾' },
  { code: 'CGK', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'DPS', name: 'I Gusti Ngurah Rai International Airport', city: 'Bali / Denpasar', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'SUB', name: 'Juanda International Airport', city: 'Surabaya', country: 'Indonesia', flag: '🇮🇩' },
  { code: 'MNL', name: 'Ninoy Aquino International Airport', city: 'Manila', country: 'Philippines', flag: '🇵🇭' },
  { code: 'CEB', name: 'Mactan-Cebu International Airport', city: 'Cebu', country: 'Philippines', flag: '🇵🇭' },
  { code: 'SGN', name: 'Tan Son Nhat International Airport', city: 'Ho Chi Minh City', country: 'Vietnam', flag: '🇻🇳' },
  { code: 'HAN', name: 'Noi Bai International Airport', city: 'Hanoi', country: 'Vietnam', flag: '🇻🇳' },
  { code: 'DAD', name: 'Da Nang International Airport', city: 'Da Nang', country: 'Vietnam', flag: '🇻🇳' },

  // ==========================================
  // OCEANIA — AUSTRALIA & NEW ZEALAND
  // ==========================================
  { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', flag: '🇦🇺' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', flag: '🇦🇺' },
  { code: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia', flag: '🇦🇺' },
  { code: 'PER', name: 'Perth Airport', city: 'Perth', country: 'Australia', flag: '🇦🇺' },
  { code: 'ADL', name: 'Adelaide Airport', city: 'Adelaide', country: 'Australia', flag: '🇦🇺' },
  { code: 'OOL', name: 'Gold Coast Airport', city: 'Gold Coast', country: 'Australia', flag: '🇦🇺' },
  { code: 'CNS', name: 'Cairns Airport', city: 'Cairns', country: 'Australia', flag: '🇦🇺' },
  { code: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'CHC', name: 'Christchurch Airport', city: 'Christchurch', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'WLG', name: 'Wellington Airport', city: 'Wellington', country: 'New Zealand', flag: '🇳🇿' },
  { code: 'NAN', name: 'Nadi International Airport', city: 'Nadi', country: 'Fiji', flag: '🇫🇯' },

  // ==========================================
  // LATIN AMERICA & CARIBBEAN
  // ==========================================
  { code: 'GRU', name: 'São Paulo/Guarulhos International Airport', city: 'Sao Paulo', country: 'Brazil', flag: '🇧🇷' },
  { code: 'CGH', name: 'São Paulo/Congonhas Airport', city: 'Sao Paulo', country: 'Brazil', flag: '🇧🇷' },
  { code: 'GIG', name: 'Rio de Janeiro/Galeão International Airport', city: 'Rio de Janeiro', country: 'Brazil', flag: '🇧🇷' },
  { code: 'SDU', name: 'Santos Dumont Airport', city: 'Rio de Janeiro', country: 'Brazil', flag: '🇧🇷' },
  { code: 'BSB', name: 'Brasília International Airport', city: 'Brasilia', country: 'Brazil', flag: '🇧🇷' },
  { code: 'BOG', name: 'El Dorado International Airport', city: 'Bogota', country: 'Colombia', flag: '🇨🇴' },
  { code: 'MDE', name: 'José María Córdova International Airport', city: 'Medellin', country: 'Colombia', flag: '🇨🇴' },
  { code: 'EZE', name: 'Ministro Pistarini International Airport', city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷' },
  { code: 'AEP', name: 'Aeroparque Jorge Newbery', city: 'Buenos Aires', country: 'Argentina', flag: '🇦🇷' },
  { code: 'SCL', name: 'Arturo Merino Benítez International Airport', city: 'Santiago', country: 'Chile', flag: '🇨🇱' },
  { code: 'LIM', name: 'Jorge Chávez International Airport', city: 'Lima', country: 'Peru', flag: '🇵🇪' },
  { code: 'PTY', name: 'Tocumen International Airport', city: 'Panama City', country: 'Panama', flag: '🇵🇦' },
  { code: 'SJO', name: 'Juan Santamaría International Airport', city: 'San Jose', country: 'Costa Rica', flag: '🇨🇷' },
  { code: 'SJU', name: 'Luis Muñoz Marín International Airport', city: 'San Juan', country: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'SDQ', name: 'Las Américas International Airport', city: 'Santo Domingo', country: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'PUJ', name: 'Punta Cana International Airport', city: 'Punta Cana', country: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'MBJ', name: 'Sangster International Airport', city: 'Montego Bay', country: 'Jamaica', flag: '🇯🇲' },
  { code: 'NAS', name: 'Lynden Pindling International Airport', city: 'Nassau', country: 'Bahamas', flag: '🇧🇸' },

  // ==========================================
  // AFRICA
  // ==========================================
  { code: 'JNB', name: 'O.R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa', flag: '🇿🇦' },
  { code: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa', flag: '🇿🇦' },
  { code: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa', flag: '🇿🇦' },
  { code: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt', flag: '🇪🇬' },
  { code: 'HRG', name: 'Hurghada International Airport', city: 'Hurghada', country: 'Egypt', flag: '🇪🇬' },
  { code: 'SSH', name: 'Sharm El Sheikh International Airport', city: 'Sharm El Sheikh', country: 'Egypt', flag: '🇪🇬' },
  { code: 'CMN', name: 'Mohammed V International Airport', city: 'Casablanca', country: 'Morocco', flag: '🇲🇦' },
  { code: 'RAK', name: 'Marrakesh Menara Airport', city: 'Marrakech', country: 'Morocco', flag: '🇲🇦' },
  { code: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi', country: 'Kenya', flag: '🇰🇪' },
  { code: 'ADD', name: 'Addis Ababa Bole International Airport', city: 'Addis Ababa', country: 'Ethiopia', flag: '🇪🇹' },
  { code: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria', flag: '🇳🇬' },
  { code: 'ACC', name: 'Kotoka International Airport', city: 'Accra', country: 'Ghana', flag: '🇬🇭' },
  { code: 'MRU', name: 'Sir Seewoosagur Ramgoolam International Airport', city: 'Mauritius', country: 'Mauritius', flag: '🇲🇺' },
  { code: 'SEZ', name: 'Seychelles International Airport', city: 'Mahe', country: 'Seychelles', flag: '🇸🇨' }
];

/**
 * Top world gateway hubs displayed by default when the user opens the dropdown with no query.
 */
export const DEFAULT_POPULAR_AIRPORTS: Airport[] = [
  MAJOR_AIRPORTS[0],  // JFK
  MAJOR_AIRPORTS[3],  // LAX
  MAJOR_AIRPORTS[48], // LHR
  MAJOR_AIRPORTS[58], // CDG
  MAJOR_AIRPORTS[62], // FRA
  MAJOR_AIRPORTS[105],// DXB
  MAJOR_AIRPORTS[109],// DOH
  MAJOR_AIRPORTS[119],// DEL
  MAJOR_AIRPORTS[120],// BOM
  MAJOR_AIRPORTS[121],// BLR
  MAJOR_AIRPORTS[143],// SIN
  MAJOR_AIRPORTS[131],// HND
  MAJOR_AIRPORTS[139],// HKG
  MAJOR_AIRPORTS[159] // SYD
].filter(Boolean);

/**
 * Smart airport search supporting IATA code prefix, exact matches, city, airport name, and country.
 * Also handles custom unlisted 3-letter IATA codes dynamically.
 */
export function findAirport(query: string): Airport[] {
  if (!query || !query.trim()) {
    return DEFAULT_POPULAR_AIRPORTS;
  }

  const q = query.toUpperCase().trim();
  const qLower = query.toLowerCase().trim();

  // 1. Exact IATA code match
  const exactCode = MAJOR_AIRPORTS.filter(a => a.code === q);

  // 2. IATA prefix match (e.g. "JF" -> JFK)
  const prefixCode = MAJOR_AIRPORTS.filter(a => a.code.startsWith(q) && a.code !== q);

  // 3. City prefix match (e.g. "Lon" -> London Heathrow)
  const prefixCity = MAJOR_AIRPORTS.filter(
    a => a.city.toLowerCase().startsWith(qLower) && !exactCode.includes(a) && !prefixCode.includes(a)
  );

  // 4. Substring in city, name, or country
  const substringMatch = MAJOR_AIRPORTS.filter(
    a =>
      (a.city.toLowerCase().includes(qLower) ||
        a.name.toLowerCase().includes(qLower) ||
        a.country.toLowerCase().includes(qLower)) &&
      !exactCode.includes(a) &&
      !prefixCode.includes(a) &&
      !prefixCity.includes(a)
  );

  const results = [...exactCode, ...prefixCode, ...prefixCity, ...substringMatch];

  // If no results matched and user typed exactly 3 letters, provide a dynamic custom airport suggestion!
  if (results.length === 0 && /^[A-Z]{3}$/.test(q)) {
    results.push({
      code: q,
      name: `${q} International Airport`,
      city: q,
      country: 'Global Airport',
      flag: '✈️'
    });
  }

  return results.slice(0, 16);
}

/**
 * Direct lookup by 3-letter IATA code with zero-crash dynamic fallback.
 */
export function getAirport(code: string): Airport {
  const clean = (code || '').toUpperCase().trim();
  const found = MAJOR_AIRPORTS.find(a => a.code === clean);
  if (found) return found;

  return {
    code: clean || 'UNK',
    name: `${clean} Airport`,
    city: clean || 'Airport',
    country: '',
    flag: '✈️'
  };
}
