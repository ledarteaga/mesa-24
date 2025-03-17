<template>
  <div
    :class="[
      'px-5 py-3 rounded-xl border border-gray-500 ',
      selected && 'border-white',
    ]"
  >
    <div class="flex items-center justify-between">
      <p class="font-semibold">{{ item.name }}</p>
      <p class="font-semibold">{{ item.price }}</p>
    </div>

    <div>
      <p class="text-sm text-gray-400">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/database.types";

type Props = {
  item: Database["public"]["Tables"]["category_item"]["Row"];
  selected: boolean;
};

defineProps<Props>();
</script>

<style scoped></style>
