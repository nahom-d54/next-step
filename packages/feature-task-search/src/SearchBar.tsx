import React, { useEffect, useState } from 'react'
import type { Task } from './searchStrategies'
import { getSearchStrategy, searchStrategies } from './searchStrategies'
import useDebouncedValue from './useDebouncedValue'

type Props = {
  tasks: Task[]
  initialQuery?: string
  initialStrategy?: string
  onResults?: (results: Task[]) => void
  /** debounce delay in ms */
  debounceDelay?: number
  /** optional className */
  className?: string
  style?: React.CSSProperties
}

export default function SearchBar({
  tasks,
  initialQuery = '',
  initialStrategy = 'title',
  onResults,
  debounceDelay = 300,
  className,
  style,
}: Props) {
  const [query, setQuery] = useState(initialQuery)
  const [strategyKey, setStrategyKey] = useState(initialStrategy)

  const [debouncedQuery, { flush, cancel }] = useDebouncedValue(
    query,
    debounceDelay,
  )

  useEffect(() => {
    const strategy = getSearchStrategy(strategyKey)
    const results = strategy.search(tasks, debouncedQuery)
    onResults?.(results)
  }, [debouncedQuery, strategyKey, tasks, onResults])

  // If tasks change while there's a pending debounce, flush so results stay in sync
  useEffect(() => {
    flush()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks])

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      // flush pending debounce and emit immediate results
      flush()
      const strategy = getSearchStrategy(strategyKey)
      const results = strategy.search(tasks, query)
      onResults?.(results)
    }

    if (e.key === 'Escape') {
      setQuery('')
      cancel()
      onResults?.(tasks)
    }
  }

  return (
    <div
      className={className}
      style={{ display: 'flex', gap: 8, alignItems: 'center', ...style }}
    >
      <input
        aria-label="Search tasks"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        style={{ flex: 1, padding: '6px 8px' }}
      />

      {query ? (
        <button
          aria-label="Clear search"
          onClick={() => {
            setQuery('')
            cancel()
            onResults?.(tasks)
          }}
          style={{ padding: '6px 8px' }}
        >
          ✕
        </button>
      ) : null}

      <select
        aria-label="Search strategy"
        value={strategyKey}
        onChange={(e) => setStrategyKey(e.target.value)}
        style={{ padding: '6px 8px' }}
      >
        {searchStrategies.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  )
}
