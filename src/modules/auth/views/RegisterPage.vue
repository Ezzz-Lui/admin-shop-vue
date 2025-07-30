<template>
  <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 class="text-4xl font-semibold mb-4">Register</h1>
    <form @submit.prevent="onRegister">
      <!-- Username Input -->
      <div class="mb-4">
        <label for="username" class="block text-stone-600">Name</label>
        <input
          v-model="registerForm.fullName"
          type="username"
          id="username"
          name="username"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>

      <!-- Email Input -->
      <div class="mb-4">
        <label for="email" class="block text-stone-600">Email</label>
        <input
          v-model="registerForm.email"
          type="email"
          id="email"
          name="email"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>
      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-stone-600">Password</label>
        <input
          v-model="registerForm.password"
          type="password"
          id="password"
          name="password"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autocomplete="off"
        />
      </div>

      <!-- Forgot Password Link -->
      <div class="mb-6 text-stone-500">
        <a href="#" class="hover:underline">Forgot Password?</a>
      </div>
      <!-- Register Button -->
      <button
        type="submit"
        :disabled="!registerForm.password || !registerForm.email || !registerForm.fullName"
        class="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        <template v-if="isLoading">
          <svg class="mr-3 size-5 animate-spin" viewBox="0 0 24 24"></svg>
        </template>

        <template v-else> Register </template>
      </button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-stone-500 text-center">
      <RouterLink :to="{ name: 'Login' }" class="hover:underline"
        >Alreary have account? Sign in Here</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
});

const isLoading = ref<boolean>(false);
const router = useRouter();
const { registerUser } = useAuthStore();

const onRegister = async () => {
  isLoading.value = true;
  const ok = await registerUser(registerForm.fullName, registerForm.email, registerForm.password);

  if (ok) {
    toast.success('User registered success', {
      description: 'Redirecting to shop...',
    });

    isLoading.value = false;
    router.push({ name: 'home' });
  } else {
    toast.error('Fail user registration', {
      description: 'Try again',
      action: {
        label: 'Ok',
      },
    });

    isLoading.value = false;
  }
};
</script>
