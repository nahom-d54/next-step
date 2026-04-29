export type Storage = {
  get<T = unknown>(key: string): T | null
  /**
   * Store a value. Optionally provide `ttlMs` to expire the value after that many milliseconds.
   */
  set<T = unknown>(key: string, value: T, ttlMs?: number): boolean
  remove(key: string): boolean
  /** Clear all stored keys (localStorage or in-memory store) */
  clear(): boolean
  // Backwards-compatible aliases
  getItem?<T = unknown>(key: string): T | null
  setItem?<T = unknown>(key: string, value: T): void
}

const isLocalStorageAvailable = (() => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false
    const key = '__test_storage__'
    window.localStorage.setItem(key, '1')
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
})()

const memoryStore = new Map<string, string>()

type Wrapper = {
  __val: unknown
  __expires: number | null
}

export const storage: Storage = {
  get(key) {
    if (isLocalStorageAvailable) {
      try {
        const v = window.localStorage.getItem(key)
        return v === null ? null : (JSON.parse(v) as any)
      } catch (err) {
        try {
          const v = window.localStorage.getItem(key)
          return v === null ? null : (v as any)
        } catch {
          return null
        }
      }
    }
    const v = memoryStore.get(key)
    if (typeof v === 'undefined') return null
    try {
      const parsed = JSON.parse(v)
      // support our wrapped format with ttl
      if (parsed && typeof parsed === 'object' && ('__val' in parsed || '__expires' in parsed)) {
        const w = parsed as Wrapper
        if (w.__expires && Date.now() > w.__expires) {
          memoryStore.delete(key)
          return null
        }
        return w.__val as any
      }
      return parsed as any
    } catch {
      return v as any
    }
  },

  set(key, value, ttlMs) {
    const wrapper: Wrapper = { __val: value, __expires: typeof ttlMs === 'number' ? Date.now() + ttlMs : null }
    const s = (() => {
      try {
        return JSON.stringify(wrapper)
      } catch {
        // fallback to storing a stringified primitive
        try {
          return JSON.stringify(String(value))
        } catch {
          return String(value)
        }
      }
    })()

    if (isLocalStorageAvailable) {
      try {
        window.localStorage.setItem(key, s)
        return true
      } catch {
        return false
      }
    }

    try {
      memoryStore.set(key, s)
      return true
    } catch {
      return false
    }
  },

  remove(key) {
    if (isLocalStorageAvailable) {
      try {
        window.localStorage.removeItem(key)
        return true
      } catch {
        return false
      }
    }

    try {
      return memoryStore.delete(key)
    } catch {
      return false
    }
  },

  clear() {
    if (isLocalStorageAvailable) {
      try {
        window.localStorage.clear()
        return true
      } catch {
        return false
      }
    }

    try {
      memoryStore.clear()
      return true
    } catch {
      return false
    }
  },

  // Backwards-compatible aliases
  getItem(key) {
    return this.get(key)
  },
  setItem(key, value) {
    // deliberately ignore the boolean return for the old API
    // default to no TTL for legacy API
    // @ts-ignore
    this.set(key, value)
  },
}

export default storage
