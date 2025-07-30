<template>
  <div class="flex justify-center py-10 space-x-3">
    <button
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 cursor-pointer"
    >
      <ChevronLeft />
      <span> Previous </span>
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-500 disabled:bg-gray-300 hover:bg-blue-600 cursor-pointer"
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
