"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuthCallback() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }

      router.replace("/dashboard");
    }

    handleAuthCallback();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9FB] text-slate-900">
      <p className="text-lg font-bold text-pink-500">
        Iniciando sesión...
      </p>
    </main>
  );
}