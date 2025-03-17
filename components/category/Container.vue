<template>
  <div
    :class="[
      'px-5 py-3 rounded-xl border border-gray-500',
      selected && 'border-white',
    ]"
  >
    <p class="font-semibold">{{ category.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/database.types";

type Props = {
  category: Database["public"]["Tables"]["category"]["Row"];
  selected: boolean;
};

defineProps<Props>();
</script>

<style scoped></style>
