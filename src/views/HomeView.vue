<template>
  <HeroSection />
  <div class="mt-20">
    <div class="flex justify-center">
      <p class="font-bold text-4xl">Trending</p>
    </div>
      <div class="flex justify-center mt-5 pb-5">
        <div class="grid sm:grid-cols-3 gap-10 justify-center">
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
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import HeroSection from '@/components/HeroSection.vue'
import ProductCard from '@/components/ProductCard.vue'
import { GET_ALL_PRODUCTS } from '@/graphql'

const { result } = useQuery(GET_ALL_PRODUCTS, {
  count: 6,
})

const products = computed(() => result.value?.products )
</script>
