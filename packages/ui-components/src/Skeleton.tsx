import React from 'react'

type Props = {
  width?: string | number
  height?: string | number
  className?: string
}

export default function Skeleton({ width = '100%', height = 12, className = '' }: Props) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        opacity: 0.8,
      }}
    />
  )
}
