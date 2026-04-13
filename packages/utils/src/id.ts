export function generateId(prefix = '', size = 8): string {
  const random = Math.random().toString(36).slice(2, 2 + size)
  const timestamp = Date.now().toString(36)
  const id = `${timestamp}${random}`
  return prefix ? `${prefix}-${id}` : id
}
