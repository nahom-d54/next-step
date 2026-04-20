import type { ReactElement } from "react";
import type { TaskTemplate, TaskTemplateNode } from "./types.js";

export interface TemplatePreviewProps {
  title?: string;
  template?: TaskTemplate | null;
  nodes?: TaskTemplateNode[];
  emptyMessage?: string;
  maxHeight?: number;
}

function renderTemplateNodes(nodes: TaskTemplateNode[]): ReactElement {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        paddingLeft: "1rem",
        borderLeft: "1px dashed #d1d5db",
        display: "grid",
        gap: "0.4rem",
      }}
    >
      {nodes.map((node) => (
        <li key={node.id}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <span style={{ color: "#111827", fontWeight: 600 }}>
              {node.title}
            </span>
            {node.description ? (
              <span style={{ color: "#4b5563", fontSize: "0.85rem" }}>
                {node.description}
              </span>
            ) : null}
          </div>
          {node.children && node.children.length > 0 ? (
            <div style={{ marginTop: "0.4rem" }}>
              {renderTemplateNodes(node.children)}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function countTemplateNodes(nodes: TaskTemplateNode[]): number {
  return nodes.reduce(
    (acc, node) => acc + 1 + countTemplateNodes(node.children ?? []),
    0,
  );
}

export function TemplatePreview({
  title,
  template,
  nodes,
  emptyMessage = "Select a template to preview its task hierarchy.",
  maxHeight = 380,
}: TemplatePreviewProps) {
  const resolvedNodes = template?.rootTasks ?? nodes ?? [];
  const resolvedTitle = title ?? template?.name ?? "Template structure";
  const totalNodes = countTemplateNodes(resolvedNodes);
  const isEmpty = resolvedNodes.length === 0;

  return (
    <section
      aria-live="polite"
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem",
        padding: "0.875rem",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>
          {resolvedTitle}
        </p>
        {isEmpty ? null : (
          <span
            style={{
              borderRadius: "999px",
              background: "#e5e7eb",
              color: "#374151",
              padding: "0.125rem 0.5rem",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {totalNodes} tasks
          </span>
        )}
      </div>
      <div
        style={{
          marginTop: "0.625rem",
          maxHeight,
          overflowY: "auto",
          paddingRight: "0.25rem",
        }}
      >
        {isEmpty ? (
          <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>
            {emptyMessage}
          </p>
        ) : (
          renderTemplateNodes(resolvedNodes)
        )}
      </div>
    </section>
  );
}
