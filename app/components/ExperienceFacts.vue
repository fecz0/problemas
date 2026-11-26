<script setup lang="ts">
// Used on the home page and from Markdown (MDC), the facts live in content/data/experience.yml
const { data: experience } = await useAsyncData('experience', () => queryCollection('experience').first())
</script>

<template>
  <dl v-if="experience" class="editorial-facts">
    <div v-for="fact in experience.facts" :key="fact.period">
      <dt class="editorial-label">{{ fact.period }}</dt>
      <dd>{{ fact.text }}</dd>
    </div>
  </dl>
</template>
