export type IssueViewId = "all" | "mine" | "in-progress" | "due-soon";

export const issueViews = [
  { id: "all", label: "전체 이슈", description: "이 프로젝트에 등록된 모든 이슈를 확인하세요." },
  { id: "mine", label: "내 이슈", description: "내가 담당하고 있는 이슈를 확인하세요." },
  { id: "in-progress", label: "진행 중인 이슈", description: "현재 작업이 진행 중인 이슈입니다." },
  { id: "due-soon", label: "마감 임박 이슈", description: "곧 마감되는 작업을 우선 확인하세요." },
] as const;

export function getIssueView(viewId: string) {
  return issueViews.find(({ id }) => id === viewId);
}

export function isDueSoon(dueAt: string | null, now = new Date()) {
  if (!dueAt) return false;
  const due = new Date(`${dueAt}T23:59:59`);
  const boundary = new Date(now);
  boundary.setDate(boundary.getDate() + 7);
  return due >= now && due <= boundary;
}

export function matchesIssueView(
  issue: { assignee_id: string | null; due_at: string | null; status: string },
  viewId: IssueViewId,
  userId: string,
) {
  if (viewId === "mine") return issue.assignee_id === userId;
  if (viewId === "in-progress") return issue.status === "IN_PROGRESS";
  if (viewId === "due-soon") return isDueSoon(issue.due_at);
  return true;
}
