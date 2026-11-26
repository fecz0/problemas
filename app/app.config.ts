export default defineAppConfig({
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
