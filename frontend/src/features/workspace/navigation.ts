import { Archive, BarChart3, Bell, Building2, FileText, Folder, LayoutDashboard, ScanLine, Settings, Users, Workflow } from "lucide-react";

export type IconType = typeof Folder;
export type NavItem = { label: string; icon: IconType; children: { label: string; href: string; }[]; roles?: string[]; };
export const roles = ["Usuario básico", "Supervisor", "Administrador de tenant", "Superadministrador"];

export const navSections: { title: string; items: NavItem[]; }[] = [
  {
    title: "Espacio de trabajo",
    items: [
      {
        label: "Inicio",
        icon: LayoutDashboard,
        children: [
          {
            "label": "Resumen",
            "href": "/"
          },
          {
            "label": "Actividad reciente",
            "href": "/dashboard/activity"
          },
          {
            "label": "Mis tareas",
            "href": "/dashboard/tasks"
          },
          {
            "label": "Indicadores",
            "href": "/dashboard/indicators"
          }
        ],
      },
      {
        label: "Expedientes",
        icon: Folder,
        children: [
          {
            "label": "Todos los expedientes",
            "href": "/expedients"
          },
          {
            "label": "Crear expediente",
            "href": "/expedients/new"
          },
          {
            "label": "Activos",
            "href": "/expedients/active"
          },
          {
            "label": "Cerrados",
            "href": "/expedients/closed"
          },
          {
            "label": "Archivados",
            "href": "/expedients/archived"
          }
        ],
      },
      {
        label: "Documentos",
        icon: FileText,
        children: [
          {
            "label": "Todos los documentos",
            "href": "/documents"
          },
          {
            "label": "Nuevo documento",
            "href": "/documents/new"
          },
          {
            "label": "Subir archivo",
            "href": "/documents/upload"
          },
          {
            "label": "Mis documentos",
            "href": "/documents/mine"
          },
          {
            "label": "Compartidos conmigo",
            "href": "/documents/shared"
          },
          {
            "label": "Recientes",
            "href": "/documents/recent"
          },
          {
            "label": "Pendientes",
            "href": "/documents/pending"
          },
          {
            "label": "En revisión",
            "href": "/documents/in-review"
          },
          {
            "label": "Aprobados",
            "href": "/documents/approved"
          },
          {
            "label": "Archivados",
            "href": "/documents/archived"
          },
          {
            "label": "Papelera",
            "href": "/documents/trash"
          }
        ],
      },
      {
        label: "Digitalización",
        icon: ScanLine,
        children: [
          {
            "label": "Escanear documento",
            "href": "/digitization"
          },
          {
            "label": "Subir documento",
            "href": "/digitization/upload"
          },
          {
            "label": "Procesamiento OCR",
            "href": "/digitization/ocr"
          },
          {
            "label": "Validación",
            "href": "/digitization/validation"
          },
          {
            "label": "Indexación",
            "href": "/digitization/indexing"
          },
          {
            "label": "Corrección de metadatos",
            "href": "/digitization/metadata"
          }
        ],
        roles: ["Administrador de tenant", "Superadministrador"],
      },
    ],
  },
  {
    title: "Procesos",
    items: [
      {
        label: "Workflows",
        icon: Workflow,
        children: [
          {
            "label": "Todos los workflows",
            "href": "/workflows"
          },
          {
            "label": "Mis tareas",
            "href": "/workflows/tasks"
          },
          {
            "label": "Pendientes de revisión",
            "href": "/workflows/pending-review"
          },
          {
            "label": "Pendientes de aprobación",
            "href": "/workflows/pending-approval"
          },
          {
            "label": "Activos",
            "href": "/workflows/active"
          },
          {
            "label": "Finalizados",
            "href": "/workflows/completed"
          },
          {
            "label": "Plantillas",
            "href": "/workflows/templates"
          },
          {
            "label": "Diseñador",
            "href": "/workflows/designer"
          }
        ],
      },
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        label: "Usuarios y equipos",
        icon: Users,
        children: [
          {
            "label": "Todos los usuarios",
            "href": "/users"
          },
          {
            "label": "Crear usuario",
            "href": "/users/new"
          },
          {
            "label": "Activos",
            "href": "/users/active"
          },
          {
            "label": "Bloqueados",
            "href": "/users/blocked"
          },
          {
            "label": "Roles",
            "href": "/users/roles"
          },
          {
            "label": "Permisos",
            "href": "/users/permissions"
          },
          {
            "label": "Áreas",
            "href": "/users/areas"
          },
          {
            "label": "Grupos",
            "href": "/users/groups"
          }
        ],
        roles: ["Administrador de tenant", "Superadministrador"],
      },
      {
        label: "Auditoría",
        icon: Archive,
        children: [
          {
            "label": "Registro general",
            "href": "/audit"
          },
          {
            "label": "Accesos",
            "href": "/audit/access"
          },
          {
            "label": "Creación de documentos",
            "href": "/audit/document-creation"
          },
          {
            "label": "Modificaciones",
            "href": "/audit/modifications"
          },
          {
            "label": "Descargas",
            "href": "/audit/downloads"
          },
          {
            "label": "Aprobaciones",
            "href": "/audit/approvals"
          },
          {
            "label": "Eliminaciones",
            "href": "/audit/deletions"
          },
          {
            "label": "Cambios de permisos",
            "href": "/audit/permissions"
          }
        ],
        roles: ["Administrador de tenant", "Superadministrador"],
      },
      {
        label: "Reportes",
        icon: BarChart3,
        children: [
          {
            "label": "Documentos",
            "href": "/reports"
          },
          {
            "label": "Usuarios",
            "href": "/reports/users"
          },
          {
            "label": "Workflows",
            "href": "/reports/workflows"
          },
          {
            "label": "Almacenamiento",
            "href": "/reports/storage"
          },
          {
            "label": "Auditoría",
            "href": "/reports/audit"
          },
          {
            "label": "Productividad",
            "href": "/reports/productivity"
          },
          {
            "label": "Actividad por área",
            "href": "/reports/by-area"
          }
        ],
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        label: "Notificaciones",
        icon: Bell,
        children: [
          {
            "label": "Todas",
            "href": "/notifications"
          },
          {
            "label": "No leídas",
            "href": "/notifications/unread"
          },
          {
            "label": "Tareas",
            "href": "/notifications/tasks"
          },
          {
            "label": "Aprobaciones",
            "href": "/notifications/approvals"
          },
          {
            "label": "Menciones",
            "href": "/notifications/mentions"
          }
        ],
      },
      {
        label: "Configuración",
        icon: Settings,
        children: [
          {
            "label": "General",
            "href": "/settings"
          },
          {
            "label": "Tipos documentales",
            "href": "/settings/document-types"
          },
          {
            "label": "Estados",
            "href": "/settings/statuses"
          },
          {
            "label": "Metadatos",
            "href": "/settings/metadata"
          },
          {
            "label": "Etiquetas",
            "href": "/settings/tags"
          },
          {
            "label": "Plantillas",
            "href": "/settings/templates"
          },
          {
            "label": "Retención",
            "href": "/settings/retention"
          },
          {
            "label": "Seguridad",
            "href": "/settings/security"
          },
          {
            "label": "Apariencia",
            "href": "/settings/appearance"
          }
        ],
        roles: ["Administrador de tenant", "Superadministrador"],
      },
    ],
  },
  {
    title: "Administración global",
    items: [
      {
        label: "Tenants",
        icon: Building2,
        children: [
          {
            "label": "Todos los tenants",
            "href": "/tenants"
          },
          {
            "label": "Crear tenant",
            "href": "/tenants/new"
          },
          {
            "label": "Activos",
            "href": "/tenants/active"
          },
          {
            "label": "Suspendidos",
            "href": "/tenants/suspended"
          },
          {
            "label": "Planes",
            "href": "/tenants/plans"
          },
          {
            "label": "Uso de almacenamiento",
            "href": "/tenants/storage"
          },
          {
            "label": "Branding",
            "href": "/tenants/branding"
          }
        ],
        roles: ["Superadministrador"],
      },
    ],
  },
];

export const navigationRoutes = navSections.flatMap(section => section.items.flatMap(item => item.children.map(child => ({ module: item.label, subcategory: child.label, href: child.href }))));

export const findNav = (label: string) => navSections.flatMap(section => section.items).find(item => item.label === label);

export function routeFor(module: string, subcategory?: string) {
  const route = navigationRoutes.find(route => route.module === module && (!subcategory || route.subcategory === subcategory));
  if (!route) throw new Error(`Ruta no definida: ${module} / ${subcategory}`);
  return route.href;
}
