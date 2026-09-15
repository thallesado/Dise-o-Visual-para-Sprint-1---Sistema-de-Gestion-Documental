"use client";

import { ListItem, ListPanel, filterItems } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { documents } from "@/features/documents/demo-data";
import { FileText, Trash2 } from "lucide-react";

export function DocumentsList({ subcategory, onAction }: { subcategory: string; onAction: Notify ;}) {
  const documentScopes: Record<string, ListItem[]> = {
    "Mis documentos": [documents[0], documents[2]],
    "Compartidos conmigo": [documents[1], documents[2]],
    Recientes: documents.slice(0, 3),
  };
  const scoped =
    subcategory === "Papelera"
      ? [
        {
          title: "Borrador de procedimiento antiguo",
          meta: "DOC-1921 · Eliminado por Laura Martínez",
          date: "Se eliminará en 18 días",
          status: "Archivado",
        },
      ]
      : (documentScopes[subcategory] ?? filterItems(documents, subcategory));
  return (
    <ListPanel
      title="Repositorio documental"
      description={`Vista: ${subcategory}`}
      icon={subcategory === "Papelera" ? Trash2 : FileText}
      items={scoped.length ? scoped : documents.slice(0, 2)}
      onAction={onAction}
    />
  );
}
