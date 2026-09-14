# Revisión de integridad y operación del SaaS

Actualización: 2026-09-14. Corresponde a la migración `004_saas_hardening`.
Complementa el contexto original; las afirmaciones sobre el estado inicial deben
interpretarse junto con este documento y los archivos reales.

## Decisiones y defectos corregidos

| Hallazgo en el esquema inicial | Comportamiento después de 004 |
| --- | --- |
| `current_version = 1` podía existir sin una versión real o quedar atrasado. | Un borrador vacío usa NULL. Una FK diferida y un trigger verifican el puntero al cerrar la transacción. |
| Dos escritores podían calcular el mismo siguiente número. | La inserción bloquea el documento y calcula el siguiente número dentro de esa operación. |
| El contenido nuevo podía heredar una aprobación antigua. | A partir de la segunda versión, el documento vuelve a DRAFT. Las tareas conservan su referencia a la versión revisada. |
| Etapas, tareas, comentarios o eventos podían pertenecer a otro agregado del mismo tenant. | Nuevas FK incluyen documento, workflow y plantilla, además del tenant. |
| Una referencia clínica con `episode_id` y sin historia omitía una FK compuesta por sus NULL. | Un CHECK exige historia cuando existe episodio; las FK existentes verifican paciente e historia. |
| Las asignaciones de etapas eran texto libre sin FK. | Columnas tipadas para usuario/rol/área/grupo, pertenencia al tenant y un único destino. |
| Una plantilla utilizada podía cambiar durante un proceso. | Su estructura queda protegida; para cambiarla se crea otra versión. Se puede desactivarla. |
| RLS solo comprobaba tenant y daba acceso amplio a cualquier conexión de aplicación. | Contexto válido y tenant forman una política restrictiva; las operaciones requieren RBAC por módulo. |
| El backend podía cambiar planes, límites y `is_platform_admin`. | Esos campos quedan fuera de sus privilegios de escritura. Usuarios globales y de tenant son excluyentes. |
| Notificaciones, tokens y reportes privados se compartían implícitamente dentro del tenant. | Notificaciones/tokens se limitan al propietario; reportes a propietario o compartidos para lectura. |
| UPDATE/DELETE estaban bloqueados en históricos, pero no había protección de TRUNCATE mediante trigger. | Los tres históricos tienen protección de TRUNCATE y los roles operativos carecen de ese privilegio. |
| Correos/nombres de usuario distinguían mayúsculas o espacios exteriores. | Índices únicos normalizados por tenant; las identidades no se reutilizan mediante soft delete. |
| Auditoría existía como tabla, sin registrar automáticamente cambios de negocio. | Triggers transaccionales registran operaciones e identificadores y nombres de campos modificados, sin sus valores. |
| Un administrador global no cabía en la FK de usuario del tenant intervenido. | `platform_actor_id` identifica al actor global de forma separada, con validación. |

