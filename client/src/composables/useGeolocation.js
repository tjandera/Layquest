import { ref, onBeforeUnmount } from 'vue';

/**
 * Live position via the browser Geolocation API.
 * coords = { lng, lat, accuracy } | null
 */
export function useGeolocation() {
  const coords = ref(null);
  const error = ref(null);
  let watchId = null;

  function start() {
    if (!('geolocation' in navigator)) {
      error.value = 'Geolocation is not supported on this device';
      return;
    }
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        coords.value = {
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
          accuracy: pos.coords.accuracy,
        };
      },
      (err) => {
        error.value = err.message;
      },
      { enableHighAccuracy: true },
    );
  }

  function stop() {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }

  onBeforeUnmount(stop);
  return { coords, error, start, stop };
}
