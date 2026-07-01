import { supabase } from "../lib/supabase";

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    console.error("Google login error:", error);
    alert(error.message);
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getCurrentSessionUser() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    window.history.replaceState({}, document.title, "/dashboard");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}