import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { StudentCSystem } from "./studentCSystem.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudentCSystem />
  </StrictMode>,
);
