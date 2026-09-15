"use client";

import { IconType } from "@/components/patterns/types";
import { Activity, BarChart3, Bell, Building2, CalendarDays, CheckCircle2, CircleAlert, Clock3, FileClock, FileText, HardDrive, History, Layers3, ScanLine, Settings, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react";

export function Stat({
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
  tone?: "teal" | "amber" | "green" | "rose" | "blue";
}) {
  const tones = {
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
      <p className="mt-4 text-sm text-[#6b8583]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#163a39]">{value}</p>
      <p className="mt-2 text-xs font-medium text-[#0f9d9a]">{detail}</p>
    </div>
  );
}

export function Stats({
  module,
  subcategory,
}: {
  module: string;
  subcategory: string;
}) {
  let values: Array<
    [
      IconType,
      string,
      string,
      string,
      "teal" | "amber" | "green" | "rose" | "blue",
    ]
  > = [
      [Layers3, "Registros", "1,248", "Tenant actual", "teal"],
      [FileClock, "Pendientes", "24", "Requieren atención", "amber"],
      [Activity, "Actividad mensual", "+12.5%", "Comparado con mayo", "green"],
    ];
  if (module === "Inicio" && subcategory === "Mis tareas")
    values = [
      [Clock3, "Pendientes", "8", "3 de alta prioridad", "amber"],
      [CheckCircle2, "Completadas", "17", "Esta semana", "green"],
      [CalendarDays, "Próximas a vencer", "3", "En 48 horas", "rose"],
    ];
  if (module === "Digitalización")
    values = [
      [ScanLine, "En cola", "18", "126 páginas", "blue"],
      [Sparkles, "Confianza media", "91.4%", "Extracción OCR", "green"],
      [
        CircleAlert,
        "Requieren validación",
        "7",
        "Confianza menor a 80%",
        "amber",
      ],
    ];
  if (module === "Workflows")
    values = [
      [Workflow, "Activos", "32", "8 requieren acción", "blue"],
      [Clock3, "Tiempo promedio", "2.4 días", "-8% este mes", "teal"],
      [CheckCircle2, "Completados", "148", "96% dentro del plazo", "green"],
    ];
  if (module === "Usuarios y equipos")
    values = [
      [Users, "Usuarios activos", "42", "2 invitaciones pendientes", "green"],
      [Layers3, "Áreas y grupos", "14", "Cobertura organizacional", "teal"],
      [ShieldCheck, "Roles", "6", "128 permisos asignados", "blue"],
    ];
  if (module === "Auditoría")
    values = [
      [History, "Eventos hoy", "286", "Actividad del tenant", "teal"],
      [ShieldCheck, "Acciones sensibles", "12", "Todas verificadas", "amber"],
      [
        CheckCircle2,
        "Resultados correctos",
        "99.6%",
        "Últimos 30 días",
        "green",
      ],
    ];
  if (module === "Reportes")
    values = [
      [BarChart3, "Documentos analizados", "1,248", "Período actual", "teal"],
      [Clock3, "Tiempo promedio", "2.4 días", "Hasta aprobación", "blue"],
      [CheckCircle2, "Cumplimiento", "94.2%", "+2.1% mensual", "green"],
    ];
  if (module === "Notificaciones")
    values = [
      [Bell, "No leídas", "6", "2 de alta prioridad", "amber"],
      [Clock3, "Vencen hoy", "3", "Tareas asignadas", "rose"],
      [CheckCircle2, "Atendidas", "21", "Esta semana", "green"],
    ];
  if (module === "Configuración")
    values = [
      [Settings, "Parámetros activos", "38", "Tenant actual", "teal"],
      [FileText, "Tipos documentales", "14", "12 activos", "blue"],
      [ShieldCheck, "Políticas", "9", "Actualizadas", "green"],
    ];
  if (module === "Tenants")
    values = [
      [Building2, "Tenants activos", "24", "+3 este mes", "green"],
      [Users, "Usuarios totales", "1,842", "En toda la plataforma", "teal"],
      [HardDrive, "Almacenamiento", "68%", "340 GB de 500 GB", "amber"],
    ];
  return (
    <div className="mt-7 grid gap-4 md:grid-cols-3">
      {values.map(([icon, label, value, detail, tone]) => (
        <Stat
          key={label}
          icon={icon}
          label={label}
          value={value}
          detail={detail}
          tone={tone}
        />
      ))}
    </div>
  );
}
