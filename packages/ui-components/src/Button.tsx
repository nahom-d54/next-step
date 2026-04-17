import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base = 'px-3 py-1 rounded-md inline-flex items-center justify-center text-sm'
  const variantClass =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : variant === 'secondary'
      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      : 'bg-transparent text-gray-700 hover:bg-gray-50'

  return (
    <button {...rest} className={`${base} ${variantClass} ${className}`.trim()}>
      {children}
    </button>
  )
}
