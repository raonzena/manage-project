import Link from "next/link";
import type { ReactNode } from "react";
import * as styles from "./auth.css";

type AuthShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function AuthShell({
  children,
  description,
  eyebrow,
  title,
}: AuthShellProps) {
  return (
    <main className={styles.page}>
      <section className={styles.story} aria-label="Rivet 소개">
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark} aria-hidden="true">
            R
          </span>
          Rivet
        </Link>
        <div className={styles.storyContent}>
          <h2 className={styles.storyTitle}>
            흩어진 일을
            <br />한 흐름으로.
          </h2>
          <p className={styles.storyDescription}>
            이슈, 담당자, 마감일을 연결하고 팀이 지금 해야 할 일에 집중하세요.
          </p>
        </div>
        <p className={styles.storyNote}>Small teams, clearly aligned.</p>
      </section>
      <section className={styles.formSide}>
        <div className={styles.mobileBrand}>
          <span className={styles.brandMark} aria-hidden="true">
            R
          </span>
          Rivet
        </div>
        <div className={styles.formCard}>
          <header className={styles.formHeader}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
          </header>
          {children}
        </div>
      </section>
    </main>
  );
}
