import { ReactNode } from "react";
import * as styles from "./taskCard.css";

interface TaskCardProps {
  title: string;
  taskCount: number;
  note: ReactNode;
  theme: keyof typeof styles.taskCardTheme;
  trend: string;
}

export const TaskCard = ({
  title,
  taskCount,
  note,
  theme,
  trend,
}: TaskCardProps) => (
  <section className={`${styles.taskCard} ${styles.taskCardTheme[theme]}`}>
    <div className={styles.header}>
      <p className={styles.title}>{title}</p>
      <span className={styles.statusDot} />
    </div>
    <strong className={styles.count}>{taskCount}</strong>
    <div className={styles.meta}>
      <span className={styles.trend}>{trend}</span>
      <p className={styles.note}>{note}</p>
    </div>
  </section>
);
