<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { createMap } from '@/map/createMap';

const emit = defineEmits(['ready']);
const el = ref(null);
let map;

onMounted(() => {
  map = createMap(el.value);
  map.on('load', () => emit('ready', map));
});

onBeforeUnmount(() => map?.remove());
</script>

<template>
  <div ref="el" class="map-canvas" />
</template>
