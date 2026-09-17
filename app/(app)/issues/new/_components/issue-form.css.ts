import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@/design-system/styles/theme.css";
import { media } from "@/design-system/styles/media";
import { input } from "@/design-system/ui/input.css";
import * as selectStyles from "@/design-system/ui/select.css";

export const page = style({
  minHeight: "100%",
  background: vars.color.surface,
  padding: `${vars.space[8]} calc(${vars.space[8]} * 2)`,
  "@media": {
    [media.tablet]: {
      minHeight: `calc(100dvh - ${vars.height.gnb})`,
      padding: `${vars.space[6]} ${vars.space[4]} ${vars.space[12]}`,
    },
  },
});
export const header = style({
  display: "grid",
  gap: vars.space[3],
  marginBottom: vars.space[8],
});
globalStyle(`main:has(> .${page})`, { background: vars.color.surface });
export const eyebrow = style({
  margin: 0,
  color: vars.color.brand,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.bold,
});
export const title = style({
  margin: 0,
  fontSize: 34,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: vars.font.letterSpacing.tight,
  "@media": { [media.mobile]: { fontSize: 26 } },
});
export const description = style({
  margin: 0,
  color: vars.color.textSecondary,
  fontSize: vars.font.size.sm,
});
export const form = style({
  width: "100%",
  maxWidth: 712,
  display: "grid",
  gap: vars.space[6],
});
export const fields = style({
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
  display: "grid",
  gap: vars.space[6],
});
export const textarea = style([
  input,
  {
    minHeight: 144,
    padding: vars.space[3],
    resize: "vertical",
    "@media": { [media.mobile]: { minHeight: 100 } },
  },
]);
export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space[2],
  marginTop: vars.space[4],
});
export const error = style({
  color: vars.color.danger,
  fontSize: vars.font.size.sm,
});

globalStyle(`${form} .${selectStyles.label}`, {
  margin: 0,
  fontFamily: vars.font.family,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  letterSpacing: vars.font.letterSpacing.normal,
  color: vars.color.textPrimary,
});
globalStyle(`${form} .${selectStyles.field}`, { gap: vars.space[2] });
globalStyle(`${form} .${selectStyles.control}`, {
  minHeight: 42,
  paddingInline: vars.space[3],
});
