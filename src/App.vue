<template>
  <Toaster rich-colors position="top-right" expand />
  <FullScreenLoader  v-if="authStore.isChecking"/>
  <RouterView v-else/>
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css'; //
import { useAuthStore } from './modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces/auth.enum';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

authStore.$subscribe(
  async (_, state) => {
    if (state.authStatus === AuthStatus.checkingAuth) {
      toast.warning('Checking auth', {
        description: 'Redirecting...',
        duration: 1000,
      });
      authStore.checkAuthTokenStatus();

      return;
    }

    if (state.authStatus === AuthStatus.unAuthenticated) {
      router.replace({ name: 'Login' });

      toast.error('Unauthenticated', {
        description: 'Please login or create account...',
        duration: 1000,
      });
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  { immediate: true },
);
</script>
