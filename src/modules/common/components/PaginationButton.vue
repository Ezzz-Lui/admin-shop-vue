<template>
  <div class="flex justify-center py-10 space-x-3">
    <button
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5  bg-blue-500 disabled:bg-stone-600 hover:bg-blue-600 cursor-pointer text-stone-100"
    >
      <ChevronLeft />
      <span> Previous </span>
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 bg-blue-500 disabled:bg-stone-600 hover:bg-blue-600 cursor-pointer text-stone-100"
    >
      <span>Next</span>
      <ChevronRight />
    </button>
  </div>
</template>
<script setup lang="ts">
import { ChevronRight, ChevronLeft } from 'lucide-vue-next';

interface Props {
  page: number;
  isFirstPage: boolean;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>
