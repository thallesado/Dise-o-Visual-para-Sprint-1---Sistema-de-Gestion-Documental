"use client";

import { ListPanel } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { CheckCircle2 } from "lucide-react";

export function TaskView({ onAction }: { onAction: Notify; }) {
  const tasks = [
    {
      title: "Revisar contrato marco",
      meta: "Aprobación de contratos · Etapa de revisión",
      date: "Vence hoy",
      status: "Pendiente",
    },
    {
      title: "Aprobar política de seguridad",
      meta: "Publicación de políticas · Aprobación final",
      date: "Vence mañana",
      status: "En revisión",
    },
    {
      title: "Validar metadatos de EXP-2041",
      meta: "Digitalización · 6 campos por confirmar",
      date: "Vence en 2 días",
      status: "En proceso",
    },
    {
      title: "Verificar alta de proveedor",
      meta: "Alta de proveedor · Control documental",
      date: "Vencida ayer",
      status: "Vencida",
    },
  ];
  return (
    <ListPanel
      title="Bandeja personal"
      description="Ordenada por prioridad y fecha límite"
      icon={CheckCircle2}
      items={tasks}
      onAction={onAction}
    />
  );
}
