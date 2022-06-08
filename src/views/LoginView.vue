<template>
  <div class="bg-orange-50 h-screen">
    <div class="flex justify-center pt-56 h-full">
      <div>
        <div class="mb-3">
          <p class="text-xl font-semibold">Login to your account</p>
        </div>
        <form @submit.prevent="login(email, password)">
          <div class="space-y-5 w-72">
            <div class="flex-col flex">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                class="p-2"
                autocomplete="email"
                v-model="email"
              />
            </div>
            <div class="flex-col flex">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                class="p-2"
                autocomplete="current-password"
                v-model="password"
              />
            </div>
            <button type="submit" class="bg-black text-white w-full py-3">
              Login
            </button>
            <div>
              <p class="text-sm text-gray-600">
                Don't have an account?
                <router-link to="/signup" class="text-blue-500">
                  Signup
                </router-link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { useAuth } from '@/composables/useAuth';

const email = ref('');
const password = ref('');

const { login } = useAuth();
</script>
