"use client";

import { Folder } from "lucide-react";

export function Brand({ mobile = false }: { mobile?: boolean; }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex size-9 items-center justify-center rounded-xl ${mobile ? "bg-[#087f7b] text-white" : "bg-white text-[#087f7b]"}`}
      >
        <Folder className="size-5" />
      </div>
      <div>
        <p className="text-[17px] font-bold tracking-tight">NexoDocs</p>
        <p
          className={`text-[10px] uppercase tracking-[0.16em] ${mobile ? "text-[#0f9d9a]" : "text-teal-100"}`}
        >
          Gestión documental
        </p>
      </div>
    </div>
  );
}
