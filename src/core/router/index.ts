import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/stuffs',
      name: 'stuffs',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/StuffsView.vue")
      component: () => import('@^stuffs/StuffPage.vue'),
    },
    {
      path: '/histories',
      name: 'histories',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@^histories/HistoryPage.vue'),
    },
  ],
});

export default router;
