<script setup lang="ts">
import type { PingResponse } from 'ping'

interface HealthcheckResponse {
    [host: string]: PingResponse & { name: string, status: string, error?: any }
}

const pingInterval = ref(10)
const intervalOptions = [1, 5, 10, 30, 60, 120]
const healthcheckHosts = ref<HealthcheckResponse>({})
const connected = ref(false)
const { execute, data, pending, refresh } = useAsyncData('healthcheck-sse',
    async () => {
        const abort = new AbortController()
        const sse = useClientSSE(`/api/tools/healthcheck?interval=${pingInterval.value}`, {
            async onopen(response) {
                if (response.ok) {
                    console.log('Connected to progress SSE')
                } else {
                    console.log('Failed to connect to notifications SSE')
                    //   useToast({ title: 'Error', level: 'error', message: `Failed to connect to progress SSE: ${response.statusText}` })
                    connected.value = false
                }
            },
            async onmessage(ev) {
                const _healthcheckReponse = JSON.parse(ev.data) as PingResponse & { name: string, status: string, error?: any }
                healthcheckHosts.value[_healthcheckReponse.name] = _healthcheckReponse
            },
            signal: abort.signal,
            openWhenHidden: true,
        })
        return { sse, abort }
    }, { watch: [pingInterval], lazy: true, immediate: false }
)

onMounted(async () => {
    if (!connected.value && !data.value) {
        await execute()
    }
})
</script>

<template>
    <DataResourceList name="healthcheck" :resource="Object.values(healthcheckHosts)"
        :loading="Object.values(healthcheckHosts).length === 0 && pending">
        <template #buttons>
            <v-select density="comfortable" label="refresh" :eager="true" :hide-spin-buttons="true" :hide-details="true"
                :loading="pending" v-model="pingInterval" name="refresh" :items="intervalOptions">
            </v-select>
        </template>
        <template
            #card="{ resource: { raw: resource } }: { resource: { raw: PingResponse & { name: string, status: string, error?: any } } }">
            <v-card>
                <v-card-item>
                    <template #title>
                        <v-card-title>
                            <v-avatar size="6" :color="resource.alive ? 'success' : 'red'" />
                            {{ resource.name }}
                        </v-card-title>
                    </template>
                    <template #subtitle>
                        <v-card-subtitle>
                            <v-row>
                                <v-col cols="6">{{ resource.numeric_host }}</v-col>
                                <v-col cols="6"> loss: {{ resource.packetLoss }}</v-col>
                                <v-col cols="6">avg: {{ resource.min }}</v-col>
                                <v-col v-if="resource.error" cols="6">error: {{ resource.error }}</v-col>
                            </v-row>
                        </v-card-subtitle>
                    </template>
                </v-card-item>
            </v-card>
        </template>
    </DataResourceList>
</template>
