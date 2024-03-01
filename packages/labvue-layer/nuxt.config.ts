// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module"],
  nitro: {
    storage: {
      base: {
        driver: 'fsLite',
        base: process.env.CONFIG_PATH || '../config',
      }
    },
    devStorage: {
      base: {
        driver: 'fsLite',
        base: process.env.CONFIG_PATH || './config',
      }
    },
    runtimeConfig: {
      configPath: resolve(fileURLToPath(import.meta.url), '..', process.env.CONFIG_PATH || 'config')
    },
  },
  typescript: {
    typeCheck: true,
  }
})