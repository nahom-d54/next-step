# Recursive Task Breaker - Next Step

A Component-Based Software Development (CBSD) monorepo for a Recursive Task Breaker system.

## Component Packages Developed

### 1. `@next-step/ui-components`
Reusable, encapsulated UI primitives following the CBSD component model.
- **`Card`**: Content container with optional title, header/body layout.
- **`Badge`**: Status/tag display with variant styling (default, success, warning, danger, info).
- **`Progress`**: Progress bar visualization with label and configurable color.

### 2. `@next-step/feature-task-analytics` (Insights & Tracking)
Dashboard components showing task completion rates and productivity metrics.
- **`AnalyticsDashboard`**: Composite overview displaying stat cards, progress bars, and status badges.
- **`StatCard`**: Individual metric display with trend indicators.
- **`CompletionChart`**: Visual task completion over time using Recharts.
- **`ProductivityScore`**: Displays daily and weekly productivity metrics alongside trend badges.

### 3. `@next-step/feature-task-history` (Insights & Tracking)
Centralized state management for task versioning and change tracking.
- **`useHistory`**: Custom React hook for managing Undo/Redo operations and state persistence across task modifications.

### 4. `@next-step/utils`
Common utility functions (pure functions / Objects pattern).
- **`date.ts`**: Helper functions for parsing and formatting dates (`formatDate`, `timeAgo`, `parseDate`).
- **`id.ts`**: Alphanumeric ID generation utility (`generateId`).
