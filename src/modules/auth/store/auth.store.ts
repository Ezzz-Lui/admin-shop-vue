import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth.enum';
import { loginAction } from '../actions/login.action';
import { useLocalStorage } from '@vueuse/core';
import { registerUserAction } from '../actions/register.action';
import { checkAuthAction } from '../actions/tokenStatusCheck.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.checkingAuth);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);
      if (!loginResponse.ok) {
        logout();
        return false;
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error('Error getting login response:', error);
      logout();
      return false;
    }
  };

  const registerUser = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerUserAction(fullName, email, password);
      if (!registerResponse.ok) {
        logout();
        return false;
      }

      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error('Error getting login response:', error);
      logout();
      return false;
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.unAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthTokenStatus = async (): Promise<boolean> => {
    const responseTokenStatus = await checkAuthAction();

    try {
      if (!responseTokenStatus.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = responseTokenStatus.user;
      token.value = responseTokenStatus.token;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    //getters
    isChecking: computed(() => authStatus.value === AuthStatus.checkingAuth),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.fullName),
    isAdmin: computed(() => user.value?.roles.includes('Admin, admin')),

    // Actions
    login,
    registerUser,
    logout,
    checkAuthTokenStatus,
  };
});
