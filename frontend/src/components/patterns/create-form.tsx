"use client";

import { Field } from "@/components/patterns/field";
import { Notify } from "@/components/patterns/types";
import { screenCopy } from "@/features/workspace/screen-copy";
import { Building2, CheckCircle2, FileText, Folder, UserPlus } from "lucide-react";

export function CreateForm({
  module,
  subcategory,
  onAction,
}: {
  module: string;
  subcategory: string;
  onAction: Notify;
}) {
  const isUser = module === "Usuarios y equipos";
  const isTenant = module === "Tenants";
  const isCase = module === "Expedientes";
  const title = isUser
    ? "Información del nuevo usuario"
    : isTenant
      ? "Información de la organización"
      : isCase
        ? "Datos del expediente"
        : "Información del documento";
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
      <section className="rounded-2xl border border-[#dcebe8] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#dff7f3] text-[#0f9d9a]">
            {isUser ? (
              <UserPlus className="size-5" />
            ) : isTenant ? (
              <Building2 className="size-5" />
            ) : isCase ? (
              <Folder className="size-5" />
            ) : (
              <FileText className="size-5" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-[#163a39]">{title}</h2>
            <p className="text-xs text-[#78918f]">
              Los campos marcados como obligatorios deben completarse.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {isUser ? (
            <>
              <Field
                label="Nombres y apellidos *"
                placeholder="Ej. Sofía Ramírez"
              />
              <Field
                label="Correo institucional *"
                placeholder="usuario@acme.com"
              />
              <Field
                label="Rol *"
                placeholder="Seleccionar rol"
                type="select"
              />
              <Field
                label="Área"
                placeholder="Seleccionar área"
                type="select"
              />
            </>
          ) : isTenant ? (
            <>
              <Field
                label="Nombre de la organización *"
                placeholder="Ej. Clínica Central"
              />
              <Field label="Código *" placeholder="CLINICA-CENTRAL" />
              <Field label="Subdominio *" placeholder="clinica.nexodocs.app" />
              <Field
                label="Plan"
                placeholder="Seleccionar plan"
                type="select"
              />
              <Field label="Almacenamiento máximo" placeholder="25 GB" />
              <Field
                label="Administrador inicial"
                placeholder="admin@organizacion.com"
              />
            </>
          ) : (
            <>
              <Field
                label={
                  isCase ? "Nombre del expediente *" : "Nombre del documento *"
                }
                placeholder={
                  isCase
                    ? "Ej. Alta de proveedor Andes"
                    : "Ej. Política de seguridad"
                }
              />
              <Field label="Código" placeholder="Generado automáticamente" />
              <Field
                label={isCase ? "Tipo de expediente *" : "Tipo documental *"}
                placeholder="Seleccionar tipo"
                type="select"
              />
              <Field
                label="Área responsable *"
                placeholder="Seleccionar área"
                type="select"
              />
              <Field label="Responsable" placeholder="Buscar usuario" />
              <Field label="Etiquetas" placeholder="Escribe y presiona Enter" />
              <Field
                label="Descripción"
                placeholder="Añade contexto para facilitar su identificación..."
                type="textarea"
                wide
              />
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-[#edf3f1] pt-5">
          <button
            onClick={() => onAction("Formulario cancelado")}
            className="h-10 rounded-xl border border-[#dcebe8] px-4 text-xs font-semibold text-[#5a7775]"
          >
            Cancelar
          </button>
          <button
            onClick={() => onAction(`${subcategory}: datos validados`)}
            className="h-10 rounded-xl bg-[#0f9d9a] px-5 text-xs font-semibold text-white"
          >
            {screenCopy[`${module}|${subcategory}`]?.action ?? "Guardar"}
          </button>
        </div>
      </section>
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h3 className="font-bold text-[#163a39]">Antes de continuar</h3>
        <div className="mt-4 space-y-4">
          {[
            "La información pertenecerá únicamente a Acme Consulting.",
            "Los permisos se aplicarán según el rol seleccionado.",
            "La creación quedará registrada en auditoría.",
          ].map((text) => (
            <div key={text} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#0f9d9a]" />
              <p className="text-xs leading-5 text-[#6b8583]">{text}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
