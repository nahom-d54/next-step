import type { Task } from './searchStrategies'

export type SearchCriteria = {
  query?: string
  selectedTagIds?: string[]
}

// Filters tasks by query (title) and selected tag ids.
export function coordinateTasks(tasks: Task[], criteria: SearchCriteria): Task[] {
  const { query = '', selectedTagIds = [] } = criteria || {}

  const normalizedQuery = String(query).trim().toLowerCase()
  const hasQuery = normalizedQuery.length > 0
  const hasTags = Array.isArray(selectedTagIds) && selectedTagIds.length > 0

  return tasks.filter((task) => {
    // Tag check: if tags are selected, task must have at least one matching tag id
    if (hasTags) {
      const taskTags = Array.isArray(task.tags) ? task.tags : []
      const matched = taskTags.some((t) => selectedTagIds.includes(String(t)))
      if (!matched) return false
    }

    // Query check: if query present, match against title (case-insensitive)
    if (hasQuery) {
      const title = String(task.title ?? '')
      if (!title.toLowerCase().includes(normalizedQuery)) return false
    }

    return true
  })
}

export default { coordinateTasks }
