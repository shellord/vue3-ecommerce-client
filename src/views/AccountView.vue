<template>
  <div class="flex h-screen pt-24 flex-col items-center">
    <div class="flex w-full max-w-xl px-5 justify-between items-center">
      <div v-if="user">
        <p class="text-xl font-semibold">Welcome {{ user.name }}</p>
      </div>
      <div>
        <button
          @click="logout"
          class="bg-red-500 p-2 rounded shadow text-white"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="w-full flex justify-center" v-if="loading">Loading</div>
    <div class="flex w-full max-w-xl mt-10" v-if="!loading">
      <div v-if="orders.orderItems.length > 0" class="w-full overflow-hidden">
        <div class="flex justify-center">
          <p class="font-semibold text-3xl">Your Orders</p>
        </div>
        <div class="w-full overflow-scroll p-1">
          <table class="w-full mt-10 shadow">
            <thead class="text-xs text-white uppercase bg-gray-500">
              <tr>
                <th class="p-3">#order</th>
                <th class="p-3">Date</th>
                <th class="p-3">name</th>
                <th class="p-3">quantity</th>
                <th class="p-3">price</th>
                <th class="p-3">total</th>
              </tr>
            </thead>
            <tr
              v-for="orderItem in orders.orderItems"
              :key="orderItem.id"
              class="text-sm sm:text-base even:bg-slate-200"
            >
              <td class="text-center border-b p-2">{{ orderItem.id }}</td>
              <td class="text-center border-b p-2">
                {{ new Date(orderItem.product.createdAt).toLocaleString() }}
              </td>
              <td class="text-center border-b p-2">
                {{ orderItem.product.name }}
              </td>
              <td class="text-center border-b p-2">{{ orderItem.quantity }}</td>
              <td class="text-center border-b p-2">
                ${{ orderItem.product.price }}
              </td>
              <td class="text-center border-b p-2">
                ${{ orderItem.product.price * orderItem.quantity }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-else class="w-full text-center">
        <p>No orders</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';

import { useAuth } from '@/composables/useAuth';
import { GET_ORDERS, ME_QUERY } from '@/graphql';

const { result: meResult } = useQuery(ME_QUERY);
const user = computed(() => meResult.value?.me);

const { result: orderResult, loading } = useQuery(GET_ORDERS);
const orders = computed(
  () =>
    orderResult.value?.order ?? {
      orderItems: [],
    }
);
const { logout } = useAuth();
</script>
