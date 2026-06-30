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
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}