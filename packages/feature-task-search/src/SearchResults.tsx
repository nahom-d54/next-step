import React from 'react'
import type { Task } from './searchStrategies'
import { Card } from '@next-step/ui-components'
import { Skeleton } from '@next-step/ui-components'

type Props = {
  tasks: Task[]
  isLoading?: boolean
}

export default function SearchResults({ tasks, isLoading = false }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return <div>No results</div>
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card key={task.id}>
          <div className="font-semibold">{task.title}</div>
          {task.tags ? <div className="text-sm text-gray-600">{task.tags.join(', ')}</div> : null}
        </Card>
      ))}
    </div>
  )
}
