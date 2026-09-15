"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { WorkflowDesigner } from "@/features/workflows/workflow-designer";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Workflows" subcategory="Diseñador" onAction={notify}>
      <WorkflowDesigner onAction={notify} />
    </ModulePage>
  );
}
