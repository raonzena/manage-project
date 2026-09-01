export type ProjectTone = "blue" | "green" | "orange";
export type IssueViewId = "all" | "mine" | "in-progress" | "due-soon";
export type IssueStatus = "할 일" | "진행 중" | "검토";

export type Issue = {
  assignedToMe: boolean;
  due: string;
  dueSoon: boolean;
  id: string;
  key: string;
  owner: string;
  status: IssueStatus;
  title: string;
};

export type Project = {
  code: string;
  id: string;
  issues: Issue[];
  name: string;
  tone: ProjectTone;
};

export type Workspace = {
  id: string;
  mark: string;
  name: string;
  projects: Project[];
};

export const issueViews = [
  {
    id: "all",
    label: "전체 이슈",
    description: "이 프로젝트에 등록된 모든 이슈를 확인하세요.",
  },
  {
    id: "mine",
    label: "내 이슈",
    description: "내가 담당하고 있는 이슈를 확인하세요.",
  },
  {
    id: "in-progress",
    label: "진행 중인 이슈",
    description: "현재 작업이 진행 중인 이슈입니다.",
  },
  {
    id: "due-soon",
    label: "마감 임박 이슈",
    description: "곧 마감되는 작업을 우선 확인하세요.",
  },
] as const;

export const workspaces: Workspace[] = [
  {
    id: "product-development",
    mark: "PD",
    name: "제품 개발",
    projects: [
      {
        id: "mobile-renewal",
        code: "MOB",
        name: "모바일 리뉴얼",
        tone: "blue",
        issues: [
          {
            id: "mob-142",
            key: "MOB-142",
            title: "로그인 이후 딥링크 경로가 초기화되는 문제",
            status: "진행 중",
            owner: "SY",
            due: "오늘",
            dueSoon: true,
            assignedToMe: true,
          },
          {
            id: "mob-139",
            key: "MOB-139",
            title: "푸시 알림 설정 화면 접근성 개선",
            status: "검토",
            owner: "SH",
            due: "9월 3일",
            dueSoon: false,
            assignedToMe: true,
          },
          {
            id: "mob-128",
            key: "MOB-128",
            title: "앱 시작 구간 성능 개선",
            status: "할 일",
            owner: "MK",
            due: "9월 8일",
            dueSoon: false,
            assignedToMe: false,
          },
        ],
      },
      {
        id: "billing-system",
        code: "PAY",
        name: "결제 시스템",
        tone: "green",
        issues: [
          {
            id: "pay-87",
            key: "PAY-87",
            title: "정기 결제 실패 재시도 정책 반영",
            status: "진행 중",
            owner: "SH",
            due: "9월 2일",
            dueSoon: true,
            assignedToMe: true,
          },
          {
            id: "pay-81",
            key: "PAY-81",
            title: "결제 내역 영수증 다운로드",
            status: "할 일",
            owner: "MK",
            due: "9월 9일",
            dueSoon: false,
            assignedToMe: false,
          },
        ],
      },
    ],
  },
  {
    id: "brand-experience",
    mark: "BX",
    name: "브랜드 경험",
    projects: [
      {
        id: "brand-website",
        code: "WEB",
        name: "브랜드 사이트",
        tone: "orange",
        issues: [
          {
            id: "web-31",
            key: "WEB-31",
            title: "채용 페이지 모바일 레이아웃 점검",
            status: "진행 중",
            owner: "SH",
            due: "9월 4일",
            dueSoon: true,
            assignedToMe: true,
          },
          {
            id: "web-24",
            key: "WEB-24",
            title: "고객 사례 페이지 콘텐츠 업데이트",
            status: "검토",
            owner: "HJ",
            due: "9월 11일",
            dueSoon: false,
            assignedToMe: false,
          },
        ],
      },
    ],
  },
];

export function getSelection(workspaceId?: string, projectId?: string) {
  const workspace =
    workspaces.find(({ id }) => id === workspaceId) ?? workspaces[0];
  const project =
    workspace.projects.find(({ id }) => id === projectId) ??
    workspace.projects[0];

  return { project, workspace };
}

export function getIssueView(viewId: string) {
  return issueViews.find(({ id }) => id === viewId);
}

export function filterIssues(issues: Issue[], viewId: IssueViewId) {
  switch (viewId) {
    case "all":
      return issues;
    case "mine":
      return issues.filter(({ assignedToMe }) => assignedToMe);
    case "in-progress":
      return issues.filter(({ status }) => status === "진행 중");
    case "due-soon":
      return issues.filter(({ dueSoon }) => dueSoon);
  }
}
