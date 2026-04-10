import type { TaskNodeProps, TaskPriority, TaskStatus } from '../types';

/**
 * TaskNode Component
 *
 * Displays a single task item in the tree.
 * CBSD Pattern: Encapsulated Component
 *
 * This component is a black-box that:
 * - Exposes only its public interface (props)
 * - Hides internal implementation details
 * - Can be replaced without affecting consumers
 *
 * TODO: Compose with Card, Badge from @next-step/ui-components
 * Currently uses basic HTML as ui-components is not yet implemented.
 */
export function TaskNode({
  task,
  depth,
  isExpanded,
  isSelected,
  onSelect,
  onToggle,
}: TaskNodeProps) {
  const childCount = task.children?.length ?? 0;
  const hasChildren = childCount > 0;

  const handleClick = () => {
    onSelect?.(task);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(task);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.(task.id);
  };

  // Status color mapping
  const statusColors: Record<TaskStatus, string> = {
    pending: '#6b7280',
    'in-progress': '#3b82f6',
    completed: '#10b981',
    cancelled: '#ef4444',
  };

  // Priority color mapping
  const priorityColors: Record<TaskPriority, string> = {
    low: '#9ca3af',
    medium: '#f59e0b',
    high: '#f97316',
    urgent: '#dc2626',
  };

  const statusLabel = task.status.replace('-', ' ');

  return (
    <div
      className={`task-node ${isSelected ? 'task-node--selected' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px',
        paddingLeft: `${depth * 24 + 8}px`,
        backgroundColor: isSelected ? '#e0f2fe' : 'transparent',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="treeitem"
      tabIndex={0}
      aria-level={depth + 1}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
    >
      {/* Expand/Collapse Toggle */}
      {hasChildren ? (
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            fontSize: '12px',
            color: '#6b7280',
          }}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      ) : (
        <span style={{ width: '24px' }} aria-hidden="true" />
      )}

      {/* Task Content - TODO: Replace with Card component */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontWeight: 500,
            color: task.status === 'completed' ? '#9ca3af' : '#111827',
            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </span>

        {/* Status Badge - TODO: Replace with Badge component */}
        <span
          style={{
            fontSize: '12px',
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor: statusColors[task.status] + '20',
            color: statusColors[task.status],
          }}
        >
          {statusLabel}
        </span>

        {/* Priority Badge - TODO: Replace with Badge component */}
        <span
          style={{
            fontSize: '12px',
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor: priorityColors[task.priority] + '20',
            color: priorityColors[task.priority],
          }}
        >
          {task.priority}
        </span>

        {/* Children count indicator */}
        {hasChildren && (
          <span
            style={{
              fontSize: '11px',
              color: '#9ca3af',
            }}
          >
            ({childCount} subtask{childCount !== 1 ? 's' : ''})
          </span>
        )}
      </div>
    </div>
  );
}
