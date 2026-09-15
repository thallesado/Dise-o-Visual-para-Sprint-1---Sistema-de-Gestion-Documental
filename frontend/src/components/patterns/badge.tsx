"use client";

import { ReactNode } from "react";

export const statusTone: Record<string, string> = {
  Activo: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Aprobado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Completada: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Completado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Vigente: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pendiente: "bg-amber-50 text-amber-700 ring-amber-200",
  "En revisión": "bg-sky-50 text-sky-700 ring-sky-200",
  "En proceso": "bg-sky-50 text-sky-700 ring-sky-200",
  Cerrado: "bg-slate-100 text-slate-600 ring-slate-200",
  Archivado: "bg-slate-100 text-slate-600 ring-slate-200",
  Suspendido: "bg-rose-50 text-rose-700 ring-rose-200",
  Bloqueado: "bg-rose-50 text-rose-700 ring-rose-200",
  Vencida: "bg-rose-50 text-rose-700 ring-rose-200",
  Rechazado: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function Badge({ children }: { children: ReactNode; }) {
  const label = String(children);
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusTone[label] ?? "bg-[#eafaf7] text-[#087f7b] ring-[#c8e8e3]"}`}
    >
      {children}
    </span>
  );
}
