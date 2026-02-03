<script setup lang="ts">
const props = defineProps<{
  number: string | number
  title: string
}>()

const isStepZero = computed(() => String(props.number) === '0')
</script>

<template>
  <div class="flex gap-4">
    <UAvatar
      :text="String(number)"
      size="md"
      :color="isStepZero ? 'neutral' : 'primary'"
    />
    <div class="flex-1 pt-0.5">
      <h3 class="font-semibold text-highlighted mb-2">{{ title }}</h3>
      <div class="text-muted prose dark:prose-invert prose-sm max-w-none">
        <slot />
      </div>
    </div>
  </div>
</template>
