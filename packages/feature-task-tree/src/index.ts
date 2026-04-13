/**
 * @next-step/feature-task-tree
 *
 * Recursive task tree visualization feature.
 * Part of the Next-Step Task Breaker application.
 *
 * CBSD Patterns Implemented:
 * - Composite Pattern (TaskTree) - Recursive tree structure
 * - Encapsulated Component (TaskNode) - Black-box component
 * - Command Pattern (TreeControls) - Discrete tree operations
 *
 * @packageDocumentation
 */

// Components
export { TaskTree } from './components/TaskTree';
export { TaskNode } from './components/TaskNode';
export { TreeControls } from './components/TreeControls';

// Hooks
export { useTreeState } from './hooks/useTreeState';
export type { UseTreeStateReturn } from './hooks/useTreeState';

// Types
export type {
  Task,
  TaskStatus,
  TaskPriority,
  TreeState,
  TaskTreeProps,
  TaskNodeProps,
  TreeControlsProps,
} from './types';
