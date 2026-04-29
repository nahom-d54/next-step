import { memo, useMemo } from 'react'
import type { Task } from './searchStrategies'
import { coordinateTasks, type SearchCriteria } from './SearchCoordination'
import { Card } from '@next-step/ui-components'
import { Skeleton } from '@next-step/ui-components'

type Props = {
  tasks: Task[]
  isLoading?: boolean
  criteria?: SearchCriteria
}

function SearchResults({ tasks, isLoading = false, criteria }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  }

  const filtered = useMemo(
    () => (criteria ? coordinateTasks(tasks, criteria) : tasks),
    [tasks, criteria],
  )

  if (!filtered || filtered.length === 0) {
    return (
      <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-600">
        No results found
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {filtered.map((task) => (
        <Card key={task.id}>
          <div className="font-semibold">{task.title}</div>
          {task.tags ? <div className="text-sm text-gray-600">{task.tags.join(', ')}</div> : null}
        </Card>
      ))}
    </div>
  )
}

export default memo(SearchResults)
