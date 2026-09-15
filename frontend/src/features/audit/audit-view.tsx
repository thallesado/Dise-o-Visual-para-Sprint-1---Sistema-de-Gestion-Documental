"use client";

import { Badge } from "@/components/patterns/badge";
import { Toolbar } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";

export function AuditView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const categoryActions: Record<string, string[]> = {
    Accesos: ["LOGIN", "LOGOUT", "LOGIN_FAILED"],
    "Creación de documentos": ["DOCUMENT_CREATED", "DOCUMENT_UPLOADED"],
    Modificaciones: ["DOCUMENT_UPDATED", "VERSION_CREATED"],
    Descargas: ["DOCUMENT_DOWNLOADED"],
    Aprobaciones: ["DOCUMENT_APPROVED", "DOCUMENT_REJECTED"],
    Eliminaciones: ["DOCUMENT_ARCHIVED", "DOCUMENT_TRASHED"],
    "Cambios de permisos": ["ROLE_CHANGED", "PERMISSION_UPDATED"],
  };
  const all = [
    ["DOCUMENT_APPROVED", "Carlos Méndez", "DOC-2041", "Correcto"],
    ["LOGIN", "Laura Martínez", "Sesión web · 192.168.1.24", "Correcto"],
    ["DOCUMENT_UPDATED", "María González", "DOC-2042 · v2 → v3", "Correcto"],
    ["PERMISSION_UPDATED", "Laura Martínez", "Rol Supervisor", "Correcto"],
    ["DOCUMENT_DOWNLOADED", "Ana López", "DOC-2038", "Correcto"],
    ["LOGIN_FAILED", "Javier Ruiz", "3 intentos · 192.168.1.72", "Bloqueado"],
  ];
  const allowed = categoryActions[subcategory];
  const rows = allowed
    ? all.filter(([action]) => allowed.includes(action))
    : all;
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <Toolbar
        placeholder="Buscar por acción, usuario o entidad..."
        onAction={onAction}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-[#f7fbfa] text-[#6b8583]">
            <tr>
              {[
                "Fecha y hora",
                "Acción",
                "Usuario",
                "Entidad",
                "Resultado",
              ].map((label) => (
                <th key={label} className="px-5 py-3 font-semibold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3f1]">
            {rows.map(([action, user, entity, result], index) => (
              <tr key={`${action}-${index}`}>
                <td className="whitespace-nowrap px-5 py-4 text-[#78918f]">
                  13 jun 2025 · {`0${9 - index}`}:42
                </td>
                <td className="px-5 py-4 font-semibold text-[#315a57]">
                  {action}
                </td>
                <td className="px-5 py-4 text-[#5a7775]">{user}</td>
                <td className="px-5 py-4 text-[#5a7775]">{entity}</td>
                <td className="px-5 py-4">
                  <Badge>{result}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-[#edf3f1] bg-[#fbfefd] px-5 py-3 text-[11px] text-[#78918f]">
        Los eventos de auditoría son históricos y no pueden editarse desde esta
        interfaz.
      </div>
    </section>
  );
}
