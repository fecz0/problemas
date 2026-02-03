<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
}>()

const isExternal = computed(() => {
  if (!props.href) return false
  return props.href.startsWith('http://') || props.href.startsWith('https://')
})

const linkTarget = computed(() => {
  if (props.target) return props.target
  return isExternal.value ? '_blank' : undefined
})

const linkRel = computed(() => {
  return isExternal.value ? 'noopener noreferrer' : undefined
})
</script>

<template>
  <NuxtLink
    :href="href"
    :target="linkTarget"
    :rel="linkRel"
  >
    <slot />
  </NuxtLink>
</template>
