<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('content').path('/').first()
})

const { data: problems } = await useAsyncData('problems', () => {
  return queryCollection('content')
    .where('path', 'LIKE', '/problemak/%')
    .order('date', 'DESC')
    .all()
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      title="Problémák és működő megoldások"
      description="Komplex társadalmi és technológiai problémák elemzése fokozatos és megvalósítható lépésekben. Nem panaszkodunk. Nem csodát ígérünk. Gondolkodunk."
      :links="[
        { label: 'Szemléletem', to: '/szemleletem', color: 'neutral', variant: 'subtle', icon: 'i-heroicons-light-bulb' },
      ]"
    />

    <UPageSection
      title="Miért nem egy nagy reform?"
      description="Mert a legtöbb rendszer nem egy döntéstől romlik el és nem is egy döntéstől javul meg."
    >
      <UPageGrid>
        <UPageCard
          title="Megvalósítható"
          description="Kisebb lépések, amelyek beleférnek a politikai, szervezeti és emberi realitásba. Nem ideális világra tervezve."
          icon="i-heroicons-check-circle"
          variant="soft"
        />
        <UPageCard
          title="Mérhető"
          description="Nem szándékokat, hanem változást figyelünk. Ha nem lett jobb, akkor módosítunk."
          icon="i-heroicons-chart-bar"
          variant="soft"
        />
        <UPageCard
          title="Rugalmas"
          description="Nincsenek kőbe vésett válaszok. A tapasztalat visszahat a következő lépésre."
          icon="i-heroicons-arrow-path"
          variant="soft"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection title="Elemzett problémák">
      <p class="mb-4 text-muted">
        Valós rendszerek, valós terheléssel. Az elemzések nem lezárják a kérdést, hanem elindítják.
      </p>
      <div class="grid gap-6">
        <ProblemCard
          v-for="problem in problems"
          :key="problem.path"
          :title="problem.title"
          :description="problem.tldr"
          :to="problem.path"
          :status="problem.status"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
