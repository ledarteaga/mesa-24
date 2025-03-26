<template>
  <div class="flex flex-col gap-5 mx-2 sm:mx-10">
    <div class="flex justify-center">
      <UButton
        label="Nuestra carta"
        icon="i-prime:book"
        size="lg"
        @click="$emit('menu')"
      />
    </div>

    <USeparator label="Nuestros enlaces" />

    <ClientLinkRow
      v-if="data?.phone_number"
      :icon="data?.whatsapp ? 'i-prime:whatsapp' : 'i-prime-phone'"
      :link="
        data?.whatsapp
          ? 'https://wa.me/' +
            data?.phone_number +
            '/?text=' +
            encodedWhatsappMessage
          : 'tel:' + data?.phone_number
      "
    >
      {{ data?.whatsapp ? "Escribenos por WhatsApp" : "Llamanos" }}
    </ClientLinkRow>
    <ClientLinkRow
      v-if="data?.instagram_user"
      icon="i-prime:instagram"
      :link="'https://instagram.com/' + data?.instagram_user"
    >
      Siguenos en Instagram
    </ClientLinkRow>
    <ClientLinkRow
      v-if="data?.facebook_user"
      icon="i-prime:facebook"
      :link="'https://facebook.com/' + data?.facebook_user"
    >
      Encuentranos en Facebook
    </ClientLinkRow>
  </div>
</template>

<script setup lang="ts">
const encodedWhatsappMessage = encodeURIComponent(
  "Hola, vengo de menuo y quería saber más información de tus productos."
);

defineProps<{
  data: {
    address: string | null;
    backdrop: string | null;
    facebook_user: string | null;
    id: number | null;
    instagram_user: string | null;
    logo: string | null;
    name: string | null;
    phone_number: string | null;
    preffered_currency: string | null;
    primary_color: string | null;
    slogan: string | null;
    url_name: string | null;
    whatsapp: boolean | null;
  } | null;
}>();
</script>
