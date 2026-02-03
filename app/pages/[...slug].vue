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

// Dynamic SEO meta tags
const pageTitle = computed(() => page.value?.title ? `${page.value.title} | problemas.hu` : 'problemas.hu')
const pageDescription = computed(() => page.value?.tldr || 'Társadalmi problémák elemzése és fokozatos megoldási javaslatok')
const pageUrl = computed(() => `https://problemas.hu${route.path}`)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl,
  ogType: 'article',
  ogLocale: 'hu_HU',
  ogSiteName: 'problemas.hu',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useHead({
  link: [
    { rel: 'canonical', href: pageUrl.value },
  ],
})
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
