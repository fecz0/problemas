<script setup lang="ts">
// Used on the home page and from Markdown (MDC), the steps live in content/data/method.yml
const { data: method } = await useAsyncData('method', () => queryCollection('method').first())

// Arrow heads sit halfway between two neighbouring steps of the ring
const arrows = [36, 108, 180, 252, 324]
</script>

<template>
  <div v-if="method" class="cycle">
    <div class="cycle-body">
      <div class="cycle-hub">
        <svg class="cycle-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
          <circle cx="100" cy="100" r="90" />
          <path
            v-for="angle in arrows"
            :key="angle"
            d="M96 4 108 10 96 16Z"
            :transform="`rotate(${angle} 100 100)`"
          />
        </svg>
        <p>{{ method.center }}</p>
      </div>

      <ol class="cycle-steps" role="list" :aria-label="method.title">
        <li v-for="(step, index) in method.steps" :key="step.name">
          <span class="cycle-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ step.name }}</h3>
          <p>{{ step.description }}</p>
        </li>
      </ol>

      <p class="cycle-return">
        <span aria-hidden="true">↻ </span>{{ method.return }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.cycle {
  container-type: inline-size;
}

.cycle-hub {
  margin-bottom: 1.5rem;
  color: var(--editorial-accent);
  font-family: var(--font-mono);
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.cycle-ring {
  display: none;
}

/* Narrow: a list with a line that visibly runs through every step */
.cycle-steps li {
  position: relative;
  padding: 0 0 1.5rem 3.25rem;
}

.cycle-steps li::before {
  content: '';
  position: absolute;
  top: 2rem;
  bottom: .25rem;
  left: .95rem;
  border-left: 2px solid var(--editorial-accent);
}

.cycle-number {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--editorial-accent);
  border-radius: 50%;
  color: var(--editorial-accent);
  font-family: var(--font-mono);
  font-size: .75rem;
  font-weight: 600;
}

.cycle-steps h3 {
  color: var(--ui-text-highlighted);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.45;
}

.cycle-steps p {
  color: var(--editorial-muted);
  line-height: 1.6;
}

.cycle-return {
  color: var(--editorial-accent);
  font-family: var(--font-mono);
  font-size: .8rem;
}

/* Wide: the same list laid out clockwise around the ring */
@container (min-width: 44rem) {
  .cycle-body {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-areas:
      '.     one   .'
      'five  hub   two'
      'four  hub   three';
    align-items: center;
    gap: 2.5rem 1.5rem;
  }

  .cycle-steps {
    display: contents;
  }

  .cycle-steps li {
    padding: 0;
    text-align: center;
  }

  .cycle-steps li::before {
    content: none;
  }

  .cycle-steps li:nth-child(1) { grid-area: one; }
  .cycle-steps li:nth-child(2) { grid-area: two; }
  .cycle-steps li:nth-child(3) { grid-area: three; }
  .cycle-steps li:nth-child(4) { grid-area: four; }
  .cycle-steps li:nth-child(5) { grid-area: five; }

  .cycle-number {
    position: static;
    margin: 0 auto .5rem;
  }

  .cycle-hub {
    grid-area: hub;
    display: grid;
    place-items: center;
    margin: 0;
    text-align: center;
  }

  .cycle-hub > * {
    grid-area: 1 / 1;
  }

  .cycle-hub p {
    max-width: 14ch;
  }

  .cycle-ring {
    display: block;
    width: 100%;
    max-width: 18rem;
  }

  .cycle-ring circle {
    fill: none;
    stroke: var(--editorial-accent);
    stroke-width: 1.5;
  }

  .cycle-ring path {
    fill: var(--editorial-accent);
  }

  /* The ring already shows the loop, screen readers still get the sentence */
  .cycle-return {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
</style>
