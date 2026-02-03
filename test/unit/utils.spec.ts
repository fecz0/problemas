import { describe, it, expect } from 'vitest'

// Test the external link detection logic used in ProseA component
function isExternalLink(href: string | undefined): boolean {
  if (!href) return false
  return href.startsWith('http://') || href.startsWith('https://')
}

function getLinkTarget(href: string | undefined, explicitTarget?: string): string | undefined {
  if (explicitTarget) return explicitTarget
  return isExternalLink(href) ? '_blank' : undefined
}

function getLinkRel(href: string | undefined): string | undefined {
  return isExternalLink(href) ? 'noopener noreferrer' : undefined
}

describe('External Link Detection', () => {
  describe('isExternalLink', () => {
    it('returns true for https URLs', () => {
      expect(isExternalLink('https://example.com')).toBe(true)
      expect(isExternalLink('https://google.com/search')).toBe(true)
    })

    it('returns true for http URLs', () => {
      expect(isExternalLink('http://example.com')).toBe(true)
    })

    it('returns false for relative URLs', () => {
      expect(isExternalLink('/about')).toBe(false)
      expect(isExternalLink('/problemak/test')).toBe(false)
    })

    it('returns false for anchor links', () => {
      expect(isExternalLink('#section')).toBe(false)
    })

    it('returns false for undefined', () => {
      expect(isExternalLink(undefined)).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isExternalLink('')).toBe(false)
    })
  })

  describe('getLinkTarget', () => {
    it('returns _blank for external links', () => {
      expect(getLinkTarget('https://example.com')).toBe('_blank')
    })

    it('returns undefined for internal links', () => {
      expect(getLinkTarget('/about')).toBeUndefined()
    })

    it('respects explicit target over automatic detection', () => {
      expect(getLinkTarget('https://example.com', '_self')).toBe('_self')
      expect(getLinkTarget('/about', '_blank')).toBe('_blank')
    })
  })

  describe('getLinkRel', () => {
    it('returns noopener noreferrer for external links', () => {
      expect(getLinkRel('https://example.com')).toBe('noopener noreferrer')
    })

    it('returns undefined for internal links', () => {
      expect(getLinkRel('/about')).toBeUndefined()
    })
  })
})

describe('Status Color Mapping', () => {
  const statusColors: Record<'Kutatás' | 'Javaslat' | 'Megvalósítás', 'warning' | 'info' | 'success'> = {
    'Kutatás': 'warning',
    'Javaslat': 'info',
    'Megvalósítás': 'success',
  }

  it('maps Kutatás to warning color', () => {
    expect(statusColors['Kutatás']).toBe('warning')
  })

  it('maps Javaslat to info color', () => {
    expect(statusColors['Javaslat']).toBe('info')
  })

  it('maps Megvalósítás to success color', () => {
    expect(statusColors['Megvalósítás']).toBe('success')
  })
})
