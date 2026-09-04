import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getIssueList(projectId?: string) {
  const supabase = await createClient();

  let query = supabase.from("issues").select(`
    id, project_id, number, title, description, status, priority,
    assignee_id, reporter_id, due_at, created_at, updated_at,
    project:projects!inner(id, name, key, workspace_id),
    assignee:users!issues_assignee_id_fkey(id, name, avatar_url)
  `);
  if (projectId) query = query.eq("project_id", projectId);
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
