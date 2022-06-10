<template>
  <div v-if="!product && !loading">
    <main
      class="h-screen w-full flex flex-col justify-center items-center bg-red-200"
    >
      <h1 class="text-9xl font-extrabold text-black tracking-widest">404</h1>
      <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Product Not Found
      </div>
      <button class="mt-5">
        <a
          class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span
            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>

          <span
            class="relative block px-8 py-3 bg-[#1A2238] border border-current"
          >
            <router-link to="/">Go Home</router-link>
          </span>
        </a>
      </button>
    </main>
  </div>

  <div class="pt-16 p-2 h-screen" v-if="product">
    <div class="sm:mt-10 flex flex-col sm:flex-row w-full justify-center h-2/3">
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
