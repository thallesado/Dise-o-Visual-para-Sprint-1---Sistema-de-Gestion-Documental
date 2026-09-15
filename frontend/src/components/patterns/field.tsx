"use client";



export function Field({
  label,
  placeholder,
  wide = false,
  type = "text",
}: {
  label: string;
  placeholder: string;
  wide?: boolean;
  type?: "text" | "select" | "textarea";
}) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="mb-2 block text-xs font-semibold text-[#315a57]">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          className="w-full resize-none rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 py-2.5 text-sm outline-none focus:border-[#0f9d9a]"
        />
      ) : type === "select" ? (
        <select className="h-11 w-full rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 text-sm text-[#5a7775] outline-none focus:border-[#0f9d9a]">
          <option>{placeholder}</option>
          <option>Administrativo</option>
          <option>Contractual</option>
          <option>Clínico</option>
        </select>
      ) : (
        <input
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-[#dcebe8] bg-[#f8fbfa] px-3 text-sm outline-none focus:border-[#0f9d9a]"
        />
      )}
    </label>
  );
}
