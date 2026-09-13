"use client";

import type { ReactNode } from "react";
import {
  Activity,
  Archive,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Database,
  Download,
  Eye,
  FileCheck2,
  FileClock,
  FileText,
  Folder,
  HardDrive,
  History,
  KeyRound,
  Layers3,
  LockKeyhole,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Palette,
  PencilLine,
  Plus,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  UserPlus,
  Users,
  Workflow,
  XCircle,
} from "lucide-react";

type IconType = typeof Folder;
type Notify = (message: string) => void;

type ScreenCopy = {
  description: string;
  action?: string;
};

const screenCopy: Record<string, ScreenCopy> = {
  "Inicio|Actividad reciente": {
    description:
      "Consulta los últimos movimientos realizados dentro de la organización.",
    action: "Exportar actividad",
  },
  "Inicio|Mis tareas": {
    description:
      "Prioriza las revisiones, aprobaciones y validaciones asignadas a tu usuario.",
    action: "Ver calendario",
  },
  "Inicio|Indicadores": {
    description:
      "Analiza el rendimiento documental y operativo del tenant actual.",
    action: "Personalizar panel",
  },
  "Expedientes|Todos los expedientes": {
    description:
      "Consulta las unidades documentales y casos registrados en la organización.",
    action: "Crear expediente",
  },
  "Expedientes|Crear expediente": {
    description:
      "Registra una nueva unidad documental para agrupar documentos, participantes y procesos.",
    action: "Guardar borrador",
  },
  "Expedientes|Activos": {
    description:
      "Expedientes abiertos que actualmente reciben documentos o participan en procesos.",
    action: "Crear expediente",
  },
  "Expedientes|Cerrados": {
    description:
      "Expedientes concluidos que se conservan disponibles para consulta controlada.",
    action: "Exportar listado",
  },
  "Expedientes|Archivados": {
    description:
      "Expedientes trasladados al archivo según las políticas de conservación.",
    action: "Revisar retención",
  },
  "Documentos|Todos los documentos": {
    description:
      "Repositorio central del tenant con trazabilidad, permisos y control de versiones.",
    action: "Nuevo documento",
  },
  "Documentos|Nuevo documento": {
    description:
      "Crea un documento desde cero o a partir de una plantilla institucional.",
    action: "Guardar borrador",
  },
  "Documentos|Subir archivo": {
    description:
      "Incorpora uno o varios archivos y completa sus datos de clasificación.",
    action: "Seleccionar archivos",
  },
  "Documentos|Mis documentos": {
    description: "Documentos creados por ti o de los que eres responsable.",
    action: "Nuevo documento",
  },
  "Documentos|Compartidos conmigo": {
    description: "Documentos a los que otros usuarios te concedieron acceso.",
    action: "Gestionar accesos",
  },
  "Documentos|Recientes": {
    description:
      "Documentos consultados o modificados recientemente dentro del tenant.",
    action: "Ver historial",
  },
  "Documentos|Pendientes": {
    description:
      "Documentos que todavía requieren completar información o iniciar su revisión.",
    action: "Asignar responsable",
  },
  "Documentos|En revisión": {
    description:
      "Documentos que están siendo evaluados dentro de un flujo de aprobación.",
    action: "Revisar siguiente",
  },
  "Documentos|Aprobados": {
    description:
      "Documentos aprobados y vigentes para su uso en la organización.",
    action: "Exportar listado",
  },
  "Documentos|Archivados": {
    description:
      "Documentos conservados como histórico y protegidos contra cambios directos.",
    action: "Revisar retención",
  },
  "Documentos|Papelera": {
    description:
      "Elementos eliminados lógicamente que aún pueden restaurarse según la política vigente.",
    action: "Vaciar vencidos",
  },
  "Digitalización|Escanear documento": {
    description:
      "Captura documentos físicos y prepara sus páginas para el procesamiento digital.",
    action: "Iniciar escaneo",
  },
  "Digitalización|Subir documento": {
    description:
      "Carga archivos digitalizados para extraer texto y sugerir su clasificación.",
    action: "Seleccionar archivo",
  },
  "Digitalización|Procesamiento OCR": {
    description:
      "Supervisa la extracción de texto y el nivel de confianza de cada lote.",
    action: "Procesar nuevo lote",
  },
  "Digitalización|Validación": {
    description:
      "Compara el archivo original con los datos extraídos antes de confirmarlos.",
    action: "Validar siguiente",
  },
  "Digitalización|Indexación": {
    description:
      "Asocia documentos digitalizados con expedientes, tipos y categorías.",
    action: "Indexar siguiente",
  },
  "Digitalización|Corrección de metadatos": {
    description:
      "Corrige sugerencias de baja confianza antes de almacenar el documento.",
    action: "Revisar siguiente",
  },
  "Workflows|Todos los workflows": {
    description:
      "Consulta flujos de revisión, aprobación y archivo de la organización.",
    action: "Crear workflow",
  },
  "Workflows|Mis tareas": {
    description: "Tareas de workflow asignadas a tu usuario, rol o área.",
    action: "Ver calendario",
  },
  "Workflows|Pendientes de revisión": {
    description: "Etapas que esperan una revisión documental o de metadatos.",
    action: "Revisar siguiente",
  },
  "Workflows|Pendientes de aprobación": {
    description:
      "Decisiones que requieren aprobación de un usuario autorizado.",
    action: "Abrir siguiente",
  },
  "Workflows|Activos": {
    description:
      "Flujos iniciados que aún tienen etapas o decisiones pendientes.",
    action: "Crear workflow",
  },
  "Workflows|Finalizados": {
    description: "Histórico de procesos completados, cancelados o cerrados.",
    action: "Exportar historial",
  },
  "Workflows|Plantillas": {
    description:
      "Modelos reutilizables de etapas, responsables, reglas y transiciones.",
    action: "Nueva plantilla",
  },
  "Workflows|Diseñador": {
    description:
      "Diseña visualmente las etapas y decisiones de un nuevo flujo documental.",
    action: "Guardar workflow",
  },
  "Usuarios y equipos|Todos los usuarios": {
    description: "Directorio de personas con acceso al tenant actual.",
    action: "Crear usuario",
  },
  "Usuarios y equipos|Crear usuario": {
    description:
      "Invita un usuario y asigna su rol, área y condiciones de acceso.",
    action: "Enviar invitación",
  },
  "Usuarios y equipos|Activos": {
    description: "Usuarios habilitados que pueden ingresar según sus permisos.",
    action: "Crear usuario",
  },
  "Usuarios y equipos|Bloqueados": {
    description: "Cuentas bloqueadas por seguridad o acción administrativa.",
    action: "Exportar listado",
  },
  "Usuarios y equipos|Roles": {
    description:
      "Define responsabilidades reutilizables para asignar permisos de forma consistente.",
    action: "Crear rol",
  },
  "Usuarios y equipos|Permisos": {
    description:
      "Controla qué acciones puede realizar cada rol sobre los módulos del sistema.",
    action: "Guardar cambios",
  },
  "Usuarios y equipos|Áreas": {
    description:
      "Organiza usuarios y responsables por departamentos del tenant.",
    action: "Crear área",
  },
  "Usuarios y equipos|Grupos": {
    description:
      "Agrupa usuarios para asignar tareas, accesos y notificaciones.",
    action: "Crear grupo",
  },
  "Auditoría|Registro general": {
    description:
      "Histórico inmutable de acciones relevantes realizadas dentro del tenant.",
    action: "Exportar registro",
  },
  "Auditoría|Accesos": {
    description: "Eventos de inicio, cierre, bloqueo y recuperación de sesión.",
    action: "Exportar accesos",
  },
  "Auditoría|Creación de documentos": {
    description:
      "Trazabilidad de documentos creados, cargados o digitalizados.",
    action: "Exportar registro",
  },
  "Auditoría|Modificaciones": {
    description: "Cambios controlados sobre metadatos, contenido y versiones.",
    action: "Comparar cambios",
  },
  "Auditoría|Descargas": {
    description:
      "Registro de archivos descargados y usuarios que accedieron a ellos.",
    action: "Exportar descargas",
  },
  "Auditoría|Aprobaciones": {
    description: "Decisiones de aprobación y rechazo tomadas en los workflows.",
    action: "Exportar decisiones",
  },
  "Auditoría|Eliminaciones": {
    description:
      "Elementos anulados o enviados a eliminación lógica, sin alterar el histórico.",
    action: "Revisar eventos",
  },
  "Auditoría|Cambios de permisos": {
    description:
      "Modificaciones sensibles realizadas sobre roles, permisos y accesos.",
    action: "Exportar cambios",
  },
  "Reportes|Documentos": {
    description: "Distribución documental por estado, tipo, área y período.",
    action: "Descargar reporte",
  },
  "Reportes|Usuarios": {
    description: "Altas, actividad y estado de las cuentas del tenant.",
    action: "Descargar reporte",
  },
  "Reportes|Workflows": {
    description:
      "Volumen, cumplimiento y duración de los procesos documentales.",
    action: "Descargar reporte",
  },
  "Reportes|Almacenamiento": {
    description:
      "Uso de espacio por tipo de archivo, área y período de conservación.",
    action: "Descargar reporte",
  },
  "Reportes|Auditoría": {
    description:
      "Tendencias de acceso y acciones sensibles registradas en el sistema.",
    action: "Descargar reporte",
  },
  "Reportes|Productividad": {
    description:
      "Documentos procesados, tareas completadas y tiempos de respuesta.",
    action: "Descargar reporte",
  },
  "Reportes|Actividad por área": {
    description:
      "Compara la operación documental entre departamentos de la organización.",
    action: "Descargar reporte",
  },
  "Notificaciones|Todas": {
    description:
      "Centro de eventos, avisos y solicitudes relacionadas con tu cuenta.",
    action: "Marcar todas como leídas",
  },
  "Notificaciones|No leídas": {
    description: "Notificaciones nuevas que todavía requieren tu atención.",
    action: "Marcar como leídas",
  },
  "Notificaciones|Tareas": {
    description: "Avisos de asignación, vencimiento y cambios en tus tareas.",
    action: "Ver mis tareas",
  },
  "Notificaciones|Aprobaciones": {
    description: "Solicitudes y resultados de aprobación de documentos.",
    action: "Revisar solicitudes",
  },
  "Notificaciones|Menciones": {
    description:
      "Comentarios en los que otros usuarios solicitaron tu participación.",
    action: "Ver conversaciones",
  },
  "Configuración|General": {
    description:
      "Datos institucionales y preferencias generales de Acme Consulting.",
    action: "Guardar cambios",
  },
  "Configuración|Tipos documentales": {
    description:
      "Configura tipos, códigos, metadatos obligatorios y workflows asociados.",
    action: "Crear tipo documental",
  },
  "Configuración|Estados": {
    description:
      "Administra los estados disponibles durante el ciclo de vida documental.",
    action: "Crear estado",
  },
  "Configuración|Metadatos": {
    description:
      "Define campos personalizados para clasificar documentos y expedientes.",
    action: "Crear metadato",
  },
  "Configuración|Etiquetas": {
    description:
      "Mantén un vocabulario controlado para mejorar la clasificación y búsqueda.",
    action: "Crear etiqueta",
  },
  "Configuración|Plantillas": {
    description:
      "Gestiona plantillas institucionales para crear documentos consistentes.",
    action: "Subir plantilla",
  },
  "Configuración|Retención": {
    description:
      "Define conservación, archivo y disposición por tipo documental.",
    action: "Crear política",
  },
  "Configuración|Seguridad": {
    description:
      "Configura acceso, sesiones y controles de protección del tenant.",
    action: "Guardar seguridad",
  },
  "Configuración|Apariencia": {
    description:
      "Personaliza logotipo, colores y elementos visuales de la organización.",
    action: "Guardar apariencia",
  },
  "Tenants|Todos los tenants": {
    description:
      "Administra las organizaciones aisladas registradas en la plataforma.",
    action: "Crear tenant",
  },
  "Tenants|Crear tenant": {
    description:
      "Registra una organización con su plan, dominio, capacidad y branding inicial.",
    action: "Crear tenant",
  },
  "Tenants|Activos": {
    description:
      "Organizaciones habilitadas y operando actualmente en la plataforma.",
    action: "Crear tenant",
  },
  "Tenants|Suspendidos": {
    description:
      "Organizaciones con acceso temporalmente restringido por administración global.",
    action: "Exportar listado",
  },
  "Tenants|Planes": {
    description:
      "Configura capacidades, límites y prestaciones de los planes comerciales.",
    action: "Crear plan",
  },
  "Tenants|Uso de almacenamiento": {
    description:
      "Supervisa el consumo y los límites asignados a cada organización.",
    action: "Exportar consumo",
  },
  "Tenants|Branding": {
    description:
      "Gestiona identidad visual y dominios personalizados por organización.",
    action: "Guardar branding",
  },
};

