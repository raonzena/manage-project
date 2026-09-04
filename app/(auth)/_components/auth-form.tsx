"use client";

import { Button, Input } from "@/design-system/ui";
import Link from "next/link";
import { useActionState, useState, type FormEvent } from "react";
import type { AuthAction, AuthState } from "../_auth/actions";
import { loginSchema, signUpSchema, type AuthField } from "../_auth/schema";
import * as styles from "./auth.css";

type AuthFormProps = {
  action: AuthAction;
  mode: "login" | "sign-up";
};

const initialState: AuthState = {};
type FieldErrors = Partial<Record<AuthField, string[]>>;

export function AuthForm({ action, mode }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>();
  const isSignUp = mode === "sign-up";
  const errors = clientErrors ?? state.errors;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const schema = isSignUp ? signUpSchema : loginSchema;
    const result = schema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget)),
    );

    if (!result.success) {
      event.preventDefault();
      setClientErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setClientErrors(undefined);
  }

  return (
    <form
      action={formAction}
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
    >
      {isSignUp ? (
        <Input
          aria-invalid={Boolean(errors?.name)}
          autoComplete="name"
          hint={errors?.name?.[0]}
          label="이름"
          name="name"
          placeholder="홍길동"
          required
        />
      ) : null}
      <Input
        aria-invalid={Boolean(errors?.email)}
        autoComplete="email"
        hint={errors?.email?.[0]}
        label="이메일"
        name="email"
        placeholder="name@company.com"
        required
        type="email"
      />
      <Input
        aria-invalid={Boolean(errors?.password)}
        autoComplete={isSignUp ? "new-password" : "current-password"}
        hint={
          errors?.password?.[0] ??
          (isSignUp
            ? "영문, 숫자, 특수문자를 포함해 8자 이상 입력하세요."
            : undefined)
        }
        label="비밀번호"
        minLength={8}
        name="password"
        placeholder="비밀번호를 입력해주세요."
        required
        type="password"
      />
      {isSignUp ? (
        <Input
          aria-invalid={Boolean(errors?.passwordConfirm)}
          autoComplete="new-password"
          hint={
            errors?.passwordConfirm?.[0] ??
            "위에서 입력한 비밀번호와 동일하게 입력하세요."
          }
          label="비밀번호 확인"
          minLength={8}
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요."
          required
          type="password"
        />
      ) : null}
      {!clientErrors && state.message ? (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      ) : null}
      <Button
        className={styles.submit}
        disabled={pending}
        size="lg"
        type="submit"
      >
        {pending ? "처리 중…" : isSignUp ? "계정 만들기" : "로그인"}
      </Button>
      <p className={styles.switchText}>
        {isSignUp ? "이미 계정이 있나요?" : "Rivet이 처음인가요?"}{" "}
        <Link
          className={styles.switchLink}
          href={isSignUp ? "/login" : "/sign-up"}
        >
          {isSignUp ? "로그인" : "회원가입"}
        </Link>
      </p>
    </form>
  );
}
