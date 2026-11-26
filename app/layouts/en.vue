<template>
  <a class="skip-link" href="#tartalom">Skip to content</a>

  <UHeader title="problemas.hu" to="/" :toggle="false">
    <template #title>
      <span class="editorial-wordmark">problemas<span>.</span>hu</span>
    </template>

    <template #right>
      <NuxtLink class="editorial-link" to="/rolam" hreflang="hu" lang="hu">Magyarul</NuxtLink>
      <UColorModeButton />
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
        <p>The views expressed on this site are my own.</p>
      </div>
    </UContainer>
  </footer>
</template>
