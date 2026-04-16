import type { ExportAdapter, ExportTaskNode } from "../types.js";

function escapeInline(text: string): string {
  return text
    .replaceAll("\\", "\\\\")
    .replaceAll("*", "\\*")
    .replaceAll("_", "\\_")
    .replaceAll("`", "\\`");
}

function renderNodes(nodes: ExportTaskNode[], depth: number): string[] {
  const indent = "  ".repeat(depth);
  const lines: string[] = [];

  for (const node of nodes) {
    const check = node.completed ? "[x]" : "[ ]";
    const title = escapeInline(node.title);
    lines.push(`${indent}- ${check} **${title}** \`id:${escapeInline(node.id)}\``);

    if (node.description?.trim()) {
      const oneLine = escapeInline(node.description.trim()).replaceAll("\n", " ");
      lines.push(`${indent}  _${oneLine}_`);
    }

    if (node.children?.length) {
      lines.push(...renderNodes(node.children, depth + 1));
    }
  }

  return lines;
}

/**
 * Serializes the task tree as a nested Markdown checklist.
 */
export class MarkdownExportAdapter implements ExportAdapter {
  readonly format = "markdown" as const;

  serialize(tasks: ExportTaskNode[]): string {
    const body = renderNodes(tasks, 0).join("\n");
    return `# Tasks\n\n${body}\n`;
  }

  mimeType(): string {
    return "text/markdown; charset=utf-8";
  }

  fileExtension(): string {
    return "md";
  }
}
