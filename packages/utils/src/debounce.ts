type DebouncedFunction<T extends (...args: any[]) => void> = ((...args: Parameters<T>) => void) & {
  cancel: () => void
  flush: () => void
}

export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[] | null = null

  const call = (...args: any[]) => {
    lastArgs = args
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (lastArgs) fn(...(lastArgs as any))
      lastArgs = null
    }, wait)
  }

  call.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    lastArgs = null
  }

  call.flush = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (lastArgs) {
      fn(...(lastArgs as any))
      lastArgs = null
    }
  }

  return call as DebouncedFunction<T>
}

export default debounce
