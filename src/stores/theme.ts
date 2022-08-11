import { defineStore } from 'pinia'
import { Theme } from '../types'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    userTheme: 'light' as Theme,
    accentColor: '',
  }),
  actions: {
    setTheme(theme: Theme) {
      localStorage.setItem('user-theme', theme)
      this.userTheme = theme
      this.setAccentColor()

      document.querySelector(':root')?.setAttribute('color-scheme', `${theme}`)
    },
    setAccentColor() {
      if (this.userTheme === 'light') {
        this.accentColor = '#6befbb'
      } else {
        this.accentColor = '#15cb82'
      }
    },
    getTheme() {
      return localStorage.getItem('user-theme') as Theme
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem('user-theme')

      if (activeTheme === 'light') {
        this.setTheme('dark')
      } else {
        this.setTheme('light')
      }

      this.setAccentColor()
    },
    setBasedInPreferredMedia() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      const localTheme = this.getTheme()

      if (!localTheme) {
        if (hasDarkPreference) {
          this.setTheme('dark')
        } else {
          this.setTheme('light')
        }
      } else {
        this.setTheme(localTheme)
      }

      this.setAccentColor()
    },
  },
})
