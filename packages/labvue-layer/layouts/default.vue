<template>
    <LayoutsDefault :links="links">
        <NuxtPage />
    </LayoutsDefault>
</template>
    
<script lang="ts" setup>
const links = [
    {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "Dashboard",
        divider: true
    },
]
</script>