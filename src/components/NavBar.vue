<template>
  <nav
    class="p-2 sm:px-10 sm:py-2 justify-between flex items-center fixed w-full bg-white shadow z-20"
  >
    <router-link to="/" class="font-logo text-4xl">Brandly</router-link>
    <div class="flex space-x-5">
      <div>
        <router-link to="/"><p class="text-lg">Log in</p></router-link>
      </div>

      <button @click="toggleShowSideBar">
        <CartIcon :count="10" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

import CartIcon from '@/components/icons/CartIcon.vue'



</script>
