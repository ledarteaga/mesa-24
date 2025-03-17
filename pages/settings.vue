<template>
  <section class="h-full flex items-center justify-center">
    <UCard class="w-3/4 sm:w-1/3 h-1/2">
      <template #header>
        <GeneralSectionHeader>
          <template #title> Ajustes </template>

          <template #subtitle> Cambia la información de tu cuenta </template>
        </GeneralSectionHeader>
      </template>

      <UForm :state :schema class="flex flex-col gap-4">
        <UFormGroup name="name" label="Nombre">
          <UInput v-model="state.name" placeholder="Nombre" />
        </UFormGroup>

        <UFormGroup name="slogan" label="Slogan">
          <UInput v-model="state.slogan" placeholder="Slogan" />
        </UFormGroup>

        <UFormGroup name="currency" label="Moneda">
          <USelect
            v-model="state.prefferred_currency"
            :options="currencies"
            placeholder="Moneda"
          />
        </UFormGroup>
        <UFormGroup name="primary_color" label="Color principal"> </UFormGroup>
      </UForm>

      <template #footer>
        <UButton class="block mx-auto" label="Guardar" type="submit" />
      </template>
    </UCard>
  </section>
</template>

<script setup lang="ts">
import { object, Schema, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const client = useSupabaseClient();
const toast = useToast();
const user = useSupabaseUser();

const currencies = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "PEN", value: "EUR" },
  { label: "MXN", value: "MXN" },
  { label: "CLP", value: "CLP" },
];

const schema = object({
  name: string().required(),
  slogan: string().required(),
  prefferred_currency: string().required(),
  primary_color: string().required(),
});

const state = ref<InferType<typeof schema>>({
  name: "",
  slogan: "",
  prefferred_currency: "",
  primary_color: "#FFFFF",
});

const { data: restaurant, status } = useAsyncData("restaurant", async () => {
  try {
    const { data } = await client
      .from("restaurants")
      .select()
      .eq("user_id", user.value?.id ?? "");

    if (!data?.length) {
      return {
        name: "",
        slogan: "",
        currency: "",
      };
    } else {
      Object.assign(state.value, data[0]);
    }

    return data;
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al leer.",
      color: "red",
    });
  }
});

const onFormSubmit = async (
  event: FormSubmitEvent<InferType<typeof schema>>
) => {
  const {
    name,
    slogan,
    prefferred_currency: currency,
    primary_color,
  } = event.data;

  try {
    const { error } = await client.from("restaurants").upsert(
      { name, slogan, currency },
      {
        onConflict: "id",
      }
    );

    if (error) {
      console.log("🚀 ~ onFormSubmit ~ error:", error);
      throw new Error();
    }

    toast.add({
      title: "Guardado.",
      description: "Se ha guardado la información correctamente.",
      color: "green",
    });
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al guardar.",
      color: "red",
    });
  }
};
</script>

<style scoped></style>
