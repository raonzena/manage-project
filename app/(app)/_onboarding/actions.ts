"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(2, "워크스페이스 이름을 2자 이상 입력해 주세요."),
  workspaceSlug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "영문 소문자, 숫자와 하이픈만 사용할 수 있어요.",
    ),
  projectName: z
    .string()
    .trim()
    .min(2, "프로젝트 이름을 2자 이상 입력해 주세요."),
  projectKey: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[A-Z][A-Z0-9]{1,9}$/,
      "영문으로 시작하는 2~10자 키를 입력해 주세요.",
    ),
});

export type OnboardingState = {
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export async function createWorkspace(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { error: profileError } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email!,
      name: user.user_metadata.name ?? user.email?.split("@")[0] ?? "사용자",
    },
    { onConflict: "id", ignoreDuplicates: true },
  );
  if (profileError) return { message: "사용자 정보를 준비하지 못했습니다." };
  const { error } = await supabase.rpc("create_workspace_with_project", {
    workspace_name: result.data.workspaceName,
    workspace_slug: result.data.workspaceSlug,
    project_name: result.data.projectName,
    project_key: result.data.projectKey,
  });
  if (error)
    return {
      message:
        error.code === "23505"
          ? "이미 사용 중인 워크스페이스 주소 또는 프로젝트 키입니다."
          : "워크스페이스를 만들지 못했습니다.",
    };
  redirect("/");
}
