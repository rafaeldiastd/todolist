// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-lucide-icons', "@nuxtjs/supabase", "@pinia/nuxt", 'dayjs-nuxt'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      include: ['/dashboard'],
      exclude: ['/', '/login'],
      cookieRedirect: false,
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
