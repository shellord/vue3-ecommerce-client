<template>
  <div
    class="bg-black right-0 top-0 w-full z-40 bg-opacity-60 flex fixed justify-end h-screen"
    :class="{ hidden: !props.show }"
    @click="emit('toggleShow')"
  />
  <div
    class="fixed z-50 right-0 w-full sm:w-[30rem] h-screen bg-white transition-all duration-500 shadow"
    :class="{ 'translate-x-0': props.show, 'translate-x-full': !props.show }"
  >
    <div class="h-screen flex flex-col justify-between">
      <div class="flex items-center border-b p-4">
        <button
          @click="emit('toggleShow')"
          class="hover:rotate-90 transition-all duration-500"
        >
          <XIcon class="w-9 h-9" />
        </button>
        <div class="justify-center flex flex-1">
          <p class="font-semibold">My Cart</p>
        </div>
      </div>
      <div class="flex-1 overflow-scroll mt-2 px-4">
        <div class="space-y-5 overflow-y-scroll">
          <div v-if="cart.cartItems.length === 0">
            <p>
              Your cart is empty.
              <br />
              <br />
              <span class="text-gray-600">
                You can add items to your cart by clicking on the "Add to Cart"
                button on the product page.
              </span>
            </p>
          </div>
          <div v-for="cartItem in cart.cartItems" :key="cartItem.product.id">
            <CartItem
              :id="cartItem.product.id"
              :name="cartItem.product.name"
              :description="cartItem.product.description"
              :image="cartItem.product.image"
              :quantity="cartItem.quantity"
              :price="cartItem.product.price"
            />
          </div>
        </div>
      </div>
      <div class="space-y-2 p-5">
        <div class="flex justify-between">
          <p class="font-semibold">SubTotal</p>
          <p>${{ cart.totalPrice }}.USD</p>
        </div>
        <div class="flex justify-between">
          <p class="font-semibold">Shipping</p>
          <p>FREE</p>
        </div>

        <button
          class="bg-gray-900 text-white p-3 w-full"
          @click="proceedToCheckout"
        >
          <p class="font-semibold">PROCEED TO CHECKOUT</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon } from '@heroicons/vue/outline';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import CartItem from '@/components/CartItem.vue';
import { GET_CART } from '@/graphql';

const router = useRouter();
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const proceedToCheckout = () => {
  emit('toggleShow');
  router.push('/checkout');
};

const { result } = useQuery(GET_CART);
const cart = computed(
  () =>
    result.value ?? {
      totalPrice: 0,
      cartItems: [],
    }
);

const emit = defineEmits(['toggleShow']);
</script>
