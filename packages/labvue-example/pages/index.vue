<script setup lang="ts">
const route = useRoute()
definePageMeta({
  name: 'Welcome',
  layout: 'default',
})
</script>

<template>
  <v-card>
    <v-card-title>Nuxt Routing set up successfully!</v-card-title>
    <v-card-subtitle>Current route: {{ route.path }}</v-card-subtitle>
    <v-card-text>
      <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt
        Routing</a>
    </v-card-text>
  </v-card>
</template>
