import { Badge } from '@next-step/ui-components'
import type { Tag } from './types'
import type { CSSProperties, ReactNode } from 'react'

type Props = {
  tags: Tag[]
  className?: string
  style?: CSSProperties
  onTagSelect?: (tag: Tag) => void
  selectedId?: string
}

export default function TagCloud({ tags, className, style, onTagSelect, selectedId }: Props) {
  return (
    <div className={className} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', ...style }}>
      {tags.map((t) => {
        const selected = t.id === selectedId
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onTagSelect?.(t)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
            }}
            aria-pressed={selected}
          >
            <Badge style={t.color ? { backgroundColor: t.color } : undefined}>{t.label}</Badge>
          </button>
        )
      })}
    </div>
  )
}
