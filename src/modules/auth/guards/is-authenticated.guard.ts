import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
  NavigationGuardNext,
} from 'vue-router';
import { useAuthStore } from '../store/auth.store';
import { AuthStatus } from '../interfaces/auth.enum';

const isAuthenticated = async (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  console.log(authStore.authStatus);

  await authStore.checkAuthTokenStatus();

  console.log(authStore.authStatus);

  if (authStore.authStatus === AuthStatus.unAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

export default isAuthenticated;
