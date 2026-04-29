import { memo } from 'react'
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

  const filtered = criteria ? coordinateTasks(tasks, criteria) : tasks

  if (!filtered || filtered.length === 0) {
    return <div>No results</div>
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
