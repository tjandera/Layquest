import { createRouter, createWebHistory } from 'vue-router';
import { tokenStore } from '@/services/http';

// Views are lazy-loaded so the map and 3D code only ship when needed.
const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
  { path: '/plan', name: 'plan', component: () => import('@/views/PlannerView.vue'), meta: { requiresAuth: true } },
  { path: '/explore', name: 'explore', component: () => import('@/views/ExploreView.vue'), meta: { requiresAuth: true } },
  { path: '/quests/:id', name: 'quest', component: () => import('@/views/QuestView.vue'), meta: { requiresAuth: true } },
  { path: '/passport', name: 'passport', component: () => import('@/views/PassportView.vue'), meta: { requiresAuth: true } },
  { path: '/profile/:id?', name: 'profile', component: () => import('@/views/ProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/forecast', name: 'forecast', component: () => import('@/views/ForecastView.vue'), meta: { requiresAuth: true } },
  { path: '/places/:id', name: 'place', component: () => import('@/views/LocationView.vue'), meta: { requiresAuth: true } },
  { path: '/chat/:id', name: 'chat', component: () => import('@/views/ChatView.vue'), meta: { requiresAuth: true } },
  { path: '/sidequests', name: 'sidequests', component: () => import('@/views/SideQuestView.vue'), meta: { requiresAuth: true } },
  { path: '/travel', name: 'travel', component: () => import('@/views/TravelView.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !tokenStore.get()) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});

export default router;
