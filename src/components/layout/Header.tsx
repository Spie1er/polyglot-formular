'use client'

import Link from 'next/link'
// import { useState } from 'react'
import ThemeSwitcher from '@component/components/ui/ThemeSwitcher'
import LanguageSwitcher from '@component/components/ui/LanguageSwitcher'

interface HeaderProps {
  isAuthenticated: boolean
}

export default function Header({ isAuthenticated }: HeaderProps) {
  return (
    <header className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link
          href='/'
          className='text-xl font-bold text-gray-800 dark:text-white'
        >
          Formular
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
