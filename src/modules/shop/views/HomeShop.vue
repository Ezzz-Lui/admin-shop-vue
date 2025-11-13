<template>
  <!-- Title -->
  <div class="pt-32">
    <h1 class="text-center text-6xl font-extrabold dark:text-stone-300">All Products</h1>
  </div>
  <!-- Tab Menu -->
  <div
    class="flex flex-wrap items-center overflow-x-auto overflow-y-hidden py-10 justify-center dark:text-stone-300"
  >
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 dark:text-stone-300"
    >
      <Star :size="16" />
      <span class="font-semibold">Shirts</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg dark:text-stone-300"
    >
      <Star :size="16" />
      <span class="font-semibold">Pants</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 dark:text-stone-300"
    >
      <Star :size="16" />
      <span class="font-semibold">Bags</span>
    </a>
    <a
      rel="noopener noreferrer"
      href="#"
      class="flex items-center flex-shrink-0 px-5 py-3 space-x-2 dark:text-stone-300"
    >
      <Star :size="16" />
      <span class="font-semibold">Hats</span>
    </a>
  </div>

  <!-- Product List -->
  <ProductList :products="products" :is-loading="isLoading" />
  <PaginationButton
    :has-more-data="!!products && products.length < 10"
    :is-first-page="page === 1"
    :page="page"
  />
</template>

<script setup lang="ts">
import { getProducts } from '@/modules/products/actions';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import ProductList from '../components/products/ProductList.vue';
import PaginationButton from '@/modules/common/components/PaginationButton.vue';
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';
import { Star } from 'lucide-vue-next';

const route = useRoute();
const page = ref(Number(route.query.page || 1));
const queryClient = useQueryClient();

const { data: products, isLoading } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProducts(page.value),
});

watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage || 1);
    window.scrollTo({ top: 0, behavior: 'smooth'})
  },
);

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1}],
    queryFn: () => getProducts(page.value + 1)
  })
})
</script>
