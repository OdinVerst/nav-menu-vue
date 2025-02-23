import { describe, it, expect } from 'vitest'
import { buildNavigationTree } from '../buildNavigationTree'
import { NavigationItemType } from '../../types/navigationItemType'

interface ServerResponse {
  pages: Record<
    string,
    Omit<NavigationItemType, 'children' | 'path'> & { childPageKeys?: string[] }
  >
  rootLevelKeys: string[]
}

describe('buildNavigationTree', () => {
  it('should correctly build a nested navigation tree', () => {
    const response: ServerResponse = {
      pages: {
        '1': { key: '1', name: 'Home', link: '/', level: 0 },
        '2': { key: '2', name: 'About', link: '/about', level: 0, childPageKeys: ['3', '4'] },
        '3': { key: '3', name: 'Team', link: '/about/team', level: 1 },
        '4': { key: '4', name: 'History', link: '/about/history', level: 1 }
      },
      rootLevelKeys: ['1', '2']
    }

    const tree = buildNavigationTree(response)

    expect(tree).toHaveLength(2)

    expect(tree[0].name).toBe('Home')
    expect(tree[0].path).toEqual(['1'])
    expect(tree[0].level).toBe(0)

    expect(tree[1].name).toBe('About')
    expect(tree[1].path).toEqual(['2'])
    expect(tree[1].level).toBe(0)
    expect(tree[1].children).toHaveLength(2)

    expect(tree[1].children?.[0].name).toBe('Team')
    expect(tree[1].children?.[0].path).toEqual(['2', '3'])
    expect(tree[1].children?.[0].level).toBe(1)

    expect(tree[1].children?.[1].name).toBe('History')
    expect(tree[1].children?.[1].path).toEqual(['2', '4'])
    expect(tree[1].children?.[1].level).toBe(1)
  })

  it('should return an empty array if there are no root keys', () => {
    const response: ServerResponse = {
      pages: {},
      rootLevelKeys: []
    }

    const tree = buildNavigationTree(response)
    expect(tree).toEqual([])
  })

  it('should handle deeply nested structures', () => {
    const response: ServerResponse = {
      pages: {
        '1': { key: '1', name: 'Root', link: '/root', level: 0, childPageKeys: ['2'] },
        '2': { key: '2', name: 'Level 1', link: '/root/level1', level: 1, childPageKeys: ['3'] },
        '3': { key: '3', name: 'Level 2', link: '/root/level1/level2', level: 2, childPageKeys: ['4'] },
        '4': { key: '4', name: 'Level 3', link: '/root/level1/level2/level3', level: 3 }
      },
      rootLevelKeys: ['1']
    }

    const tree = buildNavigationTree(response)

    expect(tree).toHaveLength(1)
    expect(tree[0].children).toHaveLength(1)
    expect(tree[0].children?.[0].children).toHaveLength(1)
    expect(tree[0].children?.[0].children?.[0].children).toHaveLength(1)
    expect(tree[0].children?.[0].children?.[0].children?.[0].name).toBe('Level 3')
    expect(tree[0].children?.[0].children?.[0].children?.[0].path).toEqual(['1', '2', '3', '4'])
    expect(tree[0].children?.[0].children?.[0].children?.[0].level).toBe(3)
  })
})
