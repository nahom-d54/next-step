import { useMemo } from 'react';
import type { TaskTreeProps, Task } from '../types';
import { TaskNode } from './TaskNode';
import { TreeControls } from './TreeControls';
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
  const { expandedIds, selectedId, toggle, select, expandAll, collapseAll } =
    useTreeState();

  const { totalTaskCount, expandableIds } = useMemo(() => {
    const stats = {
      totalTaskCount: 0,
      expandableIds: [] as string[],
    };

    const visit = (items: Task[]) => {
      items.forEach((task) => {
        stats.totalTaskCount += 1;
        const children = task.children ?? [];

        if (children.length > 0) {
          stats.expandableIds.push(task.id);
          visit(children);
        }
      });
    };

    visit(tasks);
    return stats;
  }, [tasks]);

  const handleExpandAll = () => {
    const idsToExpand = expandableIds.filter((id) => !expandedIds.has(id));

    if (idsToExpand.length === 0) {
      return;
    }

    expandAll(expandableIds);
    idsToExpand.forEach((id) => onExpand?.(id));
  };

  const handleCollapseAll = () => {
    if (expandedIds.size === 0) {
      return;
    }

    const idsToCollapse = Array.from(expandedIds);
    collapseAll();
    idsToCollapse.forEach((id) => onCollapse?.(id));
  };

  /**
   * Recursively render the task tree
   * Implements the Composite pattern - uniform treatment of leaf and composite nodes
   */
  const renderTree = (items: Task[], depth = 0): React.ReactNode => {
    return items.map((task) => {
      const children = task.children ?? [];
      const isExpanded = expandedIds.has(task.id);
      const hasChildren = children.length > 0;

      return (
        <div key={task.id} className="task-tree__item">
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
            <div className="task-tree__children" role="group">
              {renderTree(children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div
      className="task-tree-wrapper"
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
      }}
    >
      <TreeControls
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        totalTasks={expandableIds.length}
        expandedCount={expandedIds.size}
      />

      <div className="task-tree" role="tree" aria-label="Task tree">
        {totalTaskCount === 0 ? (
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
    </div>
  );
}
