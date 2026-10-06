// Placeholder defaults. Tune against real Changi immigration and check-in times.
export const DEFAULT_IMMIGRATION_BUFFER_MIN = 60;
export const DEFAULT_RETURN_BUFFER_MIN = 180;

/**
 * Minutes a layover traveller can actually spend in the city:
 * total window, minus clearing immigration, minus the buffer to be back at the airport.
 * Never negative.
 */
export function computeUsableMinutes({
  arrivalAt,
  departureAt,
  immigrationBufferMin = DEFAULT_IMMIGRATION_BUFFER_MIN,
  returnBufferMin = DEFAULT_RETURN_BUFFER_MIN,
}) {
  const windowMin = (new Date(departureAt) - new Date(arrivalAt)) / 60000;
  return Math.max(0, Math.floor(windowMin - immigrationBufferMin - returnBufferMin));
}
