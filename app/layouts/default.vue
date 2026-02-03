<script setup lang="ts">
const navigation = [
  { label: 'Problémák', icon: 'i-heroicons-document-magnifying-glass', to: '/' },
  { label: 'Szemléletem', icon: 'i-heroicons-light-bulb', to: '/szemleletem' },
  { label: 'Rólam', icon: 'i-heroicons-user', to: '/rolam' },
]
</script>

<template>
  <UHeader title="problemas.hu" to="/">
    <template #title>
      <img src="/problemas-logo.png" alt="problemas.hu logo" class="h-6 w-auto" />
      <span>problemas.hu</span>
    </template>

    <!-- Desktop navigation in default slot (center) - hidden on mobile -->
    <UNavigationMenu :items="navigation" class="hidden lg:flex" />

    <template #right>
      <UColorModeButton />
    </template>

    <!-- Mobile navigation menu (shown when hamburger is clicked) -->
    <template #body>
      <UNavigationMenu
        :items="navigation"
        orientation="vertical"
        class="-mx-2.5"
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
