<script setup lang="ts">
const { data: page } = await useAsyncData('en', () => queryCollection('content').path('/en').first())

const profile = computed(() => page.value?.english)

if (page.value) {
  usePageSeo({
    kind: 'profile',
    path: '/en',
    language: 'en',
    title: `${page.value.seo?.title || page.value.title} | problemas.hu`,
    heading: page.value.title,
    description: page.value.seo?.description || page.value.description,
    knowsAbout: page.value.topics,
  })
}
</script>

<template>
  <div v-if="profile" class="editorial-home">
    <section class="editorial-hero" aria-labelledby="name">
      <h1 id="name">{{ profile.hero.name }}<span class="hero-dot" aria-hidden="true">.</span></h1>
      <p class="editorial-label">{{ profile.hero.tagline }}</p>
      <h2>{{ profile.hero.claim }}</h2>
      <p class="hero-intro">{{ profile.hero.description }}</p>
    </section>

    <section class="editorial-section" aria-labelledby="writing">
      <h2 id="writing" class="editorial-label">{{ profile.writing.heading }}</h2>
      <div>
        <p>{{ profile.writing.description }}</p>
        <PublicationList :items="profile.writing.publications.map(item => ({ ...item, external: true }))" locale="en" />
      </div>
    </section>

    <section class="editorial-section" aria-labelledby="contact">
      <h2 id="contact" class="editorial-label">{{ profile.contact.heading }}</h2>
      <div>
        <p>{{ profile.contact.description }}</p>
        <ProfileLinks />
      </div>
    </section>
  </div>
</template>
