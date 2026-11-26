<script setup lang="ts">
import { hu } from '@nuxt/ui/locale'
</script>

<template>
  <UApp :locale="hu">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>