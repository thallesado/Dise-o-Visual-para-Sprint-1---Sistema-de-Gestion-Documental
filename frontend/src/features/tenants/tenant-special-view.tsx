"use client";

import { Badge } from "@/components/patterns/badge";
import { Notify } from "@/components/patterns/types";
import { SettingsView } from "@/features/settings/settings-view";
import { tenants } from "@/features/tenants/demo-data";
import { CheckCircle2 } from "lucide-react";

export function TenantSpecialView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  if (subcategory === "Planes")
    return (
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {[
          ["Básico", "$29", "5 GB · 10 usuarios"],
          ["Profesional", "$79", "25 GB · 100 usuarios"],
          ["Empresarial", "Personalizado", "Capacidad y usuarios escalables"],
        ].map(([name, price, detail], index) => (
          <section
            key={name}
            className={`rounded-2xl border bg-white p-6 shadow-sm ${index === 1 ? "border-[#62c9c0] ring-2 ring-[#dff7f3]" : "border-[#dcebe8]"}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#163a39]">{name}</h2>
              {index === 1 && <Badge>Más utilizado</Badge>}
            </div>
            <p className="mt-5 text-2xl font-bold text-[#087f7b]">{price}</p>
            <p className="mt-2 text-xs text-[#78918f]">{detail}</p>
            <div className="my-5 h-px bg-[#edf3f1]" />
            {[
              "Gestión documental",
              "Workflows",
              index > 0 ? "Auditoría avanzada" : "Auditoría básica",
              index === 2 ? "Branding personalizado" : "Soporte estándar",
            ].map((feature) => (
              <p
                key={feature}
                className="mt-3 flex gap-2 text-xs text-[#5a7775]"
              >
                <CheckCircle2 className="size-4 text-[#0f9d9a]" />
                {feature}
              </p>
            ))}
            <button
              onClick={() => onAction(`Plan ${name} seleccionado`)}
              className="mt-6 w-full rounded-xl bg-[#eafaf7] py-2.5 text-xs font-semibold text-[#087f7b]"
            >
              Configurar plan
            </button>
          </section>
        ))}
      </div>
    );
  if (subcategory === "Uso de almacenamiento")
    return (
      <section className="mt-6 rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Consumo por organización</h2>
        <p className="mt-1 text-xs text-[#78918f]">
          Capacidad utilizada frente al límite contratado.
        </p>
        <div className="mt-6 space-y-6">
          {tenants.map((tenant, index) => {
            const values = [68, 57, 63, 42];
            return (
              <div key={tenant.title}>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="font-semibold text-[#315a57]">
                    {tenant.title}
                  </span>
                  <span className="text-[#78918f]">{tenant.date}</span>
                </div>
                <div className="h-2.5 rounded-full bg-[#edf4f2]">
                  <div
                    className="h-2.5 rounded-full bg-[#0f9d9a]"
                    style={{ width: `${values[index]}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  return <SettingsView subcategory="Apariencia" onAction={onAction} />;
}
