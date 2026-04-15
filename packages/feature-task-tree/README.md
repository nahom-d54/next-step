# @next-step/feature-task-tree

Recursive task tree visualization feature for the Next-Step Task Breaker application.

## Overview

This package provides components for displaying and interacting with hierarchical task structures. It implements several CBSD (Component-Based Software Development) patterns.

## Components

| Component | Description | CBSD Pattern |
|-----------|-------------|--------------|
| `TaskTree` | Recursive tree renderer | Composite |
| `TaskNode` | Single task display | Encapsulated |
| `TreeControls` | Expand/collapse controls | Command |

## Installation

This package is part of the Next-Step monorepo and is automatically available to other workspace packages.

```bash
# From the monorepo root
pnpm install
```

## Usage

```tsx
import {
  TaskTree,
  TreeControls,
  useTreeState,
  type Task
} from '@next-step/feature-task-tree';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Project Setup',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    children: [
      {
        id: '1-1',
        title: 'Initialize repository',
        status: 'completed',
        priority: 'high',
        parentId: '1',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ],
  },
];

function MyTaskView() {
  const { expandedIds, expandAll, collapseAll } = useTreeState();
  
  // Get all task IDs that have children
  const getExpandableIds = (tasks: Task[]): string[] => {
    return tasks.flatMap(task => [
      ...(task.children?.length ? [task.id] : []),
      ...(task.children ? getExpandableIds(task.children) : []),
    ]);
  };

  return (
    <div>
      <TreeControls
        onExpandAll={() => expandAll(getExpandableIds(tasks))}
        onCollapseAll={collapseAll}
        totalTasks={tasks.length}
        expandedCount={expandedIds.size}
      />
      <TaskTree
        tasks={tasks}
        onSelect={(task) => console.log('Selected:', task)}
        onExpand={(id) => console.log('Expanded:', id)}
        onCollapse={(id) => console.log('Collapsed:', id)}
      />
    </div>
  );
}
```

## API Reference

### Components

#### `TaskTree`

Main container component that renders a recursive tree of tasks.

```tsx
interface TaskTreeProps {
  tasks: Task[];                          // Array of root-level tasks
  onSelect?: (task: Task) => void;        // Called when a task is selected
  onExpand?: (taskId: string) => void;    // Called when a node is expanded
  onCollapse?: (taskId: string) => void;  // Called when a node is collapsed
}
```

#### `TaskNode`

Individual task display component. Usually used internally by TaskTree.

```tsx
interface TaskNodeProps {
  task: Task;                             // Task data to display
  depth: number;                          // Nesting depth for indentation
  isExpanded: boolean;                    // Whether node is expanded
  isSelected: boolean;                    // Whether node is selected
  onSelect?: (task: Task) => void;        // Called when task is clicked
  onToggle?: (taskId: string) => void;    // Called when expand/collapse toggled
}
```

#### `TreeControls`

Toolbar component for bulk tree operations.

```tsx
interface TreeControlsProps {
  onExpandAll: () => void;                // Expand all nodes
  onCollapseAll: () => void;              // Collapse all nodes
  totalTasks: number;                     // Total task count
  expandedCount: number;                  // Currently expanded count
}
```

### Hooks

#### `useTreeState`

Hook for managing tree expand/collapse and selection state.

```tsx
const {
  expandedIds,    // Set<string> - Currently expanded node IDs
  selectedId,     // string | undefined - Currently selected node ID
  expand,         // (id: string) => void - Expand single node
  collapse,       // (id: string) => void - Collapse single node
  toggle,         // (id: string) => void - Toggle node state
  expandAll,      // (ids: string[]) => void - Expand all given nodes
  collapseAll,    // () => void - Collapse all nodes
  select,         // (id: string | undefined) => void - Select a node
  isExpanded,     // (id: string) => boolean - Check if node is expanded
} = useTreeState(initialExpandedIds?: string[]);
```

### Types

#### `Task`

Core task data model.

```tsx
interface Task {
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

type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
```

## CBSD Patterns

### Composite Pattern (TaskTree)

The TaskTree component implements the Composite pattern, allowing uniform treatment of individual tasks and task hierarchies. Each task can contain child tasks, creating a recursive tree structure.

```
Task (Component Interface)
├── Task (Leaf or Composite)
│   ├── Task (Leaf)
│   └── Task (Leaf)
└── Task (Leaf)
```

**Benefits:**
- Uniform interface for all tree nodes
- Easy to add new levels of nesting
- Client code treats leaves and composites uniformly

### Encapsulated Component (TaskNode)

TaskNode is a black-box component that:
- Exposes only its public interface (props)
- Hides internal implementation details
- Can be replaced without affecting consumers

**Benefits:**
- Clear separation of concerns
- Easy to test in isolation
- Allows for UI component substitution (e.g., when ui-components package is ready)

### Command Pattern (TreeControls)

TreeControls encapsulates expand/collapse operations as discrete commands:
- `onExpandAll` - Command to expand all nodes
- `onCollapseAll` - Command to collapse all nodes

**Benefits:**
- Operations are first-class objects
- Easy to extend with undo/redo
- Operations can be logged, queued, or composed

## Dependencies

### Peer Dependencies

- `react` ^19.0.0
- `react-dom` ^19.0.0

### Future Dependencies (when available)

- `@next-step/ui-components` - UI primitives (Card, Badge, Button)
- `@next-step/utils` - Utility functions (tree operations)

## Development

```bash
# Type check
pnpm --filter @next-step/feature-task-tree typecheck

# Build
pnpm --filter @next-step/feature-task-tree build

# Watch mode
pnpm --filter @next-step/feature-task-tree dev
```

## Roadmap

- [ ] Integrate with `@next-step/ui-components` when available
- [ ] Add drag-and-drop reordering
- [ ] Add keyboard navigation
- [ ] Add virtualization for large trees
- [ ] Add accessibility improvements (ARIA)

## Author

Student A - Core Task Management

## License

MIT
