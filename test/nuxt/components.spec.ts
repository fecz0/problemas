import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProblemCard from '~/components/ProblemCard.vue'
import TldrBlock from '~/components/TldrBlock.vue'
import DiscussionLinks from '~/components/DiscussionLinks.vue'
import StepItem from '~/components/StepItem.vue'
import IncrementalSteps from '~/components/IncrementalSteps.vue'

describe('ProblemCard', () => {
  it('renders title and description', async () => {
    const wrapper = await mountSuspended(ProblemCard, {
      props: {
        title: 'Test Problem',
        description: 'Test description',
        to: '/test-path',
      },
    })

    expect(wrapper.text()).toContain('Test Problem')
    expect(wrapper.text()).toContain('Test description')
  })

  it('renders status badge when provided', async () => {
    const wrapper = await mountSuspended(ProblemCard, {
      props: {
        title: 'Test Problem',
        description: 'Test description',
        to: '/test-path',
        status: 'Kutatás',
      },
    })

    expect(wrapper.text()).toContain('Kutatás')
  })

  it('does not render status badge when not provided', async () => {
    const wrapper = await mountSuspended(ProblemCard, {
      props: {
        title: 'Test Problem',
        description: 'Test description',
        to: '/test-path',
      },
    })

    expect(wrapper.text()).not.toContain('Kutatás')
    expect(wrapper.text()).not.toContain('Javaslat')
    expect(wrapper.text()).not.toContain('Megvalósítás')
  })
})

describe('TldrBlock', () => {
  it('renders the TL;DR text', async () => {
    const wrapper = await mountSuspended(TldrBlock, {
      props: {
        text: 'This is a summary',
      },
    })

    expect(wrapper.text()).toContain('TL;DR')
    expect(wrapper.text()).toContain('This is a summary')
  })
})

describe('DiscussionLinks', () => {
  it('renders LinkedIn button when provided', async () => {
    const wrapper = await mountSuspended(DiscussionLinks, {
      props: {
        linkedin: 'https://linkedin.com/test',
      },
    })

    expect(wrapper.text()).toContain('LinkedIn')
    expect(wrapper.text()).toContain('Vitassuk meg')
  })

  it('renders Bluesky button when provided', async () => {
    const wrapper = await mountSuspended(DiscussionLinks, {
      props: {
        bluesky: 'https://bsky.app/test',
      },
    })

    expect(wrapper.text()).toContain('Bluesky')
  })

  it('renders both buttons when both provided', async () => {
    const wrapper = await mountSuspended(DiscussionLinks, {
      props: {
        linkedin: 'https://linkedin.com/test',
        bluesky: 'https://bsky.app/test',
      },
    })

    expect(wrapper.text()).toContain('LinkedIn')
    expect(wrapper.text()).toContain('Bluesky')
  })

  it('renders nothing when no links provided', async () => {
    const wrapper = await mountSuspended(DiscussionLinks, {
      props: {},
    })

    expect(wrapper.text()).not.toContain('Vitassuk meg')
  })
})

describe('StepItem', () => {
  it('renders step number and title', async () => {
    const wrapper = await mountSuspended(StepItem, {
      props: {
        number: 1,
        title: 'First Step',
      },
      slots: {
        default: 'Step content here',
      },
    })

    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('First Step')
    expect(wrapper.text()).toContain('Step content here')
  })

  it('renders step zero correctly', async () => {
    const wrapper = await mountSuspended(StepItem, {
      props: {
        number: '0',
        title: 'Current State',
      },
      slots: {
        default: 'Current state description',
      },
    })

    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('Current State')
  })
})

describe('IncrementalSteps', () => {
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(IncrementalSteps, {
      slots: {
        default: '<div>Step content</div>',
      },
    })

    expect(wrapper.text()).toContain('Step content')
  })
})
