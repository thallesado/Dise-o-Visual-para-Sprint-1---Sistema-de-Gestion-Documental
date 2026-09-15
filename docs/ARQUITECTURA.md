# Arquitectura y mapa de pantallas

Actualización: 2026-09-15. Next.js 16.3.3, React 19, TypeScript y Tailwind CSS 4.
Se conservan las versiones bloqueadas de las dependencias existentes.

## Estructura

```text
nexodocs/
├── frontend/
│   ├── src/
│   │   ├── app/                  # Rutas, layouts y estilos globales
│   │   │   ├── (workspace)/      # Layout persistente y 78 páginas
│   │   │   └── login/            # Login separado del panel
│   │   ├── features/             # auth, dashboard, documents, expedients,
│   │   │                        # digitization, workflows, users, audit,
│   │   │                        # reports, notifications, settings, tenants, workspace
│   │   ├── components/
│   │   │   ├── ui/               # Componentes base de shadcn
│   │   │   └── patterns/         # Listas, formularios, estadísticas y cabeceras compartidas
│   │   └── lib/                  # Utilidades comunes
│   ├── public/                   # Iconos e imágenes
│   ├── tests/                    # Integridad de rutas y verificación HTTP
│   └── package.json              # Dependencias y configuración de Next junto a la app
├── database/                     # init/, tests/, migrate.ps1 y guía de operación
├── docs/                         # Contexto, arquitectura y diseño de base de datos
├── compose.yaml                  # Infraestructura PostgreSQL
├── .env.example                  # Variables de Compose, nunca del navegador
├── package.json                  # Comandos del workspace
└── pnpm-lock.yaml                # Un único lockfile
```

## Dónde editar

Cada URL tiene un archivo explícito: abre su `page.tsx` para cambiar la composición
de esa pantalla. Allí se importa la vista correspondiente de `features/<dominio>/`
o un patrón reutilizado. Las listas y sus datos simulados se agrupan en su dominio;
los formularios y tablas que comparten diseño viven en `components/patterns/`.
Modificar un patrón compartido afecta a todas las páginas que lo importan.
No hay un dispatcher central que decida qué módulo mostrar.

El login se compone en [login/page.tsx](../frontend/src/app/login/page.tsx) y se edita
en [auth/login-screen.tsx](../frontend/src/features/auth/login-screen.tsx).
El diseño global se cambia en [globals.css](../frontend/src/app/globals.css).

## Navegación y estado

[workspace/navigation.ts](../frontend/src/features/workspace/navigation.ts) define
las etiquetas, URLs y roles del menú en un único lugar. Los enlaces usan `next/link`;
`usePathname` determina la opción activa incluso al volver atrás o abrir una URL directa.
Las flechas despliegan el menú sin añadir entradas al historial. El menú móvil se
cierra al elegir una página.
La campana abre las notificaciones no leídas; los accesos rápidos del resumen
abren las rutas de nuevo documento, subida y diseñador de workflows.

El [layout del panel](../frontend/src/app/(workspace)/layout.tsx) conserva el
[AppShell](../frontend/src/features/workspace/app-shell.tsx): menú, rol de demo,
asistente y notificaciones temporales. El estado se conserva al navegar entre
secciones y se reinicia al recargar o salir al login, como corresponde a esta demo
sin sesión persistente. Los controles del rol solo filtran el menú; las URLs son
públicas y no constituyen autenticación ni autorización.

Para añadir una pantalla: crea su `page.tsx`, compón una vista del dominio y añade
su enlace en `navigation.ts`. Actualiza el mapa y ejecuta las comprobaciones.
Se conserva el componente anterior que ya estaba sin uso en
[workspace/legacy/module-view.tsx](../frontend/src/features/workspace/legacy/module-view.tsx);
ninguna ruta lo importa. No debe usarse como base para nuevas pantallas.

## Límites y persistencia

