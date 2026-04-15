import React from 'react'
import { Badge } from '@next-step/ui-components'
import type { Tag } from './types'

type Props = {
  tags: Tag[]
  className?: string
  style?: React.CSSProperties
}

export default function TagCloud({ tags, className, style }: Props) {
  return (
    <div className={className} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', ...style }}>
      {tags.map((t) => (
        <Badge key={t.id} style={t.color ? { backgroundColor: t.color } : undefined}>
          {t.label}
        </Badge>
      ))}
    </div>
  )
}
