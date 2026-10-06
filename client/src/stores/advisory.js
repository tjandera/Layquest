import { defineStore } from 'pinia';
import { ref } from 'vue';

// Forecast and danger advisories, clan membership.
// TODO(team): add state + actions that call the matching file in src/services.
export const useAdvisoryStore = defineStore('advisory', () => {
  const loading = ref(false);
  const error = ref(null);
  return { loading, error };
});
