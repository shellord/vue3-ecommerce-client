<template>
  <a :href="'/product/' + props.id">
    <div class="shadow">
      <div class="overflow-hidden">
        <img
          :src="props.image"
          class="w-72 sm:w-96 hover:scale-110 transition-all h-96 object-cover"
        />
      </div>
      <div class="p-3 flex justify-between items-center">
        <p class="font-semibold sm:text-xl">{{ props.name }}</p>
        <p class="sm:text-xl text-gray-700">${{ props.price }}</p>
      </div>
    </div>
  </a>
</template>

<script setup>
const props = defineProps({
  id: String,
  name: String,
  image: String,
  price: Number,
});
</script>
