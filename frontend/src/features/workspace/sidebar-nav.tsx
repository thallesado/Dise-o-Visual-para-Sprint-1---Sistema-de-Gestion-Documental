"use client";

import { NavItem, routeFor } from "@/features/workspace/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function SidebarNav({
  sections,
  activeNav,
  activeSubcategory,
  expanded,
  onSelect,
  onToggle,
  mobile = false,
}: {
  sections: { title: string; items: NavItem[]; }[];
  activeNav: string;
  activeSubcategory: string;
  expanded: string[];
  onSelect: (item: NavItem, child?: string) => void;
  onToggle: (label: string) => void;
  mobile?: boolean;
}) {
  return (
    <nav
      className={`${mobile ? "max-h-[65vh] overflow-y-auto" : "mt-6 flex-1 overflow-y-auto"} flex flex-col gap-5`}
      aria-label="Navegación principal"
    >
      {sections.map((section) => (
        <div key={section.title}>
          <p
            className={`px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${mobile ? "text-[#8aa19f]" : "text-teal-100/70"}`}
          >
            {section.title}
          </p>
          <div className="flex flex-col gap-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label,
                isExpanded = expanded.includes(item.label);
              return (
                <div key={item.label} className="relative">
                  <Link
                    href={routeFor(item.label)}
                    onClick={() => onSelect(item)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition ${isActive ? (mobile ? "bg-[#dff7f3] font-semibold text-[#087f7b]" : "bg-white font-semibold text-[#087f7b] shadow-sm") : mobile ? "text-[#4e706d] hover:bg-[#f4faf9]" : "text-teal-50 hover:bg-white/10"}`}
                  >
                    <Icon className="size-[17px]" />
                    {item.label}
                    {item.label === "Workflows" && (
                      <span className="ml-auto rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-amber-950">
                        8
                      </span>
                    )}
                    <span className="ml-auto size-3.5" />
                  </Link>
                  <button
                    type="button"
                    aria-label={`${isExpanded ? "Contraer" : "Expandir"} ${item.label}`}
                    aria-expanded={isExpanded}
                    onClick={() => onToggle(item.label)}
                    className={`absolute right-1 top-1 rounded-lg p-2 ${isActive || mobile ? "text-[#087f7b]" : "text-teal-100"}`}
                  >
                    <ChevronDown className={`size-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {isExpanded && (
                    <div
                      className={`ml-8 flex flex-col gap-0.5 border-l py-1 pl-3 ${mobile ? "border-[#c8e8e3]" : "border-teal-200/25"}`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={activeSubcategory === child.label && isActive ? "page" : undefined}
                          onClick={() => onSelect(item, child.label)}
                          className={`rounded-lg px-2 py-1.5 text-left text-[11px] transition ${activeSubcategory === child.label && isActive ? (mobile ? "bg-[#eafaf7] font-semibold text-[#087f7b]" : "bg-teal-100/15 font-semibold text-white") : mobile ? "text-[#78918f] hover:bg-[#f4faf9]" : "text-teal-100/75 hover:bg-white/10 hover:text-white"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
