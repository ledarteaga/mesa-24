<template>
  <div class="flex gap-2">
    <UIcon class="size-9" name="i-material-symbols-light:menu-book"></UIcon>
    <h1 v-show="!collapsed" class="font-bold text-2xl">menuo</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  collapsed: boolean;
}>();
</script>
