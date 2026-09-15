"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { AuditView } from "@/features/audit/audit-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Auditoría" subcategory="Descargas" onAction={notify}>
      <AuditView subcategory="Descargas" onAction={notify} />
    </ModulePage>
  );
}
