"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowDownIcon } from "@/design-system/icons/arrow-down-icon";
import * as styles from "./select.css";
import { cx } from "./utils";

export type SelectOption = {
  disabled?: boolean;
  onSelect?: () => void;
  label: string;
  value: string;
};

type SelectProps = {
  disabled?: boolean;
  label: string;
  leading?: ReactNode;
  name?: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  tone?: keyof typeof styles.controlTone;
  value: string;
};

export function Select({
  disabled = false,
  label,
  leading,
  name,
  onValueChange,
  options,
  tone = "default",
  value,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const labelId = `${id}-label`;
  const valueId = `${id}-value`;
  const listboxId = `${id}-listbox`;
  const selectedOption = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleFocusIn(event: FocusEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [open]);

  function findEnabledIndex(start: number, direction: 1 | -1) {
    for (let offset = 1; offset <= options.length; offset += 1) {
      const index =
        (start + direction * offset + options.length) % options.length;
      if (!options[index]?.disabled) return index;
    }
    return start;
  }

  function openListbox() {
    if (disabled || options.length === 0) return;
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function selectOption(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;
    if (option.onSelect) option.onSelect();
    else onValueChange(option.value);
    setActiveIndex(index);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) return openListbox();
      setActiveIndex((current) =>
        findEnabledIndex(current, event.key === "ArrowDown" ? 1 : -1),
      );
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (!open) openListbox();
      const edge = event.key === "Home" ? -1 : options.length;
      setActiveIndex(findEnabledIndex(edge, event.key === "Home" ? 1 : -1));
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      selectOption(activeIndex);
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={styles.field} ref={rootRef}>
      <span className={cx(styles.label, styles.labelTone[tone])} id={labelId}>
        {label}
      </span>
      <button
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        aria-controls={open ? listboxId : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${labelId} ${valueId}`}
        className={cx(
          styles.control,
          styles.controlTone[tone],
          styles.controlLayout[leading ? "withLeading" : "plain"],
        )}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openListbox())}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
        role="combobox"
        type="button"
      >
        {leading ? (
          <span className={styles.leading} aria-hidden="true">
            {leading}
          </span>
        ) : null}
        <span className={styles.value} id={valueId}>
          {selectedOption?.label}
        </span>
        <ArrowDownIcon
          aria-hidden="true"
          className={cx(styles.chevron, open ? styles.chevronOpen : undefined)}
        />
      </button>
      {open ? (
        <ul
          aria-labelledby={labelId}
          className={cx(styles.listbox, styles.listboxTone[tone])}
          id={listboxId}
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              aria-disabled={option.disabled || undefined}
              aria-selected={!option.onSelect && option.value === value}
              className={cx(
                styles.option,
                option.onSelect ? styles.optionAction[tone] : undefined,
                index === activeIndex ? styles.optionActive[tone] : undefined,
              )}
              id={`${id}-option-${index}`}
              key={option.value}
              onClick={() => selectOption(index)}
              onPointerEnter={() => {
                if (!option.disabled) setActiveIndex(index);
              }}
              role="option"
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
      {name ? <input name={name} type="hidden" value={value} /> : null}
    </div>
  );
}
