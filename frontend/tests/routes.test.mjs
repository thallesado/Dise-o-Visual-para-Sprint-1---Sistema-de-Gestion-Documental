import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const source = await readFile(path.join(frontend, "src/features/workspace/navigation.ts"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exports = {};
new Function("require", "exports", compiled)(require, exports);
const { navigationRoutes, routeFor } = exports;

async function pageRoutes(directory, segments = []) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) result.push(...await pageRoutes(path.join(directory, entry.name), [...segments, entry.name]));
    else if (entry.name === "page.tsx") result.push("/" + segments.join("/"));
  }
  return result;
}

test("cada opción del menú tiene una URL única y una página explícita", async () => {
  const hrefs = navigationRoutes.map(route => route.href);
  assert.equal(new Set(hrefs).size, hrefs.length, "Hay URLs duplicadas en el menú");
  const pages = await pageRoutes(path.join(frontend, "src/app/(workspace)"));
  assert.deepEqual(pages.sort(), [...hrefs].sort(), "El menú y los archivos page.tsx no coinciden");
  for (const route of navigationRoutes) {
    assert.equal(routeFor(route.module, route.subcategory), route.href);
    if (route.href === "/") continue;
    const page = await readFile(path.join(frontend, "src/app/(workspace)", route.href.slice(1), "page.tsx"), "utf8");
    assert.ok(page.includes(`module=${JSON.stringify(route.module)}`), `Módulo incorrecto: ${route.href}`);
    assert.ok(page.includes(`subcategory=${JSON.stringify(route.subcategory)}`), `Vista incorrecta: ${route.href}`);
  }
  assert.throws(() => routeFor("Módulo inexistente"), /Ruta no definida/);
});

test("todas las URLs sirven su contenido, login y 404", { skip: !process.env.APP_URL }, async () => {
  const base = process.env.APP_URL;
  for (const route of navigationRoutes) {
    const response = await fetch(new URL(route.href, base));
    assert.equal(response.status, 200, route.href);
    const html = await response.text();
    const heading = html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1];
    assert.equal(heading, route.href === "/" ? "Buenos días, Laura" : route.subcategory, route.href);
  }
  assert.equal((await fetch(new URL("/login", base))).status, 200);
  assert.equal((await fetch(new URL("/ruta-inexistente", base))).status, 404);
});
