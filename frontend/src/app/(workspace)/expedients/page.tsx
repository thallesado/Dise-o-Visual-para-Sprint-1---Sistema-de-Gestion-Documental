"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { ExpedientsList } from "@/features/expedients/expedients-list";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Expedientes" subcategory="Todos los expedientes" onAction={notify}>
      <ExpedientsList subcategory="Todos los expedientes" onAction={notify} />
    </ModulePage>
  );
}
