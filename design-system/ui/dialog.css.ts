import { vars } from "@/design-system/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const dialog = style({
  width: "min(560px, calc(100vw - 32px))",
  maxHeight: "calc(100dvh - 32px)",
  overflowY: "auto",
  padding: vars.space[6],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  color: vars.color.textPrimary,
  boxShadow: vars.shadow.md,
  selectors: {
    "&::backdrop": { background: "rgb(23 23 23 / 0.56)" },
  },
});
export const header = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.space[4],
  marginBottom: vars.space[6],
});
export const title = style({
  margin: 0,
  fontFamily: vars.font.familyDisplay,
  fontSize: vars.font.size.xl,
});
export const description = style({
  margin: `${vars.space[2]} 0 0`,
  color: vars.color.textSecondary,
  fontSize: vars.font.size.sm,
});
export const close = style({
  width: 32,
  height: 32,
  padding: 0,
  border: 0,
  borderRadius: vars.radius.sm,
  background: "transparent",
  cursor: "pointer",
  fontSize: vars.font.size.lg,
  selectors: { "&:hover": { background: vars.color.surfaceSubtle } },
});
