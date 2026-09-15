"use client";

import { Badge } from "@/components/patterns/badge";
import { IconType, Notify } from "@/components/patterns/types";
import { Download, MoreHorizontal, Search } from "lucide-react";

export function Toolbar({
  placeholder,
  onAction,
}: {
  placeholder: string;
  onAction: Notify;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-[#edf3f1] p-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8aa19f]" />
        <input
          aria-label={placeholder}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-[#dcebe8] bg-[#f8fbfa] pl-10 pr-4 text-sm outline-none focus:border-[#0f9d9a]"
        />
      </div>
      <button
        onClick={() => onAction("Filtros abiertos")}
        className="h-10 rounded-xl border border-[#dcebe8] px-4 text-xs font-semibold text-[#4e706d]"
      >
        Estado · Área · Fecha
      </button>
      <button
        onClick={() => onAction("Exportación preparada")}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#eafaf7] px-4 text-xs font-semibold text-[#087f7b]"
      >
        <Download className="size-4" />
        Exportar
      </button>
    </div>
  );
}

export type ListItem = { title: string; meta: string; date: string; status: string; };

export function ListPanel({
  title,
  description,
  icon: Icon,
  items,
  onAction,
}: {
  title: string;
  description: string;
  icon: IconType;
  items: ListItem[];
  onAction: Notify;
}) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <div className="p-5">
        <h2 className="font-bold text-[#163a39]">{title}</h2>
        <p className="mt-1 text-xs text-[#78918f]">{description}</p>
      </div>
      <Toolbar
        placeholder={`Buscar en ${title.toLowerCase()}...`}
        onAction={onAction}
      />
      <div className="divide-y divide-[#edf3f1]">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-wrap items-center gap-3 px-5 py-4 transition hover:bg-[#fbfefd]"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef8f6] text-[#0f9d9a]">
              <Icon className="size-5" />
            </div>
            <div className="min-w-[220px] flex-1">
              <p className="text-sm font-semibold text-[#244b49]">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-[#8aa19f]">{item.meta}</p>
            </div>
            <span className="text-xs text-[#78918f]">{item.date}</span>
            <Badge>{item.status}</Badge>
            <button
              onClick={() => onAction(`${item.title} abierto`)}
              className="rounded-lg p-2 text-[#71908e] hover:bg-[#eef8f6]"
              aria-label={`Abrir ${item.title}`}
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function filterItems(items: ListItem[], subcategory: string) {
  const map: Record<string, string> = {
    Activos: "Activo",
    Cerrados: "Cerrado",
    Archivados: "Archivado",
    Pendientes: "Pendiente",
    "En revisión": "En revisión",
    Aprobados: "Aprobado",
    Bloqueados: "Bloqueado",
    Suspendidos: "Suspendido",
    Finalizados: "Completado",
  };
  const status = map[subcategory];
  return status ? items.filter((item) => item.status === status) : items;
}
