<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  status?: 'Kutatás' | 'Javaslat' | 'Megvalósítás'
}>()

const statusColors = {
  'Kutatás': 'amber',
  'Javaslat': 'blue',
  'Megvalósítás': 'green',
} as const
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
        :color="statusColors[status]"
        variant="subtle"
      >
        {{ status }}
      </UBadge>
    </template>
  </UPageCard>
</template>
