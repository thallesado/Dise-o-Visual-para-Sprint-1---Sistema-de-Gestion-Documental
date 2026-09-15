"use client";

import { Field } from "@/components/patterns/field";
import { Notify } from "@/components/patterns/types";
import { Archive, ChevronRight, Clock3, Eye, FileText, MoreHorizontal, Plus, ShieldCheck } from "lucide-react";

export function WorkflowDesigner({ onAction }: { onAction: Notify; }) {
  const stages = [
    [FileText, "Documento creado", "Inicio automático"],
    [Eye, "Revisión documental", "Asignado a Supervisor"],
    [ShieldCheck, "Aprobación", "Asignado a Dirección"],
    [Archive, "Archivo", "Retención: 5 años"],
  ] as const;
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[260px_1fr_300px]">
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Elementos</h2>
        <div className="mt-4 space-y-2">
          {[
            [Plus, "Tarea"],
            [ShieldCheck, "Aprobación"],
            [ChevronRight, "Condición"],
            [Clock3, "Espera"],
          ].map(([Icon, label]) => (
            <button
              key={label as string}
              onClick={() => onAction(`${label} añadido`)}
              className="flex w-full items-center gap-3 rounded-xl border border-[#e3eeec] p-3 text-xs font-semibold text-[#315a57]"
            >
              <Icon className="size-4 text-[#0f9d9a]" />
              {label as string}
            </button>
          ))}
        </div>
      </aside>
      <section className="rounded-2xl border border-[#dcebe8] bg-[#f7fbfa] p-6 shadow-sm">
        <div className="mx-auto max-w-md space-y-3">
          {stages.map(([Icon, title, detail], index) => (
            <div key={title}>
              <button
                onClick={() => onAction(`${title} seleccionado`)}
                className="flex w-full items-center gap-4 rounded-2xl border border-[#cfe7e3] bg-white p-4 text-left shadow-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#dff7f3] text-[#0f9d9a]">
                  <Icon className="size-5" />
                </span>
                <span>
                  <b className="block text-sm text-[#244b49]">{title}</b>
                  <small className="text-xs text-[#78918f]">{detail}</small>
                </span>
                <MoreHorizontal className="ml-auto size-4 text-[#8aa19f]" />
              </button>
              {index < stages.length - 1 && (
                <div className="mx-auto h-7 w-px bg-[#8ed7cf]" />
              )}
            </div>
          ))}
        </div>
      </section>
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Propiedades</h2>
        <div className="mt-5 space-y-4">
          <Field
            label="Nombre del workflow"
            placeholder="Aprobación documental"
          />
          <Field label="Tipo documental" placeholder="Contrato" type="select" />
          <Field label="Fecha límite" placeholder="3 días hábiles" />
        </div>
        <label className="mt-4 flex gap-3 rounded-xl bg-[#eafaf7] p-3 text-xs text-[#315a57]">
          <input type="checkbox" defaultChecked className="accent-[#0f9d9a]" />
          Registrar todas las transiciones en auditoría
        </label>
      </aside>
    </div>
  );
}
