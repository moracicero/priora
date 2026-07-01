"use client";

import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  useEffect(() => {
    async function handleCallback() {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");

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

    handleCallback();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF9FB]">
      <p className="text-lg font-bold text-pink-500">Iniciando sesión...</p>
    </main>
  );
}