"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { CatalogView } from "@/features/users/catalog-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Usuarios y equipos" subcategory="Grupos" onAction={notify}>
      <CatalogView subcategory="Grupos" onAction={notify} />
    </ModulePage>
  );
}