Las FK compuestas con columnas opcionales requieren atención: PostgreSQL permite
omitir la comprobación cuando alguna columna referenciante es NULL bajo MATCH
SIMPLE. Los CHECK añadidos cierran los casos identificados. Véase la documentación
de [restricciones de PostgreSQL 17](https://www.postgresql.org/docs/17/ddl-constraints.html).

## Versionado y transacciones

Inserta el documento DRAFT y su primera versión dentro de una transacción. Para
asignar automáticamente el número, omite `version_number` en el INSERT. Incluye
`author_id` del usuario autenticado, un motivo no vacío y el contenido o los datos
del archivo. La inserción de versión requiere permisos de lectura del documento y
sus versiones, creación de versión y actualización del documento.

Si el cliente detecta ediciones concurrentes mediante un número esperado, puede
enviar explícitamente ese siguiente número. Un número atrasado o un salto produce
SQLSTATE 23514; el backend debe mostrar el conflicto y permitir revisar la versión
más reciente. No debe reenviar ciegamente contenido antiguo con un nuevo número.

El historial no se sobrescribe. No se agregan versiones a documentos ARCHIVED,
VOIDED, TRASHED o eliminados lógicamente; primero debe existir una reapertura
autorizada. Publicar, revisar o archivar un documento vacío está prohibido al cerrar
la transacción; DRAFT, PENDING y TRASHED pueden carecer de contenido.

Las comprobaciones diferidas permiten crear documento y versión juntos. La
transacción debe manejar también errores del COMMIT. Ante 40001 o 40P01, el futuro
backend necesitará una política acotada de reintentos de la operación completa.
Los locks por documento se basan en los mecanismos de
[bloqueo de filas de PostgreSQL](https://www.postgresql.org/docs/17/explicit-locking.html).

## Seguridad y alcance de RBAC

La autorización se evalúa con `users`, `user_roles`, `roles`, `role_permissions` y
`permissions`, ignorando usuarios bloqueados/eliminados, roles inactivos y permisos
inactivos. No hay permisos arbitrarios almacenados en el usuario.

Los permisos de módulo se corresponden con operaciones SQL: read/SELECT,
create/INSERT, update/UPDATE, delete/DELETE. Se agregan controles específicos para
aprobación, rechazo, archivado, papelera y soft delete de documentos, y para delegar
tareas. Administrar asignaciones de roles es una facultad de administración, no un
permiso que deba concederse a usuarios operativos.

| Grupo de tablas | Módulo RBAC principal |
| --- | --- |
| Usuarios, grupos y miembros | user |
| Roles y sus asignaciones | role |
| Tipos, categorías, metadatos, áreas y retención | configuration |
| Expedientes y participantes | expedient |
| Documentos, comentarios, etiquetas asignadas y valores de metadatos | document |
| Versiones | document_version |
| Plantillas, workflows, documentos enlazados, eventos y comentarios | workflow |
| Tareas y delegaciones | task |
| OCR | ocr |
| Notificaciones y tokens | notification |
| Reportes y lectura de consumo | report |
| Auditoría | audit |
| Especialización clínica y DICOM | patient / dicom |

Los permisos SQL prevalecen sobre RBAC: tener `document:delete` permite las acciones
lógicas autorizadas, no ejecutar DELETE físico. `users` exige listas explícitas de
columnas al consultar; el rol normal no puede leer `password_hash`. El flujo de
autenticación deberá diseñar por separado el acceso controlado a credenciales.

Una notificación puede crearse para otro destinatario autorizado del mismo tenant,
pero solo este puede consultarla o marcarla como leída. No uses RETURNING de sus
columnas al insertarla desde una conexión cuyo actor es otro usuario, porque esa
lectura queda sujeta a RLS. Los procesos globales disponen de su rol técnico separado.

`nexodocs_security` no tiene login ni membresía para el backend. Sus funciones
SECURITY DEFINER usan nombres de tablas calificados, search_path fijo y permisos
limitados. Algunas verificaciones de integridad necesitan ver filas ocultas por
RLS para no omitir restricciones. El patrón sigue las precauciones de
[CREATE FUNCTION](https://www.postgresql.org/docs/17/sql-createfunction.html).

RLS no se aplica a superusuarios, roles BYPASSRLS ni a TRUNCATE. La separación de
roles y los privilegios son parte de la protección, junto con las políticas
restrictivas. Véase [Row Security Policies](https://www.postgresql.org/docs/17/ddl-rowsecurity.html).

## Auditoría

Los triggers cubren tenants, documentos/versiones, expedientes, usuarios, RBAC,
grupos, áreas, tipos/metadatos/retención, workflows/plantillas/tareas/delegaciones y
pacientes/historias/episodios/enlaces clínicos. Las acciones automáticas se nombran
como `DOCUMENTS_UPDATE`, `DOCUMENT_VERSIONS_INSERT`, etc. Conservan el actor de
contexto, identificadores y nombres de campos cambiados, sin contenido ni secretos.

Para una intervención de plataforma, establece `app.user_id` al usuario global
autenticado usando exclusivamente la conexión autorizada de plataforma. El trigger
almacena `platform_actor_id`; `user_id` se reserva al actor del tenant.

Un proceso técnico sin contexto de usuario registra actor NULL. Los cambios y su
auditoría se confirman o revierten juntos. Login, lecturas, descargas, intentos
fallidos, IP y user agent todavía deben registrarse desde el backend; los triggers
no observan SELECT ni pueden conservar eventos de una transacción revertida.

## Crecimiento y operación

Los nuevos índices apoyan navegación por cursor `(created_at, id)`, documentos por
autor y vencimiento, tareas por rol/área/grupo, colas OCR, eventos de workflows y
relaciones consultadas en sentido inverso. Los predicados de las consultas deben
coincidir con los de los índices parciales, por ejemplo `deleted_at IS NULL`.

No se introdujo particionamiento ni una tabla duplicada por tenant. Con volúmenes
reales habrá que medir EXPLAIN (ANALYZE, BUFFERS), latencias y frecuencia de escritura
antes de ajustar índices o particionar auditoría/versiones. No se hizo una prueba
de carga a escala de producción; las pruebas concurrentes verifican integridad.

Los archivos binarios deben almacenarse fuera de PostgreSQL, con claves de objeto
inmutables por versión y acceso autorizado. La base guarda referencias, tamaños y
checksums; no comprueba por sí sola que el objeto exista ni que su checksum sea real.
Los valores de consumo no reemplazan la reserva transaccional de cuotas cuando se
implemente carga de archivos y procesamiento en segundo plano.

El respaldo local automático de `migrate.ps1` no sustituye una estrategia operativa:
programar respaldos, conservar los roles globales, restaurar en una base separada y
probar recuperación de archivos y PostgreSQL. Los scripts de prueba usan tmpfs y
no son una instancia persistente para desarrollo.

## Pendiente fuera de esta migración

- Backend de autenticación, sesiones, recuperación de cuentas y contexto confiable.
- Permisos por documento/expediente y reglas de visibilidad más finas que RBAC por módulo.
- Validación de esquemas y referencias almacenadas en JSON, y metadatos obligatorios según tipo documental.
- Activación por tenant de módulos clínicos y otras funciones del plan.
- Motor de workflows, transiciones autorizadas, sincronización con tareas y procesos OCR con reintentos e idempotencia.
- Almacenamiento de objetos, cuotas, retención, conservación legal y política explícita de purga.
- Métricas, pruebas de carga, recuperación, despliegue y monitoreo de producción.

Estas capacidades no están implementadas por disponer de tablas o permisos que
las representan. La interfaz continúa siendo un prototipo sin persistencia.
