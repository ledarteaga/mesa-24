<template>
  <div class="h-full flex xl:flex-row flex-col">
    <div
      class="grow backdrop relative flex flex-col justify-center items-center"
    >
      <transition name="fade" appear>
        <span
          class="z-10 px-10 flex flex-col gap-1 text-center items-center max-w-lg xl:max-w-3xl xl:items-start xl:text-left"
        >
          <GeneralLogo :collapsed="false" />
          <h1
            class="text-4xl lg:text-5xl xl:text-7xl font-bold mb-1 drop-shadow-2xl"
          >
            Tu restaurante en un
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-500/100"
              >solo click.</span
            >
          </h1>
          <p
            class="font-semibold drop-shadow-2xl text-sm lg:text-lg xl:text-xl"
          >
            Digitaliza tu carta, recibe pedidos por WhatsApp y convierte visitas
            en clientes.
            <span class="font-light">
              Todo en un enlace simple, bonito y fácil de compartir.
            </span>
          </p>
        </span>
      </transition>

      <img
        src="/public/assets/login-backdrop.webp"
        class="absolute w-full h-full object-cover opacity-55"
      ></img>
    </div>

    <div
      class="xl:w-1/3 xl:h-full lg:h-1/2 h-2/3 flex flex-col justify-center items-center relative"
    >
      <UCard class="w-2/3">
        <template #header>
          <h2 class="font-semibold text-lg">Iniciar Sesión</h2>
        </template>
        <form class="flex flex-col align-middle gap-5 px-4">
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
        </form>
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

      <span
        class="text-sm text-gray-400 mt-2 absolute bottom-10 left-0 right-0 text-center"
        >Made with ❤️ by
        <a target="_blank" href="https://larteaga.netlify.app/"
          ><b>Luis Arteaga</b></a
        ></span
      >
    </div>
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
