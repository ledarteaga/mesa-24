<template>
  <section class="h-full flex flex-col gap-5 px-5 py-8 xl:w-3/4 xl:mx-auto">
    <UForm
      @submit="SaveValues"
      :state
      :schema
      class="flex flex-col gap-4 grow w-full px-5"
    >
      <div class="block mb-3">
        <GeneralSectionHeader>
          <template #title> Branding </template>
          <template #subtitle>
            Personaliza los elementos de tu marca.
          </template>
        </GeneralSectionHeader>
      </div>
      <div class="flex flex-col sm:flex-row w-full gap-12">
        <UFormField label="Logo" class="grow">
          <GeneralImageUploader
            @delete="onImageDelete('logo')"
            :upload-promise="onLogoUpload"
            bucket-name="branding"
            :file-path="state.logo || ''"
          >
            <template #placeholder>Resolución recomendada: 50x50</template>
          </GeneralImageUploader>
        </UFormField>

        <UFormField label="Fondo" class="grow">
          <GeneralImageUploader
            @delete="onImageDelete('backdrop')"
            :upload-promise="onBackdropUpload"
            bucket-name="branding"
            :file-path="state.backdrop || ''"
          >
            <template #placeholder>Resolución recomendada: 1320x800</template>
          </GeneralImageUploader>
        </UFormField>
      </div>
      <UFormField name="name" label="Nombre">
        <UInput v-model="state.name" placeholder="Nombre" class="w-full" />
      </UFormField>

      <UFormField name="url_name" label="URL">
        <UInput
          v-model="state.url_name"
          class="w-full"
          :ui="<any>{
            base: 'pl-38.5',
          } "
        >
          <template #leading>
            <p class="text-sm text-(--ui-text-muted)">www.menuo.com/rest/</p>
          </template>
        </UInput>
      </UFormField>

      <UFormField name="slogan" label="Slogan">
        <UInput v-model="state.slogan" placeholder="Slogan" class="w-full">
        </UInput>
      </UFormField>

      <UFormField name="address" label="Dirección">
        <UInput v-model="state.address" class="w-full"> </UInput>
      </UFormField>

      <USeparator></USeparator>

      <div class="block my-3">
        <GeneralSectionHeader>
          <template #title> Redes </template>
          <template #subtitle> Configura tus redes sociales. </template>
        </GeneralSectionHeader>
      </div>

      <UFormField name="instagram_url" label="Instagram">
        <UInput
          v-model="state.instagram_user"
          leadin
          class="w-full"
          :ui="<any>{
            base: 'pl-36.5',
          } "
        >
          <template #leading>
            <p class="text-sm text-(--ui-text-muted)">www.instagram.com/</p>
          </template>
        </UInput>
      </UFormField>

      <UFormField name="facebook_user" label="Facebook">
        <UInput
          v-model="state.facebook_user"
          leadin
          class="w-full"
          :ui="<any>{
            base: 'pl-35.5',
          } "
        >
          <template #leading>
            <p class="text-sm text-(--ui-text-muted)">www.facebook.com/</p>
          </template>
        </UInput>
      </UFormField>

      <div class="gap-5 flex items-center w-full">
        <UFormField name="phone_number" label="Telefono" class="grow">
          <UInput
            v-model="state.phone_number"
            placeholder="Telefono"
            class="w-full"
          />
        </UFormField>
        <UFormField name="whatsapp" class="mt-6">
          <UCheckbox :label="'WhatsApp'" v-model="state.whatsapp" />
        </UFormField>
      </div>

      <USeparator></USeparator>

      <div class="block my-3">
        <GeneralSectionHeader>
          <template #title> Preferencias </template>
          <template #subtitle> Configura tus preferencias. </template>
        </GeneralSectionHeader>
      </div>

      <UFormField name="prefferred_currency" label="Moneda">
        <USelect
          v-model="state.preffered_currency"
          :items="currencies"
          placeholder="Moneda"
          class="w-full"
        />
      </UFormField>

      <UFormField name="primary_color" label="Color principal">
        <UInput
          v-model="state.primary_color"
          placeholder="Color"
          class="w-full mb-3.5"
          disabled
        />

        <UColorPicker v-model="state.primary_color"> </UColorPicker>
      </UFormField>

      <div class="flex justify-center gap-5 my-3">
        <UButton size="lg" label="Guardar" type="submit" />

        <UButton
          :disabled="!restaurant?.id"
          variant="outline"
          :to="'/rest/' + state.url_name"
          size="lg"
          label="Previsualizar"
        />
      </div>
    </UForm>
  </section>
