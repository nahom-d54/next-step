import React, { useEffect, useRef, useState } from 'react'

type Option<T = string> = {
  label: string
  value: T
}

type Props<T = string> = {
  options: Option<T>[]
  value?: T
  onChange?: (v: T) => void
  buttonLabel?: string
  className?: string
}

export default function Dropdown<T = string>({
  options,
  value,
  onChange,
  buttonLabel,
  className,
}: Props<T>) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  useEffect(() => setHighlight(0), [open, options])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, options.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const opt = options[highlight]
      if (opt) onChange?.(opt.value)
      setOpen(false)
    }
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div ref={ref} className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKey}
        aria-haspopup="menu"
        aria-expanded={open}
        className="px-3 py-1 border rounded-md bg-white"
      >
        {buttonLabel ?? (options.find((o) => o.value === value as any)?.label ?? 'Select')}
      </button>

      {open ? (
        <ul
          role="menu"
          className="mt-2 bg-white border rounded-md shadow-sm w-44 p-1"
          onKeyDown={handleKey}
        >
          {options.map((opt, i) => {
            const sel = opt.value === value
            const hl = i === highlight
            return (
              <li
                key={String(opt.value)}
                role="menuitem"
                tabIndex={-1}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => {
                  onChange?.(opt.value)
                  setOpen(false)
                }}
                className={`px-2 py-1 rounded cursor-pointer ${hl ? 'bg-gray-100' : ''} ${sel ? 'font-semibold' : ''}`}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
