import { supabase } from "../lib/supabase";
import type { Task } from "../types/task";

async function getUserId() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user?.id ?? null;
}

export async function getTasks() {
  const userId = await getUserId();

  if (!userId) return [];

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Task[];
}

export async function createTask(task: Omit<Task, "id">) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      ...task,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Task;
}

export async function deleteTask(id: string) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function updateTaskStatus(id: string, status: Task["status"]) {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return data as Task;
}