import type { ExportFormat } from "./types.js";

export const EXPORT_FORMATS: readonly ExportFormat[] = [
  "json",
  "markdown",
  "csv",
] as const;

export function formatLabel(format: ExportFormat): string {
  switch (format) {
    case "json":
      return "JSON";
    case "markdown":
      return "Markdown";
    case "csv":
      return "CSV";
    default: {
      const _exhaustive: never = format;
      return _exhaustive;
    }
  }
}
