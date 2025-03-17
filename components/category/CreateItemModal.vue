<template>
  <UModal v-model="open">
    <GeneralModalLayout>
      <template #title> {{ editing ? "Editar Item" : "Crear Item" }} </template>

      <UForm @submit="onFormSubmit" :state :schema class="flex flex-col gap-5">
        <UFormGroup name="name" label="Nombre">
          <UInput v-model="state.name" placeholder="Nombre" />
        </UFormGroup>
        <UFormGroup name="description" label="Descripcion">
          <UTextarea v-model="state.description" placeholder="Descripcion" />
        </UFormGroup>
        <UFormGroup name="price" label="Precio">
          <UInput v-model="state.price" type="number" placeholder="Precio" />
        </UFormGroup>

        <UButton class="mt-5 w-1/3 mx-auto block" type="submit">
          Guardar
        </UButton>
      </UForm>
    </GeneralModalLayout>
  </UModal>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { number, object, string, type InferType } from "yup";

const open = ref(false);
const editing = ref(false);
const client = useSupabaseClient();
const toast = useToast();

const schema = object({
  description: string().required("Completa este campo para continuar."),
  name: string().required("Completa este campo para continuar."),
  price: number().min(0.1).required("Completa este campo para continuar."),
  category: number().required(),
  id: number(),
});

type Schema = InferType<typeof schema>;

const state = reactive<Schema>({
  description: "",
  name: "",
  price: 0,
  category: 0,
  id: 0,
});

const openModal = (category: number, initialValues?: Schema) => {
  open.value = true;

  state.category = category;

  if (initialValues) {
    Object.assign(state, initialValues);

    editing.value = true;
  } else {
    Object.assign(state, {
      description: "",
      name: "",
      price: 0,
      category,
      id: 0,
    });
  }
};

const onFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    if (editing.value && state.id) {
      // Update
      const { data, error } = await client
        .from("category_item")
        .update({
          name: state.name,
          description: state.description,
          price: state.price,
        })
        .eq("id", state.id);

      if (error) {
        console.log("🚀 ~ onFormSubmit ~ error:", error);
        throw new Error();
      }
    } else {
      // Insert
      const { data, error } = await client.from("category_item").insert([
        {
          description: state.description,
          name: state.name,
          price: state.price,
          category: state.category,
        },
      ]);

      if (error) {
        console.log("🚀 ~ onFormSubmit ~ error:", error);
        throw new Error();
      }
    }

    toast.add({
      title: "Item creada",
      description: "El item se creó exitosamente.",
      color: "green",
    });

    open.value = false;
    editing.value = false;

    emit("close");
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al crear el item.",
      color: "red",
    });
  }
};

defineExpose({
  openModal,
});

const emit = defineEmits(["close"]);
</script>

<style scoped></style>
