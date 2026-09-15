"use client";

import { StatCard, documents, statusStyles } from "@/features/dashboard/summary-view";
import { IconType, findNav } from "@/features/workspace/navigation";
import { Activity, Building2, CheckCircle2, Database, Download, FileText, Grid2X2, Layers3, MoreHorizontal, Plus, Search, SlidersHorizontal, Users, Workflow } from "lucide-react";

export function ModuleView({
  module,
  subcategory,
  onAction,
}: {
  module: string;
  subcategory: string;
  onAction: (message: string) => void;
}) {
  const Icon = findNav(module)?.icon ?? Layers3;
  const isDocs = module === "Documentos",
    isUsers = module === "Usuarios y equipos",
    isTenants = module === "Tenants",
    isWorkflows = module === "Workflows";
  const descriptions: Record<string, string> = {
    Expedientes:
      "Agrupa documentos relacionados bajo una misma unidad lógica o caso.",
    Documentos:
      "Administra el ciclo de vida documental con trazabilidad y control.",
    Workflows: "Gestiona revisiones, aprobaciones y tareas repetitivas.",
    Digitalización:
      "Convierte documentos físicos en información estructurada mediante OCR.",
    "Búsqueda avanzada":
      "Encuentra documentos, expedientes y procesos con filtros combinables.",
    "Usuarios y equipos":
      "Gestiona personas, áreas, roles y permisos del tenant.",
    Auditoría:
      "Consulta todas las acciones relevantes realizadas en el sistema.",
    Reportes: "Analiza productividad, uso documental y actividad por área.",
    Notificaciones: "Revisa eventos que requieren atención del usuario.",
    Configuración:
      "Personaliza funcionamiento, seguridad y apariencia del tenant.",
    Tenants: "Administra organizaciones, planes, consumo y branding global.",
  };
  const stats = isTenants
    ? [
      ["Tenants activos", "24", "+3 este mes"],
      ["Usuarios totales", "1,842", "En todas las organizaciones"],
      ["Almacenamiento", "68%", "Uso global"],
    ]
    : isUsers
      ? [
        ["Usuarios activos", "42", "2 invitaciones pendientes"],
        ["Equipos", "8", "Por departamento"],
        ["Roles configurados", "6", "Con permisos"],
      ]
      : isWorkflows
        ? [
          ["Workflows activos", "32", "8 requieren acción"],
          ["Finalizados", "148", "+16 esta semana"],
          ["Plantillas", "12", "Listas para usar"],
        ]
        : [
          ["Registros encontrados", "1,248", "Actualizado ahora"],
          ["Pendientes", "24", "Requieren atención"],
          ["Actividad mensual", "+12.5%", "Comparado con mayo"],
        ];
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-9">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[#0f9d9a]">
            {module} · {subcategory}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#163a39]">
            {subcategory}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6b8583]">
            {descriptions[module] ??
              "Gestiona la operación de tu organización desde este espacio."}
          </p>
        </div>
        <button
          onClick={() => onAction(`${subcategory} preparado`)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0f9d9a] px-5 text-sm font-semibold text-white"
        >
          <Plus className="size-4" />
          {isUsers
            ? "Crear usuario"
            : isTenants
              ? "Crear tenant"
              : "Nueva acción"}
        </button>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {stats.map(([label, value, detail], i) => (
          <StatCard
            key={label}
            icon={i === 0 ? Icon : i === 1 ? Activity : Database}
            label={label}
            value={value}
            detail={detail}
            tone={i === 1 ? "amber" : "teal"}
          />
        ))}
      </div>
      {isDocs ? (
        <DocumentTable onAction={onAction} />
      ) : isTenants ? (
        <TenantTable onAction={onAction} />
      ) : isUsers ? (
        <UserTable onAction={onAction} />
      ) : isWorkflows ? (
        <WorkflowTable onAction={onAction} />
      ) : (
        <GenericPanel
          module={module}
          subcategory={subcategory}
          onAction={onAction}
        />
      )}
    </div>
  );
}

