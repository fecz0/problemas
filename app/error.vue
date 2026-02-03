<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })

useSeoMeta({
  title: `${props.error.statusCode} - Hiba | problemas.hu`,
  description: 'A keresett oldal nem található vagy hiba történt.',
})
</script>

<template>
  <UApp>
    <UMain class="min-h-screen flex items-center justify-center">
      <UContainer>
        <div class="text-center">
          <h1 class="text-6xl font-bold text-primary mb-4">
            {{ error.statusCode }}
          </h1>
          <p class="text-xl text-muted mb-8">
            {{ error.statusCode === 404 ? 'A keresett oldal nem található' : 'Hiba történt' }}
          </p>
          <UButton
            label="Vissza a főoldalra"
            color="primary"
            size="lg"
            @click="handleError"
          />
        </div>
      </UContainer>
    </UMain>
  </UApp>
</template>
