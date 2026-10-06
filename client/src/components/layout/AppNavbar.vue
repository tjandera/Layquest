<script setup>
import ThemeToggle from './ThemeToggle.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <nav class="navbar navbar-expand bg-body-tertiary border-bottom">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fw-bold" to="/">Layquest</RouterLink>
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><RouterLink class="nav-link" to="/plan">Plan</RouterLink></li>
        <li class="nav-item"><RouterLink class="nav-link" to="/explore">Explore</RouterLink></li>
        <li class="nav-item"><RouterLink class="nav-link" to="/sidequests">Side-quests</RouterLink></li>
        <li class="nav-item"><RouterLink class="nav-link" to="/forecast">Forecast</RouterLink></li>
        <li class="nav-item"><RouterLink class="nav-link" to="/passport">Passport</RouterLink></li>
      </ul>
      <ThemeToggle class="me-2" />
      <RouterLink v-if="!auth.isLoggedIn" class="btn btn-sm btn-lq" to="/login">Log in</RouterLink>
      <button v-else class="btn btn-sm btn-outline-secondary" type="button" @click="auth.logout()">
        Log out
      </button>
    </div>
  </nav>
</template>
