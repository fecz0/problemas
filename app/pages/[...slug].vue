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

// Dynamic SEO meta tags
const isProfile = computed(() => normalizedPath.value === '/rolam')
const { linkedinUrl } = useRuntimeConfig().public
const pageTitle = computed(() => {
  const title = page.value?.title
  return [title, isProfile.value ? undefined : 'Mile Ferenc', 'problemas.hu'].filter(Boolean).join(' | ')
})
const pageDescription = computed(() => page.value?.tldr || page.value?.description || 'Társadalmi problémák elemzése és fokozatos megoldási javaslatok')
// Canonical URL with trailing slash (matching site.trailingSlash: true)
const pageUrl = computed(() => {
  const path = normalizedPath.value
  return `https://problemas.hu${path}${path === '/' ? '' : '/'}`
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl,
  ogType: () => isProfile.value ? 'profile' : 'article',
  ogLocale: 'hu_HU',
  ogSiteName: 'problemas.hu',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useHead(() => ({
  link: [{ rel: 'canonical', href: pageUrl.value }],
  script: isProfile.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          'url': pageUrl.value,
          'mainEntity': {
            '@type': 'Person',
            '@id': `${pageUrl.value}#mile-ferenc`,
            'name': page.value?.title,
            'description': page.value?.description,
            'url': pageUrl.value,
            'sameAs': linkedinUrl ? [linkedinUrl] : undefined,
          },
        }).replace(/</g, '\\u003c'),
      }]
    : [],
}))
</script>

<template>
  <UPage v-if="page" :class="{ 'editorial-profile': isProfile }">
    <UPageHeader
      :title="page.title"
    >
      <template #title>
        <div class="flex items-center gap-3 flex-wrap">
          <span>{{ page.title }}</span>
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
