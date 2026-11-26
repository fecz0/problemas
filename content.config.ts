import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const headingAndDescription = z.object({
  heading: z.string(),
  description: z.string(),
})

const labelledSection = z.object({
  label: z.string(),
  heading: z.string(),
  paragraphs: z.array(z.string()),
  linkLabel: z.string(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: { include: '**', exclude: ['data/**'] },
      schema: z.object({
        home: z.object({
          hero: z.object({
            name: z.string(),
            tagline: z.string(),
            claim: z.string(),
            description: z.string(),
            aboutLabel: z.string(),
            outlookLabel: z.string(),
            portrait: z.object({ src: z.string(), alt: z.string() }).optional(),
          }),
          outlook: labelledSection,
          topics: z.object({
            heading: z.string(),
            items: z.array(z.object({
              title: z.string(),
              description: z.string(),
              themes: z.array(z.string()),
            })),
          }),
          experience: labelledSection,
          thoughts: headingAndDescription.extend({
            publications: z.array(z.object({
              title: z.string(),
              description: z.string(),
              url: z.string().url(),
              date: z.string(),
              platform: z.string(),
              language: z.string(),
              topics: z.array(z.string()),
            })),
          }),
          contact: headingAndDescription,
        }).optional(),
        /** Short line above the page title */
        headline: z.string().optional(),
        caseStudy: z.object({
          context: z.string(),
          role: z.string(),
          outcome: z.string(),
        }).optional(),
        date: z.string().optional(),
        updated: z.string().optional(),
        topics: z.array(z.string()).optional(),
        tldr: z.string().optional(),
        status: z.enum(['Kutatás', 'Javaslat', 'Megvalósítás']).optional(),
        linkedin: z.string().url().optional(),
        bluesky: z.string().url().optional(),
      }),
    }),
    // Shared by the home page and the Markdown pages
    method: defineCollection({
      type: 'data',
      source: 'data/method.yml',
      schema: z.object({
        title: z.string(),
        center: z.string(),
        return: z.string(),
        steps: z.array(z.object({ name: z.string(), description: z.string() })),
      }),
    }),
    experience: defineCollection({
      type: 'data',
      source: 'data/experience.yml',
      schema: z.object({
        facts: z.array(z.object({ period: z.string(), text: z.string() })),
      }),
    }),
  },
})
