<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  status?: 'Kutatás' | 'Javaslat' | 'Megvalósítás'
}>()
</script>

<template>
  <UPageCard
    :title="title"
    :description="description"
    :to="to"
    icon="i-heroicons-document-text"
    spotlight
    highlight
  >
    <template #footer>
      <UBadge
        v-if="status"
        color="primary"
        variant="outline"
      >
        {{ status }}
      </UBadge>
    </template>
  </UPageCard>
</template>
