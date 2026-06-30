import { supabase } from "../lib/supabase";

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    console.error(error);
    alert(error.message);
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getCurrentSessionUser() {
  const hash = window.location.hash;

  if (hash.includes("access_token")) {
    const params = new URLSearchParams(hash.replace("#", ""));

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      window.history.replaceState({}, document.title, "/dashboard");
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}