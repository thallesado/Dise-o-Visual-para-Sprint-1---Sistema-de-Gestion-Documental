"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { ReportView } from "@/features/reports/report-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Reportes" subcategory="Auditoría" onAction={notify}>
      <ReportView subcategory="Auditoría" onAction={notify} />
    </ModulePage>
  );
}
