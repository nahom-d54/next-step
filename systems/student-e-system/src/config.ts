import type { ExportTaskNode } from "@next-step/feature-task-export";

export const SYSTEM_TITLE =
  "Student E — productivity & integration (Export + Focus)";

/** Demonstration tasks for export preview and local download coordination. */
export const SAMPLE_EXPORT_TASKS: ExportTaskNode[] = [
  {
    id: "root-1",
    title: "Ship component repository milestone",
    description: "Monorepo + clean streak readiness",
    completed: false,
    children: [
      {
        id: "root-1-a",
        title: "Finalize feature-task-export adapters",
        completed: true,
      },
      {
        id: "root-1-b",
        title: "Polish Pomodoro + focus shell",
        completed: false,
      },
    ],
  },
];

export const FOCUS_MODE_TASK_TITLE = "Deep work: integration review";
