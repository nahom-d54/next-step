import type { TaskTemplate } from "./types.js";

export interface TemplateListProps {
  templates: TaskTemplate[];
  selectedTemplateId?: string;
  onSelect?: (template: TaskTemplate) => void;
}

export function TemplateList({
  templates,
  selectedTemplateId,
  onSelect,
}: TemplateListProps) {
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      {templates.map((template) => {
        const selected = selectedTemplateId === template.id;
        return (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect?.(template)}
            style={{
              textAlign: "left",
              border: selected ? "1px solid #2563eb" : "1px solid #e5e7eb",
              background: selected ? "#eff6ff" : "#ffffff",
              borderRadius: "0.75rem",
              padding: "0.875rem",
              cursor: "pointer",
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, color: "#111827" }}>
              {template.name}
            </p>
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
  );
}
