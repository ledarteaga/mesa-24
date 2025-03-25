<template>
  <ul v-if="store.validItems.length" class="flex flex-col gap-2">
    <li
      v-for="item in store.validItems"
      :key="item.id"
      class="flex justify-between border rounded py-3 px-4 rounded-l-lg border-gray-600 text-sm font-semibold"
    >
      {{ item.id }}
      <span class="text-gray-400"> {{ item.quantity }} </span>
    </li>
  </ul>

  <div v-else class="h-full flex">
    <GeneralEmptySlot> Sin productos </GeneralEmptySlot>
  </div>
</template>

<script setup lang="ts">
const store = useCartStore();
</script>

<style scoped></style>
