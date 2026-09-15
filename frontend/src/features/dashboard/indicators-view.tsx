"use client";

import { Notify } from "@/components/patterns/types";

export function IndicatorsView({ onAction }: { onAction: Notify; }) {
  const bars = [
    ["Aprobados", 94, "1,176"],
    ["En revisión", 68, "42"],
    ["Pendientes", 42, "24"],
    ["Archivados", 31, "386"],
  ] as const;
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-[#163a39]">
              Distribución por estado
            </h2>
            <p className="mt-1 text-xs text-[#78918f]">
              Documentos del período actual
            </p>
          </div>
          <button
            onClick={() => onAction("Período cambiado")}
            className="rounded-lg border border-[#dcebe8] px-3 py-2 text-xs text-[#5a7775]"
          >
            Últimos 30 días
          </button>
        </div>
        <div className="mt-6 space-y-5">
          {bars.map(([label, width, value]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-[#315a57]">{label}</span>
                <span className="text-[#78918f]">{value}</span>
              </div>
              <div className="h-2.5 rounded-full bg-[#edf4f2]">
                <div
                  className="h-2.5 rounded-full bg-[#0f9d9a]"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Cumplimiento mensual</h2>
        <p className="mt-1 text-xs text-[#78918f]">
          Procesos finalizados dentro del plazo
        </p>
        <div className="mt-7 flex items-end justify-between gap-3">
          {[48, 62, 55, 74, 68, 86, 92].map((height, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-t-lg bg-[#66c9c1]"
                style={{ height: `${height * 1.4}px` }}
              />
              <span className="text-[10px] text-[#8aa19f]">
                {["E", "F", "M", "A", "M", "J", "J"][index]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
