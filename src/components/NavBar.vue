<template>
  <nav
    class="p-2 sm:px-10 sm:py-2 justify-between flex items-center fixed w-full bg-white shadow z-20"
  >
    <router-link to="/" class="font-logo text-4xl">Brandly</router-link>
    <div class="flex space-x-5">
      <div v-if="!isAuthenticated">
        <router-link to="/login"><p class="text-lg">Log in</p></router-link>
      </div>
      <div v-else>
        <router-link to="/account">
          <UserCircleIcon class="w-7 h-7" />
        </router-link>
      </div>
      <button @click="toggleShowSideBar">
        <CartIcon :count="cart.totalQuantity" />
      </button>
    </div>
  </nav>
  <CartSideBar :show="showSidebar" @toggleShow="toggleShowSideBar" />
</template>

<script setup>
import { UserCircleIcon } from '@heroicons/vue/outline';
import { useQuery } from '@vue/apollo-composable';
import { ref, computed } from 'vue';

import CartSideBar from '@/components/CartSideBar.vue';
import CartIcon from '@/components/icons/CartIcon.vue';
import { useAuth } from '@/composables/useAuth';
import { GET_CART } from '@/graphql';

const { isAuthenticated } = useAuth();
const showSidebar = ref(false);
const toggleShowSideBar = () => {
  showSidebar.value = !showSidebar.value;
};

const { result } = useQuery(GET_CART);
const cart = computed(() => result.value?.cart ?? {});
</script>
