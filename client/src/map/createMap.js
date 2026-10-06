import { Map } from 'maplibre-gl';

// Singapore city centre, [lng, lat].
export const SINGAPORE_CENTER = [103.8198, 1.3521];

// Demo style so the map renders on day one. TODO(frontend): swap for our own
// style (extruded buildings, toy-city look) once the Figma direction is final.
const DEFAULT_STYLE = 'https://demotiles.maplibre.org/style.json';

export function createMap(container, options = {}) {
  return new Map({
    container,
    style: DEFAULT_STYLE,
    center: SINGAPORE_CENTER,
    zoom: 11,
    pitch: 45,
    ...options,
  });
}
