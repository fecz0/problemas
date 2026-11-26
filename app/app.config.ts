export default defineAppConfig({
  ui: {
    prose: {
      h2: { slots: { leading: 'bg-transparent' } },
      h3: { slots: { leading: 'bg-transparent' } },
    },
    colors: {
      primary: 'lime',
      neutral: 'slate',
    },
  },
})
