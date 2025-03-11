import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DataView from '../views/DataView.vue';
import DataItemView from "@/views/DataItemView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AddDataView from "@/views/AddDataView.vue";
import EditDataView from "@/views/EditDataView.vue";
import APIView from "@/views/APIView.vue";


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
      path:'/data/add',
      name:"AddDataView",
      component:AddDataView
    },
    {
      path:'/data/edit/:id',
      name:"EditDataView",
      component:EditDataView
    },
    {
      path:'/APIView',
      name:"APIView",
      component:APIView
    },
    {
      path:'/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ],
});

export default router;