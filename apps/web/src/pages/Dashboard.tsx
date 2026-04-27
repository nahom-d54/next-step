import React, { useState } from 'react'
import type { Task as FTask } from '@next-step/feature-task-search'
import type { Tag } from '@next-step/feature-task-tags'
import { TaskFilterCoordinator } from '@next-step/feature-task-search'
import { TagManager } from '@next-step/feature-task-tags'
import '../../src/App.css'

const initialTags: Tag[] = [
  { id: 't1', label: 'urgent', color: '#ef4444' },
  { id: 't2', label: 'backend', color: '#2563eb' },
]

const initialTasks: FTask[] = [
  { id: '1', title: 'urgent: Fix login bug', tags: ['t1'] },
  { id: '2', title: 'backend: Add auth endpoint', tags: ['t2'] },
  { id: '3', title: 'Write documentation for new API', tags: [] },
]

export default function Dashboard() {
  const [tags, setTags] = useState<Tag[]>(initialTags)
  const [tasks] = useState<FTask[]>(initialTasks)
  const [results, setResults] = useState<FTask[]>(initialTasks)

  const handleTagCreated = (t: Tag) => setTags((s) => [...s, t])
  const handleTagDeleted = (id: string) => setTags((s) => s.filter((x) => x.id !== id))

  const frosted: React.CSSProperties = {
    borderRadius: 12,
    padding: 16,
    border: '1px solid var(--border)',
    background: 'rgba(255,255,255,0.03)',
    boxShadow: 'var(--shadow)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <main style={{ flex: 1 }}>
          <div style={frosted}>
            <TaskFilterCoordinator tasks={tasks} tags={tags} onResults={setResults} />
          </div>

          <section style={{ marginTop: 16 }}>
            <h2 style={{ color: 'var(--text-h)' }}>Tasks</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {results.map((r) => (
                <li key={r.id} style={{ padding: 12, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-h)' }}>{r.title}</div>
                  {r.tags?.length ? (
                    <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
                      {r.tags.map((tid: string) => {
                        const tag = tags.find((t) => t.id === tid)
                        return tag ? (
                          <span key={tid} style={{ fontSize: 12, padding: '4px 8px', background: tag.color ?? 'transparent', borderRadius: 999 }}>{tag.label}</span>
                        ) : null
                      })}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        </main>

        <aside style={{ width: 300 }}>
          <div style={frosted}>
            <TagManager tags={tags} onTagCreated={handleTagCreated} onTagDeleted={handleTagDeleted} />
          </div>
        </aside>
      </div>
    </div>
  )
}
