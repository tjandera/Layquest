import { defineStore } from 'pinia';
import { ref } from 'vue';

// Current generated itinerary and AI revision requests.
// TODO(team): add state + actions that call the matching file in src/services.
export const useItineraryStore = defineStore('itinerary', () => {
  const loading = ref(false);
  const error = ref(null);
  return { loading, error };
});
