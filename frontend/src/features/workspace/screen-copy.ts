import { IconType, ScreenCopy } from "@/components/patterns/types";
import { Activity, Archive, BarChart3, Bell, Building2, FileText, Folder, ScanLine, Settings, Users, Workflow } from "lucide-react";

export const screenCopy: Record<string, ScreenCopy> = {
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

export const moduleIcons: Record<string, IconType> = {
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
