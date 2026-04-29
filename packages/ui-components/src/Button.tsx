import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
  className?: string
  children?: ReactNode
}

export default function Button({ variant = 'primary', className = '', children, loading = false, disabled, ...rest }: Props) {
  const isDisabled = Boolean(disabled || loading)
  const base = 'px-3 py-1 rounded-md inline-flex items-center justify-center text-sm'
  const variantClass =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : variant === 'secondary'
      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      : 'bg-transparent text-gray-700 hover:bg-gray-50'

  const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''

  return (
    <button
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`${base} ${variantClass} ${disabledClass} ${className}`.trim()}
    >
      {loading ? (
        <>
          <svg
            className={`animate-spin -ml-1 mr-2 h-4 w-4 ${variant === 'primary' ? 'text-white' : 'text-gray-600'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}
