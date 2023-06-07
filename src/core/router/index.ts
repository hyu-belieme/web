import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/StuffsView.vue")
      component: () => import('@^login/LoginPage.vue'),
    },
    {
      path: '/login/redirect',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/StuffsView.vue")
      component: () => import('@^login/LoginRedirectPage.vue'),
    },
    {
      path: '/stuffs',
      name: 'stuffs',
      meta: { onlyAccessAfterAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/StuffsView.vue")
      component: () => import('@^stuffs/StuffPage.vue'),
    },
    {
      path: '/histories',
      name: 'histories',
      meta: { onlyAccessAfterAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@^histories/HistoryPage.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userInfo = sessionStorage.getItem('user-info') || undefined;
  if (to.meta.onlyAccessAfterAuth && userInfo === undefined) {
    router.replace('/login');
    return;
  }
  next();
});

export default router;
