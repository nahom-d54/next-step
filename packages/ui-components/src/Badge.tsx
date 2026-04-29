import type { ReactNode, CSSProperties } from 'react'

type Props = {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Badge({ children, className = '', style }: Props) {
  return (
    <span
      className={`${className} inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white`}
      style={{ backgroundColor: 'var(--accent)', ...style }}
    >
      {children}
    </span>
  )
}
