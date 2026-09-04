import type { HTMLAttributes } from "react";
import * as styles from "./card.css";
import { cx } from "./utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={cx(styles.root, className)} {...props} />;
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <header className={cx(styles.header, className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cx(styles.title, className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx(styles.description, className)} {...props} />;
}
