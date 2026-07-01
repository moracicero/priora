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
      <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-white">
              ✓
            </div>
            <span className="text-xl font-black">Priora</span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-2xl bg-pink-50 px-3 py-2 text-xs font-black text-pink-500"
          >
            Salir
          </button>
        </div>

        <nav className="grid grid-cols-3 gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-black ${
                  active ? "bg-pink-50 text-pink-500" : "text-slate-500"
                }`}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

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

        <section className="p-6 lg:p-10">{children}</section>
      </div>
    </main>
  );
}