export function PanelHeader({
  title,
  description,
  onAction,
}: {
  title: string;
  description: string;
  onAction: (message: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#edf3f1] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-bold text-[#163a39]">{title}</h2>
        <p className="mt-1 text-xs text-[#78918f]">{description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onAction("Filtros abiertos")}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#dcebe8] px-3 text-xs font-semibold text-[#4e706d]"
        >
          <SlidersHorizontal className="size-4" />
          Filtros
        </button>
        <button
          onClick={() => onAction("Exportación preparada")}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#eafaf7] px-3 text-xs font-semibold text-[#087f7b]"
        >
          <Download className="size-4" />
          Exportar
        </button>
      </div>
    </div>
  );
}

export function DocumentTable({ onAction }: { onAction: (message: string) => void; }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <PanelHeader
        title="Repositorio documental"
        description="Consulta, filtra y gestiona todos los documentos del tenant"
        onAction={onAction}
      />
      <div className="flex items-center gap-3 border-b border-[#edf3f1] p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8aa19f]" />
          <input
            aria-label="Buscar en documentos"
            placeholder="Buscar por nombre, código o etiqueta..."
            className="h-10 w-full rounded-xl border border-[#dcebe8] bg-[#f8fbfa] pl-10 pr-4 text-sm outline-none"
          />
        </div>
        <button
          onClick={() => onAction("Vista cambiada")}
          className="rounded-lg border border-[#dcebe8] p-2 text-[#0f9d9a]"
          aria-label="Cambiar vista"
        >
          <Grid2X2 className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-[#edf3f1]">
        {documents.map(([name, type, owner, updated, status, color], index) => (
          <div
            key={name}
            className="flex flex-wrap items-center gap-3 px-5 py-4"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef8f6] text-[#0f9d9a]">
              <FileText className="size-5" />
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="text-sm font-semibold text-[#244b49]">{name}</p>
              <p className="mt-1 text-xs text-[#8aa19f]">
                DOC-{String(2041 + index)} · {type} · {owner}
              </p>
            </div>
            <span className="text-xs text-[#78918f]">{updated}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[color]}`}
            >
              {status}
            </span>
            <button
              onClick={() => onAction(`Detalle de ${name} abierto`)}
              className="rounded-lg p-2 text-[#71908e] hover:bg-[#eef8f6]"
              aria-label={`Abrir ${name}`}
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UserTable({ onAction }: { onAction: (message: string) => void; }) {
  return (
    <TableShell
      title="Directorio de usuarios"
      description="42 usuarios activos en Acme Consulting"
      onAction={onAction}
    >
      {[
        ["Laura Martínez", "laura@acme.com", "Administradora", "Activo"],
        ["Carlos Méndez", "carlos@acme.com", "Supervisor", "Activo"],
        ["Ana López", "ana@acme.com", "Usuario", "Activo"],
        [
          "Javier Ruiz",
          "javier@acme.com",
          "Supervisor",
          "Invitación pendiente",
        ],
      ].map(([name, email, role, status]) => (
        <Row
          key={email}
          icon={Users}
          title={name}
          subtitle={`${email} · ${role}`}
          status={status}
          onAction={onAction}
        />
      ))}
    </TableShell>
  );
}

export function TenantTable({ onAction }: { onAction: (message: string) => void; }) {
  return (
    <TableShell
      title="Organizaciones registradas"
      description="Control global de tenants y consumo de plataforma"
      onAction={onAction}
    >
      {[
        ["Acme Consulting", "acme.nexodocs.app", "Empresarial", "Activo"],
        [
          "Clínica Central",
          "clinicacentral.nexodocs.app",
          "Profesional",
          "Activo",
        ],
        ["Grupo Norte", "gruponorte.nexodocs.app", "Básico", "Suspendido"],
      ].map(([name, domain, plan, status]) => (
        <Row
          key={domain}
          icon={Building2}
          title={name}
          subtitle={`${domain} · Plan ${plan}`}
          status={status}
          onAction={onAction}
        />
      ))}
    </TableShell>
  );
}

export function WorkflowTable({ onAction }: { onAction: (message: string) => void; }) {
  return (
    <TableShell
      title="Flujos de trabajo"
      description="Seguimiento de etapas, responsables y fechas límite"
      onAction={onAction}
    >
      {[
        [
          "Aprobación de contratos",
          "Contrato marco proveedores 2025",
          "En revisión",
        ],
        ["Alta de proveedor", "Expediente EXP-2041", "Pendiente"],
        ["Revisión trimestral", "Informe auditoría interna Q2", "Aprobado"],
      ].map(([name, document, status]) => (
        <Row
          key={name}
          icon={Workflow}
          title={name}
          subtitle={`${document} · Responsable: Laura Martínez`}
          status={status}
          onAction={onAction}
        />
      ))}
    </TableShell>
  );
}

export function Row({
  icon: Icon,
  title,
  subtitle,
  status,
  onAction,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
  status: string;
  onAction: (message: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="flex size-10 items-center justify-center rounded-xl bg-[#eef8f6] text-[#0f9d9a]">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#244b49]">{title}</p>
        <p className="truncate text-xs text-[#8aa19f]">{subtitle}</p>
      </div>
      <span className="rounded-full bg-[#eafaf7] px-2.5 py-1 text-[11px] font-semibold text-[#087f7b]">
        {status}
      </span>
      <button
        onClick={() => onAction(`${title} seleccionado`)}
        className="rounded-lg p-2 text-[#71908e]"
        aria-label={`Abrir ${title}`}
      >
        <MoreHorizontal className="size-4" />
      </button>
    </div>
  );
}

export function TableShell({
  title,
  description,
  children,
  onAction,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onAction: (message: string) => void;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <PanelHeader
        title={title}
        description={description}
        onAction={onAction}
      />
      <div className="divide-y divide-[#edf3f1]">{children}</div>
    </div>
  );
}

export function GenericPanel({
  module,
  subcategory,
  onAction,
}: {
  module: string;
  subcategory: string;
  onAction: (message: string) => void;
}) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#dff7f3] text-[#0f9d9a]">
            <Activity className="size-5" />
          </div>
          <div>
            <h2 className="font-bold text-[#163a39]">
              Actividad de {subcategory.toLowerCase()}
            </h2>
            <p className="text-xs text-[#78918f]">
              Información actualizada del módulo {module}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          {[
            "Actualización completada",
            "Nueva solicitud recibida",
            "Elemento asignado a tu equipo",
          ].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-[#f7fbfa] p-3"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#dff7f3] text-[#0f9d9a]">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#315a57]">{item}</p>
                <p className="text-xs text-[#8aa19f]">
                  Hace {i + 1} horas · Laura Martínez
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Acciones del módulo</h2>
        <p className="mt-1 text-xs text-[#78918f]">
          Gestiona esta sección desde sus accesos rápidos
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {[
            "Crear nuevo registro",
            "Importar información",
            "Configurar vista",
          ].map((action) => (
            <button
              key={action}
              onClick={() => onAction(`${action} preparado`)}
              className="flex items-center gap-3 rounded-xl bg-[#eafaf7] px-3 py-3 text-left text-xs font-semibold text-[#17635f]"
            >
              <Plus className="size-4 text-[#0f9d9a]" />
              {action}
              <span className="ml-auto">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
