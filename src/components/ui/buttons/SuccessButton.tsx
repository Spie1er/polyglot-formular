import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

interface SuccessButtonProps {
  loading?: boolean
  disabled?: boolean
  text: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large'
  isFull?: boolean
}

const SuccessButton = (props: SuccessButtonProps) => {
  const { t } = useTranslation()

  const getSizeClasses = () => {
    switch (props.size) {
      case 'small':
        return 'p-1 text-sm'
      case 'medium':
        return 'p-2 text-base'
      case 'large':
        return 'p-3 text-lg'
      default:
        return 'p-2 text-base'
    }
  }

  return (
    <button
      type={props.type || 'submit'}
      className={`bg-green-500 text-white rounded hover:bg-green-600 transition duration-300
         ${getSizeClasses()} ${props.isFull ? 'w-full' : ''} 
         ${
           props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
         }`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? t('buttonLoading') : props.text}
    </button>
  )
}

export default SuccessButton
