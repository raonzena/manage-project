import { style } from "@vanilla-extract/css";
import { media } from "@/design-system/styles/media";
import { vars } from "@/design-system/styles/theme.css";

export const container = style({
  width: "100%",
  maxWidth: 1120,
  marginInline: "auto",
  padding: `${vars.space[8]} ${vars.space[8]} ${vars.space[12]}`,
  "@media": {
    [media.desktop]: { paddingInline: vars.space[6] },
    [media.mobile]: {
      padding: `${vars.space[6]} ${vars.space[4]} ${vars.space[12]}`,
    },
  },
});

export const pageHeader = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: vars.space[6],
  marginBottom: vars.space[8],
});

export const context = style({
  margin: 0,
  color: vars.color.brand,
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
  fontWeight: vars.font.weight.bold,
});

export const pageTitle = style({
  margin: `${vars.space[1]} 0 ${vars.space[2]}`,
  fontFamily: vars.font.familyDisplay,
  fontSize: vars.font.size.display,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: "-0.045em",
  "@media": { [media.mobile]: { fontSize: "2rem" } },
});

export const pageDescription = style({
  margin: 0,
  color: vars.color.textSecondary,
});

export const issueTotal = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space[2],
  color: vars.color.textSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  "@media": { [media.mobile]: { display: "none" } },
});
export const issueTotalCount = style({
  color: vars.color.textPrimary,
  fontFamily: vars.font.familyDisplay,
  fontSize: vars.font.size.xl,
  letterSpacing: vars.font.letterSpacing.tight,
});

export const panel = style({
  overflow: "hidden",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  boxShadow: vars.shadow.sm,
});

export const columnLabels = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 88px 48px 80px",
  gap: vars.space[4],
  padding: `${vars.space[2]} ${vars.space[6]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.surfaceSubtle,
  color: vars.color.textSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  "@media": { [media.mobile]: { display: "none" } },
});

export const issueList = style({ margin: 0 });

export const issueRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 88px 48px 80px",
  alignItems: "center",
  gap: vars.space[4],
  minHeight: 76,
  padding: `${vars.space[3]} ${vars.space[6]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  transition: `background ${vars.transition.fast}`,
  selectors: {
    "&:last-child": { borderBottom: 0 },
    "&:hover": { background: vars.color.surfaceSubtle },
  },
  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "minmax(0, 1fr) auto",
      gap: vars.space[3],
      paddingInline: vars.space[4],
    },
  },
});

export const issueIdentity = style({
  display: "grid",
  minWidth: 0,
  gap: vars.space[1],
});

export const issueKey = style({
  color: vars.color.brand,
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
});

export const issueTitle = style({
  overflow: "hidden",
  fontSize: vars.font.size.sm,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const status = style({
  justifySelf: "start",
  "@media": { [media.mobile]: { justifySelf: "end" } },
});

export const owner = style({
  display: "grid",
  placeItems: "center",
  width: 28,
  height: 28,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.full,
  background: vars.color.canvas,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  fontWeight: vars.font.weight.bold,
  "@media": { [media.mobile]: { display: "none" } },
});

export const due = style({
  color: vars.color.textSecondary,
  fontSize: "0.6875rem",
  "@media": { [media.mobile]: { display: "none" } },
});

export const emptyState = style({
  display: "grid",
  placeItems: "center",
  minHeight: 260,
  padding: vars.space[8],
  textAlign: "center",
});
export const emptyDescription = style({
  margin: `${vars.space[2]} 0 0`,
  color: vars.color.textSecondary,
  fontSize: vars.font.size.sm,
});
