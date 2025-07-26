<template>
  <Toaster rich-colors position="top-right" />
  <RouterView />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css'; //
</script>
