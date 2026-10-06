import { defineStore } from 'pinia';
import { ref } from 'vue';

// Active quest, checkpoints, encounters and XP.
// TODO(team): add state + actions that call the matching file in src/services.
export const useQuestStore = defineStore('quest', () => {
  const loading = ref(false);
  const error = ref(null);
  return { loading, error };
});
