import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        date: z.string().optional(),
        tldr: z.string().optional(),
        status: z.enum(['Kutatás', 'Javaslat', 'Megvalósítás']).optional(),
        linkedin: z.string().url().optional(),
        bluesky: z.string().url().optional(),
      }),
    }),
  },
})
