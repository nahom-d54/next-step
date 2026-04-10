import React, { useEffect, useState } from 'react'
import type { SearchStrategy } from './searchStrategies'
import { searchStrategies } from './searchStrategies'

type Props = {
  /** controlled value (strategy key) */
  value?: string
  /** initial uncontrolled value */
  defaultValue?: string
  onFilterChange?: (key: string) => void
  className?: string
  style?: React.CSSProperties
}

export default function FilterPanel({
  value,
  defaultValue,
  onFilterChange,
  className,
  style,
}: Props) {
  const first = searchStrategies[0]?.key ?? 'title'
  const [selected, setSelected] = useState<string>(value ?? defaultValue ?? first)

  // keep controlled prop in sync
  useEffect(() => {
    if (typeof value !== 'undefined' && value !== selected) {
      setSelected(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleSelect = (key: string) => {
    if (value === undefined) setSelected(key)
    onFilterChange?.(key)
  }

  return (
    <div
      className={className}
      style={style}
    >
      {/* Desktop / wide: toggle buttons */}
      <div className="hidden sm:flex items-center space-x-2">
        {searchStrategies.map((s: SearchStrategy) => {
          const active = s.key === selected
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={active}
              onClick={() => handleSelect(s.key)}
              className={
                `px-3 py-1 rounded-md text-sm flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-1 ` +
                (active
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200')
              }
            >
              {/* simple filter/icon placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={active ? 'currentColor' : 'currentColor'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
                aria-hidden
              >
                <path d="M22 3H2l7 9v7l6 3v-10l7-9z" />
              </svg>
              <span>{s.label.replace(/^Filter by |Search by /, '')}</span>
            </button>
          )
        })}
      </div>

      {/* Mobile / small: compact select */}
      <div className="sm:hidden">
        <label className="sr-only">Filter</label>
        <select
          aria-label="Filter tasks"
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
          className="px-2 py-1 border rounded-md text-sm"
        >
          {searchStrategies.map((s: SearchStrategy) => (
            <option key={s.key} value={s.key}>
              {s.label.replace(/^Filter by |Search by /, '')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
