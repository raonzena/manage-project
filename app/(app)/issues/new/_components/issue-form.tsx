"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select } from "@/design-system/ui";
import * as inputStyles from "@/design-system/ui/input.css";
import { createIssue } from "../_lib/actions";
import { statusOptions } from "../_lib/schema";
import * as styles from "./issue-form.css";

type IssueFormProps = {
  projects: { id: string; name: string }[];
  members: { id: string; name: string }[];
  initialProjectId: string;
  currentUserId: string;
  workspaceId: string;
};

export function IssueForm({
  projects,
  members,
  initialProjectId,
  currentUserId,
  workspaceId,
}: IssueFormProps) {
  const [state, action, pending] = useActionState(createIssue, {});
  const [projectId, setProjectId] = useState(initialProjectId);
  const [status, setStatus] = useState("TODO");
  const [assigneeId, setAssigneeId] = useState(
    members.some(({ id }) => id === currentUserId) ? currentUserId : "",
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueAt, setDueAt] = useState("");
  const router = useRouter();
  return (
    <form action={action} className={styles.form} aria-busy={pending}>
      <fieldset className={styles.fields} disabled={pending}>
        <Select
          label="프로젝트"
          name="projectId"
          value={projectId}
          onValueChange={setProjectId}
          options={projects.map(({ id, name }) => ({ value: id, label: name }))}
          disabled={pending}
        />
        <Input
          label="이슈 제목"
          name="title"
          placeholder="문제를 한 문장으로 요약하세요"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={Boolean(state.titleError)}
          hint={state.titleError}
        />
        <div className={inputStyles.field}>
          <label className={inputStyles.label} htmlFor="issue-description">
            설명
          </label>
          <textarea
            className={styles.textarea}
            id="issue-description"
            name="description"
            placeholder="배경, 기대 결과, 완료 조건을 작성하세요…"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <Select
          label="상태"
          name="status"
          value={status}
          onValueChange={setStatus}
          options={statusOptions}
          disabled={pending}
        />
        <Select
          label="담당자"
          name="assigneeId"
          value={assigneeId}
          onValueChange={setAssigneeId}
          disabled={pending}
          options={[
            { value: "", label: "미지정" },
            ...members.map(({ id, name }) => ({ value: id, label: name })),
          ]}
        />
        <Input
          label="마감일"
          name="dueAt"
          type="date"
          max="9999-12-31"
          value={dueAt}
          onChange={(event) => setDueAt(event.target.value)}
          aria-invalid={Boolean(state.dueAtError)}
          hint={state.dueAtError ?? "선택하지 않으면 마감일 없이 생성됩니다."}
        />
      </fieldset>
      {state.message ? (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      ) : null}
      <div className={styles.actions}>
        <Button
          tone="secondary"
          disabled={pending}
          onClick={() =>
            router.push(
              `/issues/all?workspace=${workspaceId}&project=${projectId}`,
            )
          }
        >
          취소
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "만드는 중…" : "이슈 만들기"}
        </Button>
      </div>
    </form>
  );
}
