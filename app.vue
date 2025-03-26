<template>
  <ClientOnly>
    <UApp>
      <UToast />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
    <NuxtLoadingIndicator />
  </ClientOnly>
</template>

<script setup lang="ts">
useHead({
  title: "Menuo | Tu restaurante en un solo click.",
  meta: [
    {
      name: "description",
      content:
        "Digitaliza tu carta, recibe pedidos por WhatsApp y convierte visitas en clientes.",
    },
  ],
});
</script>
