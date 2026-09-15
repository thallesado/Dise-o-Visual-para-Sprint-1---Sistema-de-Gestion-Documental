"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { IndicatorsView } from "@/features/dashboard/indicators-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Inicio" subcategory="Indicadores" onAction={notify}>
      <IndicatorsView onAction={notify} />
    </ModulePage>
  );
}
