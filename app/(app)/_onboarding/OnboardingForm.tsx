"use client";

import { Button, Input } from "@/design-system/ui";
import { useActionState } from "react";
import { createWorkspace, type OnboardingState } from "./actions";
import * as styles from "./onboarding.css";

const initialState: OnboardingState = {};

export function OnboardingForm() {
  const [state, action, pending] = useActionState(
    createWorkspace,
    initialState,
  );
  return (
    <form action={action} className={styles.form}>
      <div className={styles.fields}>
        <Input
          label="워크스페이스 이름"
          name="workspaceName"
          placeholder="예: 제품 개발팀"
          required
          hint={state.errors?.workspaceName?.[0]}
        />
        <Input
          label="워크스페이스 주소"
          name="workspaceSlug"
          placeholder="product-team"
          required
          hint={state.errors?.workspaceSlug?.[0]}
        />
        <Input
          label="첫 프로젝트 이름"
          name="projectName"
          placeholder="예: 모바일 앱"
          required
          hint={state.errors?.projectName?.[0]}
        />
        <Input
          label="프로젝트 키"
          name="projectKey"
          placeholder="MOB"
          required
          maxLength={10}
          hint={
            state.errors?.projectKey?.[0] ??
            "이슈 번호 앞에 표시됩니다. 예: MOB-1"
          }
        />
      </div>
      {state.message ? (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "만드는 중…" : "워크스페이스 만들기"}
      </Button>
    </form>
  );
}
