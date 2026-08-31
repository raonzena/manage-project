import Link from "next/link";
import * as styles from "./navigation.css";

type WorkspaceMenu = {
  id: string;
  text: string;
  link: string;
  count: string;
  active?: boolean;
};

type ProjectMenu = {
  id: string;
  text: string;
  link: string;
  count: string;
  indicatorClassName: string;
};

export type MenuSectionData =
  | { label: string; menus: WorkspaceMenu[]; type: "workspace" }
  | { label: string; menus: ProjectMenu[]; type: "project" };

type MenuItemProps =
  | { menu: WorkspaceMenu; type: "workspace" }
  | { menu: ProjectMenu; type: "project" };

function MenuItem({ menu, type }: MenuItemProps) {
  if (type === "workspace") {
    return (
      <li>
        <Link
          className={`${styles.menuLink} ${menu.active ? styles.active : ""}`}
          href={menu.link}
        >
          <span>{menu.text}</span>
          <small className={styles.menuCount}>{menu.count}</small>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link className={styles.projectLink} href={menu.link}>
        <i
          className={`${styles.projectIndicator} ${menu.indicatorClassName}`}
          aria-hidden="true"
        />
        {menu.text}
        <span className={styles.projectCount}>{menu.count}</span>
      </Link>
    </li>
  );
}

export function MenuSection(props: MenuSectionData) {
  const items =
    props.type === "workspace"
      ? props.menus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} type="workspace" />
        ))
      : props.menus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} type="project" />
        ));

  return (
    <>
      <p className={styles.label}>{props.label}</p>
      <ul
        className={props.type === "workspace" ? styles.menu : styles.projects}
      >
        {items}
      </ul>
    </>
  );
}
