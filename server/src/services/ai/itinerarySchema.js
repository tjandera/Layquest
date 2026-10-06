import { z } from 'zod';

/**
 * The ONLY shape Gemini may return: place IDs and short copy.
 * No coordinates, no timings: the server computes those from real data.
 * strictObject rejects any extra keys the model tries to invent.
 */
export const itineraryOutputSchema = z.strictObject({
  days: z
    .array(
      z.strictObject({
        dayNumber: z.number().int().positive(),
        stops: z
          .array(
            z.strictObject({
              placeId: z.string().min(1),
              note: z.string().max(160),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});
