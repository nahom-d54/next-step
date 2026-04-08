import type { TreeControlsProps } from '../types';

/**
 * TreeControls Component
 *
 * Expand/collapse all controls for the tree.
 * CBSD Pattern: Command Pattern (encapsulates actions as objects)
 *
 * The Command pattern is used here to encapsulate tree operations
 * as discrete commands that can be:
 * - Triggered independently
 * - Extended for undo/redo functionality
 * - Logged or tracked
 *
 * TODO: Compose with Button from @next-step/ui-components
 */
export function TreeControls({
  onExpandAll,
  onCollapseAll,
  totalTasks,
  expandedCount,
}: TreeControlsProps) {
  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <div
      className="tree-controls"
      role="toolbar"
      aria-label="Tree controls"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        borderBottom: '1px solid #e5e7eb',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Expand All Command - TODO: Replace with Button component */}
      <button
        style={buttonStyle}
        onClick={onExpandAll}
        aria-label="Expand all tasks"
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
      >
        Expand All
      </button>

      {/* Collapse All Command - TODO: Replace with Button component */}
      <button
        style={buttonStyle}
        onClick={onCollapseAll}
        aria-label="Collapse all tasks"
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
      >
        Collapse All
      </button>

      {/* Status indicator */}
      <span
        style={{
          marginLeft: 'auto',
          fontSize: '13px',
          color: '#6b7280',
        }}
      >
        {expandedCount} / {totalTasks} expanded
      </span>
    </div>
  );
}
