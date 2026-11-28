<script setup lang="ts">
interface Publication {
  title: string
  description?: string
  url: string
  date: string
  platform: string
  topics?: string[]
  /** Set for texts published elsewhere */
  language?: string
  external?: boolean
}

const { locale = 'hu' } = defineProps<{
  items: Publication[]
  locale?: PageLanguage
}>()

const externalLabel = { hu: '(külső oldal)', en: '(external site)' }
</script>

<template>
  <ul class="editorial-publications">
    <li v-for="item in items" :key="item.url">
      <time class="editorial-label" :datetime="item.date">{{ formatDate(item.date, locale) }}</time>
      <div>
        <h3>
          <NuxtLink
            class="editorial-link"
            :to="item.url"
            :external="item.external"
            :hreflang="item.language"
          >
            {{ item.title }}<template v-if="item.external">
              <!-- The non-breaking space keeps the arrow with the last word -->
              <span aria-hidden="true">&nbsp;↗</span>
              <span class="sr-only">{{ externalLabel[locale] }}</span>
            </template>
          </NuxtLink>
        </h3>
        <p v-if="item.description">{{ item.description }}</p>
        <p class="editorial-label">{{ [item.platform, ...item.topics ?? []].join(' · ') }}</p>
      </div>
    </li>
  </ul>
</template>
