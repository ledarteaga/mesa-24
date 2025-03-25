<template>
  <div
    class="rounded-xl py-8 px-6 sm:py-12 sm:px-8 sm:min-w-56"
    :class="gradientClass"
  >
    <UIcon v-if="icon" :name="icon" class="max-w-16" size="5.5vw"></UIcon>
    <h3 class="font-bold text-lg sm:text-2xl"><slot></slot></h3>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  gradientClass: String,
});
</script>
