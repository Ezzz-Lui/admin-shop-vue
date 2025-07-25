<template>
  <section class="py-10 bg-white">
    <div
      v-if="!isLoading"
      class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <CardProduct
        v-for="product in products"
        :key="product.id"
        :product-gender="product.gender"
        :product-image="product.images[0]"
        :product-price="product.price"
        :product-title="product.title"
        :product-tags="product.tags"
      />
    </div>

    <div
      v-else
      class="mx-auto flex max-w-7xl items-center justify-center p-6 min-h-[400px]"
    >
      <div class="flex flex-col items-center space-y-4">
      <div
        class="animate-spin size-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <p class="text-gray-600 font-medium">Loading products...</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CardProduct from './CardProduct.vue';

defineProps({
  products: Object,
  isLoading: Boolean,
});
</script>
