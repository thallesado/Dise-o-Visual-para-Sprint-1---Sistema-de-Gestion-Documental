"use client";

import { ListPanel, filterItems } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { tenants } from "@/features/tenants/demo-data";
import { Building2 } from "lucide-react";

export function TenantsList({ subcategory, onAction }: { subcategory: string; onAction: Notify ;}) {
  return (
    <ListPanel
      title="Organizaciones registradas"
      description={`Vista global: ${subcategory}`}
      icon={Building2}
      items={filterItems(tenants, subcategory)}
      onAction={onAction}
    />
  );
}
