"use client";

import { useActionState, useEffect } from "react";
import { Button, Dialog, Input } from "@/design-system/ui";
import * as styles from "./create-dialogs.css";

type WorkspaceActionState = {
  createdProjectId?: string;
  errors?: Record<string, string[] | undefined>;
  message?: string;
};
export type WorkspaceAction = (
  state: WorkspaceActionState,
  formData: FormData,
) => Promise<WorkspaceActionState>;
const initialState: WorkspaceActionState = {};

type CreateWorkspaceDialogProps = {
  action: WorkspaceAction;
  onClose: () => void;
  open: boolean;
};
export function CreateWorkspaceDialog({
  action,
  onClose,
  open,
}: CreateWorkspaceDialogProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  return (
    <Dialog
      description="워크스페이스와 첫 프로젝트를 함께 만듭니다."
      onClose={onClose}
      open={open}
      title="새 워크스페이스"
    >
      <form action={formAction} className={styles.form}>
        <div className={styles.fields}>
          <Input
            aria-invalid={Boolean(state.errors?.workspaceName)}
            hint={state.errors?.workspaceName?.[0]}
            label="워크스페이스 이름"
            name="workspaceName"
            placeholder="예: 제품 개발팀"
            required
          />
          <Input
            aria-invalid={Boolean(state.errors?.workspaceSlug)}
            hint={state.errors?.workspaceSlug?.[0]}
            label="워크스페이스 주소"
            name="workspaceSlug"
            placeholder="product-team"
            required
          />
          <Input
            aria-invalid={Boolean(state.errors?.projectName)}
            hint={state.errors?.projectName?.[0]}
            label="첫 프로젝트 이름"
            name="projectName"
            placeholder="예: 모바일 앱"
            required
          />
          <Input
            aria-invalid={Boolean(state.errors?.projectKey)}
            hint={
              state.errors?.projectKey?.[0] ??
              "이슈 번호 앞에 표시됩니다. 예: MOB-1"
            }
            label="프로젝트 키"
            maxLength={10}
            name="projectKey"
            placeholder="MOB"
            required
          />
        </div>
        {state.message ? (
          <p className={styles.error} role="alert">
            {state.message}
          </p>
        ) : null}
        <div className={styles.actions}>
          <Button onClick={onClose} tone="secondary">
            취소
          </Button>
          <Button disabled={pending} type="submit">
            {pending ? "만드는 중…" : "워크스페이스 만들기"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

type CreateProjectDialogProps = {
  action: WorkspaceAction;
  onClose: () => void;
  onCreated: (projectId: string) => void;
  open: boolean;
  workspaceId: string;
  workspaceName: string;
};
export function CreateProjectDialog({
  action,
  onClose,
  onCreated,
  open,
  workspaceId,
  workspaceName,
}: CreateProjectDialogProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  useEffect(() => {
    if (state.createdProjectId) onCreated(state.createdProjectId);
  }, [onCreated, state.createdProjectId]);
  return (
    <Dialog
      description={`${workspaceName} 워크스페이스에 프로젝트를 추가합니다.`}
      onClose={onClose}
      open={open}
      title="새 프로젝트"
    >
      <form action={formAction} className={styles.form}>
        <input name="workspaceId" type="hidden" value={workspaceId} />
        <div className={styles.fields}>
          <Input
            aria-invalid={Boolean(state.errors?.projectName)}
            hint={state.errors?.projectName?.[0]}
            label="프로젝트 이름"
            name="projectName"
            placeholder="예: 웹사이트 개편"
            required
          />
          <Input
            aria-invalid={Boolean(state.errors?.projectKey)}
            hint={
              state.errors?.projectKey?.[0] ??
              "이슈 번호 앞에 표시됩니다. 예: WEB-1"
            }
            label="프로젝트 키"
            maxLength={10}
            name="projectKey"
            placeholder="WEB"
            required
          />
        </div>
        {state.message ? (
          <p className={styles.error} role="alert">
            {state.message}
          </p>
        ) : null}
        <div className={styles.actions}>
          <Button onClick={onClose} tone="secondary">
            취소
          </Button>
          <Button disabled={pending} type="submit">
            {pending ? "추가하는 중…" : "프로젝트 추가"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
