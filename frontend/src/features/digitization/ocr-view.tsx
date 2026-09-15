"use client";

import { Badge } from "@/components/patterns/badge";
import { Field } from "@/components/patterns/field";
import { ListPanel } from "@/components/patterns/list-panel";
import { Notify } from "@/components/patterns/types";
import { ScanLine } from "lucide-react";

export function OcrView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const review = [
    "Validación",
    "Indexación",
    "Corrección de metadatos",
  ].includes(subcategory);
  if (!review)
    return (
      <ListPanel
        title="Cola de procesamiento OCR"
        description="Lotes ordenados por fecha de recepción"
        icon={ScanLine}
        items={[
          {
            title: "Lote SCN-0184",
            meta: "Contrato_proveedor.pdf · 18 páginas",
            date: "Procesando 72%",
            status: "En proceso",
          },
          {
            title: "Lote SCN-0183",
            meta: "Facturas_junio.zip · 42 páginas",
            date: "Confianza 94%",
            status: "Completado",
          },
          {
            title: "Lote SCN-0182",
            meta: "Acta_directorio.jpg · 3 páginas",
            date: "Confianza 68%",
            status: "Pendiente",
          },
        ]}
        onAction={onAction}
      />
    );
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[#163a39]">
              Vista previa del documento
            </h2>
            <p className="mt-1 text-xs text-[#78918f]">
              Contrato_proveedor.pdf · Página 1 de 6
            </p>
          </div>
          <Badge>Confianza 76%</Badge>
        </div>
        <div className="mt-5 flex min-h-[430px] items-center justify-center rounded-xl border border-[#e3ecea] bg-[#f2f5f4]">
          <div className="w-[72%] rounded-sm bg-white p-8 shadow-lg">
            <div className="h-3 w-1/2 rounded bg-slate-200" />
            <div className="mt-8 space-y-3">
              {[100, 92, 96, 70, 100, 84, 94, 62].map((width, i) => (
                <div
                  key={i}
                  className="h-2 rounded bg-slate-100"
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
            <div className="mt-8 h-20 rounded border-2 border-[#9fe0d9] bg-[#eafaf7]" />
          </div>
        </div>
      </section>
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">
          {subcategory === "Indexación"
            ? "Destino documental"
            : "Datos detectados"}
        </h2>
        <p className="mt-1 text-xs text-[#78918f]">
          Confirma o corrige antes de continuar.
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Tipo documental" placeholder="Contrato" type="select" />
          <Field label="Proveedor" placeholder="Servicios Andes S.R.L." />
          <Field label="Fecha del documento" placeholder="13/06/2025" />
          <Field
            label="Expediente"
            placeholder="EXP-2041 · Alta de proveedor"
          />
        </div>
        <div className="mt-5 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
          <b>Revisión humana requerida.</b> El campo “fecha de vigencia” tiene
          una confianza inferior al 80%.
        </div>
        <button
          onClick={() => onAction("Datos validados y enviados a indexación")}
          className="mt-5 w-full rounded-xl bg-[#0f9d9a] py-2.5 text-xs font-semibold text-white"
        >
          Confirmar y continuar
        </button>
      </aside>
    </div>
  );
}
