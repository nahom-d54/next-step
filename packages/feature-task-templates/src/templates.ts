import type { TaskTemplate } from "./types.js";

export const defaultTaskTemplates: TaskTemplate[] = [
  {
    id: "project-plan",
    name: "Project Plan",
    category: "Planning",
    description: "Structured template for scoping and delivering a project.",
    tags: ["project", "planning", "delivery"],
    rootTasks: [
      {
        id: "scope",
        title: "Define scope and objectives",
        children: [
          { id: "scope-1", title: "Write success criteria" },
          { id: "scope-2", title: "Identify stakeholders" },
        ],
      },
      {
        id: "execution",
        title: "Plan execution",
        children: [
          { id: "execution-1", title: "Create timeline" },
          { id: "execution-2", title: "Assign responsibilities" },
        ],
      },
    ],
  },
  {
    id: "daily-routine",
    name: "Daily Routine",
    category: "Personal Productivity",
    description: "A repeatable daily structure for focused work and recovery.",
    tags: ["daily", "routine", "personal"],
    rootTasks: [
      {
        id: "morning",
        title: "Morning startup",
        children: [
          { id: "morning-1", title: "Review today's priorities" },
          { id: "morning-2", title: "Block focus sessions" },
        ],
      },
      {
        id: "evening",
        title: "Evening shutdown",
        children: [
          { id: "evening-1", title: "Capture completed tasks" },
          { id: "evening-2", title: "Prepare tomorrow's top 3 tasks" },
        ],
      },
    ],
  },
  {
    id: "sprint-planning",
    name: "Sprint Planning",
    category: "Team Workflow",
    description: "Template for planning and committing work in agile sprints.",
    tags: ["sprint", "agile", "team"],
    rootTasks: [
      {
        id: "backlog",
        title: "Prepare backlog",
        children: [
          { id: "backlog-1", title: "Prioritize stories" },
          { id: "backlog-2", title: "Add acceptance criteria" },
        ],
      },
      {
        id: "commitment",
        title: "Finalize sprint commitment",
        children: [
          { id: "commitment-1", title: "Estimate capacity" },
          { id: "commitment-2", title: "Confirm sprint goal" },
        ],
      },
    ],
  },
];