const moduleIcons: Record<string, IconType> = {
  Inicio: Activity,
  Expedientes: Folder,
  Documentos: FileText,
  Digitalización: ScanLine,
  Workflows: Workflow,
  "Usuarios y equipos": Users,
  Auditoría: Archive,
  Reportes: BarChart3,
  Notificaciones: Bell,
  Configuración: Settings,
  Tenants: Building2,
};

const statusTone: Record<string, string> = {
  Activo: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Aprobado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Completada: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Completado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Vigente: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pendiente: "bg-amber-50 text-amber-700 ring-amber-200",
  "En revisión": "bg-sky-50 text-sky-700 ring-sky-200",
  "En proceso": "bg-sky-50 text-sky-700 ring-sky-200",
  Cerrado: "bg-slate-100 text-slate-600 ring-slate-200",
  Archivado: "bg-slate-100 text-slate-600 ring-slate-200",
  Suspendido: "bg-rose-50 text-rose-700 ring-rose-200",
  Bloqueado: "bg-rose-50 text-rose-700 ring-rose-200",
  Vencida: "bg-rose-50 text-rose-700 ring-rose-200",
  Rechazado: "bg-rose-50 text-rose-700 ring-rose-200",
};

const documents = [
  {
    title: "Política de seguridad de la información",
    meta: "DOC-2041 · PDF · María González",
    date: "Hoy, 09:42",
    status: "Aprobado",
  },
  {
    title: "Contrato marco proveedores 2025",
    meta: "DOC-2042 · DOCX · Carlos Méndez",
    date: "Ayer, 16:18",
    status: "En revisión",
  },
  {
    title: "Informe auditoría interna Q2",
    meta: "DOC-2043 · XLSX · Javier Ruiz",
    date: "10 jun 2025",
    status: "Pendiente",
  },
  {
    title: "Manual de incorporación",
    meta: "DOC-2044 · PDF · Ana López",
    date: "08 jun 2025",
    status: "Archivado",
  },
];

