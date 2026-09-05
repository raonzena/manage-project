import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getNavigationSelection,
  matchesIssueView,
  type NavigationWorkspace,
} from "./navigation-domain";

describe("프로젝트별 이슈 필터", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 6, 12));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const issues = [
    { id: "today", assignee_id: "me", status: "TODO", due_at: "2026-09-06" },
    { id: "active", assignee_id: "other", status: "IN_PROGRESS", due_at: "2026-09-12" },
    { id: "done", assignee_id: "me", status: "DONE", due_at: "2026-09-07" },
    { id: "overdue", assignee_id: "me", status: "REVIEW", due_at: "2026-09-05" },
    { id: "later", assignee_id: null, status: "TODO", due_at: "2026-09-14" },
    { id: "unscheduled", assignee_id: null, status: "IN_PROGRESS", due_at: null },
  ];

  it.each([
    ["all", ["today", "active", "done", "overdue", "later", "unscheduled"]],
    ["mine", ["today", "done", "overdue"]],
    ["in-progress", ["active", "unscheduled"]],
    ["due-soon", ["today", "active"]],
  ] as const)("%s 메뉴에 해당하는 이슈만 보여 준다", (view, expectedIds) => {
    const visible = issues.filter((issue) => matchesIssueView(issue, view, "me"));
    expect(visible.map(({ id }) => id)).toEqual(expectedIds);
  });

  it("오늘 마감 이슈는 마감 시각을 지나면 제외한다", () => {
    vi.setSystemTime(new Date(2026, 8, 6, 23, 59, 59));
    expect(matchesIssueView(issues[0], "due-soon", "me")).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(matchesIssueView(issues[0], "due-soon", "me")).toBe(false);
  });

  it("7일 뒤 마감 시각까지 정확히 포함한다", () => {
    const issue = { assignee_id: null, status: "TODO", due_at: "2026-09-13" };
    vi.setSystemTime(new Date(2026, 8, 6, 23, 59, 58));
    expect(matchesIssueView(issue, "due-soon", "me")).toBe(false);

    vi.advanceTimersByTime(1000);
    expect(matchesIssueView(issue, "due-soon", "me")).toBe(true);
  });
});

describe("워크스페이스와 프로젝트 선택", () => {
  const workspaces: NavigationWorkspace[] = [
    { id: "team-a", name: "팀 A", projects: [
      { id: "a-first", name: "첫 프로젝트", key: "AF", issues: [] },
      { id: "a-second", name: "두 번째 프로젝트", key: "AS", issues: [] },
    ] },
    { id: "team-b", name: "팀 B", projects: [
      { id: "b-first", name: "팀 B 프로젝트", key: "BF", issues: [] },
    ] },
    { id: "empty", name: "빈 팀", projects: [] },
  ];

  it.each([
    [undefined, undefined, "team-a", "a-first"],
    ["team-a", "a-second", "team-a", "a-second"],
    ["team-b", "a-second", "team-b", "b-first"],
    ["team-a", "missing", "team-a", "a-first"],
    ["missing", undefined, "team-a", "a-first"],
    ["empty", "a-first", "empty", undefined],
  ])("선택 %s / %s를 현재 워크스페이스 안에서 해석한다", (workspaceId, projectId, expectedWorkspace, expectedProject) => {
    const selection = getNavigationSelection(workspaces, workspaceId, projectId);
    expect({ workspace: selection.workspace?.id, project: selection.project?.id })
      .toEqual({ workspace: expectedWorkspace, project: expectedProject });
  });

  it("워크스페이스가 없으면 아무것도 선택하지 않는다", () => {
    expect(getNavigationSelection([], "missing", "missing")).toEqual({
      workspace: undefined,
      project: undefined,
    });
  });
});
