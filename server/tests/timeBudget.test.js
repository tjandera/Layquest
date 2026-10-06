import { describe, it, expect } from 'vitest';
import { computeUsableMinutes } from '../src/services/geo/timeBudget.js';

describe('computeUsableMinutes', () => {
  it('subtracts immigration and return buffers from the window', () => {
    const minutes = computeUsableMinutes({
      arrivalAt: '2026-11-01T08:00:00Z',
      departureAt: '2026-11-01T18:00:00Z', // 10h window
      immigrationBufferMin: 60,
      returnBufferMin: 180,
    });
    expect(minutes).toBe(360);
  });

  it('never goes negative', () => {
    const minutes = computeUsableMinutes({
      arrivalAt: '2026-11-01T08:00:00Z',
      departureAt: '2026-11-01T10:00:00Z',
    });
    expect(minutes).toBe(0);
  });
});
