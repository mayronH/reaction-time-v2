import { describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../stores/theme'

beforeAll(() => {
  setActivePinia(createPinia())
})

describe('Theme Store test', () => {
  let themeStore: ReturnType<typeof useThemeStore>

  beforeEach(() => {
    themeStore = useThemeStore()
  })

  afterEach(() => {
    themeStore.$reset()
  })

  it('change theme', () => {
    expect(themeStore.userTheme).toBe('light')
    themeStore.setTheme('dark')
    expect(themeStore.userTheme).toBe('dark')
  })

  it('change accent color', () => {
    expect(themeStore.accentColor).toBe('')
    themeStore.setTheme('dark')
    expect(themeStore.accentColor).toBe('#15cb82')
  })
})
