export type ExportFormat = 'json' | 'markdown' | 'csv';

export interface ExportTaskNode {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  children?: ExportTaskNode[];
}

export interface ExportAdapter {
  readonly format: ExportFormat;
  serialize(tasks: ExportTaskNode[]): string;
  mimeType(): string;
  fileExtension(): string;
}

export interface ExportRequest {
  format: ExportFormat;
  tasks: ExportTaskNode[];
}

export interface ExportPreviewData {
  format: ExportFormat;
  content: string;
}
