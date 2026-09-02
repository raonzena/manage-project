import type { Metadata } from "next";
import { AuthForm } from "../_components/auth-form";
import { AuthShell } from "../_components/auth-shell";
import { signUp } from "../_auth/actions";

export const metadata: Metadata = { title: "회원가입 — Rivet" };

export default function SignUpPage() {
  return (
    <AuthShell
      description="첫 워크스페이스를 만들고 팀의 일을 한곳에서 연결해 보세요."
      eyebrow="Start together"
      title="팀의 흐름을 시작하세요."
    >
      <AuthForm action={signUp} mode="sign-up" />
    </AuthShell>
  );
}
