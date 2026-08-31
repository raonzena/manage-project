import type { MenuSectionData } from "./menu-section";
import * as styles from "./navigation.css";

export const menuSections = {
  workspace: {
    label: "Workspace",
    type: "workspace",
    menus: [
      { id: "overview", text: "개요", link: "/", count: "G", active: true },
      { id: "my-issues", text: "내 이슈", link: "/tasks", count: "8" },
      { id: "projects", text: "프로젝트", link: "/projects", count: "3" },
      { id: "team", text: "팀", link: "/team", count: "6" },
    ],
  },
  project: {
    label: "Projects",
    type: "project",
    menus: [
      {
        id: "mobile-renewal",
        text: "모바일 리뉴얼",
        link: "/projects/mobile",
        count: "12",
        indicatorClassName: styles.blue,
      },
      {
        id: "billing-system",
        text: "결제 시스템",
        link: "/projects/billing",
        count: "7",
        indicatorClassName: styles.green,
      },
      {
        id: "brand-website",
        text: "브랜드 사이트",
        link: "/projects/website",
        count: "4",
        indicatorClassName: styles.orange,
      },
    ],
  },
} satisfies Record<"workspace" | "project", MenuSectionData>;
