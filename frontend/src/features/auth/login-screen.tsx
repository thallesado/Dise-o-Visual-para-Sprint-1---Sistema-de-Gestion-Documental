"use client";

import { ArrowLeft, Eye, EyeOff, FileText, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Acceso validado. Preparando tu espacio de trabajo...");
  }

  return (
    <main className="min-h-screen bg-[#f4faf9] text-[#163a39] lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden bg-[#087f7b] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div className="absolute -right-28 -top-28 size-80 rounded-full border-[36px] border-white/10" />
        <div className="absolute -bottom-32 -left-24 size-96 rounded-full border-[42px] border-white/10" />
        <div className="relative flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-white text-[#087f7b] shadow-lg"><FileText className="size-6" /></div>
          <div><p className="text-lg font-bold tracking-tight">NexoDocs</p><p className="text-xs text-white/70">Gestión documental inteligente</p></div>
        </div>
        <div className="relative max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a7eee7]">Tu operación, en orden</p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.08] tracking-tight">Todo lo que tu organización necesita para trabajar mejor.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/75">Centraliza documentos, expedientes, workflows y equipos en un espacio seguro para cada tenant.</p>
          <div className="mt-9 grid gap-3 text-sm text-white/85"><p className="flex items-center gap-3"><span className="flex size-7 items-center justify-center rounded-full bg-white/15"><ShieldCheck className="size-4" /></span> Trazabilidad de cada cambio</p><p className="flex items-center gap-3"><span className="flex size-7 items-center justify-center rounded-full bg-white/15"><ShieldCheck className="size-4" /></span> Flujos de aprobación más claros</p></div>
        </div>
        <p className="relative text-xs text-white/55">Sistema multitenant · Acceso seguro para equipos</p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:justify-center lg:px-16 xl:px-28">
        <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col justify-center lg:flex-none">
          <div className="mb-10 flex items-center justify-between lg:hidden"><Link href="/" className="flex items-center gap-2 text-sm font-bold text-[#087f7b]"><span className="flex size-9 items-center justify-center rounded-lg bg-[#dff7f3]"><FileText className="size-5" /></span>NexoDocs</Link><span className="text-xs text-[#77918e]">Acceso seguro</span></div>
          <div><p className="text-sm font-semibold text-[#0f9d9a]">Bienvenido de nuevo</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-[#163a39] sm:text-4xl">Ingresa a tu cuenta</h2><p className="mt-3 text-sm leading-6 text-[#6b8583]">Accede a tu espacio de trabajo y continúa donde lo dejaste.</p></div>
          <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#315a57]">Correo electrónico<div className="relative"><Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#87a3a1]" /><input required type="email" placeholder="nombre@empresa.com" className="h-12 w-full rounded-xl border border-[#cfe2df] bg-white pl-10 pr-4 text-sm font-normal text-[#163a39] outline-none transition focus:border-[#0f9d9a] focus:ring-4 focus:ring-[#dff7f3]" /></div></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#315a57]">Contraseña<div className="relative"><LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#87a3a1]" /><input required minLength={6} type={showPassword ? "text" : "password"} placeholder="Escribe tu contraseña" className="h-12 w-full rounded-xl border border-[#cfe2df] bg-white pl-10 pr-11 text-sm font-normal text-[#163a39] outline-none transition focus:border-[#0f9d9a] focus:ring-4 focus:ring-[#dff7f3]" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77918e]" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div></label>
            <div className="flex items-center justify-between gap-3 text-xs"><label className="flex items-center gap-2 text-[#6b8583]"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="size-4 accent-[#0f9d9a]" />Recordarme</label><button type="button" onClick={() => setMessage("Te enviaremos instrucciones para recuperar tu contraseña.")} className="font-semibold text-[#0f9d9a] hover:text-[#087f7b]">¿Olvidaste tu contraseña?</button></div>
            <button type="submit" className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-[#0f9d9a] text-sm font-bold text-white shadow-[0_8px_22px_rgba(15,157,154,0.2)] transition hover:bg-[#087f7b]">Iniciar sesión</button>
            {message && <p role="status" className="rounded-xl bg-[#eafaf7] px-4 py-3 text-center text-xs font-semibold text-[#087f7b]">{message}</p>}
          </form>
          <div className="my-8 flex items-center gap-3 text-xs text-[#9ab0ae]"><span className="h-px flex-1 bg-[#dcebe8]" />o continúa con<span className="h-px flex-1 bg-[#dcebe8]" /></div>
          <button type="button" onClick={() => setMessage("Inicio con tu proveedor corporativo seleccionado.")} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#cfe2df] bg-white text-sm font-semibold text-[#315a57] transition hover:border-[#0f9d9a] hover:bg-[#f8fdfc]"><span className="flex size-6 items-center justify-center rounded-md bg-[#dff7f3] text-[11px] font-bold text-[#087f7b]">S</span>Continuar con SSO corporativo</button>
          <p className="mt-8 text-center text-xs text-[#8aa19f]">¿Necesitas ayuda? <button onClick={() => setMessage("Nuestro equipo de soporte te contactará pronto.")} className="font-semibold text-[#0f9d9a]">Contacta con soporte</button></p>
          <Link href="/" className="mx-auto mt-7 inline-flex items-center gap-2 text-xs font-semibold text-[#77918e] hover:text-[#087f7b]"><ArrowLeft className="size-3" />Volver al dashboard</Link>
        </div>
        <p className="mx-auto mt-8 max-w-[460px] text-center text-[11px] text-[#9ab0ae]">Al continuar, aceptas las condiciones de uso y la política de privacidad de NexoDocs.</p>
      </section>
    </main>
  );
}
