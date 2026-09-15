"use client";

import { ListItem, ListPanel } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { workflows } from "@/features/workflows/demo-data";
import { Workflow } from "lucide-react";

export function WorkflowsList({ subcategory, onAction }: { subcategory: string; onAction: Notify ;}) {
  const templateItems = workflows.map((item, index) => ({
    ...item,
    title: [
      "Aprobación de contratos",
      "Revisión simple",
      "Publicación controlada",
      "Alta de proveedor",
    ][index],
    meta: `${index + 2} etapas · ${index + 1} roles asignados`,
    date: "Actualizada esta semana",
    status: "Activo",
  }));
  const workflowScopes: Record<string, ListItem[]> = {
    "Pendientes de revisión": workflows.filter(
      (item) => item.status === "En revisión",
    ),
    "Pendientes de aprobación": workflows.filter(
      (item) => item.status === "Pendiente",
    ),
    Activos: workflows.filter((item) => item.status !== "Completado"),
    Finalizados: workflows.filter((item) => item.status === "Completado"),
  };
  return (
    <ListPanel
      title={
        subcategory === "Plantillas"
          ? "Plantillas de workflow"
          : "Flujos de trabajo"
      }
      description={`Vista: ${subcategory}`}
      icon={Workflow}
      items={
        subcategory === "Plantillas"
          ? templateItems
          : (workflowScopes[subcategory] ?? workflows)
      }
      onAction={onAction}
    />
  );
}
