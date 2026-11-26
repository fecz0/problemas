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
    dateModified: page.value.updated,
  })
}
</script>

<template>
  <UPage v-if="page" class="editorial-page">
    <UPageHeader :title="page.title">
      <template v-if="page.date" #headline>
        <div class="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <NuxtLink class="editorial-label underline underline-offset-4" to="/rolam">{{ AUTHOR_NAME }}</NuxtLink>
          <time class="editorial-label" :datetime="page.date">{{ formatDate(page.date) }}</time>
          <span v-if="page.updated" class="editorial-label">
            Frissítve: <time :datetime="page.updated">{{ formatDate(page.updated) }}</time>
          </span>
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
