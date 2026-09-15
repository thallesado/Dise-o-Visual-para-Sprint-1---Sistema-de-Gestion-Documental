# Nexodocs — Sistema de Gestión Documental

Nexodocs es una aplicación web para organizar y controlar documentos de empresas.

Esta versión es un prototipo visual. Incluye una pantalla principal con módulos para documentos, expedientes, flujos de trabajo, usuarios, reportes y configuración.

## 1. Qué necesitas instalar

Antes de abrir el proyecto, instala estas tres herramientas:

1. **Node.js 20 o una versión más nueva**
   - Descarga: https://nodejs.org
2. **Visual Studio Code**
   - Descarga: https://code.visualstudio.com
3. **pnpm**
   - pnpm sirve para instalar las librerías del proyecto.

Para instalar pnpm, abre una terminal y escribe:

```bash
npm install --global pnpm
```

Para comprobar que las herramientas funcionan, escribe:

```bash
node --version
pnpm --version
```

Si aparecen números de versión, la instalación está lista.

## 2. Descargar y abrir el proyecto

Puedes descargar el proyecto como archivo ZIP desde v0 o copiarlo desde GitHub.

Después:

1. Descomprime el archivo ZIP, si lo descargaste.
2. Abre Visual Studio Code.
3. Selecciona **Archivo → Abrir carpeta**.
4. Elige la carpeta del proyecto.
5. Abre una terminal desde **Terminal → Nueva terminal**.

## 3. Instalar las librerías

La primera vez, ejecuta este comando dentro de la carpeta del proyecto:

```bash
pnpm install
```

Este comando lee `package.json` y descarga todo lo necesario.

Debes volver a ejecutar `pnpm install` si el proyecto cambia sus librerías o si aparece un error de dependencias.

## 4. Encender la aplicación

Para iniciar la aplicación en modo desarrollo, ejecuta:

```bash
pnpm dev
```

Cuando aparezca el mensaje de inicio, abre este enlace en tu navegador:

http://localhost:3000

La aplicación se actualizará automáticamente cuando guardes cambios en el código.

Para apagarla, vuelve a la terminal y presiona:

```text
Ctrl + C
```

## 5. Comandos importantes

| Comando | Qué hace |
| --- | --- |
| `pnpm install` | Instala las librerías. |
| `pnpm dev` | Enciende la aplicación para trabajar en ella. |
| `pnpm build` | Comprueba que la aplicación pueda prepararse para publicar. |
| `pnpm typecheck` | Comprueba TypeScript de toda la interfaz. |
| `pnpm test` | Verifica que el menú y los archivos de rutas coincidan. |
| `pnpm start` | Enciende la versión preparada para publicar. |

## 6. Librerías y herramientas usadas

- **Next.js 16:** estructura principal de la aplicación web.
- **React 19:** permite crear pantallas y elementos interactivos.
- **TypeScript:** ayuda a detectar errores en el código.
- **Tailwind CSS 4:** se utiliza para diseñar la interfaz.
- **shadcn/ui:** ofrece componentes visuales como botones, tarjetas y menús.
- **Lucide React:** proporciona los iconos del sistema.
- **Vercel Analytics:** permite medir el uso de la aplicación.

No necesitas instalar cada librería manualmente. El comando `pnpm install` las instala todas.

## 7. Archivos principales

- `frontend/src/app/`: rutas y layouts; cada opción del menú tiene su propio `page.tsx`.
- `frontend/src/features/`: vistas, datos simulados y componentes de cada dominio.
- `frontend/src/components/`: componentes visuales reutilizables.
- `frontend/src/app/globals.css`: colores y estilos generales.
- `frontend/package.json`: dependencias de la interfaz; la raíz delega los comandos mediante pnpm workspaces.
- `database/`: scripts, migraciones y pruebas de PostgreSQL.
- [Mapa de arquitectura y pantallas](docs/ARQUITECTURA.md): qué archivo editar para cada URL.
- [Operación de la base de datos](database/README.md).

Por ejemplo, `/documents/new` abre `frontend/src/app/(workspace)/documents/new/page.tsx`.
Puedes acceder directamente, recargar y navegar con Atrás/Adelante. `/login` conserva su pantalla independiente.

## 8. Si algo no funciona

Primero, detén la aplicación con `Ctrl + C` y ejecuta:

```bash
pnpm install
pnpm dev
```

Si el puerto 3000 ya está ocupado, utiliza otro puerto:

```bash
pnpm dev -- --port 3001
```

Después abre:

http://localhost:3001

Si sigues teniendo problemas, revisa que estés situado dentro de la carpeta correcta del proyecto y que Node.js tenga la versión 20 o superior.

## 9. Angular y Flutter

La versión actual es un prototipo realizado con Next.js y React.

La idea del proyecto es utilizar esta interfaz como referencia para crear posteriormente:

- Una aplicación web con Angular.
- Una aplicación móvil para Android y iPhone con Flutter.
- Un sistema multitenant, donde varias empresas puedan utilizar la plataforma con sus datos separados.
- Un asistente conversacional con inteligencia artificial.

## 10. Continuar trabajando en v0

Este proyecto está conectado a v0. Puedes seguir solicitando cambios desde aquí:

https://v0.app/chat/projects/prj_IBhMxF0QStaLOWwLEdOUX9zFCQlc
