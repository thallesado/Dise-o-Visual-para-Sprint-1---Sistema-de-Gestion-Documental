"use client";

import { CreateForm } from "@/components/patterns/create-form";
import { ModulePage } from "@/components/patterns/module-page";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Expedientes" subcategory="Crear expediente" onAction={notify}>
      <CreateForm module="Expedientes" subcategory="Crear expediente" onAction={notify} />
    </ModulePage>
  );
}
