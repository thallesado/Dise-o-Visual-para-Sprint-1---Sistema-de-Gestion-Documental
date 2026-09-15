"use client";

import { ListPanel } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { ShieldCheck, Users } from "lucide-react";

export function CatalogView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const data: Record<string, Array<[string, string, string]>> = {
    Roles: [
      ["Administrador de tenant", "38 permisos · 2 usuarios", "Activo"],
      ["Supervisor", "22 permisos · 6 usuarios", "Activo"],
      ["Usuario operativo", "12 permisos · 28 usuarios", "Activo"],
      ["Auditor", "9 permisos · 3 usuarios", "Activo"],
    ],
    Áreas: [
      ["Dirección", "4 usuarios · Responsable: Laura Martínez", "Activo"],
      ["Legal", "8 usuarios · Responsable: Carlos Méndez", "Activo"],
      ["Archivo", "12 usuarios · Responsable: Ana López", "Activo"],
      ["Calidad", "6 usuarios · Responsable: Javier Ruiz", "Activo"],
    ],
    Grupos: [
      ["Comité de aprobación", "8 integrantes · 3 workflows", "Activo"],
      ["Revisores documentales", "12 integrantes · 7 workflows", "Activo"],
      ["Auditores internos", "4 integrantes · Acceso de lectura", "Activo"],
    ],
  };
  if (subcategory === "Permisos")
    return <PermissionMatrix onAction={onAction} />;
  const items = (data[subcategory] ?? []).map(([title, meta, status]) => ({
    title,
    meta,
    date: "Actualizado hoy",
    status,
  }));
  return (
    <ListPanel
      title={subcategory}
      description={`Configuración de ${subcategory.toLowerCase()} de Acme Consulting`}
      icon={subcategory === "Roles" ? ShieldCheck : Users}
      items={items}
      onAction={onAction}
    />
  );
}

export function PermissionMatrix({ onAction }: { onAction: Notify; }) {
  const modules = [
    "Documentos",
    "Expedientes",
    "Workflows",
    "Usuarios",
    "Auditoría",
  ];
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#edf3f1] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-[#163a39]">Matriz de permisos</h2>
          <p className="mt-1 text-xs text-[#78918f]">
            Rol seleccionado: Supervisor
          </p>
        </div>
        <select className="h-10 rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 text-xs text-[#4e706d]">
          <option>Supervisor</option>
          <option>Administrador de tenant</option>
          <option>Usuario operativo</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-xs">
          <thead className="bg-[#f7fbfa] text-[#6b8583]">
            <tr>
              <th className="px-5 py-3">Módulo</th>
              {["Ver", "Crear", "Editar", "Aprobar", "Eliminar"].map(
                (label) => (
                  <th key={label} className="px-4 py-3 text-center">
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3f1]">
            {modules.map((module, row) => (
              <tr key={module}>
                <td className="px-5 py-4 font-semibold text-[#315a57]">
                  {module}
                </td>
                {[0, 1, 2, 3, 4].map((column) => (
                  <td key={column} className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={
                        column < 3 || (module === "Documentos" && column === 3)
                      }
                      disabled={row === 4 && column > 0}
                      className="size-4 accent-[#0f9d9a]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end border-t border-[#edf3f1] p-4">
        <button
          onClick={() => onAction("Matriz de permisos guardada")}
          className="rounded-xl bg-[#0f9d9a] px-5 py-2.5 text-xs font-semibold text-white"
        >
          Guardar permisos
        </button>
      </div>
    </section>
  );
}
