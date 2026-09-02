import type { Metadata } from "next";
import { AuthForm } from "../_components/auth-form";
import { AuthShell } from "../_components/auth-shell";
import { login } from "../_auth/actions";

export const metadata: Metadata = { title: "로그인 — Rivet" };

export default function LoginPage() {
  return (
    <AuthShell
      description="Rivet에 로그인해 팀의 업무를 한곳에서 관리하세요."
      eyebrow="Sign in"
      title="워크스페이스에 로그인하세요."
    >
      <AuthForm action={login} mode="login" />
    </AuthShell>
  );
}
