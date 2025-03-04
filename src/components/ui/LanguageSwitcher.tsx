'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ge' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center gap-2 cursor-pointer'
    >
      <div style={{ width: 24, height: 16, position: 'relative' }}>
        <Image
          src={language === 'en' ? '/flags/gb.svg' : '/flags/ge.svg'}
          alt='Language Flag'
          fill
        />
      </div>
      <span className='text-gray-800 dark:text-gray-200'>
        {language.toUpperCase()}
      </span>
    </button>
  )
}
