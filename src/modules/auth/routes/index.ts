import type { RouteRecordRaw } from 'vue-router';
import isNotAuthenticated from '../guards/isNot-authenticated.guard';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticated],
  redirect: { name: 'Login' },
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'Login',
      component: () => import('@/modules/auth/views/LoginPage.vue'),
    },
    {
      path: 'register',
      name: 'Register',
      component: () => import('@/modules/auth/views/RegisterPage.vue'),
    },
  ],
};
