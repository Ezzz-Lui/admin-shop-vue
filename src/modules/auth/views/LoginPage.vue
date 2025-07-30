<template>
  <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 class="text-4xl font-semibold mb-4">Login</h1>
    <form @submit.prevent="onLogin">
      <!-- Username Input -->
      <div class="mb-4">
        <label for="email" class="block text-stone-600">Email</label>
        <input
          ref="emailInputRef"
          v-model="loginForm.email"
          type="text"
          id="email"
          name="email"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-stone-500"
          autocomplete="off"
        />
      </div>
      <!-- Password Input -->
      <div class="mb-4">
        <label for="password" class="block text-stone-600">Password</label>
        <input
          ref="passwordInputRef"
          v-model="loginForm.password"
          type="password"
          id="password"
          name="password"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-stone-500"
          autocomplete="off"
        />
      </div>
      <!-- Remember Me Checkbox -->
      <div class="mb-4 flex items-center">
        <input
          v-model="loginForm.rememberMe"
          type="checkbox"
          id="remember"
          name="remember"
          class="text-stone-500"
        />
        <label for="remember" class="text-stone-600 ml-2">Remember Me</label>
      </div>
      <!-- Forgot Password Link -->
      <div class="mb-6 text-stone-500">
        <span class="hover:underline">Forgot Password?</span>
      </div>
      <!-- Login Button -->
      <button
        :disabled="!loginForm.email || !loginForm.password"
        type="submit"
        class="bg-stone-900 hover:bg-stone-700 text-white font-semibold rounded-md py-2 px-4 w-full disabled:bg-gray-300"
      >
        Login
      </button>
    </form>
    <!-- Sign up  Link -->
    <div class="mt-6 text-stone-500 text-center font-light">
      <RouterLink :to="{ name: 'Register' }" class="hover:underline">Sign up Here</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue-sonner';
// import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';
// const router = useRouter();

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const { login } = useAuthStore();

const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const onLogin = async () => {
  if (loginForm.email === '') {
    return emailInputRef.value?.focus();
  }

  if (loginForm.password === '') {
    return passwordInputRef.value?.focus();
  }

  if (loginForm.rememberMe) {
    localStorage.setItem('email', loginForm.email);
  } else localStorage.removeItem('email');

  const ok = await login(loginForm.email, loginForm.password);

  if (ok) {
    toast.success('Login Success', {
      description: 'Redirecting...',
      action: {
        label: 'Ok',
      },
    });
    return;
  } else {
    toast.error('Authentication failed', {
      description: 'Email or password incorrect, please verify and try again.',
      action: {
        label: 'Try',
        onClick: () => {
          passwordInputRef.value?.focus();
        },
      },
    });
  }
};

onMounted(() => {
  const rememberedEmail = localStorage.getItem('email');
  if (rememberedEmail) {
    loginForm.email = rememberedEmail;
    loginForm.rememberMe = true;
    passwordInputRef.value?.focus();
  } else {
    emailInputRef.value?.focus();
  }
});
</script>
