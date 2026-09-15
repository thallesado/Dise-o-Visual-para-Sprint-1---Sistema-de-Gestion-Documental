"use client";

import { ListPanel, filterItems } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { users } from "@/features/users/demo-data";
import { Users } from "lucide-react";

export function UsersList({ subcategory, onAction }: { subcategory: string; onAction: Notify ;}) {
  return (
    <ListPanel
      title="Directorio de usuarios"
      description={`Vista: ${subcategory}`}
      icon={Users}
      items={filterItems(users, subcategory)}
      onAction={onAction}
    />
  );
}
