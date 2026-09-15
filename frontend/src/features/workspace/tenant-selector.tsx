"use client";

import { ChevronDown } from "lucide-react";

export function TenantSelector({
  role,
  setRole,
}: {
  role: string;
  setRole: (role: string) => void;
}) {
  return (
    <div className="mt-7 rounded-xl bg-[#076f6c] px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-teal-100">
        Organización activa
      </p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm font-semibold">Acme Consulting</span>
        <ChevronDown className="size-4 text-teal-100" />
      </div>
      <select
        value={role}
        onChange={(event) => setRole(event.target.value)}
        className="mt-2 w-full rounded-lg border border-white/15 bg-[#087f7b] px-2 py-1.5 text-[10px] text-teal-50 outline-none"
      >
        <option>Usuario básico</option>
        <option>Supervisor</option>
        <option>Administrador de tenant</option>
        <option>Superadministrador</option>
      </select>
    </div>
  );
}
