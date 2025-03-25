<template>
  <div class="h-screen flex sm:flex-row flex-col">
    <template v-if="user">
      <GeneralHeader v-if="breakpoint.phone.value" />

      <div v-else class="flex px-3 mt-2 relative py-2">
        <UDrawer :direction="'left'">
          <UButton variant="ghost" :size="'xl'" icon="i-mdi-menu" />

          <template #content>
            <GeneralHeader always-visible />
          </template>
        </UDrawer>

        <NuxtLink to="/">
          <GeneralLogo
            class="absolute right-0 left-0 top-3 m-auto w-50 flex justify-center"
            :collapsed="false"
          />
        </NuxtLink>
      </div>
    </template>

    <section class="grow overflow-y-scroll">
      <slot></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";
const user = useSupabaseUser();

useHead({
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
  ],
});

const breakpoint = useBreakpoints({
  tablet: 640,
  desktop: 1024,
  phone: 510,
});
</script>
