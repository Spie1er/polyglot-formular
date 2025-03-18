'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import PrimaryButton from '@src/components/ui/buttons/PrimaryButton'
import { useActionState, useState } from 'react'
import { login } from '@/actions/auth-actions'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import GoogleLogin from '@src/components/auth/googleButton'

const LoginPage = () => {
  const [state, action, isPending] = useActionState(login, {})

  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()
  const [fields, setFields] = useState({ email: '', password: '' })

  return (
    <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-900 mt-10'>
      <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-gray-800 dark:text-white text-center'>
          {t('welcomeBack')}
        </h2>
        <p className='text-gray-500 dark:text-gray-400 text-center mt-5'>
          {t('signInToYourAccount')}
        </p>

        {/* FORM ACTION FOR AUTHENTICATION */}
        <form id='auth-form' action={action} className='space-y-7 mt-5'>
          {/* EMAIL FIELD */}
          <div className='relative'>
            <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
              {t('email')}
            </label>
            <input
              type='email'
              name='email'
              required
              className={`w-full p-2 mt-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white ${
                state?.errors?.email ? 'border-red-500' : 'border-gray-300'
              }
              `}
              onChange={(e) =>
                setFields((prevState) => ({
                  ...prevState,
                  email: e.target.value
                }))
              }
              value={fields.email}
            />
            {state?.errors?.email && (
              <p className='text-red-500 text-sm mt-1 italic'>
                {t(state.errors.email)}
              </p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className='relative'>
            <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium'>
              {t('password')}
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                required
                className={`w-full p-2 mt-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white ${
                  state?.errors?.password ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={(e) =>
                  setFields((prevState) => ({
                    ...prevState,
                    password: e.target.value
                  }))
                }
                value={fields.password}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-1/2 -translate-y-1/2 right-3 transform text-gray-500 dark:text-gray-400 mt-1 cursor-pointer'
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {state?.errors?.password && (
              <p className='text-red-500 text-sm mt-1 italic'>
                {t(state.errors.password)}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <div className='mt-5'>
            <PrimaryButton
              isFull
              text={!isPending ? t('login') : t('loginProcess')}
            />
          </div>
        </form>
        <GoogleLogin />
        {/* ALTERNATIVE LINK */}
        <div className='mt-4 text-center text-gray-600 dark:text-gray-300'>
          <p>
            {t('doYouHaveAnAccount')}{' '}
            <Link
              href='/auth/register'
              className='text-blue-500 hover:underline'
            >
              {t('signUpHere')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
