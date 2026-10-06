import { itineraryOutputSchema } from './itinerarySchema.js';
import { generateStructuredItinerary } from './geminiClient.js';
import { buildFallbackPlan } from './fallbackPlanner.js';

const MAX_GEMINI_ATTEMPTS = 2;

/**
 * Gemini first (validated against the schema, retried once), then the local
 * Turf-based fallback. Same output shape either way.
 *
 * input: { places, style, interests, dayMinutes, maxDays, startLocation }
 * Returns { source: 'gemini' | 'fallback', plan }
 */
export async function buildItinerary(input) {
  for (let attempt = 1; attempt <= MAX_GEMINI_ATTEMPTS; attempt++) {
    try {
      const raw = await generateStructuredItinerary(input);
      const plan = itineraryOutputSchema.parse(raw);
      return { source: 'gemini', plan };
    } catch (err) {
      console.warn(`Gemini attempt ${attempt} failed: ${err.message}`);
    }
  }
  return { source: 'fallback', plan: buildFallbackPlan(input) };
}

// TODO(backend): after planning, hydrate placeIds from the DB and compute startAt/endAt and
// travelMinutesFromPrev server-side, checking opening hours and the layover deadline.
