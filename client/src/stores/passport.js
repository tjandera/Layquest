import { defineStore } from 'pinia';
import { ref } from 'vue';

// Own passport: cover, stamps, achievements.
// TODO(team): add state + actions that call the matching file in src/services.
export const usePassportStore = defineStore('passport', () => {
  const loading = ref(false);
  const error = ref(null);
  return { loading, error };
});
