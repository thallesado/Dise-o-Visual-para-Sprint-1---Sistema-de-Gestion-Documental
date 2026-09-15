"use client";

import { Brand } from "@/features/workspace/brand";
import { NavItem, navSections, navigationRoutes, routeFor } from "@/features/workspace/navigation";
import { SidebarNav } from "@/features/workspace/sidebar-nav";
import { Storage } from "@/features/workspace/storage";
import { TenantSelector } from "@/features/workspace/tenant-selector";
import { UserFooter } from "@/features/workspace/user-footer";
import { WorkspaceContext } from "@/features/workspace/workspace-context";
import { Bell, CircleAlert, List, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode; }) {
  const pathname = usePathname();
  const currentRoute = navigationRoutes.find(route => route.href === pathname);
  const activeNav = currentRoute?.module ?? "Inicio";
  const activeSubcategory = currentRoute?.subcategory ?? "Resumen";
  const [expanded, setExpanded] = useState<string[]>([activeNav]);
  useEffect(() => {
    setExpanded(current => current.includes(activeNav) ? current : [...current, activeNav]);
  }, [activeNav]);
  const [role, setRole] = useState("Administrador de tenant");
  const [actionMessage, setActionMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const availableSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.roles || item.roles.includes(role),
      ),
    }))
    .filter((section) => section.items.length);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  const notify = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setActionMessage(message);
    toastTimer.current = setTimeout(() => setActionMessage(""), 2600);
  };
  const selectNav = (item: NavItem) => {
    setExpanded(current => current.includes(item.label) ? current : [...current, item.label]);
    setMobileNavOpen(false);
  };
  const toggleNav = (label: string) => {
    setExpanded(current => current.includes(label) ? current.filter(value => value !== label) : [...current, label]);
  };
  return (
    <WorkspaceContext.Provider value={{ notify }}>
      <main className="min-h-screen bg-[#f6faf9] text-[#153a39]">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-[252px] flex-col bg-[#087f7b] px-4 py-5 text-white lg:flex">
          <Brand />
          <TenantSelector role={role} setRole={setRole} />
          <SidebarNav
            sections={availableSections}
            activeNav={activeNav}
            activeSubcategory={activeSubcategory}
            expanded={expanded}
            onSelect={selectNav}
            onToggle={toggleNav}
          />
          <Storage />
          <UserFooter />
        </aside>
        <section className="lg:pl-[252px]">
          <header className="flex h-[76px] items-center justify-between border-b border-[#dcebe8] bg-white px-5 lg:px-9">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="rounded-lg bg-[#dff7f3] p-2 text-[#087f7b]"
                aria-label="Abrir menú"
              >
                <List className="size-5" />
              </button>
              <Brand mobile />
            </div>
            <div className="relative hidden w-full max-w-[420px] md:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#87a3a1]" />
              <input
                aria-label="Buscar en NexoDocs"
                placeholder="Buscar documentos, expedientes o usuarios..."
                className="h-10 w-full rounded-xl border border-[#dcebe8] bg-[#f8fbfa] pl-10 pr-4 text-sm outline-none focus:border-[#0f9d9a]"
              />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link
                href={routeFor("Notificaciones", "No leídas")}
                className="relative rounded-lg p-2 text-[#5a7775] hover:bg-[#eef8f6]"
                aria-label="Notificaciones"
              >
                <Bell className="size-5" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#f07b68] ring-2 ring-white" />
              </Link>
              <button
                className="rounded-lg p-2 text-[#5a7775]"
                aria-label="Ayuda"
              >
                <CircleAlert className="size-5" />
              </button>
              <div className="hidden h-7 w-px bg-[#dcebe8] sm:block" />
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#d5f5f1] text-[11px] font-bold text-[#087f7b]">
                  LM
                </div>
                <span className="text-xs font-semibold text-[#4e706d]">
                  Laura Martínez
                </span>
              </div>
            </div>
          </header>
          {mobileNavOpen && (
            <div className="border-b border-[#dcebe8] bg-white p-4 lg:hidden">
              <SidebarNav
                sections={availableSections}
                activeNav={activeNav}
                activeSubcategory={activeSubcategory}
                expanded={expanded}
                onSelect={selectNav}
                onToggle={toggleNav}
                mobile
              />
            </div>
          )}
          {children}
        </section>
        {actionMessage && (
          <div
            className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-xl bg-[#163a39] px-4 py-3 text-xs font-semibold text-white shadow-xl"
            role="status"
          >
            {actionMessage}
          </div>
        )}
        <div className="fixed bottom-5 right-5 z-40">
          <div className="flex flex-col items-end gap-3">
            {chatOpen && (
              <div className="w-[min(320px,calc(100vw-2rem))] rounded-2xl border border-[#bfeae5] bg-white p-4 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#163a39]">Nexo AI</p>
                    <p className="mt-1 text-xs leading-5 text-[#6b8583]">
                      Pregunta sobre documentos, revisiones o permisos.
                    </p>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    aria-label="Cerrar asistente"
                  >
                    <X className="size-4 text-[#7b9895]" />
                  </button>
                </div>
                <div className="mt-4 rounded-xl bg-[#eafaf7] px-3 py-2.5 text-xs font-medium text-[#17635f]">
                  ¿En qué puedo ayudarte hoy?
                </div>
                <button
                  onClick={() => notify("Conversación iniciada")}
                  className="mt-3 w-full rounded-xl bg-[#0f9d9a] py-2.5 text-xs font-semibold text-white"
                >
                  Iniciar conversación
                </button>
              </div>
            )}
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="flex items-center gap-2 rounded-full bg-[#087f7b] px-4 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-[#d5f5f1] text-[#087f7b]">
                <Bell className="size-5" />
              </span>
              <span className="hidden sm:inline">Nexo AI</span>
            </button>
          </div>
        </div>
      </main>
    </WorkspaceContext.Provider>
  );
}
