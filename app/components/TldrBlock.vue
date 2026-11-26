<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <UAlert
    title="TL;DR"
    :description="text"
    icon="i-lucide-lightbulb"
    color="primary"
    variant="outline"
    :ui="{ title: 'text-highlighted', description: 'text-muted opacity-100 leading-relaxed' }"
    class="mb-8"
  />
</template>
