import React from 'react'

type Props = {
  value: number
  /** Tailwind background color class for the fill, e.g. 'bg-blue-600' */
  color?: string
  className?: string
}

export default function Progress({ value, color, className }: Props) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0))

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={`w-full ${className ?? ''}`}
    >
      <div className="w-full bg-gray-100 rounded-full h-2 sm:h-3 overflow-hidden">
        <div
          className={`${color ?? 'bg-blue-600'} h-full transition-all`} 
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="sr-only">{pct}%</span>
    </div>
  )
}
