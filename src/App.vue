<template>
  <Toaster rich-colors position="top-right" expand />
  <RouterView />
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

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

authStore.$subscribe(
  async (_, state) => {
    if (state.authStatus === AuthStatus.checkingAuth) {
      authStore.checkAuthTokenStatus();
      toast.promise(authStore.checkAuthTokenStatus, {
        loading: 'Checking your auth status...',
        success: 'Auth verified',
        error: 'Failed to check your auth',
      });
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      toast.success('Authenticated', {
        description: 'Redirecting...',
        duration: 1000,
      });
      router.replace({ name: 'home' });
      return;
    }
  },
  { immediate: true },
);
</script>
