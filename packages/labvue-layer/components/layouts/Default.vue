<template>
    <v-app>
        <slot name="nav">
            <nav-sidebar :links="links" />
            <nav-app-bar :links="links" />
        </slot>
        <v-main>
            <v-container class="px-10" fluid>
                <NuxtLoadingIndicator />
                <h2 class="text-h2 my-5 mx-10">{{ route.meta.name }}</h2>
                <slot />
            </v-container>
        </v-main>
        <!-- <NotificationsSonner />
      <NotificationsProgress /> -->
    </v-app>
</template>
    
<script lang="ts" setup>
const route = useRoute()
const { links } = defineProps<Props>()
interface Props {
    links: Link[]
}
interface Link {
    to?: string,
    icon: string,
    text: string,
    subLinks?: Link[],
    divider?: boolean
}
</script>