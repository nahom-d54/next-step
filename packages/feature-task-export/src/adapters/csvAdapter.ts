import type { ExportAdapter, ExportTaskNode } from "../types.js";

type CsvRow = {
  id: string;
  parent_id: string;
  title: string;
  description: string;
  completed: string;
};

function csvCell(value: string | boolean | undefined): string {
  const s = value === undefined || value === null ? "" : String(value);
  if (/[",\r\n]/.test(s)) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

function flattenTasks(
  nodes: ExportTaskNode[],
  parentId: string | null,
  rows: CsvRow[],
): void {
  for (const node of nodes) {
    rows.push({
      id: node.id,
      parent_id: parentId ?? "",
      title: node.title,
      description: node.description ?? "",
      completed: node.completed === true ? "true" : "false",
    });
    if (node.children?.length) {
      flattenTasks(node.children, node.id, rows);
    }
  }
}

/**
 * Flattens the task tree to CSV with parent references for hierarchy.
 */
export class CsvExportAdapter implements ExportAdapter {
  readonly format = "csv" as const;

  serialize(tasks: ExportTaskNode[]): string {
    const rows: CsvRow[] = [];
    flattenTasks(tasks, null, rows);

    const header = ["id", "parent_id", "title", "description", "completed"];
    const lines = [
      header.join(","),
      ...rows.map((r) =>
        [
          csvCell(r.id),
          csvCell(r.parent_id),
          csvCell(r.title),
          csvCell(r.description),
          csvCell(r.completed),
        ].join(","),
      ),
    ];
    return `${lines.join("\n")}\n`;
  }

  mimeType(): string {
    return "text/csv; charset=utf-8";
  }

  fileExtension(): string {
    return "csv";
  }
}
