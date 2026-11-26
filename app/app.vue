<script setup lang="ts">
import { en, hu } from '@nuxt/ui/locale'

const route = useRoute()
// The English profile gets its own header, footer and interface texts
const isEnglish = computed(() => /^\/en(\/|$)/.test(route.path))
</script>

<template>
  <UApp :locale="isEnglish ? en : hu">
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="isEnglish ? 'en' : 'default'">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>