import { defineStore } from 'pinia';
import { ref } from 'vue';

// Side-quest swipe deck and join requests.
// TODO(team): add state + actions that call the matching file in src/services.
export const useSideQuestStore = defineStore('sideQuest', () => {
  const loading = ref(false);
  const error = ref(null);
  return { loading, error };
});
