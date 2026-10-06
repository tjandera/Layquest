import { z } from 'zod';
import { TRAVEL_STYLES } from '../models/_shared.js';

/**
 * Request body for POST /api/itineraries/generate.
 * Layover mode: send `layover` (exact arrival and departure times).
 * Trip mode: send `days` instead.
 */
export const generateItinerarySchema = z
  .object({
    tripId: z.string().optional(),
    style: z.enum(TRAVEL_STYLES),
    interests: z.array(z.string()).default([]),
    savedPlaceIds: z.array(z.string()).default([]),
    layover: z
      .object({
        arrivalAt: z.coerce.date(),
        departureAt: z.coerce.date(),
        immigrationBufferMin: z.number().int().nonnegative().optional(),
        returnBufferMin: z.number().int().nonnegative().optional(),
      })
      .optional(),
    days: z.number().int().positive().max(14).optional(),
  })
  .refine((v) => v.layover || v.days, {
    message: 'Provide either layover or days',
  });