const cases = [
  {
    title: "EXP-2041 · Alta de proveedor Andes",
    meta: "Administrativo · Compras · 12 documentos",
    date: "Actualizado hoy",
    status: "Activo",
  },
  {
    title: "EXP-2038 · Renovación contractual",
    meta: "Contractual · Legal · 8 documentos",
    date: "12 jun 2025",
    status: "Activo",
  },
  {
    title: "EXP-2014 · Auditoría interna Q2",
    meta: "Auditoría · Calidad · 24 documentos",
    date: "31 may 2025",
    status: "Cerrado",
  },
  {
    title: "EXP-1982 · Proyecto sede norte",
    meta: "Proyecto · Operaciones · 17 documentos",
    date: "18 abr 2025",
    status: "Archivado",
  },
];

const users = [
  {
    title: "Laura Martínez",
    meta: "laura@acme.com · Administradora · Dirección",
    date: "Hace 4 min",
    status: "Activo",
  },
  {
    title: "Carlos Méndez",
    meta: "carlos@acme.com · Supervisor · Legal",
    date: "Hoy, 08:31",
    status: "Activo",
  },
  {
    title: "Ana López",
    meta: "ana@acme.com · Usuario operativo · Archivo",
    date: "Ayer, 17:20",
    status: "Activo",
  },
  {
    title: "Javier Ruiz",
    meta: "javier@acme.com · Auditor · Calidad",
    date: "Bloqueado ayer",
    status: "Bloqueado",
  },
];

