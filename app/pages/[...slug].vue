<script setup lang="ts">
const route = useRoute()

// Normalize path by removing trailing slash for content lookup
const normalizedPath = computed(() => route.path.replace(/\/$/, '') || '/')

const { data: page } = await useAsyncData(computed(() => 'page-' + normalizedPath.value), () => {
  return queryCollection('content').path(normalizedPath.value).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const publishedOn = computed(() => page.value?.date
  ? new Intl.DateTimeFormat('hu-HU', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(page.value.date))
  : undefined)

if (page.value) {
  const path = normalizedPath.value
  const kind = path === '/rolam' ? 'profile' : path.startsWith('/problemak/') ? 'article' : 'page'
  const title = page.value.seo?.title || page.value.title

  usePageSeo({
    kind,
    path,
    title: [title, title.includes(AUTHOR_NAME) ? undefined : AUTHOR_NAME, 'problemas.hu'].filter(Boolean).join(' | '),
    heading: page.value.title,
    description: page.value.tldr || page.value.seo?.description || page.value.description,
    datePublished: page.value.date,
  })
}
</script>

<template>
  <UPage v-if="page" class="editorial-page">
    <UPageHeader :title="page.title">
      <template v-if="publishedOn || page.status" #headline>
        <div class="flex items-center gap-3 flex-wrap">
          <time v-if="publishedOn" class="editorial-label" :datetime="page.date">{{ publishedOn }}</time>
          <UBadge
            v-if="page.status"
            color="primary"
            variant="outline"
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

      <dl v-if="page.caseStudy" class="editorial-case">
        <dt>Helyzet</dt>
        <dd>{{ page.caseStudy.context }}</dd>
        <dt>Szerepem</dt>
        <dd>{{ page.caseStudy.role }}</dd>
        <dt>Eredmény</dt>
        <dd>{{ page.caseStudy.outcome }}</dd>
      </dl>

      <DiscussionLinks
        :linkedin="page.linkedin"
        :bluesky="page.bluesky"
      />
    </UPageBody>
  </UPage>
</template>
