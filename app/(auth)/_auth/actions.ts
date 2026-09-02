"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { loginSchema, signUpSchema, type AuthField } from "./schema";

export type AuthState = {
  errors?: Partial<Record<AuthField, string[]>>;
  message?: string;
};
export type AuthAction = (
  state: AuthState,
  formData: FormData,
) => Promise<AuthState>;

function getFieldErrors(error: {
  flatten: () => { fieldErrors: Record<string, string[]> };
}) {
  return error.flatten().fieldErrors as AuthState["errors"];
}

export async function login(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { errors: getFieldErrors(result.error) };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) return { message: "이메일 또는 비밀번호가 올바르지 않습니다." };
  redirect("/");
}

export async function signUp(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const result = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { errors: getFieldErrors(result.error) };

  const { email, name, password } = result.data;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error)
    return { message: "계정을 만들 수 없습니다. 입력 내용을 확인해 주세요." };
  if (!data.session)
    return { message: "가입 확인 메일을 보냈습니다. 이메일을 확인해 주세요." };
  redirect("/");
}
