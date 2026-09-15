"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { TenantSpecialView } from "@/features/tenants/tenant-special-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Tenants" subcategory="Branding" onAction={notify}>
      <TenantSpecialView subcategory="Branding" onAction={notify} />
    </ModulePage>
  );
}
