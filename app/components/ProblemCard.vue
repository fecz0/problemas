<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  status?: 'Kutatás' | 'Javaslat' | 'Megvalósítás'
}>()

const statusColors: Record<'Kutatás' | 'Javaslat' | 'Megvalósítás', 'warning' | 'info' | 'success'> = {
  'Kutatás': 'warning',
  'Javaslat': 'info',
  'Megvalósítás': 'success',
}
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
