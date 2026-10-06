import { describe, it, expect } from 'vitest';
import { itineraryOutputSchema } from '../src/services/ai/itinerarySchema.js';
import { buildFallbackPlan } from '../src/services/ai/fallbackPlanner.js';
import { buildItinerary } from '../src/services/ai/plannerService.js';
import { orderByProximity } from '../src/services/geo/clusterService.js';

// [lng, lat]
const marinaBay = [103.8607, 1.2816];
const gardens = [103.8636, 1.2816];
const sentosa = [103.8303, 1.2494];
const changi = [103.9915, 1.3644];

const places = [
  { id: 'changi', location: changi, visitMinutes: 45 },
  { id: 'sentosa', location: sentosa, visitMinutes: 60 },
  { id: 'gardens', location: gardens, visitMinutes: 60 },
  { id: 'marina', location: marinaBay, visitMinutes: 30 },
];

describe('itineraryOutputSchema', () => {
  it('accepts ids and short copy only', () => {
    const ok = { days: [{ dayNumber: 1, stops: [{ placeId: 'a', note: 'Go early' }] }] };
    expect(itineraryOutputSchema.safeParse(ok).success).toBe(true);
  });

  it('rejects invented coordinates or timings', () => {
    const bad = {
      days: [{ dayNumber: 1, stops: [{ placeId: 'a', note: 'x', lat: 1.3, startAt: '09:00' }] }],
    };
    expect(itineraryOutputSchema.safeParse(bad).success).toBe(false);
  });
});

describe('orderByProximity', () => {
  it('visits close places before far ones', () => {
    const ids = orderByProximity(places, marinaBay).map((p) => p.id);
    expect(ids.indexOf('gardens')).toBeLessThan(ids.indexOf('changi'));
  });
});

describe('buildFallbackPlan', () => {
  it('stays inside the time budget and the day cap', () => {
    const plan = buildFallbackPlan({ places, dayMinutes: 150, maxDays: 1, startLocation: marinaBay });
    expect(plan.days).toHaveLength(1);
    expect(plan.days[0].stops.length).toBeGreaterThan(0);
    expect(plan.days[0].stops.length).toBeLessThan(places.length);
  });

  it('returns no days when nothing can fit', () => {
    const plan = buildFallbackPlan({ places, dayMinutes: 10, maxDays: 1 });
    expect(plan.days).toEqual([]);
  });
});

describe('buildItinerary', () => {
  it('falls back to the local planner when Gemini is unavailable', async () => {
    const result = await buildItinerary({ places, dayMinutes: 300, maxDays: 1, startLocation: marinaBay });
    expect(result.source).toBe('fallback');
    expect(result.plan.days.length).toBe(1);
  });
});
