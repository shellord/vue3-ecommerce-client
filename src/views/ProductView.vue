<template>
  <div class="pt-16 p-2 h-screen">
    <div class="sm:mt-10 flex flex-col sm:flex-row w-full justify-center h-2/3">
      <div class="w-full sm:w-1/4 overflow-hidden">
        <img
          :src="product.image"
          alt="product"
          class="w-full hover:scale-110 transition-all h-full object-cover"
        />
      </div>

      <div class="sm:ml-3 flex flex-col justify-between">
        <div>
          <p class="text-2xl font-bold">{{ product.name }}</p>
          <p class="text-lg">${{ product.price }}</p>
          <p class="text-lg text-gray-700">{{ product.description }}</p>
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

const { result } = useQuery(GET_PRODUCT_BY_ID, {
  id: route.params.id,
});

const product = computed(
  () =>
    result.value?.product ?? {
      name: '',
      description: '',
      price: 0,
      image: '',
    }
);

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
