<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pink-100 to-indigo-200"
  >
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4 text-gray-800">Welcome to Menuo</h1>
      <p class="text-lg text-gray-600 mb-8">
        Your ultimate linktree alternative for small restaurants.
      </p>
      <p class="text-lg text-gray-600 mb-8">
        Let your clients explore your menu and send orders directly via
        WhatsApp.
      </p>
      <NuxtLink
        to="/menu"
        class="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        Explore Now
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
