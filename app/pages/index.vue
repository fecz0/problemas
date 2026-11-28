<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('content').path('/').first())
const { data: problems } = await useAsyncData('problems', () => queryCollection('content')
  .where('path', 'LIKE', '/problemak/%')
  .order('date', 'DESC')
  .all())

const home = computed(() => page.value?.home)

// On-site analyses and external publications in one list, newest first
const writings = computed(() => [
  ...(problems.value ?? []).map(problem => ({
    title: problem.title,
    description: problem.tldr || problem.description,
    url: problem.path,
    date: problem.date!,
    platform: 'Elemzés',
    topics: problem.topics ?? [],
  })),
  ...(home.value?.thoughts.publications ?? []).map(publication => ({ ...publication, external: true })),
].sort((a, b) => b.date.localeCompare(a.date)))

if (page.value) {
  const title = page.value.seo?.title || page.value.title
  usePageSeo({
    kind: 'home',
    path: '/',
    title,
    heading: page.value.title,
    description: page.value.seo?.description || page.value.description,
    knowsAbout: page.value.home?.topics.items.map(topic => topic.title),
  })
}
</script>

<template>
  <div v-if="home" class="editorial-home">
    <section class="editorial-hero" :class="{ 'has-portrait': home.hero.portrait }" aria-labelledby="nev">
      <div>
        <h1 id="nev">{{ home.hero.name }}<span class="hero-dot" aria-hidden="true">.</span></h1>
        <p class="editorial-label">{{ home.hero.tagline }}</p>
        <h2>{{ home.hero.claim }}</h2>
        <p class="hero-intro">{{ home.hero.description }}</p>
        <div class="hero-actions">
          <NuxtLink class="editorial-button" to="/rolam">{{ home.hero.aboutLabel }} <span aria-hidden="true">→</span></NuxtLink>
        </div>
      </div>
      <img
        v-if="home.hero.portrait"
        :src="home.hero.portrait.src"
        :alt="home.hero.portrait.alt"
        width="480"
        height="600"
        class="editorial-portrait"
      >
    </section>

    <section id="szemlelet" class="editorial-section" aria-labelledby="szemlelet-cim">
      <p class="editorial-label">{{ home.outlook.label }}</p>
      <div>
        <h2 id="szemlelet-cim">{{ home.outlook.heading }}</h2>
        <p v-for="paragraph in home.outlook.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <p>
          <NuxtLink class="editorial-link" to="/szemleletem">{{ home.outlook.linkLabel }} <span aria-hidden="true">→</span></NuxtLink>
        </p>
      </div>
    </section>

    <section id="amivel-foglalkozom" class="editorial-section" aria-labelledby="temak-cim">
      <h2 id="temak-cim" class="editorial-label">{{ home.topics.heading }}</h2>
      <ol class="editorial-topics" role="list">
        <li v-for="(topic, index) in home.topics.items" :key="topic.title">
          <span class="editorial-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ topic.title }}</h3>
          <p>{{ topic.description }}</p>
        </li>
      </ol>
    </section>

    <section class="editorial-section" aria-labelledby="tapasztalat-cim">
      <p class="editorial-label">{{ home.experience.label }}</p>
      <div>
        <h2 id="tapasztalat-cim">{{ home.experience.heading }}</h2>
        <p v-for="paragraph in home.experience.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <ExperienceFacts />
        <p>
          <NuxtLink class="editorial-link" to="/rolam">{{ home.experience.linkLabel }} <span aria-hidden="true">→</span></NuxtLink>
        </p>
      </div>
    </section>

    <section id="gondolatok" class="editorial-section" aria-labelledby="gondolatok-cim">
      <h2 id="gondolatok-cim" class="editorial-label">{{ home.thoughts.heading }}</h2>
      <PublicationList :items="writings" />
    </section>

    <section id="kapcsolat" class="editorial-section" aria-labelledby="kapcsolat-cim">
      <h2 id="kapcsolat-cim" class="editorial-label">{{ home.contact.heading }}</h2>
      <div>
        <p>{{ home.contact.description }}</p>
        <ProfileLinks />
      </div>
    </section>
  </div>
</template>
