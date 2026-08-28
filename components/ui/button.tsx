import type { ButtonHTMLAttributes } from "react";
import * as styles from "./button.css";
import { cx } from "./utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: keyof typeof styles.tone;
  size?: keyof typeof styles.size;
};

export function Button({
  className,
  tone = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(styles.root, styles.tone[tone], styles.size[size], className)}
      {...props}
    />
  );
}
