import { orderByProximity, travelMinutesBetween } from '../geo/clusterService.js';

const DEFAULT_VISIT_MINUTES = 60;

/**
 * Deterministic planner used when Gemini fails twice or is unreachable.
 * Returns the SAME shape as itineraryOutputSchema so callers cannot tell the difference.
 *
 * places: [{ id, location: [lng, lat], visitMinutes? }]
 * dayMinutes: usable minutes per day (for a layover: computeUsableMinutes(...))
 * maxDays: 1 for a layover. Places that do not fit are dropped.
 * Returns { days: [] } if nothing fits.
 */
export function buildFallbackPlan({ places, dayMinutes, maxDays = Infinity, startLocation }) {
  const ordered = orderByProximity(places, startLocation);
  const days = [];
  let stops = [];
  let used = 0;
  let prev = startLocation ?? null;

  const closeDay = () => {
    if (stops.length) days.push({ dayNumber: days.length + 1, stops });
    stops = [];
    used = 0;
    prev = null;
  };

  for (const place of ordered) {
    const visit = place.visitMinutes ?? DEFAULT_VISIT_MINUTES;
    let cost = (prev ? travelMinutesBetween(prev, place.location) : 0) + visit;

    if (used + cost > dayMinutes && stops.length) {
      closeDay();
      if (days.length >= maxDays) break;
      cost = visit;
    }
    if (cost > dayMinutes) continue; // can never fit

    stops.push({ placeId: place.id, note: '' });
    used += cost;
    prev = place.location;
  }
  if (days.length < maxDays) closeDay();
  return { days };
}
