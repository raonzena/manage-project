import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getIssueList() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("issues").select("*");
  if (error) throw error;
  return data;
}
