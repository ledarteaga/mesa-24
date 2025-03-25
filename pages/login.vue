<template>
  <div class="h-full flex items-center justify-center">
    <UCard class="w-3/4 sm:w-1/3">
      <template #header>
        <GeneralLogo :collapsed="false" />
      </template>

      <div class="flex flex-col align-middle gap-5 px-4">
        <UInput v-model="user" placeholder="Correo" />
        <UInput v-model="password" type="password" placeholder="Contraseña" />
        <UInput
          v-if="isRegistering"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirmar Contraseña"
        />
        <UButton
          @click="onLoginClick"
          class="flex justify-center"
          label="Ingresar"
        />
        <UButton
          @click="onRegisterClick"
          variant="outline"
          class="flex justify-center"
          label="Registar"
        />
      </div>

      <template #footer>
        <div class="flex gap-4">
          <UButton
            @click="onGoogleSignIn"
            color="error"
            class="grow flex justify-center"
            icon="i-prime:google"
            label="Ingresar con Google"
          ></UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const user = ref("");
const password = ref("");
const confirmPassword = ref("");
const isRegistering = ref(false);
const supabase = useSupabaseClient();
const toast = useToast();

const onLoginClick = async () => {
  if (isRegistering.value) {
    isRegistering.value = false;
  }

  if (password.value.length < 1 || user.value.length < 0) {
    toast.add({
      title: "Error",
      description: "Complete el correo y la contraseña",
      color: "error",
    });

    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.value,
      password: password.value,
    });
    console.log("🚀 ~ onLoginClick ~ error:", error);

    if (error === null) {
      navigateTo("/");
    } else {
      throw new Error(error.message);
    }
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error,
      color: "error",
    });
  }
  return;
};

const onRegisterClick = async () => {
  if (!isRegistering.value) {
    isRegistering.value = true;

    return;
  }

  if (password.value !== confirmPassword.value) {
    toast.add({
      title: "Error",
      description: "Las contraseñas no coinciden",
      color: "error",
    });

    return;
  } else if (password.value.length < 1 || confirmPassword.value.length < 0) {
    toast.add({
      title: "Error",
      description: "La contraseña debe tener al menos 6 caracteres",
      color: "error",
    });

    return;
  }

  try {
    const { data } = await supabase.auth.signUp({
      email: user.value,
      password: password.value,
    });

    if (data.user) {
      navigateTo("/settings");
    } else {
      throw new Error("Error al registrar el usuario");
    }
  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.message,
      color: "error",
    });
  }
};

const onFacebookSignIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });

  if (error) {
    toast.add({
      title: "Error",
      description: error.message,
      color: "error",
    });

    return;
  }

  navigateTo("/");
};

const onGoogleSignIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: window.location.origin + "/confirm",
    },
  });
};
</script>
