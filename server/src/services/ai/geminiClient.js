/**
 * Thin wrapper around the Gemini SDK (@google/genai).
 * Must request JSON constrained to itineraryOutputSchema (./itinerarySchema.js).
 * TODO(backend): implement using env.geminiApiKey and env.geminiModel.
 */
export async function generateStructuredItinerary(_input) {
  throw new Error('Gemini client not implemented');
}
