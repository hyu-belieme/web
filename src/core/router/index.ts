import { NIL as NIL_UUID } from 'uuid';
import { createRouter, createWebHistory } from 'vue-router';

import Department from '@common/models/Department';
import User from '@common/models/User';
import useCurDeptStorage from '@common/storages/cur-dept-storage';
import useLoggedInUserStorage from '@common/storages/logged-in-user-storage';
import useUserTokenStorage from '@common/storages/user-token-storage';

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
  const userTokenStorage = useUserTokenStorage();
  const loggedInUserStorage = useLoggedInUserStorage();
  const curDeptStorage = useCurDeptStorage();

  if (
    to.meta.onlyAccessAfterAuth &&
    (loggedInUserStorage.itemEquals(User.NIL) ||
      userTokenStorage.itemEquals(NIL_UUID) ||
      curDeptStorage.itemEquals(Department.NIL))
  ) {
    router.replace('/login');
    return;
  }
  next();
});

export default router;
