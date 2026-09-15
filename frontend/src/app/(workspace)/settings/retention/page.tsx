"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { SettingsView } from "@/features/settings/settings-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Configuración" subcategory="Retención" onAction={notify}>
      <SettingsView subcategory="Retención" onAction={notify} />
    </ModulePage>
  );
}
