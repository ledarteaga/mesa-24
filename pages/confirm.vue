<template>
  <section class="h-full flex-col justify-center flex px-10 gap-10">
    <h1 class="text-3xl sm:text-4xl font-bold">😁 Espera un momento...</h1>

    <div
      class="flex sm:flex-row flex-col justify-center items-center gap-8 w-full h-2/4 sm:h-1/4"
    >
      <USkeleton
        v-for="(item, index) in 3"
        :key="index"
        class="w-full sm:w-1/3 h-full"
      ></USkeleton>
    </div>
  </section>
</template>

<script setup lang="ts">
onMounted(() => {
  setTimeout(() => {
    navigateTo("/");
  }, 3000);
});
</script>

<style scoped></style>
