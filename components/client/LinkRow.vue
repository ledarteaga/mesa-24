<template>
  <NuxtLink :to="link" target="_blank">
    <div
      class="flex gap-3 border border-gray-700 rounded-lg px-2 py-2 items-center hover:border-gray-400 transition-all duration-200"
    >
      <UAvatar :icon size="lg" />
      <p class="font-semibold text-sm"><slot></slot></p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  link: string;
}
const props = defineProps<Props>();
</script>
