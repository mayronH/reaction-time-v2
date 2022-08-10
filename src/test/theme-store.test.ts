import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../stores/theme'

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('change theme', () => {
    const theme = useThemeStore()

    expect(theme.userTheme).toBe('light')
    theme.setTheme('dark')
    expect(theme.userTheme).toBe('dark')
  })

  it('change accent color', () => {
    const theme = useThemeStore()

    expect(theme.accentColor).toBe('')
    theme.setTheme('dark')
    expect(theme.accentColor).toBe('#e53265')
  })
})
