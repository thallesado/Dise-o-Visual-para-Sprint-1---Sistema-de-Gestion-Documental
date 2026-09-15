"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { ActivityView } from "@/features/dashboard/activity-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Inicio" subcategory="Actividad reciente" onAction={notify}>
      <ActivityView onAction={notify} />
    </ModulePage>
  );
}
