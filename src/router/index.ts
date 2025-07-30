import AdminLayout from '@/modules/admin/layouts/AdminLayout.vue';
import isAuthenticated from '@/modules/auth/guards/is-authenticated.guard';
import isAdminGuard from '@/modules/auth/guards/isAdmin.guard';
import { authRoutes } from '@/modules/auth/routes';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/shop/views/HomeShop.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: { name: 'AdminPanel' },
      component: AdminLayout,
      beforeEnter: [isAdminGuard, isAuthenticated],
      children: [
        {
          path: '',
          name: 'AdminPanel',
          component: () => import('@/modules/admin/views/AdminHome.vue'),
        },
      ],
    },
    authRoutes,
  ],
});

export default router;
