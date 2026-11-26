import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const headingAndDescription = z.object({
  heading: z.string(),
  description: z.string(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        home: z.object({
          hero: headingAndDescription.extend({
            eyebrow: z.string(),
            aboutLabel: z.string(),
            topicsLabel: z.string(),
            portrait: z.object({ src: z.string(), alt: z.string() }).optional(),
          }),
          outlook: z.object({
            label: z.string(),
            heading: z.string(),
            paragraphs: z.array(z.string()),
            linkLabel: z.string(),
          }),
          topics: z.object({
            heading: z.string(),
            items: z.array(z.object({ title: z.string(), description: z.string() })),
          }),
          experience: headingAndDescription,
          thoughts: headingAndDescription.extend({
            publications: z.array(z.object({
              title: z.string(),
              description: z.string(),
              publisher: z.string().optional(),
              url: z.string().url(),
            })).optional(),
          }),
          contact: headingAndDescription,
        }).optional(),
        caseStudy: z.object({
          context: z.string(),
          role: z.string(),
          outcome: z.string(),
        }).optional(),
        date: z.string().optional(),
        tldr: z.string().optional(),
        status: z.enum(['Kutatás', 'Javaslat', 'Megvalósítás']).optional(),
        linkedin: z.string().url().optional(),
        bluesky: z.string().url().optional(),
      }),
    }),
  },
})
