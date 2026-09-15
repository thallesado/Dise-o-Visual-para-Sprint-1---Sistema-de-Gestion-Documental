"use client";

import { Notify } from "@/components/patterns/types";
import { CheckCircle2, Clock3, FileCheck2, MessageSquare, ShieldCheck } from "lucide-react";

export function NotificationView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const all = [
    {
      type: "Tareas",
      title: "Nueva tarea asignada",
      text: "Debes revisar Contrato marco proveedores 2025.",
      time: "Hace 8 min",
      read: false,
      icon: CheckCircle2,
    },
    {
      type: "Aprobaciones",
      title: "Solicitud de aprobación",
      text: "María González solicita aprobar la Política de continuidad.",
      time: "Hace 32 min",
      read: false,
      icon: ShieldCheck,
    },
    {
      type: "Menciones",
      title: "Carlos Méndez te mencionó",
      text: "Comentario en el expediente EXP-2041.",
      time: "Hace 1 h",
      read: false,
      icon: MessageSquare,
    },
    {
      type: "Tareas",
      title: "Tarea próxima a vencer",
      text: "Validar metadatos vence mañana a las 17:00.",
      time: "Hace 3 h",
      read: true,
      icon: Clock3,
    },
    {
      type: "Aprobaciones",
      title: "Documento aprobado",
      text: "El Manual de incorporación v3 fue aprobado.",
      time: "Ayer",
      read: true,
      icon: FileCheck2,
    },
  ];
  const filtered =
    subcategory === "Todas"
      ? all
      : subcategory === "No leídas"
        ? all.filter((item) => !item.read)
        : all.filter((item) => item.type === subcategory);
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#edf3f1] p-5">
        <div>
          <h2 className="font-bold text-[#163a39]">Centro de notificaciones</h2>
          <p className="mt-1 text-xs text-[#78918f]">
            Preferencias configurables por usuario
          </p>
        </div>
        <button
          onClick={() => onAction("Notificaciones marcadas como leídas")}
          className="text-xs font-semibold text-[#0f9d9a]"
        >
          Marcar como leídas
        </button>
      </div>
      <div className="divide-y divide-[#edf3f1]">
        {filtered.map(({ icon: Icon, title, text, time, read }) => (
          <button
            key={title}
            onClick={() => onAction(`${title} abierto`)}
            className={`flex w-full gap-4 px-5 py-4 text-left ${read ? "bg-white" : "bg-[#f5fcfa]"}`}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#dff7f3] text-[#0f9d9a]">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <b className="text-sm text-[#244b49]">{title}</b>
                {!read && <span className="size-2 rounded-full bg-[#f07b68]" />}
              </span>
              <span className="mt-1 block text-xs text-[#78918f]">{text}</span>
            </span>
            <span className="text-[11px] text-[#8aa19f]">{time}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
