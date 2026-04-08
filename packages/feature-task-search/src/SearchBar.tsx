import React, { useEffect, useState } from 'react'
import type { Task } from './searchStrategies'
import { getSearchStrategy, searchStrategies } from './searchStrategies'
import useDebouncedValue from './useDebouncedValue'

type Props = {
  tasks: Task[]
  initialQuery?: string
  initialStrategy?: string
  onResults?: (results: Task[]) => void
}

export default function SearchBar({
  tasks,
  initialQuery = '',
  initialStrategy = 'title',
  onResults,
}: Props) {
  const [query, setQuery] = useState(initialQuery)
  const [strategyKey, setStrategyKey] = useState(initialStrategy)

  const debouncedQuery = useDebouncedValue(query, 300)

  useEffect(() => {
    const strategy = getSearchStrategy(strategyKey)
    const results = strategy.search(tasks, debouncedQuery)
    onResults?.(results)
  }, [debouncedQuery, strategyKey, tasks, onResults])

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input
        aria-label="Search tasks"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1, padding: '6px 8px' }}
      />

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
