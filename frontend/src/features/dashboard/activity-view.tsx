"use client";

import { Toolbar } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { Download, FileCheck2, FileText, Users } from "lucide-react";

export function ActivityView({ onAction }: { onAction: Notify; }) {
  const events = [
    [
      FileText,
      "María González creó DOC-2048",
      "Política de continuidad operativa · Hace 12 min",
    ],
    [
      FileCheck2,
      "Carlos Méndez aprobó un documento",
      "Contrato marco proveedores 2025 · Hace 38 min",
    ],
    [
      Users,
      "Laura Martínez actualizó un rol",
      "Supervisor documental · Hace 1 h",
    ],
    [
      Download,
      "Ana López descargó un archivo",
      "Manual de incorporación v3 · Hace 2 h",
    ],
  ] as const;
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <Toolbar
        placeholder="Buscar por usuario, acción o documento..."
        onAction={onAction}
      />
      <div className="divide-y divide-[#edf3f1]">
        {events.map(([Icon, title, detail]) => (
          <div key={title} className="flex gap-4 px-5 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef8f6] text-[#0f9d9a]">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#244b49]">{title}</p>
              <p className="mt-1 text-xs text-[#8aa19f]">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
