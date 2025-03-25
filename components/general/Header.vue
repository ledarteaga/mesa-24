<template>
  <header
    class="border-r border-gray-600 py-1 px-5 flex flex-col gap-3 w-full sm:w-20 sm:hover:w-1/6 transition-all duration-200 overflow-hidden"
    @mouseenter="collapsed = false"
    @mouseleave="collapsed = true"
  >
    <NuxtLink to="/" class="flex items-center gap-2 mt-4">
      <GeneralLogo :collapsed="alwaysVisible ? false : collapsed" />
    </NuxtLink>

    <UNavigationMenu
      orientation="vertical"
      :ui="{ link: 'sm:py-2 py-3' }"
      variant="link"
      :collapsed="alwaysVisible ? false : collapsed"
      :items
    />
  </header>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const collapsed = ref(true);

interface Props {
  alwaysVisible?: boolean;
}

defineProps<Props>();

const items = reactive([
  {
    label: "Inicio",
    to: "/",
    icon: "i-material-symbols:home-rounded",
  },
  {
    label: "Ajustes",
    to: "/settings",
    icon: "i-material-symbols:settings-rounded",
    description: "Cambia la información de tu cuenta.",
  },
  {
    label: "Menu",
    to: "/menu",
    icon: "i-material-symbols:lists-rounded",
  },
]);
</script>

<style scoped></style>
