"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { UploadPanel } from "@/components/patterns/upload-panel";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Documentos" subcategory="Subir archivo" onAction={notify}>
      <UploadPanel subcategory="Subir archivo" onAction={notify} />
    </ModulePage>
  );
}
