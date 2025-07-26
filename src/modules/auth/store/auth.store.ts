import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth.enum';
import { loginAction } from '../actions/login.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.checkingAuth);
  const user = ref<User | undefined>();
  const token = ref('');

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

  const logout = () => {
    authStatus.value = AuthStatus.unAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
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
    logout,
  };
});
