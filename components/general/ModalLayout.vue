<template>
  <div class="flex flex-col py-4 px-5">
    <h3 class="font-bold text-xl mb-4">
      <slot name="title"></slot>
    </h3>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
