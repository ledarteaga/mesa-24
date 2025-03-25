<template>
  <section class="h-full">
    <div
      ref="backdrop"
      class="h-full relative flex flex-col items-center justify-start bg-center bg-no-repeat bg-cover transition-all duration-200"
    >
      <div class="overlay h-full w-full bg-black opacity-25 absolute"></div>

      <NuxtLink to="/" class="flex justify-center absolute top-10 z-10">
        <GeneralLogo :collapsed="false" />
      </NuxtLink>

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
        class="h-3/4 left-0 right-0 top-0 bottom-0 m-auto absolute transition-all duration-200 shadow-2xl flex flex-col"
        :class="{
          'w-3/4 sm:w-2/3': !menuView,
          'w-4/5 sm:w-3/4': menuView,
        }"
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
            <UAvatar
              size="3xl"
              class="hover:scale-105 transition-all"
              :src="logoUrl"
            />
          </div>
        </template>

        <div v-if="!menuView" class="grow flex flex-col">
          <div class="grow">
            <ClientLinkTree @menu="menuView = true" :data="restaurant" />
          </div>
        </div>

        <div v-else class="flex flex-col justify-between">
          <div class="flex justify-end">
            <UButton
              label="Volver"
              @click="menuView = false"
              :variant="'soft'"
            />
          </div>

          <UTabs
            :items="menuTabs"
            :ui="{ list: 'overflow-x-scroll overflow-y-visible' }"
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
        </div>

        <template #footer>
          <p class="text-xs text-center font-semibold my-2">
            {{ restaurant?.address }}
          </p>
        </template>
      </UCard>
    </div>

    <USlideover
      title="Tu Pedido"
      description="Escoje los productos para tu pedido por whatsapp."
      v-model:open="sidePanelVisible"
    >
      <template #body>
        <CartList />
      </template>

      <template #footer>
        <UButton
          :to="whatsAppMessageLink"
          target="_blank"
          :disabled="!cartStore.itemsCount"
          class="mx-auto"
          icon="i-prime:whatsapp"
          @click="sidePanelVisible = false"
          >Enviar Pedido
        </UButton>
      </template>
    </USlideover>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const client = useSupabaseClient();
const cartStore = useCartStore();
const appConfig = useAppConfig();

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
      throw new Error();
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

watch(restaurant, () => {
  setBackdrop();
  setThemeColor();
});
</script>
