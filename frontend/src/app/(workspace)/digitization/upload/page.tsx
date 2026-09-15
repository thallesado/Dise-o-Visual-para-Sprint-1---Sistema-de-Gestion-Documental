"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { UploadPanel } from "@/components/patterns/upload-panel";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Digitalización" subcategory="Subir documento" onAction={notify}>
      <UploadPanel subcategory="Subir documento" onAction={notify} />
    </ModulePage>
  );
}
