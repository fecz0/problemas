<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const statusColors = {
  'Kutatás': 'amber',
  'Javaslat': 'blue',
  'Megvalósítás': 'green',
} as const
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
    >
      <template #title>
        <div class="flex items-center gap-3 flex-wrap">
          <span>{{ page.title }}</span>
          <UBadge
            v-if="page.status"
            :color="statusColors[page.status as keyof typeof statusColors]"
            variant="subtle"
            size="lg"
          >
            {{ page.status }}
          </UBadge>
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <TldrBlock
        v-if="page.tldr"
        :text="page.tldr"
      />

      <div class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="page" />
      </div>

      <DiscussionLinks
        :linkedin="page.linkedin"
        :bluesky="page.bluesky"
      />
    </UPageBody>
  </UPage>
</template>
