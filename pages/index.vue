<template>
  <section class="h-full flex flex-col justify-center px-20">
    <h1 class="text-3xl sm:text-4xl font-bold">
      Bienvenido de nuevo... {{ user?.user_metadata.full_name }} 👋
    </h1>

    <div class="flex-col lg:flex-row flex w-full justify-between gap-8 mt-10">
      <NuxtLink to="/menu" class="grow">
        <HomeLinkButton
          gradientClass="bg-gradient-to-r from-fuchsia-600 to-pink-600"
          icon="i-material-symbols:lists-rounded"
          >Menu</HomeLinkButton
        >
      </NuxtLink>

      <NuxtLink to="/settings" class="grow">
        <HomeLinkButton
          gradientClass="bg-gradient-to-r from-purple-500 to-purple-900"
          icon="i-material-symbols:settings-rounded"
          >Ajustes</HomeLinkButton
        >
      </NuxtLink>

      <NuxtLink to="/login" class="grow">
        <HomeLinkButton
          @click="logout"
          to="/login"
          gradientClass="bg-gradient-to-r from-fuchsia-600 to-pink-600"
          icon="i-mdi-account"
          >Cerrar sesión</HomeLinkButton
        >
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const logout = async () => {
  await supabase.auth.signOut();
};

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem("oauth_provider_token", session.provider_token);
  }
  if (session && session.provider_refresh_token) {
    window.localStorage.setItem(
      "oauth_provider_refresh_token",
      session.provider_refresh_token
    );
  }
  if (event === "SIGNED_OUT") {
    window.localStorage.removeItem("oauth_provider_token");
    window.localStorage.removeItem("oauth_provider_refresh_token");
  }
});
</script>
