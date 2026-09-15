"use client";

import { Field } from "@/components/patterns/field";
import { Notify } from "@/components/patterns/types";
import { ScanLine, Upload } from "lucide-react";

export function UploadPanel({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const scan = subcategory === "Escanear documento";
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-2xl border border-[#dcebe8] bg-white p-6 shadow-sm">
        <div className="rounded-2xl border-2 border-dashed border-[#bfe5df] bg-[#f5fbfa] px-6 py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#dff7f3] text-[#0f9d9a]">
            {scan ? (
              <ScanLine className="size-7" />
            ) : (
              <Upload className="size-7" />
            )}
          </div>
          <h2 className="mt-4 font-bold text-[#163a39]">
            {scan
              ? "Conecta o selecciona un escáner"
              : "Arrastra los archivos aquí"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#78918f]">
            {scan
              ? "Configura resolución, color y doble cara antes de capturar las páginas."
              : "PDF, DOCX, XLSX, PNG o JPG. Tamaño máximo simulado: 50 MB por archivo."}
          </p>
          <button
            onClick={() =>
              onAction(
                scan ? "Escáner detectado" : "Selector de archivos abierto",
              )
            }
            className="mt-5 rounded-xl bg-[#0f9d9a] px-5 py-2.5 text-xs font-semibold text-white"
          >
            {scan ? "Detectar escáner" : "Seleccionar archivos"}
          </button>
        </div>
      </section>
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h3 className="font-bold text-[#163a39]">Clasificación inicial</h3>
        <div className="mt-5 space-y-4">
          <Field
            label="Tipo documental"
            placeholder="Seleccionar tipo"
            type="select"
          />
          <Field label="Expediente" placeholder="Buscar expediente" />
          <Field
            label="Área responsable"
            placeholder="Seleccionar área"
            type="select"
          />
        </div>
        <label className="mt-5 flex items-start gap-3 rounded-xl bg-[#eafaf7] p-3">
          <input
            type="checkbox"
            defaultChecked
            className="mt-0.5 accent-[#0f9d9a]"
          />
          <span>
            <b className="block text-xs text-[#315a57]">Procesar con OCR</b>
            <small className="text-[11px] text-[#78918f]">
              Extraer texto y sugerir metadatos.
            </small>
          </span>
        </label>
      </aside>
    </div>
  );
}
