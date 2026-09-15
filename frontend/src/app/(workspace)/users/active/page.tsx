"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { UsersList } from "@/features/users/users-list";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Usuarios y equipos" subcategory="Activos" onAction={notify}>
      <UsersList subcategory="Activos" onAction={notify} />
    </ModulePage>
  );
}
