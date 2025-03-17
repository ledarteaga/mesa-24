<template>
  <section class="h-full flex flex-col justify-center px-20">
    <h1 class="text-4xl font-bold">Bienvenido de nuevo... 👋</h1>

    <div class="flex w-full justify-between gap-8 mt-10">
      <NuxtLink to="/personalize" class="grow">
        <HomeLinkButton
          gradientClass="bg-gradient-to-r from-cyan-500 to-blue-500"
          icon="i-bxs:magic-wand"
          >Personalizar</HomeLinkButton
        >
      </NuxtLink>

      <NuxtLink to="/menu" class="grow">
        <HomeLinkButton
          gradientClass="bg-gradient-to-r from-fuchsia-600 to-pink-600"
          icon="i-material-symbols:lists-rounded"
          >Menu</HomeLinkButton
        >
      </NuxtLink>

      <NuxtLink to="/settings" class="grow">
        <HomeLinkButton
          gradientClass="bg-gradient-to-r from-purple-500 to-purple-900"
          icon="i-material-symbols:settings-rounded"
          >Ajustes</HomeLinkButton
        >
      </NuxtLink>

      <NuxtLink to="/account" class="grow">
        <HomeLinkButton
          gradientClass="bg-gradient-to-r from-fuchsia-600 to-pink-600"
          icon="i-mdi-account"
          >Mi cuenta</HomeLinkButton
        >
      </NuxtLink>
    </div>
  </section>
</template>
