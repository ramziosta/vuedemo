import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DataView from '../views/DataView.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
      {
        path: '/data',
        name: 'DataView',
        component: DataView,
      },
  ],
});

export default router;