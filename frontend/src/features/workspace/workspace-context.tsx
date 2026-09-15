"use client";

import type { Notify } from "@/components/patterns/types";
import { createContext, useContext } from "react";

export const WorkspaceContext = createContext<{ notify: Notify; } | null>(null);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("La vista necesita el layout del espacio de trabajo");
  return context;
}
