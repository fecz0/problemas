<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('content').path('/').first())
const { data: problems } = await useAsyncData('problems', () => queryCollection('content')
  .where('path', 'LIKE', '/problemak/%')
  .order('date', 'DESC')
  .all())

const home = computed(() => page.value?.home)
const { linkedinUrl } = useRuntimeConfig().public

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogUrl: 'https://problemas.hu/',
  ogType: 'website',
  twitterTitle: () => page.value?.title,
  twitterDescription: () => page.value?.description,
})

useHead({ link: [{ rel: 'canonical', href: 'https://problemas.hu/' }] })
</script>

<template>
  <div v-if="home" class="editorial-home">
    <section class="editorial-hero" :class="{ 'has-portrait': home.hero.portrait }">
      <div>
        <p class="editorial-label">{{ home.hero.eyebrow }}</p>
        <h1>{{ home.hero.heading }}</h1>
        <p class="hero-intro">{{ home.hero.description }}</p>
        <div class="hero-actions">
          <NuxtLink class="editorial-button" to="/rolam">{{ home.hero.aboutLabel }} <span aria-hidden="true">↗</span></NuxtLink>
          <a class="editorial-link" href="#amivel-foglalkozom">{{ home.hero.topicsLabel }} <span aria-hidden="true">↓</span></a>
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

    <section class="editorial-section" aria-labelledby="szemlelet-cim">
      <p class="editorial-label">{{ home.outlook.label }}</p>
      <div>
        <h2 id="szemlelet-cim">{{ home.outlook.heading }}</h2>
        <p v-for="paragraph in home.outlook.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <NuxtLink class="editorial-link" to="/szemleletem">{{ home.outlook.linkLabel }} <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>

    <section id="amivel-foglalkozom" class="editorial-section" aria-labelledby="temak-cim">
      <h2 id="temak-cim" class="editorial-label">{{ home.topics.heading }}</h2>
      <ul class="editorial-topics">
        <li v-for="topic in home.topics.items" :key="topic.title">
          <h3>{{ topic.title }}</h3>
          <p>{{ topic.description }}</p>
        </li>
      </ul>
    </section>

    <section class="editorial-section" aria-labelledby="tapasztalat-cim">
      <h2 id="tapasztalat-cim" class="editorial-label">{{ home.experience.heading }}</h2>
      <div><p>{{ home.experience.description }}</p></div>
    </section>

    <section id="gondolatok" class="editorial-section" aria-labelledby="gondolatok-cim">
      <h2 id="gondolatok-cim" class="editorial-label">{{ home.thoughts.heading }}</h2>
      <div>
        <p>{{ home.thoughts.description }}</p>
        <ul class="editorial-publications">
          <li v-for="problem in problems" :key="problem.path">
            <NuxtLink class="editorial-link" :to="problem.path">{{ problem.title }} <span aria-hidden="true">↗</span></NuxtLink>
            <p v-if="problem.status" class="editorial-label">{{ problem.status }}</p>
            <p v-if="problem.tldr">{{ problem.tldr }}</p>
          </li>
          <li v-for="publication in home.thoughts.publications" :key="publication.url">
            <NuxtLink class="editorial-link" :to="publication.url" external>{{ publication.title }} <span aria-hidden="true">↗</span></NuxtLink>
            <p>{{ publication.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="kapcsolat" class="editorial-section" aria-labelledby="kapcsolat-cim">
      <h2 id="kapcsolat-cim" class="editorial-label">{{ home.contact.heading }}</h2>
      <div>
        <p>{{ linkedinUrl ? home.contact.description : home.contact.unavailable }}</p>
        <NuxtLink v-if="linkedinUrl" class="editorial-link" :to="linkedinUrl" external>LinkedIn <span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </section>
  </div>
</template>
