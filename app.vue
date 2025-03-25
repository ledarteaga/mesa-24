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
