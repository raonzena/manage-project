import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getProjectList(workspaceId?: string) {
  const supabase = await createClient();

  let query = supabase.from("projects").select("id, workspace_id, name, key, created_at");
  if (workspaceId) query = query.eq("workspace_id", workspaceId);
  const { data, error } = await query.order("created_at");
  if (error) throw error;
  return data;
}
