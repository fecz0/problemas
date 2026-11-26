export default defineAppConfig({
  // Public profiles, shown under contact and listed as `sameAs` in structured data
  profiles: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ferenc-mile-65038446/' },
    { label: 'Substack', url: 'https://fecz0.substack.com' },
    { label: 'Bluesky', url: 'https://bsky.app/profile/fecz0.bsky.social' },
    { label: 'GitHub', url: 'https://github.com/fecz0' },
  ],
  ui: {
    prose: {
      // Underline links so they don't rely on color alone to stand out
      a: { base: 'underline underline-offset-4' },
      h2: { slots: { leading: 'bg-transparent' } },
      h3: { slots: { leading: 'bg-transparent' } },
    },
    colors: {
      primary: 'lime',
      neutral: 'slate',
    },
  },
})
