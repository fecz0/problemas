<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <UAlert
    title="TL;DR"
    :description="text"
    icon="i-heroicons-light-bulb"
    color="info"
    variant="subtle"
    class="mb-8"
  />
</template>
