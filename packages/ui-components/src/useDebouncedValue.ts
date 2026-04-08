import { useEffect, useRef, useState } from 'react'

type DebounceControls = {
  flush: () => void
  cancel: () => void
}

export default function useDebouncedValue<T>(
  value: T,
  delay = 300,
): [T, DebounceControls] {
  const [debounced, setDebounced] = useState<T>(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latestRef = useRef<T>(value)

  useEffect(() => {
    latestRef.current = value
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setDebounced(latestRef.current)
      timerRef.current = null
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [value, delay])

  const flush = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setDebounced(latestRef.current)
  }

  const cancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return [debounced, { flush, cancel }]
}
