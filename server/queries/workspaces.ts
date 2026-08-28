import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getWorkspaceList() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("workspaces")
    .select("id, name, slug, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
