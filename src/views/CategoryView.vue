<template>
  <div class="pt-16 p-2">
    <div class="flex justify-center my-5">
      <p class="font-bold text-4xl">
        {{ category === 'male' ? 'clothing for men' : 'clothing for women' }}
      </p>
    </div>
    <div class="flex justify-center">
      <div
        class="grid justify-center gap-10 sm:grid-flow-row sm:grid-cols-3"
        v-if="products"
      >
        <div v-for="product in products" :key="product.id">
          <ProductCard
            :id="product.id"
            :name="product.name"
            :image="product.image"
            :price="product.price"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useRoute } from 'vue-router';

import ProductCard from '@/components/ProductCard.vue';
import { GET_PRODUCTS_WITH_CATEGORY } from '@/graphql';

const route = useRoute();
const { category } = route.params;

const { result } = useQuery(GET_PRODUCTS_WITH_CATEGORY, {
  category: category.toUpperCase(),
});

const products = computed(() => result.value?.products);
</script>
