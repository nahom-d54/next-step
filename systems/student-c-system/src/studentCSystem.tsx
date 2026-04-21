import { useMemo } from "react";

import {
  AnalyticsDashboard,
  CompletionChart,
  ProductivityScore,
} from "@next-step/feature-task-analytics";
import {
  HistoryPanel,
  UndoRedoControls,
  useHistory,
  type HistoryEntry,
} from "@next-step/feature-task-history";

type DemoTask = {
  title: string;
  updatedAtIso: string;
};

export interface StudentCSystemProps {
  className?: string;
}

export function StudentCSystem({ className = "" }: StudentCSystemProps) {
  const initialTask = useMemo<DemoTask>(() => {
    return {
      title: "Demo Task",
      updatedAtIso: new Date().toISOString(),
    };
  }, []);

  const { state, push, undo, redo, canUndo, canRedo } =
    useHistory<DemoTask>(initialTask);

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <AnalyticsDashboard />
      <CompletionChart />
      <ProductivityScore
        dailyScore={72}
        weeklyScore={64}
        trend="up"
        trendValue={8}
      />

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <button
          type="button"
          onClick={() =>
            push(
              {
                title: `${state.present?.title ?? "Task"} (edited)`,
                updatedAtIso: new Date().toISOString(),
              },
              "Rename task",
            )
          }
        >
          Make Change
        </button>
        
        <UndoRedoControls
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>

      <HistoryPanel
        entries={state.past}
        onRestore={(entry: HistoryEntry<DemoTask>) => {
          push(entry.payload, `Restore: ${entry.description}`);
        }}
      />
    </div>
  );
}
