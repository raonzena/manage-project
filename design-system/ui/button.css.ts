import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/design-system/styles/theme.css";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space[2],
  border: "1px solid transparent",
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  transition: `background-color ${vars.transition.fast}, border-color ${vars.transition.fast}, color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
});

export const tone = styleVariants({
  primary: {
    background: vars.color.brand,
    color: vars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": { background: vars.color.brandHover },
    },
  },
  secondary: {
    background: vars.color.surface,
    borderColor: vars.color.border,
    color: vars.color.textPrimary,
    boxShadow: vars.shadow.sm,
    selectors: {
      "&:hover:not(:disabled)": { background: vars.color.surfaceSubtle },
    },
  },
  danger: {
    background: vars.color.danger,
    color: vars.color.textInverse,
    selectors: { "&:hover:not(:disabled)": { background: "#dc2626" } },
  },
  ghost: {
    background: "transparent",
    color: vars.color.textSecondary,
    selectors: {
      "&:hover:not(:disabled)": {
        background: vars.color.surfaceSubtle,
        color: vars.color.textPrimary,
      },
    },
  },
});

export const size = styleVariants({
  sm: {
    minHeight: 32,
    padding: `0 ${vars.space[3]}`,
    fontSize: vars.font.size.xs,
  },
  md: {
    minHeight: 40,
    padding: `0 ${vars.space[4]}`,
    fontSize: vars.font.size.sm,
  },
  lg: {
    minHeight: 48,
    padding: `0 ${vars.space[6]}`,
    fontSize: vars.font.size.md,
  },
});
