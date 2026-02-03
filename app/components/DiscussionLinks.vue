<script setup lang="ts">
defineProps<{
  linkedin?: string
  bluesky?: string
}>()
</script>

<template>
  <div
    v-if="linkedin || bluesky"
    class="mt-12"
  >
    <USeparator class="mb-8" />
    <h2 class="text-lg font-semibold text-highlighted mb-4">Vitassuk meg</h2>
    <div class="flex flex-wrap gap-3">
      <UButton
        v-if="linkedin"
        :to="linkedin"
        target="_blank"
        rel="noopener noreferrer"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-linkedin"
      >
        LinkedIn
      </UButton>
      <UButton
        v-if="bluesky"
        :to="bluesky"
        target="_blank"
        rel="noopener noreferrer"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-bluesky"
      >
        Bluesky
      </UButton>
    </div>
  </div>
</template>
