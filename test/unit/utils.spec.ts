import { describe, it, expect } from 'vitest'

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
