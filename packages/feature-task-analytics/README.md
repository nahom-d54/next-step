# Feature: Task Analytics

This package provides task analytics components for the Next Step Task Breaker application. It displays task completion rates, time tracking, and productivity metrics.

## Architecture & CBSD Principles

This package implements the **Observer Pattern** (reactive updates) to display task data. It composes shared group packages to build complex features.

### Components

- **\`AnalyticsDashboard\`**: Overview dashboard utilizing \`Card\` and \`Progress\` from \`ui-components\`. It provides a high-level summary of tasks.
- **\`CompletionChart\`**: Displays task completion over time, utilizing \`Card\` and \`date\` utilities.
- **\`ProductivityScore\`**: Calculates and displays daily and weekly productivity metrics, using \`Badge\` and \`Progress\` components.

### Dependencies

- \`@next-step/ui-components\`
- \`@next-step/utils\`

This is an encapsulated feature package that exports only its public interfaces.
