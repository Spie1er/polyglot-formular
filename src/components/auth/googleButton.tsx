'use client'

import { googleAuthenticate } from '@/actions/google-login'
import { useActionState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useTranslation } from 'react-i18next'

const GoogleLogin = () => {
  const { t } = useTranslation()

  const [errorMsgGoogle, dispatchGoogle] = useActionState(
    googleAuthenticate,
    null
  )

  return (
    <form className='flex flex-col items-center mt-4' action={dispatchGoogle}>
      <button
        type='submit'
        className='w-full flex items-center justify-center gap-3 bg-white text-gray-700
         dark:bg-gray-800 dark:text-gray-200 font-medium py-2 
         px-6 rounded-lg transition-all 
         border border-gray-300 dark:border-gray-700 cursor-pointer'
      >
        <FcGoogle size={24} />
        {t('loginWithGoogle')}
      </button>

      {errorMsgGoogle && (
        <p className='text-red-500 text-sm mt-2 italic'>{errorMsgGoogle}</p>
      )}
    </form>
  )
}

export default GoogleLogin
