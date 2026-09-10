import { z } from "zod";

export const statusOptions = [
  { value: "TODO", label: "할 일" },
  { value: "IN_PROGRESS", label: "진행 중" },
  { value: "REVIEW", label: "검토" },
  { value: "DONE", label: "완료" },
];

export const issueSchema = z.object({
  projectId: z.uuid("프로젝트를 선택해 주세요."),
  title: z.string().trim().min(1, "이슈 제목을 입력해 주세요."),
  description: z.string().trim(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]),
  assigneeId: z.union([z.uuid(), z.literal("")]),
});

export type IssueActionState = { message?: string; titleError?: string };
