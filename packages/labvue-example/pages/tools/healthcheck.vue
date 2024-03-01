<template>
    <DataResourceList name="healthcheck" :resource="items" :loading="false">
        <template v-slot:card="{ resource }">
            <v-card>
                <v-card-title>{{ resource.raw.name }}</v-card-title>
                <v-card-text>{{ resource.raw.url || resource.raw.ip }}</v-card-text>
            </v-card>
        </template>
    </DataResourceList>
</template>

<script setup lang="ts">
interface Healthcheck {
    name: string,
    url?: string,
    ip?: string
}

const items: Healthcheck[] = [
    { ip: '10.0.100.1', name: 'router' },
    { url: 'https://yacht.sh', name: 'Yacht Homepage' },
    { url: 'https://google.com', name: 'Google' },
    { ip: '1.1.1.1', name: 'cloudflare' }
]
</script>