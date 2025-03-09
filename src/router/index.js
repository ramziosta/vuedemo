import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DataView from '../views/DataView.vue';
import DataItemView from "@/views/DataItemView.vue";
import NotFoundView from "@/views/NotFoundView.vue";


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
      {
        path: '/data/:id',
        name: 'DataItemView',
        component: DataItemView,
      },
    {
      path:'/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ],
});

export default router;