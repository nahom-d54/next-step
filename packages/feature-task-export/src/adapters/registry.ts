import type { ExportAdapter, ExportFormat } from "../types.js";

import { CsvExportAdapter } from "./csvAdapter.js";
import { JsonExportAdapter } from "./jsonAdapter.js";
import { MarkdownExportAdapter } from "./markdownAdapter.js";

const jsonAdapter = new JsonExportAdapter();
const markdownAdapter = new MarkdownExportAdapter();
const csvAdapter = new CsvExportAdapter();

const byFormat: Record<ExportFormat, ExportAdapter> = {
  json: jsonAdapter,
  markdown: markdownAdapter,
  csv: csvAdapter,
};

/**
 * Returns the export adapter for the given format (Adapter pattern entry point).
 */
export function getExportAdapter(format: ExportFormat): ExportAdapter {
  return byFormat[format];
}
