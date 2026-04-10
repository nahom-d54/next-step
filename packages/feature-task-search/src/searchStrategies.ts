export type Task = {
  id: string
  title: string
  tags?: string[]
  dueDate?: string
  [key: string]: unknown
}

export interface SearchStrategy {
  key: string
  label: string
  search(tasks: Task[], query: string): Task[]
}

export const searchByTitle: SearchStrategy = {
  key: 'title',
  label: 'Search by title',
  search(tasks, query) {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return tasks
    }

    return tasks.filter((task) =>
      String(task.title ?? '').toLowerCase().includes(normalizedQuery),
    )
  },
}

export const searchByPriority: SearchStrategy = {
  key: 'priority',
  label: 'Filter by priority',
  search(tasks, query) {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return tasks

    return tasks.filter((task) =>
      String((task.priority as string) ?? '')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  },
}

export const searchByStatus: SearchStrategy = {
  key: 'status',
  label: 'Filter by status',
  search(tasks, query) {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return tasks

    return tasks.filter((task) =>
      String((task.status as string) ?? '').toLowerCase().includes(normalizedQuery),
    )
  },
}

export const searchStrategies: SearchStrategy[] = [
  searchByTitle,
  searchByPriority,
  searchByStatus,
]

export function getSearchStrategy(key: string): SearchStrategy {
  const strategy = searchStrategies.find((item) => item.key === key)
  if (!strategy) {
    return searchByTitle
  }
  return strategy
}
