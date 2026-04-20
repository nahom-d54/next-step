export type Storage = {
  getItem<T = unknown>(key: string): T | null
  setItem<T = unknown>(key: string, value: T): void
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
  getItem(key) {
    if (isLocalStorageAvailable) {
      const v = window.localStorage.getItem(key)
      try {
        return v === null ? null : JSON.parse(v)
      } catch {
        return v as any
      }
    }

    const v = memoryStore.get(key)
    if (typeof v === 'undefined') return null
    try {
      return JSON.parse(v)
    } catch {
      return v as any
    }
  },

  setItem(key, value) {
    const s = JSON.stringify(value)
    if (isLocalStorageAvailable) {
      window.localStorage.setItem(key, s)
      return
    }
    memoryStore.set(key, s)
  },
}

export default storage
