import { supabase } from "@/lib/supabase";
import { Task } from "@/types/task";

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
  console.log(error);
  throw error;
}

  return data as Task[];
}

export async function createTask(task: Omit<Task, "id">) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();

  if (error) {
    console.error("SUPABASE ERROR:", error);
    alert(JSON.stringify(error, null, 2));
    throw error;
  }

  return data as Task;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
  console.log(error);
  throw error;
}
}

export async function updateTaskStatus(
  id: string,
  status: Task["status"]
) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

    if (error) {
    console.log(error);
    throw error;
    }

  return data as Task;
}