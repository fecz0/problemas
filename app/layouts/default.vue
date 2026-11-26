<script setup lang="ts">
const navigation = [
  { label: 'Rólam', to: '/rolam' },
  { label: 'Gondolatok', to: '/#gondolatok', exactHash: true },
  { label: 'Kapcsolat', to: '/#kapcsolat', exactHash: true },
]
</script>

<template>
  <a class="skip-link" href="#tartalom">Ugrás a tartalomra</a>

  <UHeader title="problemas.hu" to="/">
    <template #title>
      <span class="editorial-wordmark">problemas<span>.</span>hu</span>
    </template>

    <!-- Desktop navigation in default slot (center) - hidden on mobile -->
    <UNavigationMenu :items="navigation" variant="link" class="hidden lg:flex" />

    <template #right>
      <UColorModeButton />
    </template>

    <!-- Mobile navigation menu (shown when hamburger is clicked) -->
    <template #body>
      <UNavigationMenu
        :items="navigation"
        variant="link"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>

  <UMain id="tartalom" tabindex="-1">
    <UContainer>
      <slot />
    </UContainer>
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        &copy; {{ new Date().getFullYear() }} Mile Ferenc
      </p>
    </template>
  </UFooter>
</template>
