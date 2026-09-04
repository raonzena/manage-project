"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import * as styles from "./dropdown-menu.css";
import { cx } from "./utils";

type DropdownMenuProps = {
  align?: "start" | "end";
  ariaLabel: string;
  children: ReactNode;
  trigger: ReactNode;
  triggerClassName?: string;
};

export function DropdownMenu({
  align = "start",
  ariaLabel,
  children,
  trigger,
  triggerClassName,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector("button")?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      className={styles.root}
      ref={rootRef}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
    >
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={ariaLabel}
        className={cx(styles.trigger, triggerClassName)}
        onClick={() => setOpen(true)}
        type="button"
      >
        {trigger}
      </button>
      {open ? (
        <div
          className={cx(styles.menu, styles.align[align])}
          id={menuId}
          role="menu"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DropdownMenuItem({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(styles.item, className)}
      role="menuitem"
      type={type}
      {...props}
    />
  );
}
