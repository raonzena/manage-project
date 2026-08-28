import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
  padding: vars.space[6],
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: vars.space[4],
  marginBottom: vars.space[4],
});

export const title = style({
  margin: 0,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: vars.font.letterSpacing.tight,
});

export const description = style({
  margin: `${vars.space[1]} 0 0`,
  color: vars.color.textSecondary,
  fontSize: vars.font.size.sm,
});
