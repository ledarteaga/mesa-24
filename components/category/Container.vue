<template>
  <div
    :class="[
      'px-3 py-2 sm:px-5 sm:py-3 rounded-xl border border-gray-500 transition-all duration-200 ',
      selected && 'border-white',
    ]"
  >
    <p class="text-sm font-semibold">{{ category.description }}</p>
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
