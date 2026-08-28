import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getProjectList() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select("*");
  if (error) throw error;
  return data;
}
