<script setup lang="ts">
const { profiles } = useAppConfig()
</script>

<template>
  <ul class="editorial-contacts">
    <li v-for="link in profiles" :key="link.url">
      <NuxtLink class="editorial-link" :to="link.url" external>
        {{ link.label }} <span aria-hidden="true">↗</span>
      </NuxtLink>
    </li>
  </ul>
</template>
