import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const navigation = style({
  display: "flex",
  position: "sticky",
  top: `${vars.height.gnb}`,
  flexDirection: "column",
  flexShrink: 0,
  height: `calc(100dvh - ${vars.height.gnb})`,
  width: vars.width.navigation,
  padding: vars.space[3],
  borderRight: `1px solid #292929`,
  backgroundColor: vars.color.navigation,
  color: vars.color.textInverse,
  "@media": { "(max-width: 840px)": { display: "none" } },
});

export const workspace = style({
  display: "grid",
  gridTemplateColumns: "32px 1fr auto",
  alignItems: "center",
  gap: vars.space[2],
  padding: vars.space[2],
  marginBottom: vars.space[4],
  border: "1px solid #353535",
  borderRadius: vars.radius.md,
  background: "#202020",
  fontSize: vars.font.size.xs,
});
export const workspaceMeta = style({
  display: "block",
  marginTop: vars.space[1],
  color: vars.color.textSecondary,
  fontSize: "0.6875rem",
});
export const workspaceMark = style({
  display: "grid",
  placeItems: "center",
  width: 32,
  height: 32,
  borderRadius: vars.radius.sm,
  background: vars.color.brand,
  color: vars.color.textInverse,
  fontFamily: vars.font.familyMono,
  fontWeight: vars.font.weight.bold,
});
export const label = style({
  margin: `${vars.space[3]} ${vars.space[2]} ${vars.space[1]}`,
  color: vars.color.textSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});
export const menu = style({ marginBottom: vars.space[4] });
export const menuLink = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: 36,
  paddingInline: vars.space[2],
  borderRadius: vars.radius.sm,
  color: vars.color.textSecondary,
  fontSize: vars.font.size.sm,
  selectors: {
    "&:hover": {
      background: "#202020",
      color: vars.color.textInverse,
    },
  },
});
export const menuCount = style({
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
});
export const active = style({
  background: "#242424 !important",
  color: "#3ecf8e !important",
  fontWeight: vars.font.weight.semibold,
});
export const projects = style({});
export const projectLink = style({
  display: "grid",
  gridTemplateColumns: "8px 1fr auto",
  alignItems: "center",
  gap: vars.space[2],
  minHeight: 36,
  paddingInline: vars.space[2],
  color: vars.color.textSecondary,
  fontSize: vars.font.size.sm,
  selectors: { "&:hover": { color: vars.color.textInverse } },
});
export const projectIndicator = style({
  width: 8,
  height: 8,
  borderRadius: vars.radius.sm,
});
export const projectCount = style({
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
});
export const blue = style({ background: vars.color.brand });
export const green = style({ background: vars.color.success });
export const orange = style({ background: vars.color.warning });
export const footer = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "auto",
  padding: vars.space[2],
  borderTop: "1px solid #292929",
  color: vars.color.textSecondary,
  fontSize: vars.font.size.xs,
});

export const mobileNavigation = style({
  display: "none",
  "@media": {
    "(max-width: 840px)": {
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
