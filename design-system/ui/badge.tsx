import type { HTMLAttributes } from "react";
import * as styles from "./badge.css";
import { cx } from "./utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: keyof typeof styles.tone;
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cx(styles.root, styles.tone[tone], className)}
      {...props}
    />
  );
}
