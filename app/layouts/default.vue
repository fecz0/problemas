<script setup lang="ts">
const navigation = [
  { label: 'Problémák', icon: 'i-heroicons-document-magnifying-glass', to: '/' },
  { label: 'Szemléletem', icon: 'i-heroicons-light-bulb', to: '/szemleletem' },
  { label: 'Rólam', icon: 'i-heroicons-user', to: '/rolam' },
]
</script>

<template>
  <UHeader title="problemas.hu" to="/">
    <template #right>
      <UNavigationMenu :items="navigation" />
      <UColorModeButton />
    </template>

    <template #content>
      <UNavigationMenu
        :items="navigation"
        orientation="vertical"
      />
    </template>
  </UHeader>

  <UMain>
    <UContainer>
      <slot />
    </UContainer>
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-sm text-dimmed">
        &copy; {{ new Date().getFullYear() }} problemas.hu
      </p>
    </template>
    <template #right>
      <UColorModeButton />
    </template>
  </UFooter>
</template>
