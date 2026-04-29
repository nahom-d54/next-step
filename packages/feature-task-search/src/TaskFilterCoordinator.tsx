import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import SearchBar from './SearchBar'
import type { Task } from './searchStrategies'
import type { Tag } from '@next-step/feature-task-tags'
import { TagCloud } from '@next-step/feature-task-tags'

type Props = {
  tasks: Task[]
  tags: Tag[]
  /** Called when search results change */
  onResults?: (results: Task[]) => void
  className?: string
  style?: CSSProperties
}

export default function TaskFilterCoordinator({ tasks, tags, onResults, className, style }: Props) {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)
  const [query, setQuery] = useState<string | undefined>(undefined)

  const handleTagSelect = useCallback((tag: Tag) => {
    setSelectedTagId((prev) => (prev === tag.id ? null : tag.id))
    // update query to tag label when selecting, clear when deselecting
    setQuery((prev) => (prev === tag.label ? undefined : tag.label))
  }, [])

  const handleResults = useCallback(
    (results: Task[]) => {
      onResults?.(results)
    },
    [onResults],
  )

  return (
    <div className={className} style={style}>
      <div style={{ marginBottom: 8 }}>
        <SearchBar tasks={tasks} externalQuery={query} onResults={handleResults} />
      </div>

      <TagCloud tags={tags} selectedId={selectedTagId ?? undefined} onTagSelect={handleTagSelect} />
    </div>
  )
}
