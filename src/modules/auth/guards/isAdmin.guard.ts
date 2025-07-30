import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
  NavigationGuardNext,
} from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const isAdminGuard = (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();

  if (!authStore.isAdmin) {
    return next({
      name: 'Login',
    });
  }

  return next();
};

export default isAdminGuard;