</template>

<script setup lang="ts">
import { boolean, number, object, string, type InferType } from "yup";

const client = useSupabaseClient();
const toast = useToast();
const user = useSupabaseUser();

const route = useRoute();

const currencies = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "PEN", value: "PEN" },
  { label: "MXN", value: "MXN" },
  { label: "CLP", value: "CLP" },
];

const schema = object({
  name: string().required(),
  slogan: string().required(),
  preffered_currency: string().required(),
  primary_color: string().required(),
  id: number().required(),
  instagram_user: string().nullable(),
  facebook_user: string().nullable(),
  logo: string(),
  backdrop: string(),
  user_id: string(),
  phone_number: string().matches(
    /^(\+\d{1,2}\s?)?1?\-?\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$|^(\d{9})$/
  ),
  whatsapp: boolean(),
  url_name: string()
    .trim()
    .matches(/^[^\s]+$/, "No se permiten espacios en blanco"),
  address: string(),
});

const state = reactive<InferType<typeof schema>>({
  name: "",
  slogan: "",
  preffered_currency: "",
  primary_color: "#FFFFFF",
  instagram_user: "",
  facebook_user: "",
  id: 0,
  logo: "",
  backdrop: "",
  url_name: "",
  address: "",
  phone_number: "",
  whatsapp: false,
});

const {
  data: restaurant,
  status,
  refresh,
} = useAsyncData("restaurants", async () => {
  try {
    const { data } = await client
      .from("restaurants")
      .select()
      .eq("user_id", user.value?.id ?? "")
      .limit(1);

    if (!data?.length) {
      return {
        name: "",
        slogan: "",
        currency: "",
        primary_color: "#FFFFFF",
        id: 0,
        preffered_currency: "USD",
        instagram_user: "",
        facebook_user: "",
        logo: "",
        backdrop: "",
      };
    } else {
      Object.assign(state, data[0]);
    }

    return data[0];
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al leer.",
    });
  }
});

const onImageDelete = async (target: "logo" | "backdrop") => {
  if (target === "backdrop") {
    state.backdrop = "";
  } else if (target === "logo") {
    state.logo = "";
  }

  SaveValues();
};

const onLogoUpload = async (file: File) => {
  return onImageUpload(file, "logo");
};

const onBackdropUpload = async (file: File) => {
  return onImageUpload(file, "backdrop");
};

const onImageUpload = async (file: File, target: "logo" | "backdrop") => {
  try {
    const { error, data } = await client.storage
      .from("branding")
      .upload(file.name, file);

    if (error) {
      throw new Error();
    }

    if (target === "backdrop") {
      state.backdrop = data?.path;
    } else if (target === "logo") {
      state.logo = data?.path;
    }

    SaveValues();

    return true;
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al guardar.",
    });

    return false;
  }
};

const SaveValues = async () => {
  try {
    const { error } = await client.from("restaurants").upsert(
      {
        id: state.id,
        name: state.name,
        slogan: state.slogan,
        preffered_currency: state.preffered_currency,
        primary_color: state.primary_color,
        instagram_user: state.instagram_user,
        facebook_user: state.facebook_user,
        logo: state.logo,
        backdrop: state.backdrop,
        url_name: state.url_name,
        phone_number: state.phone_number,
        whatsapp: state.whatsapp,
        address: state.address,
      },
      {
        onConflict: "id",
      }
    );

    if (error) {
      console.log("🚀 ~ onFormSubmit ~ error:", error);
      throw new Error();
    }

    refresh();

    toast.add({
      title: "Guardado.",
      description: "Se ha guardado la información correctamente.",
    });
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Error al guardar.",
    });
  }
};
</script>