const workflows = [
  {
    title: "Aprobación de contratos",
    meta: "Contrato marco proveedores · Etapa 2 de 4",
    date: "Vence mañana",
    status: "En revisión",
  },
  {
    title: "Alta de proveedor",
    meta: "EXP-2041 · Responsable: Laura Martínez",
    date: "Vence en 3 días",
    status: "Pendiente",
  },
  {
    title: "Revisión trimestral",
    meta: "Informe auditoría interna Q2 · 4 etapas",
    date: "Finalizado 10 jun",
    status: "Completado",
  },
  {
    title: "Publicación de políticas",
    meta: "Política de seguridad · Etapa 3 de 3",
    date: "Finalizado hoy",
    status: "Completado",
  },
];

const tenants = [
  {
    title: "Acme Consulting",
    meta: "acme.nexodocs.app · Empresarial · 42 usuarios",
    date: "6.8 GB de 10 GB",
    status: "Activo",
  },
  {
    title: "Clínica Central",
    meta: "clinica.nexodocs.app · Profesional · 86 usuarios",
    date: "14.2 GB de 25 GB",
    status: "Activo",
  },
  {
    title: "Universidad del Valle",
    meta: "univalle.nexodocs.app · Empresarial · 124 usuarios",
    date: "31.6 GB de 50 GB",
    status: "Activo",
  },
  {
    title: "Grupo Norte",
    meta: "gruponorte.nexodocs.app · Básico · 8 usuarios",
    date: "2.1 GB de 5 GB",
    status: "Suspendido",
  },
];

