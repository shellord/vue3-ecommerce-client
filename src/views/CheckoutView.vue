<template>
  <div class="pt-16 sm:pt-28 bg-orange-50 h-screen">
    <div class="flex justify-center">
      <p class="font-semibold text-xl">Checkout</p>
    </div>
    <div v-if="cart.totalQuantity === 0">
      <p class="text-center">
        Your cart is empty.
        <br />
        <br />
        <span class="text-gray-600">
          You can add items to your cart by clicking on the "Add to Cart" button
          on the product page.
        </span>
      </p>
    </div>
    <div class="flex justify-center" v-if="cart.totalQuantity !== 0">
      <div class="w-full px-3 sm:px-0 sm:w-96">
        <form
          class="space-y-3"
          @submit.prevent="
            createOrderHandler(name, email, phone, address, city, zip)
          "
        >
          <div class="flex flex-col">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              class="border border-black p-2 w-full"
              v-model="name"
            />
          </div>
          <div class="flex flex-col">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              class="border border-black p-2"
              v-model="email"
            />
          </div>
          <div class="flex flex-col">
            <label for="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              class="border border-black p-2"
              v-model="phone"
            />
          </div>
          <div class="flex flex-col">
            <label for="address">Address</label>
            <textarea
              class="border border-black p-2 resize-none"
              id="address"
              v-model="address"
            ></textarea>
          </div>

          <div class="flex space-x-3 justify-between">
            <div class="flex flex-col">
              <label for="city"> City </label>
              <input
                type="text"
                id="city"
                class="border border-black p-2"
                v-model="city"
              />
            </div>
            <div class="flex flex-col w-1/3">
              <label for="zip"> Zipcode </label>
              <input
                type="number"
                id="zip"
                class="border border-black p-2"
                v-model="zip"
              />
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex justify-between items-center space-x-3">
              <p class="font-semibold">Total Price:</p>
              <p class="font-semibold text-xl">${{ cart.totalPrice }}</p>
            </div>
            <div class="flex justify-between items-center space-x-3">
              <p class="font-semibold">Total Quantity:</p>
              <p class="font-semibold text-xl">{{ cart.totalQuantity }}</p>
            </div>
            <div class="flex justify-between items-center space-x-3">
              <p class="font-semibold">Discount:</p>
              <p class="font-semibold text-xl">$0</p>
            </div>
          </div>
          <div>
            <button type="submit" class="w-full py-2 bg-black text-white">
              Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { ref, computed } from 'vue';

import { GET_CART } from '@/graphql';
import { CREATE_ORDER } from '@/graphql';

const {
  mutate: createOrder,
  onDone,
  onError,
} = useMutation(CREATE_ORDER, {
  refetchQueries: [{ query: GET_CART }],
});

const { result } = useQuery(GET_CART);
const cart = computed(
  () =>
    result.value?.cart ?? {
      totalPrice: 0,
      cartItems: [],
    }
);

const toast = useToast();
const router = useRouter();

const validateForm = (name, email, phone, address, city, zip) => {
  if (!name || !email || !phone || !address || !city || !zip) {
    toast.error('Please fill out all fields');
    return false;
  }
  if (!email.includes('@')) {
    toast.error('Please enter a valid email');
    return false;
  }
  if (phone.length !== 10 || isNaN(phone)) {
    toast.error('Please enter a valid 9 digit phone number');
    return false;
  }
  if (isNaN(zip)) {
    toast.error('Please enter a valid zipcode');
    return false;
  }
  return true;
};

const createOrderHandler = (name, email, phone, address, city, zip) => {
  if (validateForm(name, email, phone, address, city, zip)) {
    createOrder();
  }
};

onDone(() => {
  toast.success('Order created successfully');
  router.push('/account');
});

onError(() => {
  toast.error('Error creating order');
});

const name = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const city = ref('');
const zip = ref('');
</script>
