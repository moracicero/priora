"use client";

import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  useEffect(() => {
    async function handleAuthCallback() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("Auth callback error:", error);
          alert(error.message);
          window.location.replace("/");
          return;
        }
      }

      window.location.replace("/dashboard");
    }

    handleAuthCallback();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9FB] text-slate-900">
      <p className="text-lg font-bold text-pink-500">Iniciando sesión...</p>
    </main>
  );
}