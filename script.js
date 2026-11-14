(function () {
  'use strict';

  // Curated Major World Cities / Zones (100% Free Built-in IANA Timezones)
  const CURATED_ZONES = [
    { tz: 'UTC', label: 'UTC — Coordinated Universal Time' },
    { tz: 'America/New_York', label: 'New York, USA (Eastern)' },
    { tz: 'America/Chicago', label: 'Chicago, USA (Central)' },
    { tz: 'America/Denver', label: 'Denver, USA (Mountain)' },
    { tz: 'America/Los_Angeles', label: 'Los Angeles, USA (Pacific)' },
    { tz: 'America/Anchorage', label: 'Anchorage, USA (Alaska)' },
    { tz: 'Pacific/Honolulu', label: 'Honolulu, USA (Hawaii)' },
    { tz: 'America/Toronto', label: 'Toronto, Canada' },
    { tz: 'America/Vancouver', label: 'Vancouver, Canada' },
    { tz: 'America/Mexico_City', label: 'Mexico City, Mexico' },
    { tz: 'America/Sao_Paulo', label: 'São Paulo, Brazil' },
    { tz: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires, Argentina' },
    { tz: 'Europe/London', label: 'London, United Kingdom' },
    { tz: 'Europe/Dublin', label: 'Dublin, Ireland' },
    { tz: 'Europe/Lisbon', label: 'Lisbon, Portugal' },
    { tz: 'Europe/Paris', label: 'Paris, France' },
    { tz: 'Europe/Berlin', label: 'Berlin, Germany' },
    { tz: 'Europe/Madrid', label: 'Madrid, Spain' },
    { tz: 'Europe/Rome', label: 'Rome, Italy' },
    { tz: 'Europe/Amsterdam', label: 'Amsterdam, Netherlands' },
    { tz: 'Europe/Zurich', label: 'Zurich, Switzerland' },
    { tz: 'Europe/Stockholm', label: 'Stockholm, Sweden' },
    { tz: 'Europe/Warsaw', label: 'Warsaw, Poland' },
    { tz: 'Europe/Athens', label: 'Athens, Greece' },
    { tz: 'Europe/Istanbul', label: 'Istanbul, Turkey' },
    { tz: 'Europe/Moscow', label: 'Moscow, Russia' },
    { tz: 'Africa/Cairo', label: 'Cairo, Egypt' },
    { tz: 'Africa/Johannesburg', label: 'Johannesburg, South Africa' },
    { tz: 'Africa/Lagos', label: 'Lagos, Nigeria' },
    { tz: 'Africa/Nairobi', label: 'Nairobi, Kenya' },
    { tz: 'Asia/Jerusalem', label: 'Jerusalem, Israel' },
    { tz: 'Asia/Riyadh', label: 'Riyadh, Saudi Arabia' },
    { tz: 'Asia/Dubai', label: 'Dubai, UAE' },
    { tz: 'Asia/Karachi', label: 'Karachi, Pakistan' },
    { tz: 'Asia/Kolkata', label: 'Mumbai / New Delhi, India' },
    { tz: 'Asia/Kathmandu', label: 'Kathmandu, Nepal' },
    { tz: 'Asia/Dhaka', label: 'Dhaka, Bangladesh' },
    { tz: 'Asia/Bangkok', label: 'Bangkok, Thailand' },
    { tz: 'Asia/Jakarta', label: 'Jakarta, Indonesia' },
    { tz: 'Asia/Singapore', label: 'Singapore' },
    { tz: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur, Malaysia' },
    { tz: 'Asia/Manila', label: 'Manila, Philippines' },
    { tz: 'Asia/Hong_Kong', label: 'Hong Kong' },
    { tz: 'Asia/Taipei', label: 'Taipei, Taiwan' },
    { tz: 'Asia/Shanghai', label: 'Beijing / Shanghai, China' },
    { tz: 'Asia/Seoul', label: 'Seoul, South Korea' },
    { tz: 'Asia/Tokyo', label: 'Tokyo, Japan' },
    { tz: 'Australia/Perth', label: 'Perth, Australia' },
    { tz: 'Australia/Adelaide', label: 'Adelaide, Australia' },
    { tz: 'Australia/Sydney', label: 'Sydney / Melbourne, Australia' },
    { tz: 'Australia/Brisbane', label: 'Brisbane, Australia' },
    { tz: 'Pacific/Auckland', label: 'Auckland, New Zealand' }
  ];

  const CURATED_MAP = new Map();
  for (let i = 0; i < CURATED_ZONES.length; i++) {
    CURATED_MAP.set(CURATED_ZONES[i].tz, CURATED_ZONES[i].label);
  }

  // 100% Free Public-Domain IANA Timezone -> ISO 3166-1 Alpha-2 Country Code Mapping
  const TZ_TO_COUNTRY_CODE = {
    'Africa/Abidjan': 'CI', 'Africa/Accra': 'GH', 'Africa/Addis_Ababa': 'ET', 'Africa/Algiers': 'DZ',
    'Africa/Asmera': 'ER', 'Africa/Asmara': 'ER', 'Africa/Bamako': 'ML', 'Africa/Bangui': 'CF',
    'Africa/Banjul': 'GM', 'Africa/Bissau': 'GW', 'Africa/Blantyre': 'MW', 'Africa/Brazzaville': 'CG',
    'Africa/Bujumbura': 'BI', 'Africa/Cairo': 'EG', 'Africa/Casablanca': 'MA', 'Africa/Ceuta': 'ES',
    'Africa/Conakry': 'GN', 'Africa/Dakar': 'SN', 'Africa/Dar_es_Salaam': 'TZ', 'Africa/Djibouti': 'DJ',
    'Africa/Douala': 'CM', 'Africa/El_Aaiun': 'EH', 'Africa/Freetown': 'SL', 'Africa/Gaborone': 'BW',
    'Africa/Harare': 'ZW', 'Africa/Johannesburg': 'ZA', 'Africa/Juba': 'SS', 'Africa/Kampala': 'UG',
    'Africa/Khartoum': 'SD', 'Africa/Kigali': 'RW', 'Africa/Kinshasa': 'CD', 'Africa/Lagos': 'NG',
    'Africa/Libreville': 'GA', 'Africa/Lome': 'TG', 'Africa/Luanda': 'AO', 'Africa/Lubumbashi': 'CD',
    'Africa/Lusaka': 'ZM', 'Africa/Malabo': 'GQ', 'Africa/Maputo': 'MZ', 'Africa/Maseru': 'LS',
    'Africa/Mbabane': 'SZ', 'Africa/Mogadishu': 'SO', 'Africa/Monrovia': 'LR', 'Africa/Nairobi': 'KE',
    'Africa/Ndjamena': 'TD', 'Africa/Niamey': 'NE', 'Africa/Nouakchott': 'MR', 'Africa/Ouagadougou': 'BF',
    'Africa/Porto-Novo': 'BJ', 'Africa/Sao_Tome': 'ST', 'Africa/Tripoli': 'LY', 'Africa/Tunis': 'TN',
    'Africa/Windhoek': 'NA',
    'America/Adak': 'US', 'America/Anchorage': 'US', 'America/Anguilla': 'AI', 'America/Antigua': 'AG',
    'America/Araguaina': 'BR', 'America/Argentina/Buenos_Aires': 'AR', 'America/Argentina/Catamarca': 'AR',
    'America/Argentina/Cordoba': 'AR', 'America/Argentina/Jujuy': 'AR', 'America/Argentina/La_Rioja': 'AR',
    'America/Argentina/Mendoza': 'AR', 'America/Argentina/Rio_Gallegos': 'AR', 'America/Argentina/Salta': 'AR',
    'America/Argentina/San_Juan': 'AR', 'America/Argentina/San_Luis': 'AR', 'America/Argentina/Tucuman': 'AR',
    'America/Argentina/Ushuaia': 'AR', 'America/Aruba': 'AW', 'America/Asuncion': 'PY', 'America/Atikokan': 'CA',
    'America/Bahia': 'BR', 'America/Bahia_Banderas': 'MX', 'America/Barbados': 'BB', 'America/Belem': 'BR',
    'America/Belize': 'BZ', 'America/Blanc-Sablon': 'CA', 'America/Boa_Vista': 'BR', 'America/Bogota': 'CO',
    'America/Boise': 'US', 'America/Buenos_Aires': 'AR', 'America/Cambridge_Bay': 'CA', 'America/Campo_Grande': 'BR',
    'America/Cancun': 'MX', 'America/Caracas': 'VE', 'America/Catamarca': 'AR', 'America/Cayenne': 'GF',
    'America/Cayman': 'KY', 'America/Chicago': 'US', 'America/Chihuahua': 'MX', 'America/Ciudad_Juarez': 'MX',
    'America/Coral_Harbour': 'CA', 'America/Cordoba': 'AR', 'America/Costa_Rica': 'CR', 'America/Coyhaique': 'CL',
    'America/Creston': 'CA', 'America/Cuiaba': 'BR', 'America/Curacao': 'CW', 'America/Danmarkshavn': 'GL',
    'America/Dawson': 'CA', 'America/Dawson_Creek': 'CA', 'America/Denver': 'US', 'America/Detroit': 'US',
    'America/Dominica': 'DM', 'America/Edmonton': 'CA', 'America/Eirunepe': 'BR', 'America/El_Salvador': 'SV',
    'America/Fort_Nelson': 'CA', 'America/Fortaleza': 'BR', 'America/Glace_Bay': 'CA', 'America/Godthab': 'GL',
    'America/Nuuk': 'GL', 'America/Goose_Bay': 'CA', 'America/Grand_Turk': 'TC', 'America/Grenada': 'GD',
    'America/Guadeloupe': 'GP', 'America/Guatemala': 'GT', 'America/Guayaquil': 'EC', 'America/Guyana': 'GY',
    'America/Halifax': 'CA', 'America/Havana': 'CU', 'America/Hermosillo': 'MX', 'America/Indiana/Indianapolis': 'US',
    'America/Indiana/Knox': 'US', 'America/Indiana/Marengo': 'US', 'America/Indiana/Petersburg': 'US',
    'America/Indiana/Tell_City': 'US', 'America/Indiana/Vevay': 'US', 'America/Indiana/Vincennes': 'US',
    'America/Indiana/Winamac': 'US', 'America/Indianapolis': 'US', 'America/Inuvik': 'CA', 'America/Iqaluit': 'CA',
    'America/Jamaica': 'JM', 'America/Jujuy': 'AR', 'America/Juneau': 'US', 'America/Kentucky/Louisville': 'US',
    'America/Kentucky/Monticello': 'US', 'America/Kralendijk': 'BQ', 'America/La_Paz': 'BO', 'America/Lima': 'PE',
    'America/Los_Angeles': 'US', 'America/Louisville': 'US', 'America/Lower_Princes': 'SX', 'America/Maceio': 'BR',
    'America/Managua': 'NI', 'America/Manaus': 'BR', 'America/Marigot': 'MF', 'America/Martinique': 'MQ',
    'America/Matamoros': 'MX', 'America/Mazatlan': 'MX', 'America/Mendoza': 'AR', 'America/Menominee': 'US',
    'America/Merida': 'MX', 'America/Metlakatla': 'US', 'America/Mexico_City': 'MX', 'America/Miquelon': 'PM',
    'America/Moncton': 'CA', 'America/Monterrey': 'MX', 'America/Montevideo': 'UY', 'America/Montserrat': 'MS',
    'America/Nassau': 'BS', 'America/New_York': 'US', 'America/Nome': 'US', 'America/Noronha': 'BR',
    'America/North_Dakota/Beulah': 'US', 'America/North_Dakota/Center': 'US', 'America/North_Dakota/New_Salem': 'US',
    'America/Ojinaga': 'MX', 'America/Panama': 'PA', 'America/Paramaribo': 'SR', 'America/Phoenix': 'US',
    'America/Port-au-Prince': 'HT', 'America/Port_of_Spain': 'TT', 'America/Porto_Velho': 'BR',
    'America/Puerto_Rico': 'PR', 'America/Punta_Arenas': 'CL', 'America/Rankin_Inlet': 'CA', 'America/Recife': 'BR',
    'America/Regina': 'CA', 'America/Resolute': 'CA', 'America/Rio_Branco': 'BR', 'America/Santarem': 'BR',
    'America/Santiago': 'CL', 'America/Santo_Domingo': 'DO', 'America/Sao_Paulo': 'BR', 'America/Scoresbysund': 'GL',
    'America/Sitka': 'US', 'America/St_Barthelemy': 'BL', 'America/St_Johns': 'CA', 'America/St_Kitts': 'KN',
    'America/St_Lucia': 'LC', 'America/St_Thomas': 'VI', 'America/St_Vincent': 'VC', 'America/Swift_Current': 'CA',
    'America/Tegucigalpa': 'HN', 'America/Thule': 'GL', 'America/Tijuana': 'MX', 'America/Toronto': 'CA',
    'America/Tortola': 'VG', 'America/Vancouver': 'CA', 'America/Whitehorse': 'CA', 'America/Winnipeg': 'CA',
    'America/Yakutat': 'US',
    'Antarctica/Casey': 'AQ', 'Antarctica/Davis': 'AQ', 'Antarctica/DumontDUrville': 'AQ',
    'Antarctica/Macquarie': 'AU', 'Antarctica/Mawson': 'AQ', 'Antarctica/McMurdo': 'AQ',
    'Antarctica/Palmer': 'AQ', 'Antarctica/Rothera': 'AQ', 'Antarctica/Syowa': 'AQ',
    'Antarctica/Troll': 'AQ', 'Antarctica/Vostok': 'AQ',
    'Arctic/Longyearbyen': 'SJ',
    'Asia/Aden': 'YE', 'Asia/Almaty': 'KZ', 'Asia/Amman': 'JO', 'Asia/Anadyr': 'RU', 'Asia/Aqtau': 'KZ',
    'Asia/Aqtobe': 'KZ', 'Asia/Ashgabat': 'TM', 'Asia/Atyrau': 'KZ', 'Asia/Baghdad': 'IQ', 'Asia/Bahrain': 'BH',
    'Asia/Baku': 'AZ', 'Asia/Bangkok': 'TH', 'Asia/Barnaul': 'RU', 'Asia/Beirut': 'LB', 'Asia/Bishkek': 'KG',
    'Asia/Brunei': 'BN', 'Asia/Calcutta': 'IN', 'Asia/Kolkata': 'IN', 'Asia/Chita': 'RU', 'Asia/Colombo': 'LK',
    'Asia/Damascus': 'SY', 'Asia/Dhaka': 'BD', 'Asia/Dili': 'TL', 'Asia/Dubai': 'AE', 'Asia/Dushanbe': 'TJ',
    'Asia/Famagusta': 'CY', 'Asia/Gaza': 'PS', 'Asia/Hebron': 'PS', 'Asia/Hong_Kong': 'HK', 'Asia/Hovd': 'MN',
    'Asia/Irkutsk': 'RU', 'Asia/Jakarta': 'ID', 'Asia/Jayapura': 'ID', 'Asia/Jerusalem': 'IL', 'Asia/Kabul': 'AF',
    'Asia/Kamchatka': 'RU', 'Asia/Karachi': 'PK', 'Asia/Katmandu': 'NP', 'Asia/Kathmandu': 'NP',
    'Asia/Khandyga': 'RU', 'Asia/Krasnoyarsk': 'RU', 'Asia/Kuala_Lumpur': 'MY', 'Asia/Kuching': 'MY',
    'Asia/Kuwait': 'KW', 'Asia/Macau': 'MO', 'Asia/Magadan': 'RU', 'Asia/Makassar': 'ID', 'Asia/Manila': 'PH',
    'Asia/Muscat': 'OM', 'Asia/Nicosia': 'CY', 'Asia/Novokuznetsk': 'RU', 'Asia/Novosibirsk': 'RU',
    'Asia/Omsk': 'RU', 'Asia/Oral': 'KZ', 'Asia/Phnom_Penh': 'KH', 'Asia/Pontianak': 'ID',
    'Asia/Pyongyang': 'KP', 'Asia/Qatar': 'QA', 'Asia/Qostanay': 'KZ', 'Asia/Qyzylorda': 'KZ',
    'Asia/Rangoon': 'MM', 'Asia/Yangon': 'MM', 'Asia/Riyadh': 'SA', 'Asia/Saigon': 'VN',
    'Asia/Ho_Chi_Minh': 'VN', 'Asia/Sakhalin': 'RU', 'Asia/Samarkand': 'UZ', 'Asia/Seoul': 'KR',
    'Asia/Shanghai': 'CN', 'Asia/Singapore': 'SG', 'Asia/Srednekolymsk': 'RU', 'Asia/Taipei': 'TW',
    'Asia/Tashkent': 'UZ', 'Asia/Tbilisi': 'GE', 'Asia/Tehran': 'IR', 'Asia/Thimphu': 'BT',
    'Asia/Tokyo': 'JP', 'Asia/Tomsk': 'RU', 'Asia/Ulaanbaatar': 'MN', 'Asia/Urumqi': 'CN',
    'Asia/Ust-Nera': 'RU', 'Asia/Vientiane': 'LA', 'Asia/Vladivostok': 'RU', 'Asia/Yakutsk': 'RU',
    'Asia/Yekaterinburg': 'RU', 'Asia/Yerevan': 'AM',
    'Atlantic/Azores': 'PT', 'Atlantic/Bermuda': 'BM', 'Atlantic/Canary': 'ES', 'Atlantic/Cape_Verde': 'CV',
    'Atlantic/Faeroe': 'FO', 'Atlantic/Faroe': 'FO', 'Atlantic/Madeira': 'PT', 'Atlantic/Reykjavik': 'IS',
    'Atlantic/South_Georgia': 'GS', 'Atlantic/St_Helena': 'SH', 'Atlantic/Stanley': 'FK',
    'Australia/Adelaide': 'AU', 'Australia/Brisbane': 'AU', 'Australia/Broken_Hill': 'AU',
    'Australia/Darwin': 'AU', 'Australia/Eucla': 'AU', 'Australia/Hobart': 'AU', 'Australia/Lindeman': 'AU',
    'Australia/Lord_Howe': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Perth': 'AU', 'Australia/Sydney': 'AU',
    'Europe/Amsterdam': 'NL', 'Europe/Andorra': 'AD', 'Europe/Astrakhan': 'RU', 'Europe/Athens': 'GR',
    'Europe/Belgrade': 'RS', 'Europe/Berlin': 'DE', 'Europe/Bratislava': 'SK', 'Europe/Brussels': 'BE',
    'Europe/Bucharest': 'RO', 'Europe/Budapest': 'HU', 'Europe/Busingen': 'DE', 'Europe/Chisinau': 'MD',
    'Europe/Copenhagen': 'DK', 'Europe/Dublin': 'IE', 'Europe/Gibraltar': 'GI', 'Europe/Guernsey': 'GG',
    'Europe/Helsinki': 'FI', 'Europe/Isle_of_Man': 'IM', 'Europe/Istanbul': 'TR', 'Europe/Jersey': 'JE',
    'Europe/Kaliningrad': 'RU', 'Europe/Kiev': 'UA', 'Europe/Kyiv': 'UA', 'Europe/Kirov': 'RU',
    'Europe/Lisbon': 'PT', 'Europe/Ljubljana': 'SI', 'Europe/London': 'GB', 'Europe/Luxembourg': 'LU',
    'Europe/Madrid': 'ES', 'Europe/Malta': 'MT', 'Europe/Mariehamn': 'AX', 'Europe/Minsk': 'BY',
    'Europe/Monaco': 'MC', 'Europe/Moscow': 'RU', 'Europe/Oslo': 'NO', 'Europe/Paris': 'FR',
    'Europe/Podgorica': 'ME', 'Europe/Prague': 'CZ', 'Europe/Riga': 'LV', 'Europe/Rome': 'IT',
    'Europe/Samara': 'RU', 'Europe/San_Marino': 'SM', 'Europe/Sarajevo': 'BA', 'Europe/Saratov': 'RU',
    'Europe/Simferopol': 'UA', 'Europe/Skopje': 'MK', 'Europe/Sofia': 'BG', 'Europe/Stockholm': 'SE',
    'Europe/Tallinn': 'EE', 'Europe/Tirane': 'AL', 'Europe/Ulyanovsk': 'RU', 'Europe/Vaduz': 'LI',
    'Europe/Vatican': 'VA', 'Europe/Vienna': 'AT', 'Europe/Vilnius': 'LT', 'Europe/Volgograd': 'RU',
    'Europe/Warsaw': 'PL', 'Europe/Zagreb': 'HR', 'Europe/Zurich': 'CH',
    'Indian/Antananarivo': 'MG', 'Indian/Chagos': 'IO', 'Indian/Christmas': 'CX', 'Indian/Cocos': 'CC',
    'Indian/Comoro': 'KM', 'Indian/Kerguelen': 'TF', 'Indian/Mahe': 'SC', 'Indian/Maldives': 'MV',
    'Indian/Mauritius': 'MU', 'Indian/Mayotte': 'YT', 'Indian/Reunion': 'RE',
    'Pacific/Apia': 'WS', 'Pacific/Auckland': 'NZ', 'Pacific/Bougainville': 'PG', 'Pacific/Chatham': 'NZ',
    'Pacific/Easter': 'CL', 'Pacific/Efate': 'VU', 'Pacific/Enderbury': 'KI', 'Pacific/Kanton': 'KI',
    'Pacific/Fakaofo': 'TK', 'Pacific/Fiji': 'FJ', 'Pacific/Funafuti': 'TV', 'Pacific/Galapagos': 'EC',
    'Pacific/Gambier': 'PF', 'Pacific/Guadalcanal': 'SB', 'Pacific/Guam': 'GU', 'Pacific/Honolulu': 'US',
    'Pacific/Kiritimati': 'KI', 'Pacific/Kosrae': 'FM', 'Pacific/Kwajalein': 'MH', 'Pacific/Majuro': 'MH',
    'Pacific/Marquesas': 'PF', 'Pacific/Midway': 'UM', 'Pacific/Nauru': 'NR', 'Pacific/Niue': 'NU',
    'Pacific/Norfolk': 'NF', 'Pacific/Noumea': 'NC', 'Pacific/Pago_Pago': 'AS', 'Pacific/Palau': 'PW',
    'Pacific/Pitcairn': 'PN', 'Pacific/Ponape': 'FM', 'Pacific/Pohnpei': 'FM', 'Pacific/Port_Moresby': 'PG',
    'Pacific/Rarotonga': 'CK', 'Pacific/Saipan': 'MP', 'Pacific/Tahiti': 'PF', 'Pacific/Tarawa': 'KI',
    'Pacific/Tongatapu': 'TO', 'Pacific/Truk': 'FM', 'Pacific/Chuuk': 'FM', 'Pacific/Wake': 'UM',
    'Pacific/Wallis': 'WF'
  };

  // Fallback Country Names (used if Intl.DisplayNames is unavailable)
  const COUNTRY_FALLBACK_NAMES = {
    AD: 'Andorra', AE: 'United Arab Emirates', AF: 'Afghanistan', AG: 'Antigua & Barbuda',
    AI: 'Anguilla', AL: 'Albania', AM: 'Armenia', AO: 'Angola', AQ: 'Antarctica', AR: 'Argentina',
    AS: 'American Samoa', AT: 'Austria', AU: 'Australia', AW: 'Aruba', AX: 'Åland Islands',
    AZ: 'Azerbaijan', BA: 'Bosnia & Herzegovina', BB: 'Barbados', BD: 'Bangladesh', BE: 'Belgium',
    BF: 'Burkina Faso', BG: 'Bulgaria', BH: 'Bahrain', BI: 'Burundi', BJ: 'Benin',
    BL: 'St. Barthélemy', BM: 'Bermuda', BN: 'Brunei', BO: 'Bolivia', BQ: 'Caribbean Netherlands',
    BR: 'Brazil', BS: 'Bahamas', BT: 'Bhutan', BW: 'Botswana', BY: 'Belarus', BZ: 'Belize',
    CA: 'Canada', CC: 'Cocos (Keeling) Islands', CD: 'Congo - Kinshasa', CF: 'Central African Republic',
    CG: 'Congo - Brazzaville', CH: 'Switzerland', CI: 'Côte d’Ivoire', CK: 'Cook Islands',
    CL: 'Chile', CM: 'Cameroon', CN: 'China', CO: 'Colombia', CR: 'Costa Rica', CU: 'Cuba',
    CV: 'Cape Verde', CW: 'Curaçao', CX: 'Christmas Island', CY: 'Cyprus', CZ: 'Czechia',
    DE: 'Germany', DJ: 'Djibouti', DK: 'Denmark', DM: 'Dominica', DO: 'Dominican Republic',
    DZ: 'Algeria', EC: 'Ecuador', EE: 'Estonia', EG: 'Egypt', EH: 'Western Sahara', ER: 'Eritrea',
    ES: 'Spain', ET: 'Ethiopia', FI: 'Finland', FJ: 'Fiji', FK: 'Falkland Islands', FM: 'Micronesia',
    FO: 'Faroe Islands', FR: 'France', GA: 'Gabon', GB: 'United Kingdom', GD: 'Grenada',
    GE: 'Georgia', GF: 'French Guiana', GG: 'Guernsey', GH: 'Ghana', GI: 'Gibraltar',
    GL: 'Greenland', GM: 'Gambia', GN: 'Guinea', GP: 'Guadeloupe', GQ: 'Equatorial Guinea',
    GR: 'Greece', GS: 'South Georgia & South Sandwich Islands', GT: 'Guatemala', GU: 'Guam',
    GW: 'Guinea-Bissau', GY: 'Guyana', HK: 'Hong Kong', HN: 'Honduras', HR: 'Croatia',
    HT: 'Haiti', HU: 'Hungary', ID: 'Indonesia', IE: 'Ireland', IL: 'Israel', IM: 'Isle of Man',
    IN: 'India', IO: 'British Indian Ocean Territory', IQ: 'Iraq', IR: 'Iran', IS: 'Iceland',
    IT: 'Italy', JE: 'Jersey', JM: 'Jamaica', JO: 'Jordan', JP: 'Japan', KE: 'Kenya',
    KG: 'Kyrgyzstan', KH: 'Cambodia', KI: 'Kiribati', KM: 'Comoros', KN: 'St. Kitts & Nevis',
    KP: 'North Korea', KR: 'South Korea', KW: 'Kuwait', KY: 'Cayman Islands', KZ: 'Kazakhstan',
    LA: 'Laos', LB: 'Lebanon', LC: 'St. Lucia', LI: 'Liechtenstein', LK: 'Sri Lanka',
    LR: 'Liberia', LS: 'Lesotho', LT: 'Lithuania', LU: 'Luxembourg', LV: 'Latvia', LY: 'Libya',
    MA: 'Morocco', MC: 'Monaco', MD: 'Moldova', ME: 'Montenegro', MF: 'St. Martin',
    MG: 'Madagascar', MH: 'Marshall Islands', MK: 'North Macedonia', ML: 'Mali', MM: 'Myanmar (Burma)',
    MN: 'Mongolia', MO: 'Macau', MP: 'Northern Mariana Islands', MQ: 'Martinique', MR: 'Mauritania',
    MS: 'Montserrat', MT: 'Malta', MU: 'Mauritius', MV: 'Maldives', MW: 'Malawi', MX: 'Mexico',
    MY: 'Malaysia', MZ: 'Mozambique', NA: 'Namibia', NC: 'New Caledonia', NE: 'Niger',
    NF: 'Norfolk Island', NG: 'Nigeria', NI: 'Nicaragua', NL: 'Netherlands', NO: 'Norway',
    NP: 'Nepal', NR: 'Nauru', NU: 'Niue', NZ: 'New Zealand', OM: 'Oman', PA: 'Panama',
    PE: 'Peru', PF: 'French Polynesia', PG: 'Papua New Guinea', PH: 'Philippines', PK: 'Pakistan',
    PL: 'Poland', PM: 'St. Pierre & Miquelon', PN: 'Pitcairn Islands', PR: 'Puerto Rico',
    PS: 'Palestine', PT: 'Portugal', PW: 'Palau', PY: 'Paraguay', QA: 'Qatar', RE: 'Réunion',
    RO: 'Romania', RS: 'Serbia', RU: 'Russia', RW: 'Rwanda', SA: 'Saudi Arabia',
    SB: 'Solomon Islands', SC: 'Seychelles', SD: 'Sudan', SE: 'Sweden', SG: 'Singapore',
    SH: 'St. Helena', SI: 'Slovenia', SJ: 'Svalbard & Jan Mayen', SK: 'Slovakia', SL: 'Sierra Leone',
    SM: 'San Marino', SN: 'Senegal', SO: 'Somalia', SR: 'Suriname', SS: 'South Sudan',
    ST: 'São Tomé & Príncipe', SV: 'El Salvador', SX: 'Sint Maarten', SY: 'Syria',
    SZ: 'Eswatini', TC: 'Turks & Caicos Islands', TD: 'Chad', TF: 'French Southern Territories',
    TG: 'Togo', TH: 'Thailand', TJ: 'Tajikistan', TK: 'Tokelau', TL: 'Timor-Leste',
    TM: 'Turkmenistan', TN: 'Tunisia', TO: 'Tonga', TR: 'Turkey', TT: 'Trinidad & Tobago',
    TV: 'Tuvalu', TW: 'Taiwan', TZ: 'Tanzania', UA: 'Ukraine', UG: 'Uganda',
    UM: 'U.S. Outlying Islands', US: 'United States', UY: 'Uruguay', UZ: 'Uzbekistan',
    VA: 'Vatican City', VC: 'St. Vincent & Grenadines', VE: 'Venezuela', VG: 'British Virgin Islands',
    VI: 'U.S. Virgin Islands', VN: 'Vietnam', VU: 'Vanuatu', WF: 'Wallis & Futuna', WS: 'Samoa',
    XK: 'Kosovo', YE: 'Yemen', YT: 'Mayotte', ZA: 'South Africa', ZM: 'Zambia', ZW: 'Zimbabwe'
  };

  // Extra search keywords (capitals, alternative country names, major cities) by Country Code
  const COUNTRY_SEARCH_ALIASES = {
    AE: 'UAE United Arab Emirates Abu Dhabi Dubai',
    AU: 'Australia Canberra Sydney Melbourne Brisbane Perth Adelaide',
    BJ: 'Benin Cotonou Porto-Novo',
    BO: 'Bolivia Sucre La Paz',
    BR: 'Brazil Brasilia Rio de Janeiro Sao Paulo',
    BZ: 'Belize Belmopan',
    CA: 'Canada Ottawa Montreal Calgary Edmonton Vancouver Toronto',
    CD: 'DRC Democratic Republic of the Congo Congo-Kinshasa Kinshasa Lubumbashi',
    CG: 'Republic of the Congo Congo-Brazzaville Brazzaville',
    CH: 'Switzerland Bern Geneva Basel Zurich',
    CI: 'Ivory Coast Cote d Ivoire Yamoussoukro Abidjan',
    CM: 'Cameroon Yaounde Douala',
    CN: 'China PRC Beijing Shanghai Shenzhen Guangzhou Wuhan Chengdu',
    CV: 'Cape Verde Cabo Verde Praia',
    CZ: 'Czech Republic Czechia Prague',
    DE: 'Germany Deutschland Munich Frankfurt Hamburg Berlin',
    EC: 'Ecuador Quito Guayaquil Galapagos',
    ES: 'Spain Espana Barcelona Madrid Valencia Seville',
    FM: 'Micronesia Palikir Pohnpei Ponape Chuuk Truk Kosrae',
    FR: 'France Lyon Marseille Nice Paris',
    GB: 'UK United Kingdom Great Britain England Scotland Wales Northern Ireland London Edinburgh Manchester',
    GL: 'Greenland Nuuk Godthab',
    IL: 'Israel Tel Aviv Haifa Jerusalem',
    IN: 'India New Delhi Delhi Mumbai Bombay Bengaluru Bangalore Chennai Madras Hyderabad Kolkata Calcutta Pune Ahmedabad',
    IT: 'Italy Italia Milan Naples Turin Rome',
    JP: 'Japan Nippon Osaka Kyoto Yokohama Nagoya Sapporo Tokyo',
    KZ: 'Kazakhstan Astana Nur-Sultan Almaty',
    LK: 'Sri Lanka Sri Jayawardenepura Kotte Colombo',
    MA: 'Morocco Rabat Marrakech Tangier Fes Casablanca',
    MK: 'North Macedonia Macedonia Skopje',
    MM: 'Myanmar Burma Naypyidaw Yangon Rangoon',
    NG: 'Nigeria Abuja Kano Ibadan Lagos',
    NL: 'Netherlands Holland Rotterdam The Hague Utrecht Amsterdam',
    NZ: 'New Zealand Aotearoa Wellington Christchurch Auckland',
    PK: 'Pakistan Islamabad Lahore Rawalpindi Faisalabad Karachi',
    PS: 'Palestine West Bank Ramallah Gaza Hebron',
    RS: 'Serbia Belgrade Kosovo Pristina',
    RU: 'Russia Russian Federation Saint Petersburg St Petersburg Moscow',
    SA: 'Saudi Arabia KSA Mecca Makkah Medina Jeddah Dammam Riyadh',
    SZ: 'Eswatini Swaziland Mbabane Lobamba',
    TL: 'Timor-Leste East Timor Dili',
    TR: 'Turkey Turkiye Türkiye Ankara Izmir Antalya Istanbul',
    TW: 'Taiwan ROC Taipei Kaohsiung Taichung',
    TZ: 'Tanzania Dodoma Zanzibar Dar es Salaam',
    UA: 'Ukraine Kyiv Kiev Kharkiv Odesa Lviv',
    US: 'USA United States of America Washington DC Miami Boston Seattle Atlanta Houston Dallas San Francisco Philadelphia',
    VN: 'Vietnam Viet Nam Hanoi Ha Noi Da Nang Ho Chi Minh City Saigon',
    ZA: 'South Africa Pretoria Cape Town Durban Johannesburg'
  };

  // Modernized display names for legacy IANA city identifiers
  const FRIENDLY_CITY_OVERRIDES = {
    'Africa/Asmera': 'Asmara',
    'America/Coral_Harbour': 'Atikokan',
    'America/Godthab': 'Nuuk',
    'Asia/Calcutta': 'Kolkata (Mumbai / New Delhi)',
    'Asia/Kolkata': 'Kolkata (Mumbai / New Delhi)',
    'Asia/Katmandu': 'Kathmandu',
    'Asia/Rangoon': 'Yangon',
    'Asia/Saigon': 'Ho Chi Minh City / Hanoi',
    'Asia/Ho_Chi_Minh': 'Ho Chi Minh City / Hanoi',
    'Atlantic/Faeroe': 'Faroe',
    'Europe/Kiev': 'Kyiv',
    'Europe/Belgrade': 'Belgrade (Kosovo / Pristina)',
    'Pacific/Enderbury': 'Kanton',
    'Pacific/Ponape': 'Pohnpei',
    'Pacific/Truk': 'Chuuk'
  };

  // Equivalent IANA alias pairs to avoid duplicate rows while keeping both searchable
  const IANA_EQUIVALENT_GROUPS = [
    ['Asia/Kolkata', 'Asia/Calcutta'],
    ['Asia/Kathmandu', 'Asia/Katmandu'],
    ['Asia/Ho_Chi_Minh', 'Asia/Saigon'],
    ['Asia/Yangon', 'Asia/Rangoon'],
    ['Europe/Kyiv', 'Europe/Kiev'],
    ['Africa/Asmara', 'Africa/Asmera'],
    ['America/Nuuk', 'America/Godthab'],
    ['Atlantic/Faroe', 'Atlantic/Faeroe'],
    ['Pacific/Chuuk', 'Pacific/Truk'],
    ['Pacific/Pohnpei', 'Pacific/Ponape'],
    ['Pacific/Kanton', 'Pacific/Enderbury'],
    ['America/Atikokan', 'America/Coral_Harbour'],
    ['America/Argentina/Buenos_Aires', 'America/Buenos_Aires'],
    ['America/Argentina/Cordoba', 'America/Cordoba'],
    ['America/Argentina/Catamarca', 'America/Catamarca'],
    ['America/Argentina/Jujuy', 'America/Jujuy'],
    ['America/Argentina/Mendoza', 'America/Mendoza'],
    ['America/Indiana/Indianapolis', 'America/Indianapolis'],
    ['America/Kentucky/Louisville', 'America/Louisville']
  ];

  const IANA_ALIAS_LOOKUP = new Map();
  for (let i = 0; i < IANA_EQUIVALENT_GROUPS.length; i++) {
    const group = IANA_EQUIVALENT_GROUPS[i];
    for (let j = 0; j < group.length; j++) {
      IANA_ALIAS_LOOKUP.set(group[j], group);
    }
  }

  let regionDisplayNames = null;
  if (typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function') {
    try {
      regionDisplayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    } catch (e) {
      regionDisplayNames = null;
    }
  }

  function getCountryName(cc) {
    if (!cc) return '';
    if (COUNTRY_FALLBACK_NAMES[cc]) return COUNTRY_FALLBACK_NAMES[cc];
    if (regionDisplayNames) {
      try {
        const name = regionDisplayNames.of(cc);
        if (name && name !== cc) return name;
      } catch (e) {}
    }
    return cc;
  }

  function getZoneLabel(tz) {
    if (tz === 'UTC') return 'UTC — Coordinated Universal Time';
    if (CURATED_MAP.has(tz)) return CURATED_MAP.get(tz);
    const aliasGroup = IANA_ALIAS_LOOKUP.get(tz);
    if (aliasGroup) {
      for (let i = 0; i < aliasGroup.length; i++) {
        if (CURATED_MAP.has(aliasGroup[i])) return CURATED_MAP.get(aliasGroup[i]);
      }
    }
    const cc = TZ_TO_COUNTRY_CODE[tz];
    const countryName = getCountryName(cc);
    const parts = tz.split('/');
    let city = FRIENDLY_CITY_OVERRIDES[tz] || parts[parts.length - 1].replace(/_/g, ' ');
    if (parts.length === 3 && parts[1] !== 'Argentina') {
      const subregion = parts[1].replace(/_/g, ' ');
      city = city + ' (' + subregion + ')';
    }
    if (countryName && city.toLowerCase() !== countryName.toLowerCase()) {
      return city + ', ' + countryName;
    }
    return countryName || city;
  }

  function getZoneSearchKeywords(tz, displayLabel) {
    const cc = TZ_TO_COUNTRY_CODE[tz] || '';
    const countryName = getCountryName(cc);
    const fallbackCountry = COUNTRY_FALLBACK_NAMES[cc] || '';
    const countryAliases = COUNTRY_SEARCH_ALIASES[cc] || '';
    const aliasGroup = IANA_ALIAS_LOOKUP.get(tz);
    const aliasStr = aliasGroup ? aliasGroup.join(' ') : '';
    const curatedLabel = CURATED_MAP.get(tz) || '';
    return (
      tz + ' ' +
      displayLabel + ' ' +
      curatedLabel + ' ' +
      countryName + ' ' +
      fallbackCountry + ' ' +
      countryAliases + ' ' +
      aliasStr
    ).toLowerCase().replace(/_/g, ' ');
  }

  function getAllSupportedTimezones() {
    let list = [];
    if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
      try {
        list = Intl.supportedValuesOf('timeZone');
      } catch (e) {
        list = [];
      }
    }
    const rawSet = new Set(list);
    rawSet.add('UTC');
    for (let i = 0; i < CURATED_ZONES.length; i++) {
      rawSet.add(CURATED_ZONES[i].tz);
    }

    // Deduplicate equivalent IANA alias pairs (prefer curated / modern canonical ID)
    for (let i = 0; i < IANA_EQUIVALENT_GROUPS.length; i++) {
      const group = IANA_EQUIVALENT_GROUPS[i];
      let present = [];
      for (let j = 0; j < group.length; j++) {
        if (rawSet.has(group[j])) present.push(group[j]);
      }
      if (present.length > 1) {
        // Keep the first entry in the group (modern/curated), remove redundant alias
        for (let k = 1; k < present.length; k++) {
          rawSet.delete(present[k]);
        }
      }
    }

    return Array.from(rawSet).sort();
  }

  const ALL_TIMEZONES = getAllSupportedTimezones();

  // ==========================================================================
  // CACHED INTL FORMATTERS (ELIMINATES MOBILE & SEARCH LAG)
  // ==========================================================================
  const partsFormatterCache = new Map();
  const dateFormatterCache = new Map();
  const shortZoneFormatterCache = new Map();

  function getPartsFormatter(timeZone) {
    let fmt = partsFormatterCache.get(timeZone);
    if (!fmt) {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
      });
      partsFormatterCache.set(timeZone, fmt);
    }
    return fmt;
  }

  function getDateFormatter(timeZone) {
    let fmt = dateFormatterCache.get(timeZone);
    if (!fmt) {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      dateFormatterCache.set(timeZone, fmt);
    }
    return fmt;
  }

  function getShortZoneFormatter(timeZone) {
    let fmt = shortZoneFormatterCache.get(timeZone);
    if (!fmt) {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'short'
      });
      shortZoneFormatterCache.set(timeZone, fmt);
    }
    return fmt;
  }

  // DOM Elements
  const fromComboEl = document.getElementById('fromCombo');
  const toComboEl = document.getElementById('toCombo');
  const fromTzInput = document.getElementById('fromTz');
  const toTzInput = document.getElementById('toTz');
  const fromSearch = document.getElementById('fromSearch');
  const toSearch = document.getElementById('toSearch');
  const fromClear = document.getElementById('fromClear');
  const toClear = document.getElementById('toClear');
  const fromToggle = document.getElementById('fromToggle');
  const toToggle = document.getElementById('toToggle');
  const fromList = document.getElementById('fromList');
  const toList = document.getElementById('toList');

  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const fromOffsetEl = document.getElementById('fromOffset');
  const toOffsetEl = document.getElementById('toOffset');
  const fromTodEl = document.getElementById('fromTod');
  const toTodEl = document.getElementById('toTod');
  const fromFormattedDateEl = document.getElementById('fromFormattedDate');
  const fromZoneShortEl = document.getElementById('fromZoneShort');
  const toZoneShortEl = document.getElementById('toZoneShort');
  const resultTimeEl = document.getElementById('resultTime');
  const resultPeriodEl = document.getElementById('resultPeriod');
  const resultDateEl = document.getElementById('resultDate');
  const diffBadgeEl = document.getElementById('diffBadge');
  const dayShiftEl = document.getElementById('dayShift');
  const btnSwap = document.getElementById('btnSwap');
  const btnNow = document.getElementById('btnNow');
  const btnMinus1h = document.getElementById('btnMinus1h');
  const btnPlus1h = document.getElementById('btnPlus1h');
  const btn12h = document.getElementById('btn12h');
  const btn24h = document.getElementById('btn24h');
  const btnTheme = document.getElementById('btnTheme');
  const themeLabel = document.getElementById('themeLabel');
  const themeIcon = document.getElementById('themeIcon');
  const btnCopy = document.getElementById('btnCopy');
  const copyLabel = document.getElementById('copyLabel');
  const timelineScroll = document.getElementById('timelineScroll');
  const timelineGrid = document.getElementById('timelineGrid');

  let use12Hour = true;

  // Detect system theme
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = darkQuery.matches ? 'dark' : 'light';

  const SUN_SVG =
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>';
  const MOON_SVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  const TWILIGHT_SVG =
    '<path d="M17 18a5 5 0 0 0-10 0"/><path d="M12 9V2m-7.07 7.93l1.41 1.41M1 18h2m18 0h2m-3.66-6.66l1.41-1.41M23 22H1"/>';

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeLabel.textContent = 'Light';
      themeIcon.innerHTML = SUN_SVG;
    } else {
      themeLabel.textContent = 'Dark';
      themeIcon.innerHTML = MOON_SVG;
    }
  }

  darkQuery.addEventListener('change', function (e) {
    applyTheme(e.matches ? 'dark' : 'light');
  });

  function updateFormatToggleUI() {
    if (use12Hour) {
      btn12h.classList.add('is-active');
      btn12h.setAttribute('aria-pressed', 'true');
      btn24h.classList.remove('is-active');
      btn24h.setAttribute('aria-pressed', 'false');
    } else {
      btn24h.classList.add('is-active');
      btn24h.setAttribute('aria-pressed', 'true');
      btn12h.classList.remove('is-active');
      btn12h.setAttribute('aria-pressed', 'false');
    }
  }

  /**
   * Extract numerical date/time parts in a given IANA timezone for a UTC Date object
   */
  function getZonedParts(dateObj, timeZone) {
    const parts = getPartsFormatter(timeZone).formatToParts(dateObj);
    const map = {};
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].type !== 'literal') {
        map[parts[i].type] = parseInt(parts[i].value, 10);
      }
    }
    if (map.hour === 24) map.hour = 0;
    return map;
  }

  /**
   * Format date with hyphen separator: e.g. "Sat - Nov 14, 2026"
   */
  function formatDateHyphenated(dateObj, timeZone) {
    const parts = getDateFormatter(timeZone).formatToParts(dateObj);
    let weekday = '';
    let month = '';
    let day = '';
    let year = '';
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p.type === 'weekday') weekday = p.value;
      else if (p.type === 'month') month = p.value;
      else if (p.type === 'day') day = p.value;
      else if (p.type === 'year') year = p.value;
    }
    return weekday + ' - ' + month + ' ' + day + ', ' + year;
  }

  /**
   * Get short timezone abbreviation (e.g. "EST", "GMT+8", "UTC")
   */
  function getShortZoneName(dateObj, timeZone) {
    const parts = getShortZoneFormatter(timeZone).formatToParts(dateObj);
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].type === 'timeZoneName') {
        return parts[i].value;
      }
    }
    return timeZone;
  }

  /**
   * Get timezone offset in minutes at a specific UTC instant
   */
  function getOffsetMinutes(utcDate, timeZone) {
    const p = getZonedParts(utcDate, timeZone);
    const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second || 0);
    const utcFloor = Math.floor(utcDate.getTime() / 1000) * 1000;
    return Math.round((asUTC - utcFloor) / 60000);
  }

  /**
   * Convert wall-clock (year, month, day, hour, minute) in `sourceTz` into a UTC Date object
   */
  function wallTimeToUtcDate(year, month, day, hour, minute, sourceTz) {
    const targetWallUTC = Date.UTC(year, month - 1, day, hour, minute, 0);
    const offset1 = getOffsetMinutes(new Date(targetWallUTC), sourceTz);
    const guess1 = targetWallUTC - offset1 * 60000;
    const offset2 = getOffsetMinutes(new Date(guess1), sourceTz);
    return new Date(targetWallUTC - offset2 * 60000);
  }

  /**
   * Format offset minutes into "UTC+HH:MM" or "UTC-HH:MM"
   */
  function formatOffsetLabel(offsetMinutes) {
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const abs = Math.abs(offsetMinutes);
    const hh = String(Math.floor(abs / 60)).padStart(2, '0');
    const mm = String(abs % 60).padStart(2, '0');
    return 'UTC' + sign + hh + ':' + mm;
  }

  /**
   * Update Day / Evening / Night status badge for a given hour (0-23)
   */
  function updateTimeOfDayBadge(el, hour) {
    el.classList.remove('tod-day', 'tod-eve', 'tod-night');
    if (hour >= 7 && hour < 18) {
      el.classList.add('tod-day');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + SUN_SVG + '</svg><span>Day</span>';
    } else if ((hour >= 5 && hour < 7) || (hour >= 18 && hour < 21)) {
      el.classList.add('tod-eve');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + TWILIGHT_SVG + '</svg><span>Eve</span>';
    } else {
      el.classList.add('tod-night');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + MOON_SVG + '</svg><span>Night</span>';
    }
  }

  // ==========================================================================
  // NON-BLOCKING TIMEZONE CATALOG & UNIFIED COMBOBOX
  // ==========================================================================
  const popularCatalog = [];
  const allCatalog = [];
  let popularWarmCursor = 0;
  let allWarmCursor = 0;

  function initCatalog() {
    for (let i = 0; i < CURATED_ZONES.length; i++) {
      const item = CURATED_ZONES[i];
      popularCatalog.push({
        tz: item.tz,
        name: item.label,
        offsetStr: null,
        searchKey: getZoneSearchKeywords(item.tz, item.label)
      });
    }

    for (let i = 0; i < ALL_TIMEZONES.length; i++) {
      const tz = ALL_TIMEZONES[i];
      const displayName = getZoneLabel(tz);
      allCatalog.push({
        tz: tz,
        name: displayName,
        offsetStr: null,
        searchKey: getZoneSearchKeywords(tz, displayName)
      });
    }

    allCatalog.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  function resolveItemOffset(item, refDate) {
    if (item.offsetStr !== null) return item.offsetStr;
    try {
      const offsetMin = getOffsetMinutes(refDate, item.tz);
      item.offsetStr = formatOffsetLabel(offsetMin);
      item.searchKey += ' ' + item.offsetStr.toLowerCase();
    } catch (e) {
      item.offsetStr = 'UTC';
    }
    return item.offsetStr;
  }

  function scheduleChunkedWarmup() {
    const step = function () {
      const ref = new Date();
      if (popularWarmCursor < popularCatalog.length) {
        const end = Math.min(popularWarmCursor + 25, popularCatalog.length);
        for (let i = popularWarmCursor; i < end; i++) {
          resolveItemOffset(popularCatalog[i], ref);
        }
        popularWarmCursor = end;
        setTimeout(step, 8);
        return;
      }
      if (allWarmCursor < allCatalog.length) {
        const end = Math.min(allWarmCursor + 35, allCatalog.length);
        for (let i = allWarmCursor; i < end; i++) {
          resolveItemOffset(allCatalog[i], ref);
        }
        allWarmCursor = end;
        setTimeout(step, 10);
      }
    };
    setTimeout(step, 16);
  }

  function formatZoneDisplay(tz, refDate) {
    const ref = refDate || new Date();
    let offsetStr = 'UTC+00:00';
    try {
      offsetStr = formatOffsetLabel(getOffsetMinutes(ref, tz));
    } catch (e) {}
    const label = getZoneLabel(tz);
    return label + ' (' + offsetStr + ')';
  }

  function createComboboxController(config) {
    const { comboEl, hiddenInput, searchInput, clearBtn, toggleBtn, listEl, onSelect } = config;
    let isOpen = false;
    let activeIndex = -1;
    let currentOptions = [];

    function syncDisplayFromValue() {
      const tz = hiddenInput.value || 'UTC';
      searchInput.value = formatZoneDisplay(tz, new Date());
      clearBtn.hidden = true;
    }

    function scoreMatch(item, query) {
      const lowerName = item.name.toLowerCase();
      if (lowerName.startsWith(query) || lowerName.includes(', ' + query)) return 0;
      if (lowerName.includes(' ' + query) || lowerName.includes('/' + query) || lowerName.includes('(' + query)) return 1;
      if (item.searchKey.startsWith(query) || item.searchKey.includes(' ' + query) || item.searchKey.includes('/' + query)) return 2;
      return 3;
    }

    function renderList(filterQuery) {
      const ref = new Date();
      const query = (filterQuery || '').trim().toLowerCase();
      const selectedTz = hiddenInput.value;
      listEl.innerHTML = '';
      currentOptions = [];
      activeIndex = -1;

      // Ensure all offsets are resolved if searching by UTC offset
      if (query && (query.includes('utc') || query.includes('gmt') || query.includes('+') || query.includes('-'))) {
        for (let i = popularWarmCursor; i < popularCatalog.length; i++) {
          resolveItemOffset(popularCatalog[i], ref);
        }
        popularWarmCursor = popularCatalog.length;
        for (let i = allWarmCursor; i < allCatalog.length; i++) {
          resolveItemOffset(allCatalog[i], ref);
        }
        allWarmCursor = allCatalog.length;
      }

      const frag = document.createDocumentFragment();
      const shownTzSet = new Set();

      const matchedPopular = [];
      for (let i = 0; i < popularCatalog.length; i++) {
        const item = popularCatalog[i];
        if (!query || item.searchKey.includes(query)) {
          matchedPopular.push(item);
          shownTzSet.add(item.tz);
        }
      }

      if (query && matchedPopular.length > 1) {
        matchedPopular.sort(function (a, b) {
          return scoreMatch(a, query) - scoreMatch(b, query);
        });
      }

      if (matchedPopular.length > 0) {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'combo-group-label';
        groupHeader.textContent = 'Major World Cities';
        frag.appendChild(groupHeader);

        for (let i = 0; i < matchedPopular.length; i++) {
          const item = matchedPopular[i];
          const el = createOptionEl(item, selectedTz, ref);
          frag.appendChild(el);
        }
      }

      const matchedAll = [];
      for (let i = 0; i < allCatalog.length; i++) {
        const item = allCatalog[i];
        if (shownTzSet.has(item.tz)) continue;
        if (!query || item.searchKey.includes(query)) {
          matchedAll.push(item);
        }
      }

      if (query && matchedAll.length > 1) {
        matchedAll.sort(function (a, b) {
          const diff = scoreMatch(a, query) - scoreMatch(b, query);
          return diff !== 0 ? diff : a.name.localeCompare(b.name);
        });
      }

      if (matchedAll.length > 0) {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'combo-group-label';
        groupHeader.textContent = 'All Countries & World Timezones';
        frag.appendChild(groupHeader);

        for (let i = 0; i < matchedAll.length; i++) {
          const item = matchedAll[i];
          const el = createOptionEl(item, selectedTz, ref);
          frag.appendChild(el);
        }
      }

      if (currentOptions.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'combo-empty';
        empty.textContent = 'No matching timezone found';
        frag.appendChild(empty);
      }

      listEl.appendChild(frag);
    }

    function createOptionEl(item, selectedTz, refDate) {
      const opt = document.createElement('div');
      opt.className = 'combo-option' + (item.tz === selectedTz ? ' is-selected' : '');
      opt.setAttribute('role', 'option');
      opt.setAttribute('aria-selected', item.tz === selectedTz ? 'true' : 'false');
      opt.dataset.tz = item.tz;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'combo-opt-name';
      nameSpan.textContent = item.name;

      const offsetSpan = document.createElement('span');
      offsetSpan.className = 'combo-opt-offset';
      offsetSpan.textContent = resolveItemOffset(item, refDate);

      opt.appendChild(nameSpan);
      opt.appendChild(offsetSpan);

      const optionIndex = currentOptions.length;
      currentOptions.push({ el: opt, tz: item.tz });

      opt.addEventListener('mousedown', function (e) {
        // Prevent input blur before selection completes
        e.preventDefault();
      });

      opt.addEventListener('click', function () {
        selectTimezone(item.tz);
      });

      opt.addEventListener('mouseenter', function () {
        setActiveIndex(optionIndex, false);
      });

      return opt;
    }

    function setActiveIndex(idx, scrollOptionIntoDropdown) {
      if (activeIndex >= 0 && currentOptions[activeIndex]) {
        currentOptions[activeIndex].el.classList.remove('is-active');
      }
      activeIndex = idx;
      if (activeIndex >= 0 && currentOptions[activeIndex]) {
        const targetEl = currentOptions[activeIndex].el;
        targetEl.classList.add('is-active');
        if (scrollOptionIntoDropdown) {
          const top = targetEl.offsetTop;
          const bottom = top + targetEl.offsetHeight;
          if (top < listEl.scrollTop) {
            listEl.scrollTop = top - 4;
          } else if (bottom > listEl.scrollTop + listEl.clientHeight) {
            listEl.scrollTop = bottom - listEl.clientHeight + 4;
          }
        }
      }
    }

    function openDropdown(initialQuery) {
      if (!isOpen) {
        isOpen = true;
        comboEl.classList.add('is-open');
        searchInput.setAttribute('aria-expanded', 'true');
        listEl.hidden = false;
      }
      renderList(initialQuery);

      // Scroll internal dropdown list only — never touches window scroll
      if (!initialQuery) {
        const selectedOpt = listEl.querySelector('.combo-option.is-selected');
        if (selectedOpt) {
          listEl.scrollTop = Math.max(0, selectedOpt.offsetTop - listEl.clientHeight / 2 + 16);
        } else {
          listEl.scrollTop = 0;
        }
      } else {
        listEl.scrollTop = 0;
      }
    }

    function closeDropdown() {
      if (!isOpen) return;
      isOpen = false;
      comboEl.classList.remove('is-open');
      searchInput.setAttribute('aria-expanded', 'false');
      listEl.hidden = true;
      syncDisplayFromValue();
    }

    function selectTimezone(tz) {
      hiddenInput.value = tz;
      closeDropdown();
      searchInput.blur();
      onSelect(tz);
    }

    searchInput.addEventListener('focus', function () {
      searchInput.value = '';
      clearBtn.hidden = true;
      openDropdown('');
    });

    searchInput.addEventListener('input', function () {
      const q = searchInput.value;
      clearBtn.hidden = !q;
      openDropdown(q);
      if (currentOptions.length > 0) {
        setActiveIndex(0, false);
      }
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          openDropdown('');
        }
        if (currentOptions.length > 0) {
          const next = activeIndex + 1 < currentOptions.length ? activeIndex + 1 : 0;
          setActiveIndex(next, true);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          openDropdown('');
        }
        if (currentOptions.length > 0) {
          const prev = activeIndex - 1 >= 0 ? activeIndex - 1 : currentOptions.length - 1;
          setActiveIndex(prev, true);
        }
      } else if (e.key === 'Enter') {
        if (isOpen && currentOptions.length > 0) {
          e.preventDefault();
          const chosen = activeIndex >= 0 ? currentOptions[activeIndex] : currentOptions[0];
          if (chosen) {
            selectTimezone(chosen.tz);
          }
        }
      } else if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          closeDropdown();
          searchInput.blur();
        }
      }
    });

    clearBtn.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    clearBtn.addEventListener('click', function () {
      searchInput.value = '';
      clearBtn.hidden = true;
      openDropdown('');
      searchInput.focus({ preventScroll: true });
    });

    toggleBtn.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    toggleBtn.addEventListener('click', function () {
      if (isOpen) {
        closeDropdown();
        searchInput.blur();
      } else {
        searchInput.focus({ preventScroll: true });
      }
    });

    document.addEventListener('mousedown', function (e) {
      if (isOpen && !comboEl.contains(e.target)) {
        closeDropdown();
      }
    });

    return {
      setValue: function (tz) {
        hiddenInput.value = tz;
        syncDisplayFromValue();
      },
      getValue: function () {
        return hiddenInput.value;
      },
      refreshDisplay: syncDisplayFromValue
    };
  }

  /**
   * Set Date & Time inputs to a specific UTC Date expressed in the "From" timezone
   */
  function setInputsFromUtcDate(utcDate) {
    const fromTz = fromTzInput.value || 'UTC';
    const parts = getZonedParts(utcDate, fromTz);
    const yyyy = String(parts.year).padStart(4, '0');
    const mm = String(parts.month).padStart(2, '0');
    const dd = String(parts.day).padStart(2, '0');
    const hh = String(parts.hour).padStart(2, '0');
    const min = String(parts.minute).padStart(2, '0');

    dateInput.value = yyyy + '-' + mm + '-' + dd;
    timeInput.value = hh + ':' + min;
  }

  /**
   * Format timeline hour with descriptive AM / PM or 24h
   */
  function formatTimelineHour(h) {
    if (!use12Hour) {
      return String(h).padStart(2, '0') + ':00';
    }
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return h12 + ' ' + period;
  }

  // ==========================================================================
  // REUSABLE 24-HOUR TIMELINE DOM (NO SCROLL-TO-BOTTOM BUG, NO DOM THRASHING)
  // ==========================================================================
  const timelineSlots = [];
  let activeTimelineMinute = 0;

  function initTimelineDOM() {
    timelineGrid.innerHTML = '';
    const frag = document.createDocumentFragment();

    for (let h = 0; h < 24; h++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hour-slot slot-day';

      const fromSpan = document.createElement('span');
      fromSpan.className = 'slot-from';

      const divSpan = document.createElement('span');
      divSpan.className = 'slot-divider';

      const toSpan = document.createElement('span');
      toSpan.className = 'slot-to';

      btn.appendChild(fromSpan);
      btn.appendChild(divSpan);
      btn.appendChild(toSpan);

      btn.addEventListener('click', function () {
        timeInput.value =
          String(h).padStart(2, '0') + ':' + String(activeTimelineMinute).padStart(2, '0');
        convertAndRender({ scrollTimeline: true });
      });

      timelineSlots.push({ btn: btn, fromSpan: fromSpan, toSpan: toSpan });
      frag.appendChild(btn);
    }

    timelineGrid.appendChild(frag);
  }

  /**
   * Update the 24-hour visual comparison scrubber in-place and horizontally center active slot
   */
  function renderTimeline(year, month, day, activeHour, minute, fromTz, toTz, shouldScrollHorizontally) {
    activeTimelineMinute = minute;

    for (let h = 0; h < 24; h++) {
      const slotUtc = wallTimeToUtcDate(year, month, day, h, minute, fromTz);
      const toParts = getZonedParts(slotUtc, toTz);
      const toH = toParts.hour;

      const bothWork = h >= 9 && h < 17 && toH >= 9 && toH < 17;
      const bothDay = h >= 7 && h < 21 && toH >= 7 && toH < 21;

      const slotObj = timelineSlots[h];
      let cls = 'hour-slot ';
      if (bothWork) {
        cls += 'slot-work';
      } else if (bothDay) {
        cls += 'slot-day';
      } else {
        cls += 'slot-night';
      }

      if (h === activeHour) {
        cls += ' is-selected';
      }

      slotObj.btn.className = cls;

      const fromLabel = formatTimelineHour(h);
      const toLabel = formatTimelineHour(toH);
      slotObj.btn.title = 'Select ' + fromLabel + ' (' + toLabel + ' in target timezone)';
      slotObj.fromSpan.textContent = fromLabel;
      slotObj.toSpan.textContent = toLabel;
    }

    // Strictly horizontal scroll inside .timeline-scroll (NEVER scrolls the page vertically!)
    if (shouldScrollHorizontally && timelineScroll && timelineSlots[activeHour]) {
      const selectedBtn = timelineSlots[activeHour].btn;
      const targetLeft =
        selectedBtn.offsetLeft -
        timelineScroll.clientWidth / 2 +
        selectedBtn.offsetWidth / 2;
      timelineScroll.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }
  }

  /**
   * Perform instant timezone conversion and update UI
   */
  function convertAndRender(options) {
    const opts = options || { scrollTimeline: true };
    const fromTz = fromTzInput.value;
    const toTz = toTzInput.value;
    const dateVal = dateInput.value;
    const timeVal = timeInput.value;

    if (!fromTz || !toTz || !dateVal || !timeVal) {
      resultTimeEl.textContent = '--:--';
      resultPeriodEl.hidden = true;
      resultDateEl.textContent = 'Select a valid date and time';
      diffBadgeEl.textContent = '--';
      dayShiftEl.hidden = true;
      return;
    }

    const dateParts = dateVal.split('-').map(Number);
    const timeParts = timeVal.split(':').map(Number);
    if (dateParts.length < 3 || timeParts.length < 2) return;

    const [year, month, day] = dateParts;
    const [hour, minute] = timeParts;

    const utcInstant = wallTimeToUtcDate(year, month, day, hour, minute, fromTz);

    // Offsets
    const fromOffsetMin = getOffsetMinutes(utcInstant, fromTz);
    const toOffsetMin = getOffsetMinutes(utcInstant, toTz);
    fromOffsetEl.textContent = formatOffsetLabel(fromOffsetMin);
    toOffsetEl.textContent = formatOffsetLabel(toOffsetMin);

    // Day/Evening/Night status pills
    const toParts = getZonedParts(utcInstant, toTz);
    updateTimeOfDayBadge(fromTodEl, hour);
    updateTimeOfDayBadge(toTodEl, toParts.hour);

    // Source summary line
    const fromTimeStr = formatClockParts(hour, minute, use12Hour);
    fromFormattedDateEl.textContent =
      formatDateHyphenated(utcInstant, fromTz) + ' • ' + fromTimeStr.full;
    fromZoneShortEl.textContent = getShortZoneName(utcInstant, fromTz);

    // Target converted time with explicit AM/PM badge
    const toTimeStr = formatClockParts(toParts.hour, toParts.minute, use12Hour);
    resultTimeEl.textContent = toTimeStr.digits;
    if (use12Hour) {
      resultPeriodEl.hidden = false;
      resultPeriodEl.textContent = toTimeStr.period;
    } else {
      resultPeriodEl.hidden = true;
    }

    // Target converted date
    resultDateEl.textContent = formatDateHyphenated(utcInstant, toTz);
    toZoneShortEl.textContent = getShortZoneName(utcInstant, toTz);

    // Time difference badge
    const diffMin = toOffsetMin - fromOffsetMin;
    if (diffMin === 0) {
      diffBadgeEl.textContent = 'Same time';
    } else {
      const sign = diffMin > 0 ? '+' : '-';
      const absMin = Math.abs(diffMin);
      const h = Math.floor(absMin / 60);
      const m = absMin % 60;
      diffBadgeEl.textContent = sign + h + (m ? 'h ' + m + 'm' : 'h');
    }

    // Day boundary comparison
    const sourceDayUTC = Date.UTC(year, month - 1, day);
    const targetDayUTC = Date.UTC(toParts.year, toParts.month - 1, toParts.day);
    const dayDelta = Math.round((targetDayUTC - sourceDayUTC) / 86400000);

    if (dayDelta === 0) {
      dayShiftEl.hidden = true;
    } else {
      dayShiftEl.hidden = false;
      if (dayDelta === 1) {
        dayShiftEl.textContent = '+1 day';
      } else if (dayDelta === -1) {
        dayShiftEl.textContent = '-1 day';
      } else {
        dayShiftEl.textContent = (dayDelta > 0 ? '+' : '') + dayDelta + ' days';
      }
    }

    // Update 24h timeline scrubber
    renderTimeline(year, month, day, hour, minute, fromTz, toTz, opts.scrollTimeline !== false);
  }

  /**
   * Helper to format hour & minute into digits + explicit "AM" / "PM"
   */
  function formatClockParts(hour24, minute, is12h) {
    const mm = String(minute).padStart(2, '0');
    if (!is12h) {
      const hh24 = String(hour24).padStart(2, '0');
      return {
        digits: hh24 + ':' + mm,
        period: '',
        full: hh24 + ':' + mm
      };
    }
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const h12 = hour24 % 12 || 12;
    const digits = String(h12).padStart(2, '0') + ':' + mm;
    return {
      digits: digits,
      period: period,
      full: digits + ' ' + period
    };
  }

  /**
   * Shift current input time by `deltaMinutes`
   */
  function shiftInputTime(deltaMinutes) {
    const fromTz = fromTzInput.value || 'UTC';
    const dateParts = (dateInput.value || '').split('-').map(Number);
    const timeParts = (timeInput.value || '').split(':').map(Number);
    if (dateParts.length < 3 || timeParts.length < 2) return;

    const utcInstant = wallTimeToUtcDate(
      dateParts[0],
      dateParts[1],
      dateParts[2],
      timeParts[0],
      timeParts[1],
      fromTz
    );
    const shifted = new Date(utcInstant.getTime() + deltaMinutes * 60000);
    setInputsFromUtcDate(shifted);
    convertAndRender({ scrollTimeline: true });
  }

  // ==========================================================================
  // INITIALIZATION & EVENT LISTENERS
  // ==========================================================================
  const detectedLocalTz =
    (Intl.DateTimeFormat().resolvedOptions && Intl.DateTimeFormat().resolvedOptions().timeZone) || 'UTC';
  const defaultToTz = detectedLocalTz === 'UTC' ? 'America/New_York' : 'UTC';

  applyTheme(currentTheme);
  updateFormatToggleUI();
  initTimelineDOM();

  const fromCombo = createComboboxController({
    comboEl: fromComboEl,
    hiddenInput: fromTzInput,
    searchInput: fromSearch,
    clearBtn: fromClear,
    toggleBtn: fromToggle,
    listEl: fromList,
    onSelect: function () {
      convertAndRender({ scrollTimeline: true });
    }
  });

  const toCombo = createComboboxController({
    comboEl: toComboEl,
    hiddenInput: toTzInput,
    searchInput: toSearch,
    clearBtn: toClear,
    toggleBtn: toToggle,
    listEl: toList,
    onSelect: function () {
      convertAndRender({ scrollTimeline: true });
    }
  });

  const nowInit = new Date();
  initCatalog();
  fromCombo.setValue(detectedLocalTz);
  toCombo.setValue(defaultToTz);
  setInputsFromUtcDate(nowInit);
  convertAndRender({ scrollTimeline: true });

  // Warm up remaining IANA offsets in tiny non-blocking chunks
  scheduleChunkedWarmup();

  dateInput.addEventListener('input', function () {
    convertAndRender({ scrollTimeline: false });
  });
  dateInput.addEventListener('change', function () {
    convertAndRender({ scrollTimeline: true });
  });
  timeInput.addEventListener('input', function () {
    convertAndRender({ scrollTimeline: false });
  });
  timeInput.addEventListener('change', function () {
    convertAndRender({ scrollTimeline: true });
  });

  btnSwap.addEventListener('click', function () {
    btnSwap.classList.add('is-rotating');
    setTimeout(function () {
      btnSwap.classList.remove('is-rotating');
    }, 220);

    const tempFrom = fromCombo.getValue();
    const tempTo = toCombo.getValue();
    fromCombo.setValue(tempTo);
    toCombo.setValue(tempFrom);
    convertAndRender({ scrollTimeline: true });
  });

  btnNow.addEventListener('click', function () {
    setInputsFromUtcDate(new Date());
    convertAndRender({ scrollTimeline: true });
  });

  btnMinus1h.addEventListener('click', function () {
    shiftInputTime(-60);
  });

  btnPlus1h.addEventListener('click', function () {
    shiftInputTime(60);
  });

  btn12h.addEventListener('click', function () {
    if (!use12Hour) {
      use12Hour = true;
      updateFormatToggleUI();
      convertAndRender({ scrollTimeline: false });
    }
  });

  btn24h.addEventListener('click', function () {
    if (use12Hour) {
      use12Hour = false;
      updateFormatToggleUI();
      convertAndRender({ scrollTimeline: false });
    }
  });

  btnTheme.addEventListener('click', function () {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  btnCopy.addEventListener('click', function () {
    const periodPart = !resultPeriodEl.hidden ? ' ' + resultPeriodEl.textContent : '';
    const textToCopy =
      resultTimeEl.textContent +
      periodPart +
      ' (' +
      toZoneShortEl.textContent +
      ') — ' +
      resultDateEl.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(function () {});
    }
    copyLabel.textContent = 'Copied';
    setTimeout(function () {
      copyLabel.textContent = 'Copy';
    }, 1200);
  });
})();
