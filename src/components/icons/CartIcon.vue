<template>
  <button class="relative">
    <ShoppingCartIcon class="h-7 w-7 text-black" />
    <span
      class="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"
      >{{ count }}</span
    >
  </button>
</template>

<script>
import { ShoppingCartIcon } from '@heroicons/vue/solid'

export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  components: { ShoppingCartIcon },
}
</script>
