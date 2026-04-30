import { useMemo } from "react";
import type { CSSProperties } from "react";

import type { FocusSession } from "./types.js";

export interface SessionStatsProps {
  sessions: FocusSession[];
  style?: CSSProperties;
  className?: string;
  /** Maximum height for the recent-sessions list. */
  listMaxHeight?: CSSProperties["maxHeight"];
}

function kindLabel(kind: FocusSession["kind"]): string {
  if (kind === "work") {
    return "Focus";
  }
  if (kind === "shortBreak") {
    return "Short break";
  }
  return "Long break";
}

function badgeColor(kind: FocusSession["kind"]): string {
  if (kind === "work") {
    return "#111827";
  }
  if (kind === "shortBreak") {
    return "#059669";
  }
  return "#2563eb";
}

function parseTime(iso: string): number {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : 0;
}

function formatEnded(iso: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) {
    return "—";
  }
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(t);
  } catch {
    return new Date(t).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }
}

/**
 * Summary totals and recent history from logged {@link FocusSession} rows.
 */
export function SessionStats({
  sessions,
  style,
  className,
  listMaxHeight = "12rem",
}: SessionStatsProps) {
  const sorted = useMemo(
    () => [...sessions].sort((a, b) => parseTime(b.endedAt) - parseTime(a.endedAt)),
    [sessions],
  );

  const { focusMinutes, breakMinutes, segments } = useMemo(() => {
    let focusMinutes = 0;
    let breakMinutes = 0;
    for (const s of sessions) {
      if (s.kind === "work") {
        focusMinutes += s.plannedMinutes;
      } else {
        breakMinutes += s.plannedMinutes;
      }
    }
    return {
      focusMinutes,
      breakMinutes,
      segments: sessions.length,
    };
  }, [sessions]);

  const total = focusMinutes + breakMinutes;
  const focusShare = total <= 0 ? 0 : (100 * focusMinutes) / total;

  return (
    <aside
      className={className}
      style={{
        borderRadius: "0.625rem",
        border: "1px solid #e5e7eb",
        backgroundColor: "#f9fafb",
        padding: "1rem",
        ...style,
      }}
      aria-label="Focus session statistics"
    >
      <header
        style={{
          marginBottom: "0.625rem",
        }}
      >
        <div
          style={{
            fontSize: "0.8125rem",
            fontWeight: 800,
            color: "#6b7280",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "0.625rem",
          }}
        >
          Session stats
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0.5rem",
          }}
        >
          <MiniStat label="Focus (min)" value={String(Math.max(0, focusMinutes))} />
          <MiniStat label="Breaks (min)" value={String(Math.max(0, breakMinutes))} />
          <MiniStat label="Segments" value={String(segments)} />
        </div>
      </header>

      <div
        style={{
          marginBottom: "0.75rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "0.375rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#6b7280",
          }}
        >
          <span>Focus share</span>
          <span style={{ fontVariantNumeric: "tabular-nums", color: "#111827" }}>
            {`${Math.round(focusShare)}%`}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={Math.round(focusShare)}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            height: "0.5rem",
            borderRadius: "9999px",
            backgroundColor: "#e5e7eb",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${focusShare}%`,
              backgroundColor: "#111827",
              borderRadius: "9999px",
              transition: "width 240ms ease",
            }}
          />
        </div>
      </div>

      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 800,
          color: "#6b7280",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: "0.375rem",
        }}
      >
        Recent
      </div>

      <ul
        style={{
          margin: 0,
          padding: "0.25rem",
          maxHeight: listMaxHeight,
          overflow: "auto",
          listStyle: "none",
          borderRadius: "0.5rem",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
        }}
      >
        {sorted.length === 0 ? (
          <li
            style={{
              padding: "0.75rem 0.5rem",
              fontSize: "0.875rem",
              color: "#9ca3af",
            }}
          >
            Completed segments will show up here.
          </li>
        ) : null}

        {sorted.map((session) => (
          <li
            key={session.id}
            style={{
              padding: "0.625rem 0.5rem",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  backgroundColor: badgeColor(session.kind),
                  borderRadius: "9999px",
                  padding: "0.15rem 0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {kindLabel(session.kind)}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "#111827",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {`${session.plannedMinutes}m`}
              </span>
            </div>
            <div
              style={{
                marginTop: "0.25rem",
                fontSize: "0.75rem",
                color: "#6b7280",
              }}
            >
              {`Ended ${formatEnded(session.endedAt)}`}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        padding: "0.5rem 0.625rem",
      }}
    >
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 800,
          color: "#6b7280",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "1.125rem",
          fontWeight: 800,
          color: "#111827",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
    </div>
  );
}
