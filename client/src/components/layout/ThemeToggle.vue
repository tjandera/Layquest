<script setup>
import { useTheme } from '@/composables/useTheme';

const { theme, toggle } = useTheme();
</script>

<template>
  <button class="btn btn-sm btn-outline-secondary" type="button" @click="toggle">
    {{ theme === 'dark' ? 'Light' : 'Dark' }} mode
  </button>
</template>
