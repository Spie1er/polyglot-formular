'use client'

import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')

    // Is looking if the OS theme is specified
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    // Prioritizes theme from local storage, then OS theme
    const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light')
    setTheme(theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer'
    >
      {theme === 'light' ? (
        <MoonIcon className='w-5 h-5 text-gray-800' />
      ) : (
        <SunIcon className='w-5 h-5 text-yellow-400' />
      )}
    </button>
  )
}
