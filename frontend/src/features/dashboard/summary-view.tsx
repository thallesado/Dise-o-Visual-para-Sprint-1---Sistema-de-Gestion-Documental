"use client";

import { IconType, routeFor } from "@/features/workspace/navigation";
import { CheckCircle2, Clock3, FileCheck2, FileClock, FilePlus2, FileText, MoreHorizontal, Plus, Upload, Workflow } from "lucide-react";
import Link from "next/link";

export const documents = [
  [
    "Política de seguridad de la información",
    "PDF",
    "María González",
    "Hoy, 09:42",
    "Aprobado",
    "green",
  ],
  [
    "Contrato marco proveedores 2025",
    "DOCX",
    "Carlos Méndez",
    "Ayer, 16:18",
    "En revisión",
    "amber",
  ],
  [
    "Manual de incorporación",
    "PDF",
    "Ana López",
    "12 jun 2025",
    "Aprobado",
    "green",
  ],
  [
    "Informe auditoría interna Q2",
    "XLSX",
    "Javier Ruiz",
    "10 jun 2025",
    "Pendiente",
    "blue",
  ],
  [
    "Procedimiento de compras",
    "DOCX",
    "Sofía Martín",
    "08 jun 2025",
    "Vencido",
    "red",
  ],
];

export const statusStyles: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  blue: "bg-sky-50 text-sky-700 ring-sky-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "teal",
}: {
  icon: IconType;
  label: string;
  value: string;
  detail: string;
  tone?: string;
}) {
  const tones: Record<string, string> = {
    teal: "bg-[#dff7f3] text-[#0f9d9a]",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-500",
    blue: "bg-sky-50 text-sky-600",
  };
  return (
    <div className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-[0_2px_8px_rgba(17,71,68,0.03)]">
      <div
        className={`flex size-10 items-center justify-center rounded-xl ${tones[tone]}`}
      >
        <Icon className="size-5" />
      </div>
      <p className="mt-5 text-sm text-[#6b8583]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#163a39]">{value}</p>
      <p className="mt-2 text-xs font-medium text-[#0f9d9a]">{detail}</p>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-9">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[#0f9d9a]">Inicio · Resumen</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#163a39]">
            Buenos días, Laura
          </h1>
          <p className="mt-2 text-sm text-[#6b8583]">
            Esto es lo que está ocurriendo en tu espacio de trabajo.
          </p>
        </div>
        <Link
          href={routeFor("Documentos", "Nuevo documento")}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0f9d9a] px-5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(15,157,154,0.2)]"
        >
          <Plus className="size-4" />
          Nuevo documento
        </Link>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={FileText}
          label="Total documentos"
          value="1,248"
          detail="+12.5% este mes"
        />
        <StatCard
          icon={FileClock}
          label="Pendientes de revisión"
          value="24"
          detail="8 requieren atención"
          tone="amber"
        />
        <StatCard
          icon={FileCheck2}
          label="Aprobados"
          value="1,176"
          detail="94.2% del total"
          tone="green"
        />
        <StatCard
          icon={Clock3}
          label="Por vencer"
          value="12"
          detail="Próximos 30 días"
          tone="rose"
        />
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#edf3f1] p-5">
            <div>
              <h2 className="font-bold text-[#163a39]">Documentos recientes</h2>
              <p className="mt-1 text-xs text-[#78918f]">
                Últimos documentos modificados en Acme Consulting
              </p>
            </div>
            <Link href={routeFor("Documentos")} className="text-xs font-semibold text-[#0f9d9a]">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-[#edf3f1]">
            {documents.map(([name, type, owner, updated, status, color]) => (
              <div
                key={name}
                className="flex items-center gap-3 px-5 py-4 hover:bg-[#fbfefd]"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef8f6] text-[#0f9d9a]">
                  <FileText className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#244b49]">
                    {name}
                  </p>
                  <p className="mt-1 text-xs text-[#8aa19f]">
                    {type} · {owner} · {updated}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[color]}`}
                >
                  {status}
                </span>
                <MoreHorizontal className="size-4 text-[#91aaa7]" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#163a39]">Acciones rápidas</h2>
            <p className="mt-1 text-xs text-[#78918f]">
              Atajos para tu operación diaria
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {[
                [FilePlus2, "Nuevo documento", "Crear desde una plantilla", routeFor("Documentos", "Nuevo documento")],
                [Upload, "Subir archivo", "Añadir un archivo al sistema", routeFor("Documentos", "Subir archivo")],
                [Workflow, "Crear workflow", "Diseñar un flujo de trabajo", routeFor("Workflows", "Diseñador")],
              ].map(([Icon, label, hint, href]) => (
                <Link
                  key={label as string}
                  href={href as string}
                  className="flex items-center gap-3 rounded-xl bg-[#eafaf7] px-3 py-3 text-left text-[#17635f] hover:bg-[#dff7f3]"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white text-[#0f9d9a]">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <b className="block text-xs">{label as string}</b>
                    <small className="text-[10px] text-[#5f8d89]">
                      {hint as string}
                    </small>
                  </span>
                  <span>›</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#163a39]">Mis tareas</h2>
              <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">
                8 pendientes
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {[
                "Revisar contrato marco",
                "Aprobar política de seguridad",
                "Validar expediente EXP-2041",
              ].map((task, i) => (
                <div key={task} className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#dff7f3] text-[#0f9d9a]">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#315a57]">
                      {task}
                    </p>
                    <p className="text-[10px] text-[#8aa19f]">
                      Vence en {i + 1} días
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
