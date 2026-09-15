"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { TenantsList } from "@/features/tenants/tenants-list";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Tenants" subcategory="Todos los tenants" onAction={notify}>
      <TenantsList subcategory="Todos los tenants" onAction={notify} />
    </ModulePage>
  );
}
