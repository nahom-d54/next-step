import React from 'react'

type Props = {
  children?: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div className={`border rounded-md p-3 bg-white ${className}`.trim()}>
      {children}
    </div>
  )
}
