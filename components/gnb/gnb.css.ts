import { media } from "@/design-system/styles/media";
import { vars } from "@/design-system/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const gnb = style({
  display: "flex",
  position: "sticky",
  top: 0,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: `${vars.height.gnb}`,
  zIndex: 10,
  borderBottom: `1px solid ${vars.color.border}`,
  paddingInline: vars.space[4],
  backgroundColor: vars.color.surface,
});

export const brand = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space[2],
  fontFamily: vars.font.familyDisplay,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "-0.04em",
});
export const brandMark = style({
  display: "grid",
  placeItems: "center",
  width: 28,
  height: 28,
  background: vars.color.brand,
  borderRadius: vars.radius.sm,
  color: vars.color.textInverse,
  fontFamily: vars.font.familyMono,
  fontSize: vars.font.size.sm,
});
export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[2],
});
export const search = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space[6],
  width: 192,
  height: 36,
  paddingInline: vars.space[3],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceSubtle,
  color: vars.color.textSecondary,
  cursor: "pointer",
  fontSize: vars.font.size.xs,
  selectors: { "&:hover": { borderColor: vars.color.borderPrimary } },
  "@media": { [media.mobile]: { width: 36, justifyContent: "center" } },
});
export const searchLabel = style({
  "@media": { [media.mobile]: { display: "none" } },
});
export const create = style({
  height: 36,
  paddingInline: vars.space[3],
  border: 0,
  borderRadius: vars.radius.md,
  background: vars.color.brand,
  color: vars.color.textInverse,
  cursor: "pointer",
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  selectors: { "&:hover": { background: vars.color.brandHover } },
});
export const avatar = style({
  display: "grid",
  placeItems: "center",
  width: 32,
  height: 32,
  borderRadius: vars.radius.full,
  background: vars.color.navigation,
  color: vars.color.textInverse,
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
  fontWeight: vars.font.weight.bold,
  selectors: {
    "&:hover": { background: vars.color.navigationSurface },
    "&[aria-expanded='true']": {
      boxShadow: `0 0 0 3px ${vars.color.infoSubtle}`,
    },
  },
});

export const account = style({
  display: "grid",
  gap: vars.space[1],
  padding: `${vars.space[2]} ${vars.space[3]} ${vars.space[3]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  marginBottom: vars.space[1],
});

export const accountLabel = style({
  color: vars.color.textSecondary,
  fontSize: vars.font.size.xs,
});

export const accountName = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: vars.font.size.sm,
});
