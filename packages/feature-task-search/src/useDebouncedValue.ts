import { useEffect, useRef, useState } from 'react'
import { debounce } from '@next-step/utils'

type DebounceControls = {
  flush: () => void
  cancel: () => void
}

export default function useDebouncedValue<T>(
  value: T,
  delay = 300,
): [T, DebounceControls] {
  const [debounced, setDebounced] = useState<T>(value)
  const debouncedRef = useRef<ReturnType<typeof debounce> | null>(null)

  useEffect(() => {
    debouncedRef.current = debounce((v: T) => setDebounced(v), delay)
    // call immediately for the current value so initial state is correct
    debouncedRef.current(value)

    return () => {
      debouncedRef.current?.cancel()
      debouncedRef.current = null
    }
  }, [delay])

  useEffect(() => {
    debouncedRef.current?.(value)
  }, [value])

  const flush = () => debouncedRef.current?.flush()
  const cancel = () => debouncedRef.current?.cancel()

  return [debounced, { flush: flush ?? (() => {}), cancel: cancel ?? (() => {}) }]
}
