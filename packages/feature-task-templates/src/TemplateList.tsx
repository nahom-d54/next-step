import type { TaskTemplate } from "./types.js";

export interface TemplateListProps {
  templates: TaskTemplate[];
  selectedTemplateId?: string;
  onSelect?: (template: TaskTemplate) => void;
  title?: string;
  emptyMessage?: string;
}

export function TemplateList({
  templates,
  selectedTemplateId,
  onSelect,
  title = "Template library",
  emptyMessage = "No templates available yet.",
}: TemplateListProps) {
  if (templates.length === 0) {
    return (
      <section
        aria-live="polite"
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "0.75rem",
          padding: "0.875rem",
          background: "#ffffff",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>{title}</p>
        <p
          style={{ margin: "0.5rem 0 0", color: "#6b7280", fontSize: "0.9rem" }}
        >
          {emptyMessage}
        </p>
      </section>
    );
  }

  return (
    <section aria-label={title} style={{ display: "grid", gap: "0.75rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>{title}</p>
        <span
          style={{
            borderRadius: "999px",
            background: "#f3f4f6",
            color: "#374151",
            padding: "0.125rem 0.5rem",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {templates.length}
        </span>
      </div>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {templates.map((template) => {
          const selected = selectedTemplateId === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect?.(template)}
              aria-pressed={selected}
              style={{
                textAlign: "left",
                border: selected ? "1px solid #2563eb" : "1px solid #e5e7eb",
                background: selected ? "#eff6ff" : "#ffffff",
                borderRadius: "0.75rem",
                padding: "0.875rem",
                cursor: "pointer",
                boxShadow: selected
                  ? "0 0 0 2px rgba(37, 99, 235, 0.15)"
                  : "0 1px 2px rgba(0, 0, 0, 0.04)",
                transition: "all 150ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                }}
              >
                <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>
                  {template.name}
                </p>
                <span
                  style={{
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    background: selected ? "#dbeafe" : "#f3f4f6",
                    color: selected ? "#1d4ed8" : "#374151",
                    padding: "0.15rem 0.5rem",
                    fontWeight: 600,
                  }}
                >
                  {template.category}
                </span>
              </div>

              <p
                style={{
                  margin: "0.35rem 0 0",
                  color: "#4b5563",
                  fontSize: "0.9rem",
                }}
              >
                {template.description}
              </p>

              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.375rem",
                }}
              >
                {template.tags.map((tag) => (
                  <span
                    key={`${template.id}-${tag}`}
                    style={{
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      background: "#f3f4f6",
                      color: "#374151",
                      padding: "0.15rem 0.5rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
