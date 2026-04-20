import React from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Badge({ children, className = '', style }: Props) {
  return (
    <span
      className={`${className} inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white`}
      style={{ backgroundColor: '#6b7280', ...style }}
    >
      {children}
    </span>
  )
}
