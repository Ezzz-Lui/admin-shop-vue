<template>
  <article
    class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 h-full flex flex-col"
  >
    <a href="#" class="flex flex-col h-full">
      <div class="relative flex items-end overflow-hidden rounded-xl">
        <img :src="productImage" alt="product image grid" />
      </div>

      <div class="mt-1 p-2 flex flex-col flex-grow">
        <div class="flex-grow">
          <h2 class="text-stone-700 font-semibold">
            {{ productTitle }}
            <span
              class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset capitalize"
              >{{ productTags?.join(',') }}</span
            >
          </h2>
          <p class="mt-1 text-sm text-slate-400 capitalize">{{ productGender }}</p>
        </div>

        <div class="mt-3 flex items-end justify-between">
          <p class="text-lg font-bold text-blue-500">${{ productPrice }}</p>

          <div
            class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <ShoppingCart />

            <button class="text-sm">Add to cart</button>
          </div>
        </div>
      </div>
    </a>
  </article>
</template>
<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next';

defineProps({
  productTitle: String,
  productPrice: Number,
  productGender: String,
  productImage: String,
  productTags: Array,
});
</script>
