import { defineStore } from 'pinia';
import { ref } from 'vue';

// Conversations and messages for approved quest and side-quest buddies.
// TODO(team): add state + actions that call the matching file in src/services.
export const useChatStore = defineStore('chat', () => {
  const loading = ref(false);
  const error = ref(null);
  return { loading, error };
});
