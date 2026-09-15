"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { WorkflowsList } from "@/features/workflows/workflows-list";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Workflows" subcategory="Plantillas" onAction={notify}>
      <WorkflowsList subcategory="Plantillas" onAction={notify} />
    </ModulePage>
  );
}
