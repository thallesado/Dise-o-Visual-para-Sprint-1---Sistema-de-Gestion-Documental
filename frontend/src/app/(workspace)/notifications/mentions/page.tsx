"use client";

import { ModulePage } from "@/components/patterns/module-page";
import { NotificationView } from "@/features/notifications/notification-view";
import { useWorkspace } from "@/features/workspace/workspace-context";

export default function Page() {
  const { notify } = useWorkspace();

  return (
    <ModulePage module="Notificaciones" subcategory="Menciones" onAction={notify}>
      <NotificationView subcategory="Menciones" onAction={notify} />
    </ModulePage>
  );
}
