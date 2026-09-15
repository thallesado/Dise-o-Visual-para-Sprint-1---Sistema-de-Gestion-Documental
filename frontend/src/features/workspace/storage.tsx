"use client";



export function Storage() {
  return (
    <div className="rounded-2xl bg-[#076f6c] p-4">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span>Almacenamiento</span>
        <span>68%</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-teal-900/40">
        <div className="h-1.5 w-[68%] rounded-full bg-teal-100" />
      </div>
      <p className="mt-2 text-[11px] text-teal-100">
        6.8 GB de 10 GB utilizados
      </p>
    </div>
  );
}
