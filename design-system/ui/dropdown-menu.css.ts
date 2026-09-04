import { vars } from "@/design-system/styles/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const root = style({
  position: "relative",
});

export const trigger = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: 0,
  background: "transparent",
  cursor: "pointer",
});

export const menu = style({
  position: "absolute",
  top: `calc(100% + ${vars.space[2]})`,
  zIndex: 30,
  minWidth: 200,
  overflow: "hidden",
  padding: vars.space[1],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  boxShadow: vars.shadow.md,
});

export const align = styleVariants({
  start: { left: 0 },
  end: { right: 0 },
});

export const item = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: 36,
  paddingInline: vars.space[3],
  border: 0,
  borderRadius: vars.radius.sm,
  background: "transparent",
  color: vars.color.textPrimary,
  cursor: "pointer",
  fontSize: vars.font.size.sm,
  textAlign: "left",
  selectors: {
    "&:hover": { background: vars.color.surfaceSubtle },
    "&:disabled": { cursor: "not-allowed", opacity: 0.5 },
  },
});
