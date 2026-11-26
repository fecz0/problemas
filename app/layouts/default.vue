<script setup lang="ts">
const navigation = [
  { label: 'Rólam', to: '/rolam' },
  { label: 'Szemléletem', to: '/szemleletem' },
  { label: 'Írások', to: '/#gondolatok', exactHash: true },
  { label: 'Kapcsolat', to: '/#kapcsolat', exactHash: true },
]
const { profiles } = useAppConfig()
const route = useRoute()
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

  <footer class="editorial-footer">
    <UContainer>
      <div>
        <p>&copy; {{ new Date().getFullYear() }} Mile Ferenc</p>
        <p>Az oldalon megjelenő gondolatok a saját szakmai véleményemet tükrözik.</p>
        <!-- The home page lists them right above, under contact -->
        <ul v-if="route.path !== '/'" aria-label="Profilok">
          <li v-for="link in profiles" :key="link.url">
            <NuxtLink :to="link.url" external>{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </UContainer>
  </footer>
</template>
