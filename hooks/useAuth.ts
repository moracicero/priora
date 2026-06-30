import { supabase } from "../lib/supabase";

const redirectTo =
  typeof window !== "undefined"
    ? `${window.location.origin}/dashboard`
    : undefined;

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}