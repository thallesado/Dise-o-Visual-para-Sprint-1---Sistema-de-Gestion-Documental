"use client";

import { ChevronDown } from "lucide-react";

export function UserFooter() {
  return (
    <div className="mt-5 flex items-center gap-3 px-2">
      <div className="flex size-9 items-center justify-center rounded-full bg-[#d5f5f1] text-xs font-bold text-[#087f7b]">
        LM
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">Laura Martínez</p>
        <p className="truncate text-[11px] text-teal-100">Administradora</p>
      </div>
      <ChevronDown className="ml-auto size-4 text-teal-100" />
    </div>
  );
}