function Badge({ children }: { children: ReactNode }) {
  const label = String(children);
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusTone[label] ?? "bg-[#eafaf7] text-[#087f7b] ring-[#c8e8e3]"}`}
    >
      {children}
    </span>
  );
}

function Header({
  module,
  subcategory,
  description,
  action,
  icon: Icon,
  onAction,
}: {
  module: string;
  subcategory: string;
  description: string;
  action: string;
  icon: IconType;
  onAction: Notify;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-medium text-[#0f9d9a]">
          {module} · {subcategory}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#163a39]">
          {subcategory}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b8583]">
          {description}
        </p>
      </div>
      <button
        onClick={() => onAction(`${action} preparado`)}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f9d9a] px-5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(15,157,154,0.18)]"
      >
        <Icon className="size-4" />
        {action}
      </button>
    </div>
  );
}

function Stat({
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

function Stats({
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

function Toolbar({
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

type ListItem = { title: string; meta: string; date: string; status: string };

function ListPanel({
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

function filterItems(items: ListItem[], subcategory: string) {
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

function Field({
  label,
  placeholder,
  wide = false,
  type = "text",
}: {
  label: string;
  placeholder: string;
  wide?: boolean;
  type?: "text" | "select" | "textarea";
}) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="mb-2 block text-xs font-semibold text-[#315a57]">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          className="w-full resize-none rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 py-2.5 text-sm outline-none focus:border-[#0f9d9a]"
        />
      ) : type === "select" ? (
        <select className="h-11 w-full rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 text-sm text-[#5a7775] outline-none focus:border-[#0f9d9a]">
          <option>{placeholder}</option>
          <option>Administrativo</option>
          <option>Contractual</option>
          <option>Clínico</option>
        </select>
      ) : (
        <input
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 text-sm outline-none focus:border-[#0f9d9a]"
        />
      )}
    </label>
  );
}

function CreateForm({
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

function UploadPanel({
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

function ActivityView({ onAction }: { onAction: Notify }) {
  const events = [
    [
      FileText,
      "María González creó DOC-2048",
      "Política de continuidad operativa · Hace 12 min",
    ],
    [
      FileCheck2,
      "Carlos Méndez aprobó un documento",
      "Contrato marco proveedores 2025 · Hace 38 min",
    ],
    [
      Users,
      "Laura Martínez actualizó un rol",
      "Supervisor documental · Hace 1 h",
    ],
    [
      Download,
      "Ana López descargó un archivo",
      "Manual de incorporación v3 · Hace 2 h",
    ],
  ] as const;
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <Toolbar
        placeholder="Buscar por usuario, acción o documento..."
        onAction={onAction}
      />
      <div className="divide-y divide-[#edf3f1]">
        {events.map(([Icon, title, detail]) => (
          <div key={title} className="flex gap-4 px-5 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef8f6] text-[#0f9d9a]">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#244b49]">{title}</p>
              <p className="mt-1 text-xs text-[#8aa19f]">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TaskView({ onAction }: { onAction: Notify }) {
  const tasks = [
    {
      title: "Revisar contrato marco",
      meta: "Aprobación de contratos · Etapa de revisión",
      date: "Vence hoy",
      status: "Pendiente",
    },
    {
      title: "Aprobar política de seguridad",
      meta: "Publicación de políticas · Aprobación final",
      date: "Vence mañana",
      status: "En revisión",
    },
    {
      title: "Validar metadatos de EXP-2041",
      meta: "Digitalización · 6 campos por confirmar",
      date: "Vence en 2 días",
      status: "En proceso",
    },
    {
      title: "Verificar alta de proveedor",
      meta: "Alta de proveedor · Control documental",
      date: "Vencida ayer",
      status: "Vencida",
    },
  ];
  return (
    <ListPanel
      title="Bandeja personal"
      description="Ordenada por prioridad y fecha límite"
      icon={CheckCircle2}
      items={tasks}
      onAction={onAction}
    />
  );
}

function IndicatorsView({ onAction }: { onAction: Notify }) {
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

function OcrView({
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

function WorkflowDesigner({ onAction }: { onAction: Notify }) {
  const stages = [
    [FileText, "Documento creado", "Inicio automático"],
    [Eye, "Revisión documental", "Asignado a Supervisor"],
    [ShieldCheck, "Aprobación", "Asignado a Dirección"],
    [Archive, "Archivo", "Retención: 5 años"],
  ] as const;
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[260px_1fr_300px]">
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Elementos</h2>
        <div className="mt-4 space-y-2">
          {[
            [Plus, "Tarea"],
            [ShieldCheck, "Aprobación"],
            [ChevronRight, "Condición"],
            [Clock3, "Espera"],
          ].map(([Icon, label]) => (
            <button
              key={label as string}
              onClick={() => onAction(`${label} añadido`)}
              className="flex w-full items-center gap-3 rounded-xl border border-[#e3eeec] p-3 text-xs font-semibold text-[#315a57]"
            >
              <Icon className="size-4 text-[#0f9d9a]" />
              {label as string}
            </button>
          ))}
        </div>
      </aside>
      <section className="rounded-2xl border border-[#dcebe8] bg-[#f7fbfa] p-6 shadow-sm">
        <div className="mx-auto max-w-md space-y-3">
          {stages.map(([Icon, title, detail], index) => (
            <div key={title}>
              <button
                onClick={() => onAction(`${title} seleccionado`)}
                className="flex w-full items-center gap-4 rounded-2xl border border-[#cfe7e3] bg-white p-4 text-left shadow-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#dff7f3] text-[#0f9d9a]">
                  <Icon className="size-5" />
                </span>
                <span>
                  <b className="block text-sm text-[#244b49]">{title}</b>
                  <small className="text-xs text-[#78918f]">{detail}</small>
                </span>
                <MoreHorizontal className="ml-auto size-4 text-[#8aa19f]" />
              </button>
              {index < stages.length - 1 && (
                <div className="mx-auto h-7 w-px bg-[#8ed7cf]" />
              )}
            </div>
          ))}
        </div>
      </section>
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Propiedades</h2>
        <div className="mt-5 space-y-4">
          <Field
            label="Nombre del workflow"
            placeholder="Aprobación documental"
          />
          <Field label="Tipo documental" placeholder="Contrato" type="select" />
          <Field label="Fecha límite" placeholder="3 días hábiles" />
        </div>
        <label className="mt-4 flex gap-3 rounded-xl bg-[#eafaf7] p-3 text-xs text-[#315a57]">
          <input type="checkbox" defaultChecked className="accent-[#0f9d9a]" />
          Registrar todas las transiciones en auditoría
        </label>
      </aside>
    </div>
  );
}

function CatalogView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const data: Record<string, Array<[string, string, string]>> = {
    Roles: [
      ["Administrador de tenant", "38 permisos · 2 usuarios", "Activo"],
      ["Supervisor", "22 permisos · 6 usuarios", "Activo"],
      ["Usuario operativo", "12 permisos · 28 usuarios", "Activo"],
      ["Auditor", "9 permisos · 3 usuarios", "Activo"],
    ],
    Áreas: [
      ["Dirección", "4 usuarios · Responsable: Laura Martínez", "Activo"],
      ["Legal", "8 usuarios · Responsable: Carlos Méndez", "Activo"],
      ["Archivo", "12 usuarios · Responsable: Ana López", "Activo"],
      ["Calidad", "6 usuarios · Responsable: Javier Ruiz", "Activo"],
    ],
    Grupos: [
      ["Comité de aprobación", "8 integrantes · 3 workflows", "Activo"],
      ["Revisores documentales", "12 integrantes · 7 workflows", "Activo"],
      ["Auditores internos", "4 integrantes · Acceso de lectura", "Activo"],
    ],
  };
  if (subcategory === "Permisos")
    return <PermissionMatrix onAction={onAction} />;
  const items = (data[subcategory] ?? []).map(([title, meta, status]) => ({
    title,
    meta,
    date: "Actualizado hoy",
    status,
  }));
  return (
    <ListPanel
      title={subcategory}
      description={`Configuración de ${subcategory.toLowerCase()} de Acme Consulting`}
      icon={subcategory === "Roles" ? ShieldCheck : Users}
      items={items}
      onAction={onAction}
    />
  );
}

function PermissionMatrix({ onAction }: { onAction: Notify }) {
  const modules = [
    "Documentos",
    "Expedientes",
    "Workflows",
    "Usuarios",
    "Auditoría",
  ];
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#edf3f1] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-[#163a39]">Matriz de permisos</h2>
          <p className="mt-1 text-xs text-[#78918f]">
            Rol seleccionado: Supervisor
          </p>
        </div>
        <select className="h-10 rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 text-xs text-[#4e706d]">
          <option>Supervisor</option>
          <option>Administrador de tenant</option>
          <option>Usuario operativo</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-xs">
          <thead className="bg-[#f7fbfa] text-[#6b8583]">
            <tr>
              <th className="px-5 py-3">Módulo</th>
              {["Ver", "Crear", "Editar", "Aprobar", "Eliminar"].map(
                (label) => (
                  <th key={label} className="px-4 py-3 text-center">
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3f1]">
            {modules.map((module, row) => (
              <tr key={module}>
                <td className="px-5 py-4 font-semibold text-[#315a57]">
                  {module}
                </td>
                {[0, 1, 2, 3, 4].map((column) => (
                  <td key={column} className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={
                        column < 3 || (module === "Documentos" && column === 3)
                      }
                      disabled={row === 4 && column > 0}
                      className="size-4 accent-[#0f9d9a]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end border-t border-[#edf3f1] p-4">
        <button
          onClick={() => onAction("Matriz de permisos guardada")}
          className="rounded-xl bg-[#0f9d9a] px-5 py-2.5 text-xs font-semibold text-white"
        >
          Guardar permisos
        </button>
      </div>
    </section>
  );
}

function AuditView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const categoryActions: Record<string, string[]> = {
    Accesos: ["LOGIN", "LOGOUT", "LOGIN_FAILED"],
    "Creación de documentos": ["DOCUMENT_CREATED", "DOCUMENT_UPLOADED"],
    Modificaciones: ["DOCUMENT_UPDATED", "VERSION_CREATED"],
    Descargas: ["DOCUMENT_DOWNLOADED"],
    Aprobaciones: ["DOCUMENT_APPROVED", "DOCUMENT_REJECTED"],
    Eliminaciones: ["DOCUMENT_ARCHIVED", "DOCUMENT_TRASHED"],
    "Cambios de permisos": ["ROLE_CHANGED", "PERMISSION_UPDATED"],
  };
  const all = [
    ["DOCUMENT_APPROVED", "Carlos Méndez", "DOC-2041", "Correcto"],
    ["LOGIN", "Laura Martínez", "Sesión web · 192.168.1.24", "Correcto"],
    ["DOCUMENT_UPDATED", "María González", "DOC-2042 · v2 → v3", "Correcto"],
    ["PERMISSION_UPDATED", "Laura Martínez", "Rol Supervisor", "Correcto"],
    ["DOCUMENT_DOWNLOADED", "Ana López", "DOC-2038", "Correcto"],
    ["LOGIN_FAILED", "Javier Ruiz", "3 intentos · 192.168.1.72", "Bloqueado"],
  ];
  const allowed = categoryActions[subcategory];
  const rows = allowed
    ? all.filter(([action]) => allowed.includes(action))
    : all;
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#dcebe8] bg-white shadow-sm">
      <Toolbar
        placeholder="Buscar por acción, usuario o entidad..."
        onAction={onAction}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-[#f7fbfa] text-[#6b8583]">
            <tr>
              {[
                "Fecha y hora",
                "Acción",
                "Usuario",
                "Entidad",
                "Resultado",
              ].map((label) => (
                <th key={label} className="px-5 py-3 font-semibold">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3f1]">
            {rows.map(([action, user, entity, result], index) => (
              <tr key={`${action}-${index}`}>
                <td className="whitespace-nowrap px-5 py-4 text-[#78918f]">
                  13 jun 2025 · {`0${9 - index}`}:42
                </td>
                <td className="px-5 py-4 font-semibold text-[#315a57]">
                  {action}
                </td>
                <td className="px-5 py-4 text-[#5a7775]">{user}</td>
                <td className="px-5 py-4 text-[#5a7775]">{entity}</td>
                <td className="px-5 py-4">
                  <Badge>{result}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-[#edf3f1] bg-[#fbfefd] px-5 py-3 text-[11px] text-[#78918f]">
        Los eventos de auditoría son históricos y no pueden editarse desde esta
        interfaz.
      </div>
    </section>
  );
}

function ReportView({
  subcategory,
  onAction,
}: {
  subcategory: string;
  onAction: Notify;
}) {
  const labels: Record<string, string[]> = {
    Documentos: ["Aprobados", "En revisión", "Pendientes", "Archivados"],
    Usuarios: ["Activos", "Inactivos", "Bloqueados", "Invitados"],
    Workflows: ["Completados", "Activos", "Vencidos", "Cancelados"],
    Almacenamiento: ["PDF", "Imágenes", "Office", "Otros"],
    Auditoría: ["Consultas", "Descargas", "Cambios", "Accesos"],
    Productividad: ["Archivo", "Legal", "Compras", "Calidad"],
    "Actividad por área": ["Legal", "Archivo", "Compras", "Calidad"],
  };
  const current = labels[subcategory] ?? labels.Documentos;
  const values = [84, 61, 44, 29];
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <section className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-bold text-[#163a39]">
              Evolución de {subcategory.toLowerCase()}
            </h2>
            <p className="mt-1 text-xs text-[#78918f]">
              Datos simulados del 1 al 30 de junio de 2025
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAction("Filtros del reporte abiertos")}
              className="rounded-lg border border-[#dcebe8] px-3 py-2 text-xs text-[#5a7775]"
            >
              Acme Consulting · Junio
            </button>
            <button
              onClick={() => onAction("Reporte descargado")}
              className="rounded-lg bg-[#eafaf7] p-2 text-[#087f7b]"
            >
              <Download className="size-4" />
            </button>
          </div>
        </div>
        <div className="mt-8 flex h-64 items-end gap-4 rounded-xl bg-[linear-gradient(to_bottom,#edf4f2_1px,transparent_1px)] bg-[length:100%_25%] px-4 pt-6">
          {[38, 52, 47, 64, 58, 76, 88, 74, 92, 86, 96, 90].map(
            (height, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-md bg-[#5fc5bc] transition group-hover:bg-[#0f9d9a]"
                  style={{ height: `${height}%` }}
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-[#8aa19f]">
                  {index + 1}
                </span>
              </div>
            ),
          )}
        </div>
        <div className="mt-8 flex items-center gap-2 text-[11px] text-[#78918f]">
          <span className="size-2 rounded-full bg-[#0f9d9a]" />
          Actividad diaria del período seleccionado
        </div>
      </section>
      <aside className="rounded-2xl border border-[#dcebe8] bg-white p-5 shadow-sm">
        <h2 className="font-bold text-[#163a39]">Distribución</h2>
        <p className="mt-1 text-xs text-[#78918f]">Comparación por categoría</p>
        <div className="mt-6 space-y-5">
          {current.map((label, index) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-[#315a57]">{label}</span>
                <span className="text-[#78918f]">{values[index]}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#edf4f2]">
                <div
                  className="h-2 rounded-full bg-[#0f9d9a]"
                  style={{
                    width: `${values[index]}%`,
                    opacity: 1 - index * 0.16,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function NotificationView({
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

function SettingsView({
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

function TenantSpecialView({
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

function getMainContent(module: string, subcategory: string, onAction: Notify) {
  if (module === "Inicio") {
    if (subcategory === "Actividad reciente")
      return <ActivityView onAction={onAction} />;
    if (subcategory === "Mis tareas") return <TaskView onAction={onAction} />;
    return <IndicatorsView onAction={onAction} />;
  }
  if (module === "Expedientes")
    return subcategory === "Crear expediente" ? (
      <CreateForm
        module={module}
        subcategory={subcategory}
        onAction={onAction}
      />
    ) : (
      <ListPanel
        title="Expedientes documentales"
        description="Unidades lógicas del tenant actual"
        icon={Folder}
        items={filterItems(cases, subcategory)}
        onAction={onAction}
      />
    );
  if (module === "Documentos") {
    if (subcategory === "Nuevo documento")
      return (
        <CreateForm
          module={module}
          subcategory={subcategory}
          onAction={onAction}
        />
      );
    if (subcategory === "Subir archivo")
      return <UploadPanel subcategory={subcategory} onAction={onAction} />;
    const documentScopes: Record<string, ListItem[]> = {
      "Mis documentos": [documents[0], documents[2]],
      "Compartidos conmigo": [documents[1], documents[2]],
      Recientes: documents.slice(0, 3),
    };
    const scoped =
      subcategory === "Papelera"
        ? [
            {
              title: "Borrador de procedimiento antiguo",
              meta: "DOC-1921 · Eliminado por Laura Martínez",
              date: "Se eliminará en 18 días",
              status: "Archivado",
            },
          ]
        : (documentScopes[subcategory] ?? filterItems(documents, subcategory));
    return (
      <ListPanel
        title="Repositorio documental"
        description={`Vista: ${subcategory}`}
        icon={subcategory === "Papelera" ? Trash2 : FileText}
        items={scoped.length ? scoped : documents.slice(0, 2)}
        onAction={onAction}
      />
    );
  }
  if (module === "Digitalización")
    return ["Escanear documento", "Subir documento"].includes(subcategory) ? (
      <UploadPanel subcategory={subcategory} onAction={onAction} />
    ) : (
      <OcrView subcategory={subcategory} onAction={onAction} />
    );
  if (module === "Workflows") {
    if (subcategory === "Diseñador")
      return <WorkflowDesigner onAction={onAction} />;
    if (subcategory === "Mis tareas") return <TaskView onAction={onAction} />;
    const templateItems = workflows.map((item, index) => ({
      ...item,
      title: [
        "Aprobación de contratos",
        "Revisión simple",
        "Publicación controlada",
        "Alta de proveedor",
      ][index],
      meta: `${index + 2} etapas · ${index + 1} roles asignados`,
      date: "Actualizada esta semana",
      status: "Activo",
    }));
    const workflowScopes: Record<string, ListItem[]> = {
      "Pendientes de revisión": workflows.filter(
        (item) => item.status === "En revisión",
      ),
      "Pendientes de aprobación": workflows.filter(
        (item) => item.status === "Pendiente",
      ),
      Activos: workflows.filter((item) => item.status !== "Completado"),
      Finalizados: workflows.filter((item) => item.status === "Completado"),
    };
    return (
      <ListPanel
        title={
          subcategory === "Plantillas"
            ? "Plantillas de workflow"
            : "Flujos de trabajo"
        }
        description={`Vista: ${subcategory}`}
        icon={Workflow}
        items={
          subcategory === "Plantillas"
            ? templateItems
            : (workflowScopes[subcategory] ?? workflows)
        }
        onAction={onAction}
      />
    );
  }
  if (module === "Usuarios y equipos") {
    if (subcategory === "Crear usuario")
      return (
        <CreateForm
          module={module}
          subcategory={subcategory}
          onAction={onAction}
        />
      );
    if (["Roles", "Permisos", "Áreas", "Grupos"].includes(subcategory))
      return <CatalogView subcategory={subcategory} onAction={onAction} />;
    return (
      <ListPanel
        title="Directorio de usuarios"
        description={`Vista: ${subcategory}`}
        icon={Users}
        items={filterItems(users, subcategory)}
        onAction={onAction}
      />
    );
  }
  if (module === "Auditoría")
    return <AuditView subcategory={subcategory} onAction={onAction} />;
  if (module === "Reportes")
    return <ReportView subcategory={subcategory} onAction={onAction} />;
  if (module === "Notificaciones")
    return <NotificationView subcategory={subcategory} onAction={onAction} />;
  if (module === "Configuración")
    return <SettingsView subcategory={subcategory} onAction={onAction} />;
  if (module === "Tenants") {
    if (subcategory === "Crear tenant")
      return (
        <CreateForm
          module={module}
          subcategory={subcategory}
          onAction={onAction}
        />
      );
    if (["Planes", "Uso de almacenamiento", "Branding"].includes(subcategory))
      return (
        <TenantSpecialView subcategory={subcategory} onAction={onAction} />
      );
    return (
      <ListPanel
        title="Organizaciones registradas"
        description={`Vista global: ${subcategory}`}
        icon={Building2}
        items={filterItems(tenants, subcategory)}
        onAction={onAction}
      />
    );
  }
  return null;
}

export default function ModuleContent({
  module,
  subcategory,
  onAction,
}: {
  module: string;
  subcategory: string;
  onAction: Notify;
}) {
  const copy = screenCopy[`${module}|${subcategory}`] ?? {
    description: "Gestiona la operación de tu organización desde este espacio.",
    action: "Nueva acción",
  };
  const Icon = moduleIcons[module] ?? Database;
  const actionIcon =
    copy.action?.includes("Descargar") || copy.action?.includes("Exportar")
      ? Download
      : copy.action?.includes("Subir") || copy.action?.includes("Seleccionar")
        ? Upload
        : copy.action?.includes("Guardar")
          ? CheckCircle2
          : copy.action?.includes("Revisar") || copy.action?.includes("Abrir")
            ? Eye
            : Plus;
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-9">
      <Header
        module={module}
        subcategory={subcategory}
        description={copy.description}
        action={copy.action ?? "Nueva acción"}
        icon={actionIcon}
        onAction={onAction}
      />
      <Stats module={module} subcategory={subcategory} />
      {getMainContent(module, subcategory, onAction)}
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#dcebe8] bg-white px-4 py-3 text-[11px] text-[#78918f]">
        <Icon className="size-4 text-[#0f9d9a]" />
        <span>
          Vista de demostración con datos simulados de{" "}
          <b className="text-[#315a57]">Acme Consulting</b>. No realiza
          operaciones persistentes.
        </span>
      </div>
    </div>
  );
}
