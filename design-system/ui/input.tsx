import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import * as styles from "./input.css";
import { cx } from "./utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: ReactNode;
};

export function Input({ className, hint, id: providedId, label, ...props }: InputProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-describedby={props["aria-describedby"] ?? hintId}
        className={cx(styles.input, className)}
        {...props}
      />
      {hint ? <span className={styles.hint} id={hintId}>{hint}</span> : null}
    </div>
  );
}
