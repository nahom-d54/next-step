import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(dirname, "../..");

/**
 * Resolve feature packages from source so dev does not depend on prior `pnpm build`.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@next-step/feature-task-export": path.resolve(
        workspaceRoot,
        "packages/feature-task-export/src/index.ts",
      ),
      "@next-step/feature-task-focus": path.resolve(
        workspaceRoot,
        "packages/feature-task-focus/src/index.ts",
      ),
    },
  },
});
