<template>
  <div class="rounded-xl py-12 px-8 min-w-56" :class="gradientClass">
    <UIcon v-if="icon" :name="icon" size="3.5vw"></UIcon>
    <h3 class="font-bold text-2xl"><slot></slot></h3>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  gradientClass: String,
});
</script>
