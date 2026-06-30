import { supabase } from "../lib/supabase";

export async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/dashboard`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
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

  if (window.location.hash.includes("access_token")) {
    const params = new URLSearchParams(window.location.hash.substring(1));

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        console.error("Set session error:", error);
      }

      window.history.replaceState({}, document.title, "/dashboard");
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}