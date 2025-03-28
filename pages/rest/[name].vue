<template>
  <section class="h-full">
    <div
      ref="backdrop"
      class="h-full relative flex flex-col items-center justify-start bg-center bg-no-repeat bg-cover transition-all duration-200"
    >
      <div class="overlay h-full w-full bg-black opacity-25 absolute"></div>

      <transition name="fade" appear>
        <NuxtLink to="/" class="flex justify-center absolute top-10 z-10">
          <GeneralLogo :collapsed="false" />
        </NuxtLink>
      </transition>

      <div v-if="menuView" class="absolute right-10 top-10">
        <UChip :text="cartStore.itemsCount">
          <UButton
            @click="sidePanelVisible = true"
            icon="i-prime:cart-minus"
            size="xl"
          />
        </UChip>
      </div>

      <UCard
        class="w-4/5 sm:w-2/3 h-3/4 left-0 right-0 top-0 bottom-0 m-auto absolute transition-all duration-200 shadow-2xl flex flex-col"
        :ui="{ body: 'grow' }"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold">{{ restaurant?.name }}</h2>
              <span class="text-sm text-gray-400">{{
                restaurant?.slogan
              }}</span>
            </div>
            <img
              class="size-14 rounded-full hover:scale-105 transition-all"
              :src="logoUrl"
            />
          </div>
        </template>

        <div class="grow flex flex-col">
          <div class="grow">
            <ClientLinkTree @menu="menuView = true" :data="restaurant" />
          </div>
        </div>

        <USlideover
          v-model:open="menuView"
          title="Nuestra Carta"
          :ui="{
            content: 'h-6/7 md:h-full',
          }"
          description="Escoje tus productos y envianos tu pedido por WhatsApp."
          :side="breakpoint.tablet.value ? 'right' : 'bottom'"
        >
          <template #body>
            <UTabs
              :items="menuTabs"
              :ui="{ list: 'overflow-x-auto overflow-y-hidden' }"
              variant="link"
              @change="menuView = false"
            >
              <template #content="{ item }">
                <template v-for="it in getMenuItemsByCategory(item.label)">
                  <ClientMenuItemRow
                    @increase="cartStore.addItem"
                    @decrease="cartStore.removeItem"
                    :item="it"
                    :currency="restaurant?.preffered_currency ?? ''"
                    :quantity="getItemQuantity(it.name)"
                  />
                </template>
              </template>
            </UTabs>
          </template>
          <template #footer>
            <UButton
              :to="whatsAppMessageLink"
              target="_blank"
              :disabled="!cartStore.itemsCount"
              class="mx-auto"
              size="lg"
              icon="i-prime:whatsapp"
              @click="sidePanelVisible = false"
              >Enviar Pedido
            </UButton>
          </template>
        </USlideover>

        <template #footer>
          <p class="text-xs text-center font-semibold my-2">
            {{ restaurant?.address }}
          </p>
        </template>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBreakpoints } from "@vueuse/core";

const route = useRoute();
const client = useSupabaseClient();
const cartStore = useCartStore();
const breakpoint = useBreakpoints({
  tablet: 640,
  desktop: 1024,
  phone: 510,
});
const backdrop = ref<HTMLDivElement>();
const menuView = ref(false);
const sidePanelVisible = ref(false);

const getItemQuantity = (id: string | null) => {
  return cartStore.validItems.find((item) => item.id === id)?.quantity;
};

const getMenuItemsByCategory = (category: string) => {
  return menu.value?.filter((item) => item.category === category);
};

const menuTabs = computed(() => {
  const set = new Set(menu.value?.map((item) => item.category));

  return !menu.value ? [] : [...set].map((item) => ({ label: item ?? "" }));
});

const logoUrl = computed(() => {
  if (!restaurant.value?.logo) {
    return "";
  }

  return client.storage.from("branding").getPublicUrl(restaurant.value?.logo)
    .data.publicUrl;
});

const backdropUrl = computed(() => {
  if (!restaurant.value?.backdrop) {
    return "";
  }

  return client.storage
    .from("branding")
    .getPublicUrl(restaurant.value?.backdrop).data.publicUrl;
});

const whatsAppMessageLink = computed(() => {
  if (!restaurant.value) {
    return "";
  }

  return `https://wa.me/${restaurant.value.phone_number}?text=${cartStore.encodedOrderText}`;
});

const { data: restaurant, status } = useAsyncData("restaurant", async () => {
  try {
    const { data, error } = await client
      .from("client_restaurant")
      .select()
      .eq("url_name", route.params.name as string)
      .limit(1);

    if (!data?.length || error) {
      navigateTo("/rest/not-found");

      return null;
    }

    return data[0];
  } catch (error) {
    return null;
  }
});

const { data: menu } = useAsyncData("menu", async () => {
  try {
    const { data, error } = await client.from("menu_items").select();

    if (!data?.length || error) {
      throw new Error();
    }

    return data;
  } catch (error) {
    return [];
  }
});

const setBackdrop = () => {
  if (backdrop.value) {
    backdrop.value.style.backgroundImage = `url(${backdropUrl.value})`;
  }
};

const setThemeColor = () => {
  document.documentElement.style.setProperty(
    "--ui-primary",
    restaurant.value?.primary_color ?? ""
  );
};

onBeforeRouteLeave(() => {
  document.documentElement.style.setProperty("--ui-primary", "#0093cc");

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
});

watch(restaurant, () => {
  setBackdrop();
  setThemeColor();

  useHead({
    title: `Menuo | ${restaurant.value?.name}`,
  });
});
</script>
