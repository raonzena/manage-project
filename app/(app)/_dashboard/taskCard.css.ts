import { media } from "@/design-system/styles/media";
import { vars } from "@/design-system/styles/theme.css";
import { createTheme, createThemeContract, style } from "@vanilla-extract/css";

const taskCardVars = createThemeContract({ accentColor: null });

export const taskCardTheme = {
  active: createTheme(taskCardVars, { accentColor: vars.color.success }),
  dueSoon: createTheme(taskCardVars, { accentColor: vars.color.danger }),
  completed: createTheme(taskCardVars, { accentColor: vars.color.success }),
};

export const taskCard = style({
  position: "relative",
  overflow: "hidden",
  minHeight: 128,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderLeft: `4px solid ${taskCardVars.accentColor}`,
  borderRadius: vars.radius.md,
  padding: vars.space[4],
  boxShadow: vars.shadow.sm,
  transition: `border-color ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  selectors: {
    "&:hover": {
      borderColor: vars.color.borderPrimary,
      boxShadow: vars.shadow.md,
    },
  },
  "@media": {
    [media.mobile]: { minHeight: 100, padding: vars.space[3] },
  },
});
export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const title = style({
  margin: 0,
  overflow: "hidden",
  color: vars.color.textSecondary,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
export const statusDot = style({
  width: 8,
  height: 8,
  flexShrink: 0,
  borderRadius: vars.radius.full,
  background: taskCardVars.accentColor,
  boxShadow: `0 0 0 4px color-mix(in srgb, ${taskCardVars.accentColor} 12%, transparent)`,
  "@media": { [media.mobile]: { display: "none" } },
});
export const count = style({
  display: "block",
  marginTop: vars.space[3],
  fontFamily: vars.font.familyDisplay,
  fontSize: "2.25rem",
  lineHeight: 1,
  letterSpacing: "-0.05em",
  "@media": {
    [media.mobile]: { marginTop: vars.space[2], fontSize: "2rem" },
  },
});
export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[2],
  marginTop: vars.space[3],
  color: vars.color.textSecondary,
  fontSize: "0.6875rem",
  "@media": { [media.mobile]: { marginTop: vars.space[2] } },
});
export const trend = style({
  color: taskCardVars.accentColor,
  fontFamily: vars.font.familyMono,
  fontWeight: vars.font.weight.bold,
});
export const note = style({
  margin: 0,
  "@media": { [media.mobile]: { display: "none" } },
});
