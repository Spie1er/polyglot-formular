'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '@component/components/ui/buttons/PrimaryButton'

const AuthPage = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'login'
  const isSignup = type === 'signup'

  const { t } = useTranslation()

  return (
    <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-900 mt-20'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-white text-center'>
          {isSignup ? t('createAccount') : t('welcomeBack')}
        </h2>
        <p className='text-gray-500 dark:text-gray-400 text-center mt-2'>
          {isSignup ? t('signUpToGetStarted') : t('signInToYourAccount')}
        </p>

        {/* FORM ACTION FOR AUTHENTICATION */}
        <form action='/api/auth' method='POST' className='mt-6 space-y-4'>
          <input type='hidden' name='type' value={type} />

          {/* EMAIL FIELD */}
          <div>
            <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
              {t('email')}
            </label>
            <input
              type='email'
              name='email'
              required
              className='w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400'
            />
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
              {t('password')}
            </label>
            <input
              type='password'
              name='password'
              required
              className='w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400'
            />
          </div>

          {/* SUBMIT BUTTON */}
          <PrimaryButton isFull text={isSignup ? t('signup') : t('login')} />
        </form>

        {/* ALTERNATIVE LINK */}
        <div className='mt-4 text-center text-gray-600 dark:text-gray-300'>
          {isSignup ? (
            <p>
              {t('alreadyHaveAnAccount')}{' '}
              <Link
                href='/login?type=login'
                className='text-blue-500 hover:underline'
              >
                {t('loginHere')}
              </Link>
            </p>
          ) : (
            <p>
              {t('doYouHaveAnAccount')}{' '}
              <Link
                href='/login?type=signup'
                className='text-blue-500 hover:underline'
              >
                {t('signUpHere')}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
