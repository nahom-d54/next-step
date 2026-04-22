export type Storage = {
  get<T = unknown>(key: string): T | null
  set<T = unknown>(key: string, value: T): boolean
  remove(key: string): boolean
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
      return JSON.parse(v) as any
    } catch {
      return v as any
    }
  },

  set(key, value) {
    const s = (() => {
      try {
        return JSON.stringify(value)
      } catch {
        return String(value)
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

  // Backwards-compatible aliases
  getItem(key) {
    return this.get(key)
  },
  setItem(key, value) {
    // deliberately ignore the boolean return for the old API
    this.set(key, value)
  },
}

export default storage
