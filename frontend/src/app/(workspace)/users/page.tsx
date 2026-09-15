"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { UsersList } from "@/features/users/users-list";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Usuarios y equipos" subcategory="Todos los usuarios" onAction={notify}>
      <UsersList subcategory="Todos los usuarios" onAction={notify} />
    </ModulePage>
  );
}
