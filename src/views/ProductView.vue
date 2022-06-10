<template>
  <div class="pt-16 p-2 h-screen">
    <div v-if="!product && !loading">
      <p class="text-center">
        Product not found.
        <br />
        <br />
        <span class="text-gray-600"> Please try again later. </span>
      </p>
    </div>
    <div
      class="sm:mt-10 flex flex-col sm:flex-row w-full justify-center h-2/3"
      v-if="product"
    >
      <div class="w-full sm:w-1/2 lg:w-1/4">
        <img
          :src="product.image"
          alt="product"
          class="w-full hover:scale-110 transition-all h-full object-cover"
        />
      </div>

      <div class="sm:ml-3 flex flex-col justify-between">
        <div>
          <p class="text-2xl font-bold">{{ product.name }}</p>
          <p class="text-xl font-semibold">${{ product.price }}</p>
          <p class="text-lg text-gray-700 mt-3">{{ product.description }}</p>
        </div>
        <div class="mt-3">
          <button
            class="bg-gray-800 text-white p-3 shadow w-full"
            @click="addToCart"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { ADD_TO_CART, GET_CART, GET_PRODUCT_BY_ID } from '@/graphql';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const { result, loading } = useQuery(GET_PRODUCT_BY_ID, {
  id: route.params.id,
});

const product = computed(() => result.value?.product);

const {
  mutate: addToCart,
  onDone,
  onError,
} = useMutation(ADD_TO_CART, {
  variables: {
    productId: route.params.id,
  },
  refetchQueries: [{ query: GET_CART }],
});

onDone(({ data }) => {
  toast.success(`${data.addToCart.product.name} added to cart`);
});

onError(() => {
  router.push('/login');
});
</script>
