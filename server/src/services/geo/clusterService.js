import distance from '@turf/distance';
import { point } from '@turf/helpers';

// Rough average door-to-door transit speed. Replace with real routing later.
export const AVG_TRANSIT_KMH = 20;

/** Points are [longitude, latitude]. */
export const distanceKm = (a, b) => distance(point(a), point(b), { units: 'kilometers' });

export const travelMinutesBetween = (a, b) =>
  Math.ceil((distanceKm(a, b) / AVG_TRANSIT_KMH) * 60);

/**
 * Nearest-neighbour ordering so a day does not zigzag across the city.
 * places: [{ id, location: [lng, lat], ... }]. `start` is optional ([lng, lat]).
 */
export function orderByProximity(places, start) {
  const remaining = [...places];
  const ordered = [];
  let current = start ?? remaining[0]?.location;
  if (!start && remaining.length) ordered.push(remaining.shift());

  while (remaining.length) {
    let bestIdx = 0;
    let bestDist = Infinity;
    remaining.forEach((p, i) => {
      const d = distanceKm(current, p.location);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    const [next] = remaining.splice(bestIdx, 1);
    ordered.push(next);
    current = next.location;
  }
  return ordered;
}

// TODO(backend): clusterIntoDays(places, days) using @turf/clusters-dbscan or k-means.
