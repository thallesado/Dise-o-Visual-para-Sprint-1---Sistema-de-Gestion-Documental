"use client";

import { IconType, Notify } from "@/components/patterns/types";

export function Header({
  module,
  subcategory,
  description,
  action,
  icon: Icon,
  onAction,
}: {
  module: string;
  subcategory: string;
  description: string;
  action: string;
  icon: IconType;
  onAction: Notify;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-medium text-[#0f9d9a]">
          {module} · {subcategory}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#163a39]">
          {subcategory}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b8583]">
          {description}
        </p>
      </div>
      <button
        onClick={() => onAction(`${action} preparado`)}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f9d9a] px-5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(15,157,154,0.18)]"
      >
        <Icon className="size-4" />
        {action}
      </button>
    </div>
  );
}
