"use client";

import { CreateForm } from "@/components/patterns/create-form";
import { ModulePage } from "@/components/patterns/module-page";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Tenants" subcategory="Crear tenant" onAction={notify}>
      <CreateForm module="Tenants" subcategory="Crear tenant" onAction={notify} />
    </ModulePage>
  );
}
