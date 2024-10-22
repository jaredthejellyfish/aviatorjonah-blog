import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'

const ThemeToggle = () => {
  useEffect(() => {
    let observer: MutationObserver | null = null

    const getThemePreference = () => {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('theme')
      ) {
        return localStorage.getItem('theme')
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    if (typeof window !== 'undefined') {
      const isDark = getThemePreference() === 'dark'
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark')

      if (typeof localStorage !== 'undefined') {
        observer = new MutationObserver(() => {
          const isDark = document.documentElement.classList.contains('dark')
          localStorage.setItem('theme', isDark ? 'dark' : 'light')
        })
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
        })
      }
    }

    // Ensure that a cleanup function is always returned
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  const handleToggleClick = () => {
    if (typeof window !== 'undefined') {
      const element = document.documentElement
      element.classList.toggle('dark')

      const isDark = element.classList.contains('dark')
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
      }
    }
  }

  return (
    <Button
      size="icon"
      onClick={handleToggleClick}
      className="bg-white text-black dark:hover:text-black hover:text-white"
    >
      <SunIcon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
