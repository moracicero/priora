import { supabase } from "../lib/supabase";

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
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

  if (url.searchParams.get("code")) {
    const { error } = await supabase.auth.exchangeCodeForSession(
      window.location.href
    );

    if (error) {
      console.error("Exchange code error:", error);
    }

    window.history.replaceState({}, document.title, "/dashboard");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}