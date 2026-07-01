"use client";

import { ArrowRight, Check, ListChecks, Sparkles } from "lucide-react";
import Link from "next/link";
import { signInWithGoogle } from "../hooks/useAuth"; 

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9FB] text-slate-950">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-200">
              <Check size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Priora</span>
          </div>

          <button
  onClick={signInWithGoogle}
  className="rounded-2xl border border-pink-100 bg-white px-6 py-3 text-sm font-semibold text-pink-500 shadow-md shadow-pink-100 hover:bg-pink-50"
>
  Iniciar sesión
</button>
        </nav>

        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-2">
          <section>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-5 py-3 text-sm font-bold text-pink-500 shadow-md shadow-pink-100">
              <Sparkles size={17} />
              AI Productivity Workspace
            </div>

            <h1 className="max-w-2xl text-5xl font-black tracking-tight md:text-7xl">
              Organizá tus tareas con{" "}
              <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
                prioridad inteligente.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Priora te ayuda a planificar, priorizar y avanzar en tu trabajo
              diario con asistencia inteligente y sincronización en la nube.
            </p>

            <div className="mt-9">
              <button
              onClick={signInWithGoogle}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-pink-200 hover:opacity-95"
            >
              Comenzar ahora
            </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-pink-100 bg-white/90 p-6 shadow-2xl shadow-pink-100 backdrop-blur">
            <p className="font-bold text-pink-500">Dashboard</p>
            <h2 className="mt-1 text-3xl font-black">Tu día, organizado</h2>

            <div className="mt-6 grid gap-3">
              {[
                ["Preparar entrevista técnica", "Alta"],
                ["Documentar README", "Media"],
                ["Deploy en Vercel", "Alta"],
              ].map(([title, priority]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-2xl border border-pink-100 bg-[#FFF9FB] p-4"
                >
                  <p className="font-bold">{title}</p>
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-500">
                    {priority}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-400 p-5 text-white">
              <p className="font-black">✨ Sugerencia IA</p>
              <p className="mt-2 text-sm text-pink-50">
                Priorizá primero las tareas urgentes o con fecha cercana.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}