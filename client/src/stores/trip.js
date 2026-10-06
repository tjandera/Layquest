import { defineStore } from 'pinia';
import { ref } from 'vue';

// Saved places and trip settings (layover window, style, interests).
// TODO(team): add state + actions that call the matching file in src/services.
export const useTripStore = defineStore('trips', () => {
  const loading = ref(false);
  const error = ref(null);
  return { loading, error };
});
