import type { ExportAdapter, ExportTaskNode } from "../types.js";

/**
 * Serializes the task tree as pretty-printed JSON.
 */
export class JsonExportAdapter implements ExportAdapter {
  readonly format = "json" as const;

  serialize(tasks: ExportTaskNode[]): string {
    return `${JSON.stringify(tasks, null, 2)}\n`;
  }

  mimeType(): string {
    return "application/json";
  }

  fileExtension(): string {
    return "json";
  }
}
