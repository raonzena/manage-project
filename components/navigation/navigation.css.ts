import { style } from "@vanilla-extract/css";
import { media } from "@/design-system/styles/media";
import { vars } from "@/design-system/styles/theme.css";

export const navigation = style({
  display: "flex",
  position: "sticky",
  top: `${vars.height.gnb}`,
  flexDirection: "column",
  flexShrink: 0,
  height: `calc(100dvh - ${vars.height.gnb})`,
  width: vars.width.navigation,
  padding: vars.space[3],
  borderRight: `1px solid ${vars.color.navigationBorder}`,
  backgroundColor: vars.color.navigation,
  color: vars.color.textInverse,
  "@media": { [media.tablet]: { display: "none" } },
});
export const navigationLoading = style({
  padding: vars.space[2],
  color: vars.color.navigationTextSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
});

export const hierarchy = style({
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  gap: vars.space[6],
});
export const workspaceMark = style({
  display: "grid",
  placeItems: "center",
  width: "100%",
  aspectRatio: "1",
  borderRadius: vars.radius.sm,
  background: vars.color.brand,
  color: vars.color.textInverse,
  fontFamily: vars.font.familyMono,
  fontWeight: vars.font.weight.bold,
});
export const projectMark = style({
  width: 8,
  height: 8,
  borderRadius: vars.radius.sm,
  background: vars.color.success,
});
export const issueSection = style({
  minHeight: 0,
});
export const issueHeading = style({
  margin: `0 ${vars.space[2]} ${vars.space[2]}`,
  color: vars.color.navigationTextSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});
export const issueMenuList = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});
export const issueMenuLink = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 38,
  paddingInline: vars.space[2],
  borderRadius: vars.radius.sm,
  color: vars.color.textSecondary,
  fontSize: vars.font.size.sm,
  transition: `color ${vars.transition.fast}, background ${vars.transition.fast}`,
  selectors: {
    "&:hover": {
      background: vars.color.navigationSurface,
      color: vars.color.textInverse,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.brand}`,
      outlineOffset: 1,
    },
  },
});
export const issueMenuCount = style({
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
});
export const issueMenuActive = style({
  background: vars.color.navigationBorder,
  color: vars.color.navigationAccent,
  fontWeight: vars.font.weight.semibold,
});
export const mobileNavigation = style({
  display: "none",
  "@media": {
    [media.tablet]: {
      display: "grid",
      position: "fixed",
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 20,
      gridTemplateColumns: "repeat(4, 1fr)",
      height: 64,
      borderTop: `1px solid ${vars.color.border}`,
      background: vars.color.surface,
    },
  },
});

export const mobileNavigationLink = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space[1],
  color: vars.color.textSecondary,
});
export const mobileNavigationIcon = style({
  fontSize: vars.font.size.md,
  lineHeight: 1,
});
export const mobileNavigationLabel = style({
  fontSize: "0.625rem",
  lineHeight: 1,
});
export const mobileActive = style({
  color: `${vars.color.brand} !important`,
  fontWeight: vars.font.weight.semibold,
});
