// Shared AO / region dataset.
//
// Real AO names, sites, and days/times pulled from public region sites
// (f3thefe.com/schedule, f3kc.com) as of July 2026. Coordinates are
// hand-estimated from the street addresses, NOT officially geocoded —
// good enough to demo the distance filter, not good enough to navigate by.
//
// Swap this file out for real F3 Nation API data once access is granted —
// every page that imports from here (Roulette, Full Send) will pick up
// the change automatically without needing to be touched individually.

export const aos = [
  { name: 'Baywatch',      day: 'Mon', time: '5:30 AM', site: 'Black Bob Park (SW Lot), 14500 W 151st St, Olathe, KS', region: 'F3 The Fe', lat: 38.850, lon: -94.850 },
  { name: 'Dysentery',     day: 'Mon', time: '5:30 AM', site: 'Oregon Trail Park, 1100 S Robinson St, Olathe, KS',     region: 'F3 The Fe', lat: 38.870, lon: -94.822 },
  { name: "You'll Be Fine", day: 'Mon', time: '5:30 AM', site: "Scooter's Coffee, 12551 Pflumm Rd, Overland Park, KS", region: 'F3 The Fe', lat: 38.902, lon: -94.803 },
  { name: 'Clocktower',    day: 'Tue', time: '5:30 AM', site: 'Johnson County Square, Santa Fe & N Cherry, Olathe, KS', region: 'F3 The Fe', lat: 38.882, lon: -94.815 },
  { name: 'South Park',    day: 'Tue', time: '5:30 AM', site: 'Brougham Elementary, 15500 S Brougham Dr, Olathe, KS', region: 'F3 The Fe', lat: 38.845, lon: -94.828 },
  { name: 'Sunnyside Up',  day: 'Tue', time: '5:30 AM', site: 'Sunnyside Elementary, 16025 S Lindenwood Dr, Olathe, KS', region: 'F3 The Fe', lat: 38.840, lon: -94.795 },
  { name: 'Airfield',      day: 'Wed', time: '5:30 AM', site: 'Black Bob Park (N Lot), 14500 W 151st St, Olathe, KS', region: 'F3 The Fe', lat: 38.850, lon: -94.850 },
  { name: 'Heartland',     day: 'Wed', time: '5:30 AM', site: 'Heartland Community Church, 12175 S Strang Line Rd, Olathe, KS', region: 'F3 The Fe', lat: 38.905, lon: -94.790 },
  { name: 'Yippee Ki Yay', day: 'Wed', time: '5:30 AM', site: 'Frontier Trail Middle School, 15300 W 143rd St, Olathe, KS', region: 'F3 The Fe', lat: 38.858, lon: -94.855 },
  { name: 'Gold Rush',     day: 'Thu', time: '5:30 AM', site: 'California Trail Middle School, 13775 W 133rd St, Olathe, KS', region: 'F3 The Fe', lat: 38.883, lon: -94.850 },
  { name: 'Overdraft',     day: 'Thu', time: '5:30 AM', site: 'Commerce Bank, 15910 S Mur-Len Rd, Olathe, KS', region: 'F3 The Fe', lat: 38.840, lon: -94.790 },
  { name: 'Stagecoach',    day: 'Thu', time: '5:30 AM', site: 'Olathe Community Center, 1205 E Kansas City Rd, Olathe, KS', region: 'F3 The Fe', lat: 38.888, lon: -94.795 },
  { name: 'Pretty Bird',   day: 'Fri', time: '5:30 AM', site: 'Olathe South High School (E Lot), 1640 E 151st St, Olathe, KS', region: 'F3 The Fe', lat: 38.850, lon: -94.790 },
  { name: 'The Gathering', day: 'Sat', time: '5:30 AM', site: 'Olathe Community Center, 1205 E Kansas City Rd, Olathe, KS', region: 'F3 The Fe', lat: 38.888, lon: -94.795 },
  { name: 'SouthStride',   day: 'Sun', time: '6:45 AM', site: 'Heritage Park, 16240 Pflumm Rd, Olathe, KS', region: 'F3 The Fe', lat: 38.838, lon: -94.803 },
  { name: 'Eagles Nest',   day: 'Sat', time: '7:00 AM', site: 'Shawnee Mission Park — Shelter 10, Lenexa/Shawnee, KS', region: 'F3 Kansas City', lat: 38.968, lon: -94.757 },
  { name: 'Wiley Coyote',  day: 'Fri', time: '5:30 AM', site: '10715 Oak St, Kansas City, MO',    region: 'F3 Kansas City', lat: 38.888, lon: -94.581 },
  { name: 'Pickleballz',   day: 'Wed', time: '6:00 AM', site: 'Overland Park, KS (exact site unconfirmed)', region: 'F3 Kansas City', lat: 38.964, lon: -94.685 },
];

export const regions = [
  { id: 'thefe', name: 'F3 The Fe (Olathe)' },
  { id: 'kc',    name: 'F3 Kansas City' },
];

export function regionAoCount(regionName) {
  return aos.filter(ao => ao.region === regionName).length;
}

export function milesBetween(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
