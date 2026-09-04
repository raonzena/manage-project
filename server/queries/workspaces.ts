import "server-only";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getWorkspaceList() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("workspaces")
    .select("id, name, slug, created_at, projects(id, name, key, created_at, issues(id, status, assignee_id, due_at))")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase
    .from("users")
    .select("id, name, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    name: data?.name ?? user.user_metadata.name ?? user.email?.split("@")[0] ?? "사용자",
    avatarUrl: data?.avatar_url ?? null,
  };
}
