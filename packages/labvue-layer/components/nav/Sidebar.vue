<script setup lang="ts">
import { useDisplay, useTheme } from 'vuetify'

defineProps(['links'])
// Sidebar Settings
// const sidebarVisible = ref(true)
// const expanded = ref<{ [key: string]: unknown }>({})

// Size
type sidebarMode = 'auto' | 'mini' | 'full'
const sidebarButtonHovered: Ref<boolean> = ref(false)
const mode: Ref<sidebarMode> = ref('auto')
const modes: ComputedRef<{ current: sidebarMode, next: sidebarMode }> = computed(() => {
  switch (mode.value) {
    case 'auto':
      return { current: 'auto', next: 'full' }
    case 'full':
      return { current: 'full', next: 'mini' }
    case 'mini':
      return { current: 'mini', next: 'auto' }
  }
})
const modeIcons = {
  auto: 'mdi-lock-open',
  mini: 'mdi-arrow-collapse-left',
  full: 'mdi-lock',
}

// Theme
const theme = useTheme()
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

// Sidebar Links
const { smAndDown } = useDisplay()
</script>

<template>
  <v-navigation-drawer
    v-if="!smAndDown" height="100vh" elevation="10" permanent :expand-on-hover="mode !== 'mini'"
    :rail="mode !== 'full'"
  >
    <!-- <v-img max-height="100" class="mx-2 mt-2" src="~/assets/icons/yacht/mini.svg"
      :style="theme.global.current.value.dark ? 'filter: brightness(5)' : 'filter: brightness(1)'" /> -->
    <v-btn
      class="my-2 mx-2" :icon="sidebarButtonHovered ? modeIcons[modes.next] : mode !== 'auto' ? 'mdi-lock' : modeIcons[modes.current]" density="comfortable"
      @mouseenter="sidebarButtonHovered = true"
      @mouseleave="sidebarButtonHovered = false" @click="mode = modes.next"
    />

    <v-btn
      class="my-2 mx-2" density="comfortable"
      :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'" @click="toggleTheme()"
    />

    <v-divider />
    <v-list nav dense>
      <div v-for="(link, i) in links" :key="i">
        <v-list-item v-if="!link.subLinks" :to="link.to" :title="link.text" :prepend-icon="link.icon" class="mt-1" />

        <v-list-group v-else :key="link.text" fluid subgroup :prepend-icon="link.icon">
          <template #activator="{ props, isOpen }">
            <v-list-item
              v-bind="props" :title="link.text" :prepend-icon="link.icon"
              :append-icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </template>

          <v-list-item
            v-for="sublink in link.subLinks " :key="sublink.text" :to="sublink.to" :title="sublink.text"
            :prepend-icon="sublink.icon" exact class="mb-1"
          />
        </v-list-group>
        <v-divider />
      </div>
    </v-list>

    <template #append>
      <div>
        <v-btn size="large" variant="text" icon="mdi-file-document" target="_blank" href="https://yacht.sh" />
        <v-btn
          size="large" variant="text" icon="mdi-github" target="_blank"
          href="https://github.com/SelfhostedPro/Yacht"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>
