// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  app: {
    head: {
      title: "Al Baseer",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: "Al Baseer",
        }
      ],
    }
  },
  ssr: false,
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    // '@nuxtjs/eslint-module'
  ],
  colorMode: {
    classSuffix: '',
  },
  css: [
    '~/assets/css/main.css'
  ],
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
})
