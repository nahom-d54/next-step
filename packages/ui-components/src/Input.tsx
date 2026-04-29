import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  loading?: boolean
  className?: string
}

const Input = forwardRef<HTMLInputElement, Props>(function Input({ loading = false, className = '', disabled, ...rest }, ref) {
  const isDisabled = Boolean(disabled || loading)
  const base = 'w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
  const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <div className={`relative ${className}`}>
      <input
        {...rest}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={`${base} ${disabledClass}`.trim()}
      />
      {loading && (
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      )}
    </div>
  )
})

export default Input
