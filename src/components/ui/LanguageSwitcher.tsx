'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const router = useRouter()
  const [language, setLanguage] = useState(i18n.language || 'en')

  // Load language from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'en'
    setLanguage(storedLang)
    i18n.changeLanguage(storedLang)
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ka' : 'en'
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    router.refresh()
  }

  return (
    <button
      onClick={toggleLanguage}
      className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center gap-2 cursor-pointer'
    >
      <div className='relative w-6 h-4'>
        <Image
          src={language === 'en' ? '/flags/gb.svg' : '/flags/ge.svg'}
          alt='Language Flag'
          fill
        />
      </div>
    </button>
  )
}
