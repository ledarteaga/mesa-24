<template>
  <UModal v-model="open">
    <GeneralModalLayout>
      <template #title> Crear categoria </template>

      <UForm @submit="onFormSubmit" :state :schema>
        <UFormGroup name="description">
          <UInput v-model="state.description" placeholder="Nombre" />
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
import { object, string, type InferType } from "yup";

const open = ref(false);
const client = useSupabaseClient();
const toast = useToast();

const schema = object({
  description: string().required("Completa este campo para continuar."),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  description: "",
});

const openModal = () => {
  open.value = true;
};

const onFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const { data, status } = await client.from("category").insert([
      {
        description: state.description,
      },
    ]);

    if (status !== 201) {
      throw new Error();
    }

    toast.add({
      title: "Categoría creada",
      description: "La categoría se creó exitosamente",
      color: "green",
    });

    open.value = false;

    emit("close");
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al crear la categoría",
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
