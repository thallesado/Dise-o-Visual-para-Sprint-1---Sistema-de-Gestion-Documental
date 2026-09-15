"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { TaskView } from "@/features/workflows/task-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Workflows" subcategory="Mis tareas" onAction={notify}>
      <TaskView onAction={notify} />
    </ModulePage>
  );
}
