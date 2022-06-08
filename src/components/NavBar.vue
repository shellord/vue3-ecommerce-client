<template>
  <nav
    class="p-2 sm:px-10 sm:py-2 justify-between flex items-center fixed top-0 w-full bg-white shadow z-20"
  >
    <router-link to="/" class="font-logo text-4xl">Brandly</router-link>
    <div class="flex space-x-5">
      <CartIcon :count="10" />
    </div>
  </nav>
</template>

<script setup>
import CartIcon from '@/components/icons/CartIcon.vue';
</script>
