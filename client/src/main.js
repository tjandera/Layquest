import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './styles/theme.css';
import App from './App.vue';
import router from './router';
import { initTheme } from './composables/useTheme';

initTheme();
createApp(App).use(createPinia()).use(router).mount('#app');
