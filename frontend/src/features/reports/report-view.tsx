"use client";

import { Notify } from "@/components/patterns/types";
import { Download } from "lucide-react";

export function ReportView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const labels: Record<string, string[]> = {
    Documentos: ["Aprobados", "En revisión", "Pendientes", "Archivados"],
    Usuarios: ["Activos", "Inactivos", "Bloqueados", "Invitados"],
    Workflows: ["Completados", "Activos", "Vencidos", "Cancelados"],
    Almacenamiento: ["PDF", "Imágenes", "Office", "Otros"],
    Auditoría: ["Consultas", "Descargas", "Cambios", "Accesos"],
    Productividad: ["Archivo", "Legal", "Compras", "Calidad"],
    "Actividad por área": ["Legal", "Archivo", "Compras", "Calidad"],
  };
  const current = labels[subcategory] ?? labels.Documentos;
  const values = [84, 61, 44, 29];
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <section className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-bold text-[#163a39]">
              Evolución de {subcategory.toLowerCase()}
            </h2>
            <p className="mt-1 text-xs text-[#78918f]">
              Datos simulados del 1 al 30 de junio de 2025
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAction("Filtros del reporte abiertos")}
              className="rounded-lg border border-[#dcebe8] px-3 py-2 text-xs text-[#5a7775]"
            >
              Acme Consulting · Junio
            </button>
            <button
              onClick={() => onAction("Reporte descargado")}
              className="rounded-lg bg-[#eafaf7] p-2 text-[#087f7b]"
            >
              <Download className="size-4" />
            </button>
          </div>
        </div>
        <div className="mt-8 flex h-64 items-end gap-4 rounded-xl bg-[linear-gradient(to_bottom,#edf4f2_1px,transparent_1px)] bg-[length:100%_25%] px-4 pt-6">
          {[38, 52, 47, 64, 58, 76, 88, 74, 92, 86, 96, 90].map(
            (height, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-md bg-[#5fc5bc] transition group-hover:bg-[#0f9d9a]"
                  style={{ height: `${height}%` }}
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-[#8aa19f]">
                  {index + 1}
                </span>
              </div>
            ),
          )}
        </div>
        <div className="mt-8 flex items-center gap-2 text-[11px] text-[#78918f]">
          <span className="size-2 rounded-full bg-[#0f9d9a]" />
          Actividad diaria del período seleccionado
        </div>
      </section>
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Distribución</h2>
        <p className="mt-1 text-xs text-[#78918f]">Comparación por categoría</p>
        <div className="mt-6 space-y-5">
          {current.map((label, index) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-[#315a57]">{label}</span>
                <span className="text-[#78918f]">{values[index]}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#edf4f2]">
                <div
                  className="h-2 rounded-full bg-[#0f9d9a]"
                  style={{
                    width: `${values[index]}%`,
                    opacity: 1 - index * 0.16,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
