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
    .select("id, name, slug, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
