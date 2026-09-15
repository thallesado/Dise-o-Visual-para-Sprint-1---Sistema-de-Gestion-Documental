"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { DocumentsList } from "@/features/documents/documents-list";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Documentos" subcategory="En revisión" onAction={notify}>
      <DocumentsList subcategory="En revisión" onAction={notify} />
    </ModulePage>
  );
}
