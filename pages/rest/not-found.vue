<template>
  <div class="h-full relative flex justify-center items-center">
    <span
      class="flex flex-col justify-center items-center z-20 gap-4 text-center px-5"
    >
      <UIcon
        class="size-24 sm:size-40"
        name="i-material-symbols-light:menu-book"
      ></UIcon>

      <h1 class="xl:text-4xl text-2xl font-bold">
        Oh no 😢, parece que el restaurante no existe...
      </h1>

      <div
        class="flex items-center gap-2 font-semibold text-sm xl:text-xl text-center"
      >
        <p class="line-clamp-1">Registrate hoy y empieza a vender más.</p>
        <GeneralLogo :collapsed="false" />
      </div>

      <UButton
        to="/"
        size="xl"
        label="Registrarme"
        class="flex justify-center"
        variant="link"
        color="neutral"
      />
    </span>

    <img
      src="/public/assets/login-backdrop.webp"
      class="object-cover absolute h-full w-full top-0 bottom-0 left-0 right-0 opacity-50 z-10"
    />
  </div>
</template>

<script setup lang="ts">
import { GeneralLogo, UButton } from "#components";
</script>

<style scoped></style>
