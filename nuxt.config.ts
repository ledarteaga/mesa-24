// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  css: ["./assets/css/main.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  image: {
    quality: 10,
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/rest/*", "/confirm"],
    },
  },
  ssr: false,
});
