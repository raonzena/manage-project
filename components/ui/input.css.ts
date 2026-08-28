import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const field = style({
  display: "grid",
  gap: vars.space[2],
});

export const label = style({
  color: vars.color.textPrimary,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
});

export const input = style({
  width: "100%",
  minHeight: 40,
  padding: `0 ${vars.space[3]}`,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  color: vars.color.textPrimary,
  transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  selectors: {
    "&::placeholder": { color: vars.color.textSecondary },
    "&:hover:not(:disabled)": { borderColor: vars.color.textSecondary },
    "&:focus": {
      borderColor: vars.color.brand,
      boxShadow: `0 0 0 3px ${vars.color.infoSubtle}`,
      outline: 0,
    },
    "&:disabled": { cursor: "not-allowed", background: vars.color.surfaceSubtle },
    "&[aria-invalid='true']": { borderColor: vars.color.danger },
  },
});

export const hint = style({
  color: vars.color.textSecondary,
  fontSize: vars.font.size.xs,
});
