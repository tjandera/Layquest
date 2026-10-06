import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { tokenStore } from '@/services/http';
import * as authApi from '@/services/authApi';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(tokenStore.get());
  const user = ref(null);
  const isLoggedIn = computed(() => !!token.value);

  function setSession(payload) {
    token.value = payload.token;
    user.value = payload.user ?? null;
    tokenStore.set(payload.token);
  }

  async function login(credentials) {
    setSession(await authApi.login(credentials));
  }

  async function register(details) {
    setSession(await authApi.register(details));
  }

  async function fetchMe() {
    user.value = await authApi.me();
  }

  function logout() {
    token.value = null;
    user.value = null;
    tokenStore.set(null);
  }

  return { token, user, isLoggedIn, login, register, fetchMe, logout };
});
