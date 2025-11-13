<template>
  <nav class="fixed top-0 left-0 z-20 w-full py-2.5 px-6 sm:px-4 backdrop-blur-md shadow-xl">
    <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
      <a href="#" class="flex items-center">

        <Zap :size="16" class="mr-1"/>
        <span class="self-center text-2xl tracking-wide font-extrabold">SuperStore</span>
      </a>
      <div class="mt-2 sm:mt-0 sm:flex md:order-2">
        <!-- Login Button -->
        <template v-if="!authStore.isAuthenticated">
          <button
            type="button"
            @click="router.push({ name: 'Login' })"
            class="cursor-pointer rounde mr-3 hidden border dark:border-0 py-1.5 px-6 text-center text-sm font-medium text-blue-700 dark:text-white md:inline-block rounded-lg hover:bg-gray-100 dark:hover:bg-stone-900"
          >
            Login
          </button>
          <button
            type="button"
            @click="router.push({ name: 'Register' })"
            class="cursor-pointer rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none md:mr-0 md:inline-block rounded-lg"
          >
            Register
          </button>
        </template>

        <template v-else>
          <button
            type="button"
            @click="
              authStore.isAdmin
                ? router.push({ name: 'AdminPanel' })
                : router.push({ name: 'home' })
            "
            class="cursor-pointer rounde mr-3 hidden border dark:border-0 py-1.5 px-6 text-center text-sm font-medium text-blue-700 dark:text-white md:inline-block rounded-lg hover:bg-gray-100 dark:hover:bg-stone-900"
          >
            {{ authStore.isAdmin ? 'Admin' : 'My Account' }}
          </button>
          <button
            type="button"
            @click="authStore.logout"
            class="cursor-pointer rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none md:mr-0 md:inline-block rounded-lg"
          >
            Logout
          </button>
        </template>

        <button
          @click="toggleDark()"
          type="button"
          class="cursor-pointer border dark:border-0 rounde ml-3 hidden py-1.5 px-3 text-center text-sm font-medium focus:outline-none md:mr-0 md:inline-block rounded-lg hover:bg-gray-100 dark:hover:bg-stone-900"
        >
          <template v-if="isDark">
            <Sun />
          </template>

          <template v-else>
            <Moon />
          </template>
        </button>
        <!-- Register Button -->
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        id="navbar-sticky"
      >
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium"
        >
          <li>
            <a
              href="#"
              class="block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 tracking-wide font-light"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a href="#" class="block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 tracking-wide font-light">About</a>
          </li>
          <li>
            <a href="#" class="block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 tracking-wide font-light">Services</a>
          </li>
          <li>
            <a href="#" class="block rounded py-2 pl-3 pr-4 md:bg-transparent md:p-0 tracking-wide font-light">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Moon, Sun, Zap } from 'lucide-vue-next';
import { useDark, useToggle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store/auth.store';

const authStore = useAuthStore();
const router = useRouter();

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
