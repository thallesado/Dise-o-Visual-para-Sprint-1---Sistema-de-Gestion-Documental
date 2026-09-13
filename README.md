# Nexodocs — Sistema de Gestión Documental

Nexodocs es una aplicación web para organizar y controlar documentos de empresas.

Esta versión es un prototipo visual. Incluye módulos para documentos, expedientes, flujos de trabajo, usuarios, reportes y configuración.

## 1. Qué necesitas instalar

Antes de abrir el proyecto, instala estas herramientas:

1. **Node.js 20 o una versión más nueva** — https://nodejs.org
2. **Visual Studio Code** — https://code.visualstudio.com
3. **pnpm**, el instalador de librerías del proyecto.

Para instalar pnpm, abre una terminal y escribe:

```bash
npm install --global pnpm
```

Comprueba que todo funciona:

```bash
node --version
pnpm --version
```

Si aparecen números de versión, estás listo.

## 2. Descargar y abrir el proyecto

Puedes descargar el proyecto como ZIP desde v0 o copiarlo desde GitHub.

1. Descomprime el ZIP, si lo descargaste.
2. Abre Visual Studio Code.
3. Selecciona **Archivo → Abrir carpeta**.
4. Elige la carpeta del proyecto.
5. Abre una terminal desde **Terminal → Nueva terminal**.

## 3. Instalar las librerías

Dentro de la carpeta del proyecto, ejecuta:

```bash
pnpm install
```

Este comando lee `package.json` y descarga todo lo necesario. No tienes que instalar cada librería por separado.

## 4. Encender la aplicación

Ejecuta:

```bash
pnpm dev
```

Cuando aparezca el mensaje de inicio, abre en tu navegador:

http://localhost:3000

La aplicación se actualizará automáticamente cuando guardes cambios. Para apagarla, vuelve a la terminal y presiona `Ctrl + C`.

## 5. Comandos importantes

| Comando | Qué hace |
| --- | --- |
| `pnpm install` | Instala las librerías. |
| `pnpm dev` | Enciende la aplicación para trabajar en ella. |
| `pnpm build` | Comprueba que la aplicación pueda prepararse para publicar. |
| `pnpm start` | Enciende la versión preparada para publicar. |

## 6. Librerías y herramientas usadas

- **Next.js 16:** estructura principal de la aplicación web.
- **React 19:** permite crear pantallas y elementos interactivos.
- **TypeScript:** ayuda a detectar errores en el código.
- **Tailwind CSS 4:** se utiliza para diseñar la interfaz.
- **shadcn/ui:** ofrece componentes visuales como botones, tarjetas y menús.
- **Lucide React:** proporciona los iconos del sistema.
- **Vercel Analytics:** permite medir el uso de la aplicación.

## 7. Archivos principales

- `app/page.tsx`: contiene la pantalla principal y los módulos del panel.
- `app/globals.css`: contiene los colores, tamaños y estilos generales.
- `app/layout.tsx`: contiene la estructura general y la información de la página.
- `package.json`: contiene las librerías y los comandos del proyecto.

## 8. Si algo no funciona

Primero, detén la aplicación con `Ctrl + C` y ejecuta:

```bash
pnpm install
pnpm dev
```

Si el puerto 3000 está ocupado, utiliza otro:

```bash
pnpm dev -- --port 3001
```

Después abre http://localhost:3001.

Si sigues teniendo problemas, comprueba que estés dentro de la carpeta correcta y que Node.js sea versión 20 o superior.

## 9. Angular y Flutter

La versión actual es un prototipo realizado con Next.js y React. La interfaz servirá como referencia para crear posteriormente:

- Una aplicación web con Angular.
- Una aplicación móvil para Android y iPhone con Flutter.
- Un sistema multitenant, donde cada empresa tenga sus datos separados.
- Un asistente conversacional con inteligencia artificial.

## 10. Continuar trabajando en v0

Este proyecto está conectado a v0. Puedes seguir solicitando cambios desde aquí:

https://v0.app/chat/projects/prj_IBhMxF0QStaLOWwLEdOUX9zFCQlc
