# Nexodocs — Sistema de Gestión Documental

Este proyecto es una interfaz web para gestionar documentos de empresas. Incluye un dashboard multitenant, módulos de documentos, expedientes, workflows, usuarios, reportes y configuración.

La aplicación está construida con **Next.js**, **React**, **TypeScript**, **Tailwind CSS** y componentes de **shadcn/ui**.

## Requisitos

Antes de comenzar, instala estas herramientas:

1. **Node.js**, versión 20 o superior: [nodejs.org](https://nodejs.org)
2. **VS Code**, para abrir y editar el proyecto: [code.visualstudio.com](https://code.visualstudio.com)
3. **pnpm**, que es el gestor de paquetes usado por este proyecto.

Para instalar pnpm, abre una terminal y ejecuta:

```bash
npm install --global pnpm
```

Puedes comprobar que todo está instalado escribiendo:

```bash
node --version
pnpm --version
```

## Cómo descargar y abrir el proyecto

1. Descarga el proyecto como ZIP desde v0 o clónalo desde GitHub.
2. Descomprime el ZIP si lo descargaste.
3. Abre la carpeta del proyecto con VS Code.
4. En VS Code, abre una terminal desde **Terminal → Nueva terminal**.

## Instalar las librerías

La primera vez que abras el proyecto, instala todas sus librerías con este comando:

```bash
pnpm install
```

Este comando lee el archivo `package.json` y descarga automáticamente todo lo que necesita la aplicación.

## Ejecutar el proyecto

Para encender la aplicación en modo desarrollo, ejecuta:

```bash
pnpm dev
```

Después, abre este enlace en tu navegador:

[http://localhost:3000](http://localhost:3000)

Para detener la aplicación, vuelve a la terminal y presiona `Ctrl + C`.

## Comandos importantes

| Comando | Para qué sirve |
| --- | --- |
| `pnpm install` | Instala las librerías del proyecto. |
| `pnpm dev` | Inicia la aplicación para trabajar y ver cambios. |
| `pnpm build` | Comprueba y prepara la aplicación para producción. |
| `pnpm start` | Ejecuta la versión preparada para producción. |

## Librerías principales

- **Next.js 16:** framework principal de la aplicación web.
- **React 19:** permite crear componentes y pantallas interactivas.
- **TypeScript:** ayuda a escribir código más seguro y ordenado.
- **Tailwind CSS 4:** permite diseñar la interfaz rápidamente.
- **shadcn/ui:** componentes visuales accesibles para botones, tarjetas y navegación.
- **Lucide React:** iconos usados en el dashboard.
- **Vercel Analytics:** medición básica del uso de la aplicación.

## Dónde empezar a modificar

- `app/page.tsx`: pantalla principal y módulos del dashboard.
- `app/globals.css`: colores, estilos generales y diseño responsive.
- `app/layout.tsx`: estructura general y metadatos de la aplicación.
- `package.json`: librerías y comandos disponibles.

## Solución rápida de problemas

Si aparece un error al ejecutar el proyecto, prueba esto:

```bash
pnpm install
pnpm dev
```

Si el puerto 3000 está ocupado, cierra la aplicación que lo está usando o inicia Next.js en otro puerto:

```bash
pnpm dev -- --port 3001
```

En ese caso, abre [http://localhost:3001](http://localhost:3001).

## Nota sobre Angular y Flutter

La versión actual es un prototipo frontend realizado con Next.js y React. La estructura visual sirve como referencia para una futura implementación del sistema en Angular para web y Flutter para aplicaciones móviles.

## Continuar trabajando con v0

Este repositorio está vinculado a un proyecto de [v0](https://v0.app). Puedes continuar solicitando cambios desde el siguiente enlace:

[Continuar trabajando en v0](https://v0.app/chat/projects/prj_IBhMxF0QStaLOWwLEdOUX9zFCQlc)

