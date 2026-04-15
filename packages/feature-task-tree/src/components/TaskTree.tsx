import type { TaskTreeProps, Task } from '../types';
import { TaskNode } from './TaskNode';
import { useTreeState } from '../hooks/useTreeState';

/**
 * TaskTree Component
 *
 * Recursive task tree visualization.
 * CBSD Pattern: Composite Pattern (recursive composition)
 *
 * The Composite pattern allows uniform treatment of individual tasks
 * and task hierarchies. Each task can contain child tasks, creating
 * a recursive tree structure that is rendered uniformly regardless of depth.
 *
 * TODO: Compose with Tree from @next-step/ui-components
 * TODO: Use tree utilities from @next-step/utils
 */
export function TaskTree({
  tasks,
  onSelect,
  onExpand,
  onCollapse,
}: TaskTreeProps) {
  const { expandedIds, selectedId, toggle, select } = useTreeState();

  /**
   * Recursively render the task tree
   * Implements the Composite pattern - uniform treatment of leaf and composite nodes
   */
  const renderTree = (items: Task[], depth = 0): React.ReactNode => {
    return items.map((task) => {
      const isExpanded = expandedIds.has(task.id);
      const hasChildren = task.children && task.children.length > 0;

      return (
        <div key={task.id} className="task-tree__item" role="group">
          <TaskNode
            task={task}
            depth={depth}
            isExpanded={isExpanded}
            isSelected={selectedId === task.id}
            onSelect={(t) => {
              select(t.id);
              onSelect?.(t);
            }}
            onToggle={(id) => {
              toggle(id);
              if (isExpanded) {
                onCollapse?.(id);
              } else {
                onExpand?.(id);
              }
            }}
          />

          {/* Render children if expanded - recursive call */}
          {hasChildren && isExpanded && (
            <div className="task-tree__children">
              {renderTree(task.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className="task-tree"
      role="tree"
      aria-label="Task tree"
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
      }}
    >
      {tasks.length === 0 ? (
        <div
          className="task-tree__empty"
          style={{
            padding: '24px',
            textAlign: 'center',
            color: '#9ca3af',
          }}
        >
          No tasks to display
        </div>
      ) : (
        renderTree(tasks)
      )}
    </div>
  );
}