No hay backend implementado; por eso no se crean carpetas de controladores,
repositorios o servicios vacías. Las operaciones, login, roles, OCR y datos siguen
siendo simulados. Un futuro backend debe encapsular persistencia y reglas de negocio
y establecer el contexto autenticado del tenant/usuario descrito en
[el diseño de base de datos](database/DISEÑO_Y_OPERACION.md).

Los SQL, migraciones, pruebas, datos locales y rutas de volúmenes de Compose
se mantienen en `database/`. No se conecta el navegador a PostgreSQL.

## Desarrollo, pruebas y despliegue

Desde la raíz: `pnpm install --frozen-lockfile`, `pnpm dev`, `pnpm typecheck`,
`pnpm test`, `pnpm build` y `pnpm start`. También funcionan los scripts desde
`frontend/`. No existe ESLint configurado; se utiliza TypeScript.
La configuración heredada de Next omite errores de tipos en build, por lo que
`pnpm typecheck` debe ejecutarse aparte antes de publicar.

Para verificar las respuestas HTTP de todas las rutas, inicia `pnpm start` después
de compilar y ejecuta en otra terminal PowerShell:

```powershell
$env:APP_URL = 'http://localhost:3000'
pnpm test
Remove-Item Env:APP_URL
```

Sin `APP_URL`, la prueba HTTP se omite y se ejecuta la integridad de rutas.
Comprueba también en un navegador: enlace directo, recarga, Atrás/Adelante,
selección activa del menú, rol y asistente persistentes, menú móvil y login.

En un hosting que ejecutaba Next desde la raíz, configura `frontend` como raíz
de la aplicación y conserva el acceso al workspace/lockfile superior. Si el hosting
compila desde la raíz del repositorio, usa `pnpm build` y el resultado
`frontend/.next`. Actualiza cualquier automatización externa que presuponga
`app/`, `public/` o `.next/` en la raíz; el repositorio no contiene pipelines de despliegue.

## Mapa completo

