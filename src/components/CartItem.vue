<template>
  <div class="flex p-2 border-b pb-4">
    <img :src="props.image" alt="product" class="w-24 h-24" />
    <div class="ml-5 flex flex-col justify-between">
      <div>
        <p class="font-semibold">{{ props.name }}</p>
        <p class="text-gray-600">{{ props.description }}</p>
      </div>
      <div
        class="border-2 p-1 items-center flex w-20 justify-between space-x-1"
      >
        <button @click="removeFromCart">
          <MinusIcon class="w-4 h-4 text-gray-500 hover:text-black" />
        </button>
        <p class="text-sm">{{ props.quantity }}</p>
        <button @click="addToCart">
          <PlusIcon class="w-4 h-4 text-gray-500 hover:text-black" />
        </button>
      </div>
    </div>
    <div class="flex flex-1 justify-between flex-col items-end">
      <button @click="deleteCartItem">
        <XIcon
          class="w-5 h-5 hover:rotate-90 transition-all duration-500 text-gray-500 hover:text-black"
        />
      </button>
      <p>${{ price }}</p>
    </div>
  </div>
</template>

<script setup>
import { MinusIcon, PlusIcon, XIcon } from '@heroicons/vue/outline';
import { useMutation } from '@vue/apollo-composable';

import { GET_CART } from '@/graphql';
import { ADD_TO_CART, DELETE_CART_ITEM, REMOVE_FROM_CART } from '@/graphql';

const props = defineProps({
  id: String,
  name: String,
  description: String,
  image: String,
  quantity: Number,
  price: Number,
});

const { mutate: addToCart } = useMutation(ADD_TO_CART, {
  variables: {
    productId: props.id,
  },
  refetchQueries: [
    {
      query: GET_CART,
    },
  ],
});

const { mutate: removeFromCart } = useMutation(REMOVE_FROM_CART, {
  variables: {
    productId: props.id,
  },
  refetchQueries: [
    {
      query: GET_CART,
    },
  ],
});

const { mutate: deleteCartItem } = useMutation(DELETE_CART_ITEM, {
  variables: {
    productId: props.id,
  },
  refetchQueries: [
    {
      query: GET_CART,
    },
  ],
});
</script>
