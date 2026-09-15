"use client";

import { ListPanel, filterItems } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { cases } from "@/features/expedients/demo-data";
import { Folder } from "lucide-react";

export function ExpedientsList({ subcategory, onAction }: { subcategory: string; onAction: Notify ;}) {
  return (
    <ListPanel
      title="Expedientes documentales"
      description="Unidades lógicas del tenant actual"
      icon={Folder}
      items={filterItems(cases, subcategory)}
      onAction={onAction}
    />
  );
}
