<template>
  <section class="h-full flex gap-8 px-5 py-8">
    <GeneralContainer class="w-1/2 flex flex-col grow">
      <template #title>Categorias</template>
      <template #actions>
        <UButton @click="categoryCreateModal?.openModal"> Crear </UButton>
      </template>

      <div class="flex flex-col gap-5 mt-5">
        <template v-if="categoriesStatus === 'success'">
          <CategoryContainer
            v-if="categories?.length"
            @click="selectedCategory = ind"
            v-for="(category, ind) in categories"
            :key="category.id"
            :category
            :selected="ind === selectedCategory"
          />

          <GeneralEmptySlot v-else> No hay categorías </GeneralEmptySlot>
        </template>

        <template v-else-if="categoriesStatus === 'pending'">
          <USkeleton v-for="_ in 5" :key="_" class="block h-12 rounded-lg" />
        </template>
      </div>
    </GeneralContainer>
    <GeneralContainer class="w-1/2 flex flex-col">
      <template #title>Productos</template>
      <template #actions>
        <UButton
          @click="onDeleteItemClick"
          variant="outline"
          color="red"
          :disabled="!selectedCategoryItem"
        >
          Eliminar
        </UButton>
        <UButton
          @click="
            () =>
              categoryCreateItemModal?.openModal(
                selectedCategoryID,
                selectedCategoryItem
              )
          "
          variant="outline"
          :disabled="!selectedCategoryItem"
        >
          Editar
        </UButton>
        <UButton
          @click="() => categoryCreateItemModal?.openModal(selectedCategoryID)"
        >
          Crear
        </UButton>
      </template>

      <div class="flex flex-col gap-5 mt-5 grow">
        <template v-if="itemsStatus === 'success'">
          <CategoryItemContainer
            v-if="categoryItems?.length"
            @click="selectedItem = ind"
            v-for="(item, ind) in categoryItems"
            :key="item.id"
            :selected="ind === selectedItem"
            :item
          />

          <GeneralEmptySlot v-else> No hay productos </GeneralEmptySlot>
        </template>

        <template v-else-if="itemsStatus === 'pending'">
          <USkeleton v-for="_ in 5" :key="_" class="block h-14 rounded-lg" />
        </template>
      </div>
    </GeneralContainer>
  </section>

  <CategoryCreateModal @close="refreshCategories" ref="categoryCreateModal" />
  <CategoryCreateItemModal
    @close="refreshCategoryItems"
    ref="categoryCreateItemModal"
  />
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const toast = useToast();
const selectedCategory = ref(0);
const selectedItem = ref(0);

const categoryCreateModal = ref();
const categoryCreateItemModal = ref();

const {
  data: categories,
  refresh: refreshCategories,
  status: categoriesStatus,
} = useAsyncData("categories", async () => {
  try {
    const { data } = await client
      .from("category")
      .select()
      .order("order", { ascending: true });

    return data;
  } catch (error) {
    return [];
  }
});

const {
  data: categoryItems,
  refresh: refreshCategoryItems,
  status: itemsStatus,
} = useAsyncData("categories_items", async () => {
  if (!selectedCategoryID.value) {
    return [];
  }

  try {
    const { data } = await client
      .from("category_item")
      .select()
      .eq("category", selectedCategoryID.value)
      .order("order", { ascending: true });

    return data;
  } catch (error) {
    return [];
  }
});

const selectedCategoryID = computed(() => {
  return categories.value?.[selectedCategory.value].id;
});

const selectedCategoryItem = computed(() => {
  return categoryItems.value?.[selectedItem.value];
});

const onDeleteItemClick = async () => {
  if (!selectedCategoryItem.value) {
    return;
  }

  try {
    const { status, statusText } = await client
      .from("category_item")
      .delete()
      .eq("id", selectedCategoryItem.value.id);

    console.log(status, statusText);

    toast.add({
      title: "Item eliminado",
      description: "El item se eliminó exitosamente",
      color: "green",
    });

    refreshCategoryItems();
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al eliminar el item",
      color: "red",
    });
  }
};

watch(selectedCategoryID, () => {
  refreshCategoryItems();
});
</script>