| Sección | URL | Composición de pantalla | Vista reutilizada |
| --- | --- | --- | --- |
| Inicio / Resumen | `/` | [page.tsx](../frontend/src/app/(workspace)/page.tsx) | [summary-page](../frontend/src/features/dashboard/summary-page.tsx) |
| Inicio / Actividad reciente | `/dashboard/activity` | [page.tsx](../frontend/src/app/(workspace)/dashboard/activity/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Inicio / Mis tareas | `/dashboard/tasks` | [page.tsx](../frontend/src/app/(workspace)/dashboard/tasks/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Inicio / Indicadores | `/dashboard/indicators` | [page.tsx](../frontend/src/app/(workspace)/dashboard/indicators/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Expedientes / Todos los expedientes | `/expedients` | [page.tsx](../frontend/src/app/(workspace)/expedients/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Expedientes / Crear expediente | `/expedients/new` | [page.tsx](../frontend/src/app/(workspace)/expedients/new/page.tsx) | [create-form](../frontend/src/components/patterns/create-form.tsx) |
| Expedientes / Activos | `/expedients/active` | [page.tsx](../frontend/src/app/(workspace)/expedients/active/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Expedientes / Cerrados | `/expedients/closed` | [page.tsx](../frontend/src/app/(workspace)/expedients/closed/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Expedientes / Archivados | `/expedients/archived` | [page.tsx](../frontend/src/app/(workspace)/expedients/archived/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Todos los documentos | `/documents` | [page.tsx](../frontend/src/app/(workspace)/documents/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Nuevo documento | `/documents/new` | [page.tsx](../frontend/src/app/(workspace)/documents/new/page.tsx) | [create-form](../frontend/src/components/patterns/create-form.tsx) |
| Documentos / Subir archivo | `/documents/upload` | [page.tsx](../frontend/src/app/(workspace)/documents/upload/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Mis documentos | `/documents/mine` | [page.tsx](../frontend/src/app/(workspace)/documents/mine/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Compartidos conmigo | `/documents/shared` | [page.tsx](../frontend/src/app/(workspace)/documents/shared/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Recientes | `/documents/recent` | [page.tsx](../frontend/src/app/(workspace)/documents/recent/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Pendientes | `/documents/pending` | [page.tsx](../frontend/src/app/(workspace)/documents/pending/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / En revisión | `/documents/in-review` | [page.tsx](../frontend/src/app/(workspace)/documents/in-review/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Aprobados | `/documents/approved` | [page.tsx](../frontend/src/app/(workspace)/documents/approved/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Archivados | `/documents/archived` | [page.tsx](../frontend/src/app/(workspace)/documents/archived/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Documentos / Papelera | `/documents/trash` | [page.tsx](../frontend/src/app/(workspace)/documents/trash/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Digitalización / Escanear documento | `/digitization` | [page.tsx](../frontend/src/app/(workspace)/digitization/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Digitalización / Subir documento | `/digitization/upload` | [page.tsx](../frontend/src/app/(workspace)/digitization/upload/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Digitalización / Procesamiento OCR | `/digitization/ocr` | [page.tsx](../frontend/src/app/(workspace)/digitization/ocr/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Digitalización / Validación | `/digitization/validation` | [page.tsx](../frontend/src/app/(workspace)/digitization/validation/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Digitalización / Indexación | `/digitization/indexing` | [page.tsx](../frontend/src/app/(workspace)/digitization/indexing/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Digitalización / Corrección de metadatos | `/digitization/metadata` | [page.tsx](../frontend/src/app/(workspace)/digitization/metadata/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Todos los workflows | `/workflows` | [page.tsx](../frontend/src/app/(workspace)/workflows/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Mis tareas | `/workflows/tasks` | [page.tsx](../frontend/src/app/(workspace)/workflows/tasks/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Pendientes de revisión | `/workflows/pending-review` | [page.tsx](../frontend/src/app/(workspace)/workflows/pending-review/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Pendientes de aprobación | `/workflows/pending-approval` | [page.tsx](../frontend/src/app/(workspace)/workflows/pending-approval/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Activos | `/workflows/active` | [page.tsx](../frontend/src/app/(workspace)/workflows/active/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Finalizados | `/workflows/completed` | [page.tsx](../frontend/src/app/(workspace)/workflows/completed/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Plantillas | `/workflows/templates` | [page.tsx](../frontend/src/app/(workspace)/workflows/templates/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Workflows / Diseñador | `/workflows/designer` | [page.tsx](../frontend/src/app/(workspace)/workflows/designer/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Usuarios y equipos / Todos los usuarios | `/users` | [page.tsx](../frontend/src/app/(workspace)/users/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Usuarios y equipos / Crear usuario | `/users/new` | [page.tsx](../frontend/src/app/(workspace)/users/new/page.tsx) | [create-form](../frontend/src/components/patterns/create-form.tsx) |
| Usuarios y equipos / Activos | `/users/active` | [page.tsx](../frontend/src/app/(workspace)/users/active/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Usuarios y equipos / Bloqueados | `/users/blocked` | [page.tsx](../frontend/src/app/(workspace)/users/blocked/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Usuarios y equipos / Roles | `/users/roles` | [page.tsx](../frontend/src/app/(workspace)/users/roles/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Usuarios y equipos / Permisos | `/users/permissions` | [page.tsx](../frontend/src/app/(workspace)/users/permissions/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Usuarios y equipos / Áreas | `/users/areas` | [page.tsx](../frontend/src/app/(workspace)/users/areas/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Usuarios y equipos / Grupos | `/users/groups` | [page.tsx](../frontend/src/app/(workspace)/users/groups/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Registro general | `/audit` | [page.tsx](../frontend/src/app/(workspace)/audit/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Accesos | `/audit/access` | [page.tsx](../frontend/src/app/(workspace)/audit/access/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Creación de documentos | `/audit/document-creation` | [page.tsx](../frontend/src/app/(workspace)/audit/document-creation/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Modificaciones | `/audit/modifications` | [page.tsx](../frontend/src/app/(workspace)/audit/modifications/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Descargas | `/audit/downloads` | [page.tsx](../frontend/src/app/(workspace)/audit/downloads/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Aprobaciones | `/audit/approvals` | [page.tsx](../frontend/src/app/(workspace)/audit/approvals/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Eliminaciones | `/audit/deletions` | [page.tsx](../frontend/src/app/(workspace)/audit/deletions/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Auditoría / Cambios de permisos | `/audit/permissions` | [page.tsx](../frontend/src/app/(workspace)/audit/permissions/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Reportes / Documentos | `/reports` | [page.tsx](../frontend/src/app/(workspace)/reports/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Reportes / Usuarios | `/reports/users` | [page.tsx](../frontend/src/app/(workspace)/reports/users/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Reportes / Workflows | `/reports/workflows` | [page.tsx](../frontend/src/app/(workspace)/reports/workflows/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Reportes / Almacenamiento | `/reports/storage` | [page.tsx](../frontend/src/app/(workspace)/reports/storage/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Reportes / Auditoría | `/reports/audit` | [page.tsx](../frontend/src/app/(workspace)/reports/audit/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Reportes / Productividad | `/reports/productivity` | [page.tsx](../frontend/src/app/(workspace)/reports/productivity/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Reportes / Actividad por área | `/reports/by-area` | [page.tsx](../frontend/src/app/(workspace)/reports/by-area/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Notificaciones / Todas | `/notifications` | [page.tsx](../frontend/src/app/(workspace)/notifications/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Notificaciones / No leídas | `/notifications/unread` | [page.tsx](../frontend/src/app/(workspace)/notifications/unread/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Notificaciones / Tareas | `/notifications/tasks` | [page.tsx](../frontend/src/app/(workspace)/notifications/tasks/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Notificaciones / Aprobaciones | `/notifications/approvals` | [page.tsx](../frontend/src/app/(workspace)/notifications/approvals/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Notificaciones / Menciones | `/notifications/mentions` | [page.tsx](../frontend/src/app/(workspace)/notifications/mentions/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / General | `/settings` | [page.tsx](../frontend/src/app/(workspace)/settings/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Tipos documentales | `/settings/document-types` | [page.tsx](../frontend/src/app/(workspace)/settings/document-types/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Estados | `/settings/statuses` | [page.tsx](../frontend/src/app/(workspace)/settings/statuses/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Metadatos | `/settings/metadata` | [page.tsx](../frontend/src/app/(workspace)/settings/metadata/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Etiquetas | `/settings/tags` | [page.tsx](../frontend/src/app/(workspace)/settings/tags/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Plantillas | `/settings/templates` | [page.tsx](../frontend/src/app/(workspace)/settings/templates/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Retención | `/settings/retention` | [page.tsx](../frontend/src/app/(workspace)/settings/retention/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Seguridad | `/settings/security` | [page.tsx](../frontend/src/app/(workspace)/settings/security/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Configuración / Apariencia | `/settings/appearance` | [page.tsx](../frontend/src/app/(workspace)/settings/appearance/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Tenants / Todos los tenants | `/tenants` | [page.tsx](../frontend/src/app/(workspace)/tenants/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Tenants / Crear tenant | `/tenants/new` | [page.tsx](../frontend/src/app/(workspace)/tenants/new/page.tsx) | [create-form](../frontend/src/components/patterns/create-form.tsx) |
| Tenants / Activos | `/tenants/active` | [page.tsx](../frontend/src/app/(workspace)/tenants/active/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Tenants / Suspendidos | `/tenants/suspended` | [page.tsx](../frontend/src/app/(workspace)/tenants/suspended/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Tenants / Planes | `/tenants/plans` | [page.tsx](../frontend/src/app/(workspace)/tenants/plans/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Tenants / Uso de almacenamiento | `/tenants/storage` | [page.tsx](../frontend/src/app/(workspace)/tenants/storage/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
| Tenants / Branding | `/tenants/branding` | [page.tsx](../frontend/src/app/(workspace)/tenants/branding/page.tsx) | [module-page](../frontend/src/components/patterns/module-page.tsx) |
