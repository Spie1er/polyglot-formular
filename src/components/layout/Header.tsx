'use client'

import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitcher from '@component/components/ui/ThemeSwitcher'
import LanguageSwitcher from '@component/components/ui/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

interface HeaderProps {
  isAuthenticated: boolean
}

export default function Header({ isAuthenticated }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link
          href='/'
          className='text-xl font-bold text-gray-800 dark:text-white flex items-center'
        >
          <div>{t('projectTitle')}</div>
          <div style={{ width: 40, height: 40, position: 'relative' }}>
            <Image src='/9212933.png' alt='Main Icon' width={50} height={50} />
          </div>
        </Link>

        <div className='flex items-center space-x-4'>
          <LanguageSwitcher />
          <ThemeSwitcher />
          {isAuthenticated && (
            <nav className='hidden md:flex space-x-6'>
              <Link
                href='/dashboard'
                className='text-gray-700 dark:text-gray-200'
              >
                Dashboard
              </Link>
              <Link
                href='/profile'
                className='text-gray-700 dark:text-gray-200'
              >
                Profile
              </Link>
              <button className='text-red-500'>Logout</button>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
