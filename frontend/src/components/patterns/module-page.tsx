"use client";

import { Header } from "@/components/patterns/module-header";
import { Stats } from "@/components/patterns/module-stats";
import { Notify } from "@/components/patterns/types";
import { moduleIcons, screenCopy } from "@/features/workspace/screen-copy";
import { CheckCircle2, Database, Download, Eye, Plus, Upload } from "lucide-react";
import { ReactNode } from "react";

export function ModulePage({
  module,
  subcategory,
  onAction,
  children,
}: {
  module: string;
  subcategory: string;
  onAction: Notify;
  children: ReactNode;
}) {
  const copy = screenCopy[`${module}|${subcategory}`] ?? {
    description: "Gestiona la operación de tu organización desde este espacio.",
    action: "Nueva acción",
  };
  const Icon = moduleIcons[module] ?? Database;
  const actionIcon =
    copy.action?.includes("Descargar") || copy.action?.includes("Exportar")
      ? Download
      : copy.action?.includes("Subir") || copy.action?.includes("Seleccionar")
        ? Upload
        : copy.action?.includes("Guardar")
          ? CheckCircle2
          : copy.action?.includes("Revisar") || copy.action?.includes("Abrir")
            ? Eye
            : Plus;
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-9">
      <Header
        module={module}
        subcategory={subcategory}
        description={copy.description}
        action={copy.action ?? "Nueva acción"}
        icon={actionIcon}
        onAction={onAction}
      />
      <Stats module={module} subcategory={subcategory} />
      {children}
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#dcebe8] bg-white px-4 py-3 text-[11px] text-[#78918f]">
        <Icon className="size-4 text-[#0f9d9a]" />
        <span>
          Vista de demostración con datos simulados de{" "}
          <b className="text-[#315a57]">Acme Consulting</b>. No realiza
          operaciones persistentes.
        </span>
      </div>
    </div>
  );
}
