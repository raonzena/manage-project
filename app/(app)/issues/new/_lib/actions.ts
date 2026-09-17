"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { issueSchema, type IssueActionState } from "./schema";

export async function createIssue(
  _state: IssueActionState,
  formData: FormData,
): Promise<IssueActionState> {
  const result = issueSchema.safeParse(Object.fromEntries(formData));
  if (!result.success)
    return {
      message: "입력 내용을 확인해 주세요.",
      titleError: result.error.flatten().fieldErrors.title?.[0],
      dueAtError: result.error.flatten().fieldErrors.dueAt?.[0],
    };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, workspace_id")
    .eq("id", result.data.projectId)
    .single();
  if (projectError || !project)
    return { message: "프로젝트를 사용할 수 없습니다. 다시 선택해 주세요." };
  const { error } = await supabase.from("issues").insert({
    project_id: project.id,
    title: result.data.title,
    description: result.data.description || null,
    status: result.data.status,
    assignee_id: result.data.assigneeId || null,
    reporter_id: user.id,
    due_at: result.data.dueAt || null,
  });
  if (error)
    return {
      message:
        "이슈를 만들지 못했습니다. 프로젝트와 담당자를 확인하고 다시 시도해 주세요.",
    };
  revalidatePath("/", "layout");
  redirect(
    `/issues/all?workspace=${project.workspace_id}&project=${project.id}`,
  );
}
