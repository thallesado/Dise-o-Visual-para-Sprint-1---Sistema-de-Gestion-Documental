import { AppShell } from "@/features/workspace/app-shell";
import type { ReactNode } from "react";

export default function WorkspaceLayout({ children }: { children: ReactNode; }) {
  return <AppShell>{children}</AppShell>;
}
