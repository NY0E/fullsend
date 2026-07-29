// Zip -> lat/lon via Zippopotam.us (free, no key, CORS-enabled).
// In-memory cache so re-spinning the same zip doesn't refetch.
const zipCache = {};

export async function geocodeZip(zip) {
  if (zipCache[zip]) return zipCache[zip];
  const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
  if (!res.ok) throw new Error('Zip not found');
  const data = await res.json();
  const place = data.places[0];
  const result = {
    label: `${place['place name']}, ${place['state abbreviation']} ${zip}`,
    lat: parseFloat(place.latitude),
    lon: parseFloat(place.longitude),
  };
  zipCache[zip] = result;
  return result;
}
