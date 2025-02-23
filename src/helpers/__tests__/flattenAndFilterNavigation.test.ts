import { describe, it, expect } from 'vitest'
import { flattenAndFilterNavigation } from '../flattenAndFilterNavigation'
import { NavigationItemType } from '../../types/navigationItemType'

describe('flattenAndFilterNavigation', () => {
  const navigationData: NavigationItemType[] = [
    { key: '1', name: 'Home', link: '/', children: [] },
    {
      key: '2',
      name: 'About',
      link: '/about',
      children: [
        { key: '3', name: 'Team', link: '/about/team', children: [] },
        { key: '4', name: 'History', link: '/about/history', children: [] }
      ]
    },
    { key: '5', name: 'Contact', link: '/contact', children: [] }
  ]

  it('should return all matching items in a flat structure', () => {
    const result = flattenAndFilterNavigation(navigationData, 'Team')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Team')
  })

  it('should return an empty array if no match is found', () => {
    expect(flattenAndFilterNavigation(navigationData, 'Nonexistent')).toHaveLength(0)
  })

  it('should return multiple matches if applicable', () => {
    const result = flattenAndFilterNavigation(navigationData, 'a')
    expect(result).toHaveLength(3) // "About", "Team", "Contact"
  })

  it('should be case-insensitive', () => {
    const result = flattenAndFilterNavigation(navigationData, 'team')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Team')
  })

  it('should handle empty navigation data', () => {
    expect(flattenAndFilterNavigation([], 'Team')).toHaveLength(0)
  })
})
