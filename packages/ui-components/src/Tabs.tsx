import React from 'react'

type Item<T = string> = {
  label: string
  value: T
}

type Props<T = string> = {
  items: Item<T>[]
  activeValue: T
  onChange: (v: T) => void
  className?: string
}

export default function Tabs<T = string>({ items, activeValue, onChange, className }: Props<T>) {
  return (
    <div role="tablist" className={`flex gap-2 ${className ?? ''}`}>
      {items.map((it) => {
        const isActive = it.value === activeValue
        return (
          <button
            key={String(it.value)}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(it.value)}
            className={`px-3 py-1 text-sm rounded-t-md border-b-2 -mb-px focus:outline-none ${isActive ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-700 hover:text-gray-900'}`}
          >
            {it.label}
          </button>
        )
      })}
    </div>
  )
}
