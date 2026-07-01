"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CheckCircle2, LayoutDashboard, LogOut, User } from "lucide-react";
import { signOut } from "../../hooks/useAuth";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tareas", icon: CheckCircle2 },
  { href: "/profile", label: "Perfil", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#FFF9FB] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-pink-100 bg-white/80 p-6 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white">
              ✓
            </div>
            <span className="text-2xl font-black">Priora</span>
          </div>

          <nav className="mt-10 space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold ${
                    active
                      ? "bg-pink-50 text-pink-500"
                      : "text-slate-500 hover:bg-pink-50 hover:text-pink-500"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-pink-50 hover:text-pink-500"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </aside>

        <section className="pb-28 p-6 lg:p-10 lg:pb-10">{children}</section>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-50 flex w-[92%] -translate-x-1/2 items-center justify-between rounded-3xl border border-pink-100 bg-white/95 p-3 shadow-2xl shadow-pink-100 backdrop-blur lg:hidden">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-black ${
                active ? "bg-pink-50 text-pink-500" : "text-slate-400"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-black text-slate-400"
        >
          <LogOut size={18} />
          Salir
        </button>
      </nav>
    </main>
  );
}