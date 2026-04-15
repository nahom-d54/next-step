/**
 * @next-step/feature-task-tree
 * Type definitions for the task tree feature
 */

/**
 * Task type definition - core data model for the task tree
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  parentId?: string;
  children?: Task[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Task status enumeration
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

/**
 * Task priority enumeration
 */
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Tree state for expand/collapse management
 */
export interface TreeState {
  expandedIds: Set<string>;
  selectedId?: string;
}

/**
 * TaskTree component props
 * Main container for recursive task rendering
 */
export interface TaskTreeProps {
  /** Array of root-level tasks to display */
  tasks: Task[];
  /** Callback when a task is selected */
  onSelect?: (task: Task) => void;
  /** Callback when a task node is expanded */
  onExpand?: (taskId: string) => void;
  /** Callback when a task node is collapsed */
  onCollapse?: (taskId: string) => void;
}

/**
 * TaskNode component props
 * Individual task item in the tree
 */
export interface TaskNodeProps {
  /** The task data to display */
  task: Task;
  /** Nesting depth for indentation */
  depth: number;
  /** Whether this node is expanded */
  isExpanded: boolean;
  /** Whether this node is selected */
  isSelected: boolean;
  /** Callback when the task is selected */
  onSelect?: (task: Task) => void;
  /** Callback when expand/collapse is toggled */
  onToggle?: (taskId: string) => void;
}

/**
 * TreeControls component props
 * Controls for bulk tree operations
 */
export interface TreeControlsProps {
  /** Callback to expand all nodes */
  onExpandAll: () => void;
  /** Callback to collapse all nodes */
  onCollapseAll: () => void;
  /** Total number of tasks in the tree */
  totalTasks: number;
  /** Number of currently expanded nodes */
  expandedCount: number;
}
