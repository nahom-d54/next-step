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
    <div className={`${className ?? ''}`}>
      {/* Mobile: show a native select for small screens */}
      <select
        aria-label="Tabs"
        className="block w-full rounded-md border px-3 py-2 text-sm sm:hidden"
        value={String(activeValue)}
        onChange={(e) => {
          const sel = items.find((it) => String(it.value) === e.target.value)
          if (sel) onChange(sel.value)
        }}
      >
        {items.map((it) => (
          <option key={String(it.value)} value={String(it.value)}>
            {it.label}
          </option>
        ))}
      </select>

      {/* Desktop / larger: scrollable tab list */}
      <div role="tablist" className="hidden sm:flex gap-2 overflow-x-auto whitespace-nowrap">
        {items.map((it) => {
          const isActive = it.value === activeValue
          return (
            <button
              key={String(it.value)}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onChange(it.value)}
              className={`flex-shrink-0 px-3 py-1 text-sm rounded-t-md border-b-2 -mb-px focus:outline-none ${
                isActive
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-gray-700 hover:text-gray-900'
              }`}
            >
              {it.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
