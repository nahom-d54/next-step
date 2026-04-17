import React, { useState } from 'react'
import { Modal, Button } from '@next-step/ui-components'
import type { Tag } from './types'
import { generateId } from '@next-step/utils'

type Props = {
  tags: Tag[]
  onTagCreated: (t: Tag) => void
  onTagDeleted: (id: string) => void
  className?: string
}

export default function TagManager({ tags, onTagCreated, onTagDeleted, className }: Props) {
  const [open, setOpen] = useState(false)
  const [label, setLabel] = useState('')
  const [color, setColor] = useState('#000000')

  const handleCreate = () => {
    const newTag: Tag = { id: generateId('tag'), label: label.trim() || 'Untitled', color }
    onTagCreated(newTag)
    setOpen(false)
    setLabel('')
    setColor('#000000')
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Tags</h3>
        <Button onClick={() => setOpen(true)} variant="primary">Add Tag</Button>
      </div>

      <ul className="space-y-2">
        {tags.map((t) => (
          <li key={t.id} className="flex items-center gap-3">
            <span
              aria-hidden
              style={t.color ? { backgroundColor: t.color } : undefined}
              className="w-6 h-6 rounded-full border"
            />
            <span className="flex-1 text-sm">{t.label}</span>
            <Button
              variant="ghost"
              onClick={() => onTagDeleted(t.id)}
              aria-label={`Delete tag ${t.label}`}
            >
              ✕
            </Button>
          </li>
        ))}
      </ul>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Tag">
        <div className="space-y-3">
          <label className="block">
            <div className="text-xs mb-1">Label</div>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-2 py-1 border rounded"
              placeholder="Tag label"
            />
          </label>

          <label className="block">
            <div className="text-xs mb-1">Color</div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-8 p-0 border rounded"
            />
          </label>

          <div className="flex justify-end gap-2 mt-3">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
