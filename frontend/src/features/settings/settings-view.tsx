"use client";

import { Field } from "@/components/patterns/field";
import { ListItem, ListPanel } from "@/components/patterns/list-panel";
import { IconType, Notify } from "@/components/patterns/types";
import { Archive, Building2, Clock3, FileText, Folder, KeyRound, LockKeyhole, Mail, Palette, Tag } from "lucide-react";

export function SettingsView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  if (
    [
      "Tipos documentales",
      "Estados",
      "Metadatos",
      "Etiquetas",
      "Plantillas",
      "Retención",
    ].includes(subcategory)
  ) {
    const catalogs: Record<string, ListItem[]> = {
      "Tipos documentales": [
        {
          title: "Contrato",
          meta: "CON · 8 metadatos · Workflow: Aprobación de contratos",
          date: "5 años de retención",
          status: "Activo",
        },
        {
          title: "Informe",
          meta: "INF · 6 metadatos · Workflow: Revisión simple",
          date: "3 años de retención",
          status: "Activo",
        },
        {
          title: "Política",
          meta: "POL · 5 metadatos · Workflow: Publicación de políticas",
          date: "Vigencia permanente",
          status: "Activo",
        },
      ],
      Estados: [
        {
          title: "Borrador",
          meta: "Estado inicial · Permite edición",
          date: "Orden 1",
          status: "Activo",
        },
        {
          title: "En revisión",
          meta: "Bloquea contenido · Permite comentarios",
          date: "Orden 3",
          status: "Activo",
        },
        {
          title: "Aprobado",
          meta: "Versión vigente · Solo lectura",
          date: "Orden 5",
          status: "Activo",
        },
      ],
      Metadatos: [
        {
          title: "Área responsable",
          meta: "Lista · Obligatorio · Documentos y expedientes",
          date: "Sistema",
          status: "Activo",
        },
        {
          title: "Número de contrato",
          meta: "Texto · Obligatorio para Contrato",
          date: "Personalizado",
          status: "Activo",
        },
        {
          title: "Fecha de vigencia",
          meta: "Fecha · Validación de rango",
          date: "Personalizado",
          status: "Activo",
        },
      ],
      Etiquetas: [
        {
          title: "Confidencial",
          meta: "86 documentos · Color rojo",
          date: "Uso controlado",
          status: "Activo",
        },
        {
          title: "Proveedor",
          meta: "142 documentos · Color turquesa",
          date: "Uso general",
          status: "Activo",
        },
        {
          title: "Revisión anual",
          meta: "38 documentos · Color amarillo",
          date: "Uso general",
          status: "Activo",
        },
      ],
      Plantillas: [
        {
          title: "Contrato de servicios",
          meta: "DOCX · Versión 4 · Área Legal",
          date: "Actualizada ayer",
          status: "Vigente",
        },
        {
          title: "Informe mensual",
          meta: "DOCX · Versión 2 · Dirección",
          date: "Actualizada 10 jun",
          status: "Vigente",
        },
        {
          title: "Acta de reunión",
          meta: "DOCX · Versión 6 · Uso general",
          date: "Actualizada 2 jun",
          status: "Vigente",
        },
      ],
      Retención: [
        {
          title: "Documentos contractuales",
          meta: "Conservar 5 años después del cierre",
          date: "Archivo automático",
          status: "Activo",
        },
        {
          title: "Documentos contables",
          meta: "Conservar 10 años desde su emisión",
          date: "Revisión legal",
          status: "Activo",
        },
        {
          title: "Políticas institucionales",
          meta: "Conservación permanente",
          date: "Sin eliminación",
          status: "Activo",
        },
      ],
    };
    return (
      <ListPanel
        title={subcategory}
        description={`Catálogo configurable únicamente para Acme Consulting`}
        icon={
          subcategory === "Etiquetas"
            ? Tag
            : subcategory === "Retención"
              ? Archive
              : FileText
        }
        items={catalogs[subcategory]}
        onAction={onAction}
      />
    );
  }
  const security = subcategory === "Seguridad";
  const appearance = subcategory === "Apariencia";
  return (
    <section className="mt-6 rounded-2xl border border-[#dcebe8] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-[#dff7f3] text-[#0f9d9a]">
          {security ? (
            <LockKeyhole className="size-5" />
          ) : appearance ? (
            <Palette className="size-5" />
          ) : (
            <Building2 className="size-5" />
          )}
        </span>
        <div>
          <h2 className="font-bold text-[#163a39]">
            {subcategory === "General"
              ? "Información institucional"
              : subcategory}
          </h2>
          <p className="text-xs text-[#78918f]">
            Esta configuración solo afecta al tenant actual.
          </p>
        </div>
      </div>
      {appearance ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#dcebe8] p-5">
            <p className="text-xs font-semibold text-[#315a57]">Logotipo</p>
            <div className="mt-3 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-[#cfe7e3] bg-[#f7fbfa]">
              <div className="flex items-center gap-3 text-[#087f7b]">
                <Folder className="size-7" />
                <b>NexoDocs</b>
              </div>
            </div>
            <button
              onClick={() => onAction("Selector de logotipo abierto")}
              className="mt-3 text-xs font-semibold text-[#0f9d9a]"
            >
              Cambiar logotipo
            </button>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#315a57]">
              Color principal
            </p>
            <div className="mt-3 flex gap-3">
              {["#087f7b", "#2563eb", "#7c3aed", "#be123c", "#334155"].map(
                (color) => (
                  <button
                    key={color}
                    aria-label={`Elegir color ${color}`}
                    onClick={() => onAction(`Color ${color} seleccionado`)}
                    className="size-10 rounded-full ring-2 ring-offset-2 ring-transparent focus:ring-[#0f9d9a]"
                    style={{ backgroundColor: color }}
                  />
                ),
              )}
            </div>
            <Field label="Nombre visible" placeholder="Acme Consulting" />
          </div>
        </div>
      ) : security ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(
            [
              [
                KeyRound,
                "Autenticación de dos factores",
                "Exigir 2FA a administradores",
                true,
              ],
              [Clock3, "Duración de sesión", "Cerrar después de 8 horas", true],
              [
                LockKeyhole,
                "Política de contraseñas",
                "Mínimo 12 caracteres",
                true,
              ],
              [Mail, "Dominios autorizados", "@acme.com", false],
            ] as Array<[IconType, string, string, boolean]>
          ).map(([Icon, title, detail, enabled]) => (
            <label
              key={title as string}
              className="flex items-center gap-4 rounded-xl border border-[#dcebe8] p-4"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#eef8f6] text-[#0f9d9a]">
                <Icon className="size-5" />
              </span>
              <span className="flex-1">
                <b className="block text-xs text-[#315a57]">
                  {title as string}
                </b>
                <small className="text-[11px] text-[#78918f]">
                  {detail as string}
                </small>
              </span>
              <input
                type="checkbox"
                defaultChecked={enabled as boolean}
                className="size-4 accent-[#0f9d9a]"
              />
            </label>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Field
            label="Nombre de la organización"
            placeholder="Acme Consulting"
          />
          <Field label="Código del tenant" placeholder="ACME" />
          <Field
            label="Correo institucional"
            placeholder="documentos@acme.com"
          />
          <Field
            label="Zona horaria"
            placeholder="America/La_Paz"
            type="select"
          />
          <Field label="Dirección" placeholder="Av. Principal 123" wide />
          <Field
            label="Descripción"
            placeholder="Información institucional..."
            type="textarea"
            wide
          />
        </div>
      )}
      <div className="mt-6 flex justify-end border-t border-[#edf3f1] pt-5">
        <button
          onClick={() => onAction(`${subcategory}: configuración guardada`)}
          className="rounded-xl bg-[#0f9d9a] px-5 py-2.5 text-xs font-semibold text-white"
        >
          Guardar cambios
        </button>
      </div>
    </section>
  );
}
