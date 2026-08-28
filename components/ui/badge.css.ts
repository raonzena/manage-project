import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  minHeight: 24,
  padding: `0 ${vars.space[2]}`,
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
});

export const tone = styleVariants({
  neutral: { background: vars.color.surfaceSubtle, color: vars.color.textSecondary },
  info: { background: vars.color.infoSubtle, color: vars.color.brandHover },
  success: { background: vars.color.successSubtle, color: "#15803d" },
  warning: { background: vars.color.warningSubtle, color: "#b45309" },
  danger: { background: vars.color.dangerSubtle, color: "#b91c1c" },
});
