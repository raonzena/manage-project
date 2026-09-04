import { media } from "@/design-system/styles/media";
import { vars } from "@/design-system/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  maxWidth: 1320,
  marginInline: "auto",
  padding: `${vars.space[8]} ${vars.space[8]} ${vars.space[12]}`,
  "@media": {
    [media.desktop]: { paddingInline: vars.space[6] },
    [media.mobile]: {
      padding: `${vars.space[6]} ${vars.space[4]} ${vars.space[10]}`,
    },
  },
});
export const pageHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: vars.space[6],
  marginBottom: vars.space[8],
  "@media": {
    [media.mobile]: {
      alignItems: "flex-start",
      flexDirection: "column",
      marginBottom: vars.space[6],
    },
  },
});
export const pageTitle = style({
  margin: `${vars.space[1]} 0 ${vars.space[2]}`,
  fontFamily: vars.font.familyDisplay,
  fontSize: vars.font.size.display,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: "-0.045em",
  "@media": {
    [media.mobile]: { fontSize: "2rem", letterSpacing: "-0.04em" },
  },
});
export const pageDescription = style({
  margin: 0,
  color: vars.color.textSecondary,
});
export const eyebrow = style({
  margin: 0,
  color: vars.color.brand,
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.04em",
});
export const reportButton = style({
  "@media": { [media.mobile]: { display: "none" } },
});
export const stats = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: vars.space[4],
  marginBottom: vars.space[6],
  "@media": { [media.mobile]: { gap: vars.space[3] } },
});
export const dashboardGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.65fr) minmax(280px, .85fr)",
  gap: vars.space[4],
  "@media": { [media.desktop]: { gridTemplateColumns: "1fr" } },
});
export const issuePanel = style({
  overflow: "hidden",
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.sm,
});
export const focusPanel = style({
  background: vars.color.navigation,
  borderRadius: vars.radius.lg,
  padding: vars.space[6],
  color: vars.color.textInverse,
  boxShadow: vars.shadow.md,
});
export const sectionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space[4],
  padding: vars.space[6],
});
export const sectionTitle = style({
  margin: 0,
  fontFamily: vars.font.familyDisplay,
  fontSize: vars.font.size.lg,
  letterSpacing: "-0.03em",
});
export const inverseTitle = style({ color: vars.color.textInverse });
export const sectionLink = style({
  color: vars.color.brand,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
});
export const kicker = style({
  margin: `0 0 ${vars.space[1]}`,
  color: vars.color.textSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});
export const issueLabels = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 72px 42px 72px",
  gap: vars.space[3],
  padding: `${vars.space[2]} ${vars.space[6]}`,
  borderBlock: `1px solid ${vars.color.border}`,
  background: vars.color.surfaceSubtle,
  color: vars.color.textSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  textTransform: "uppercase",
  "@media": { [media.mobile]: { display: "none" } },
});
export const issueList = style({ margin: 0 });
export const issueRow = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 72px 42px 72px",
  alignItems: "center",
  gap: vars.space[3],
  minHeight: 72,
  padding: `${vars.space[3]} ${vars.space[6]}`,
  borderBottom: `1px solid ${vars.color.border}`,
  selectors: {
    "&:last-child": { borderBottom: 0 },
    "&:hover": { background: vars.color.surfaceSubtle },
  },
  "@media": {
    [media.mobile]: {
      gridTemplateColumns: "1fr auto",
      paddingInline: vars.space[4],
    },
  },
});
export const issueTitle = style({
  display: "flex",
  alignItems: "center",
  minWidth: 0,
  gap: vars.space[3],
});
export const issueKey = style({
  flexShrink: 0,
  color: vars.color.textSecondary,
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
});
export const issueName = style({
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: vars.font.size.sm,
});
export const issueProject = style({
  display: "block",
  marginTop: vars.space[1],
  color: vars.color.textSecondary,
  fontSize: "0.6875rem",
});
export const mobileSecondary = style({
  "@media": { [media.mobile]: { display: "none" } },
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
export const issueDue = style({
  color: vars.color.textSecondary,
  fontSize: "0.6875rem",
  "@media": { [media.mobile]: { display: "none" } },
});
export const progressMeta = style({
  display: "flex",
  justifyContent: "space-between",
  marginTop: vars.space[2],
  color: "#a3a3a3",
  fontSize: vars.font.size.xs,
});
export const progressValue = style({
  color: vars.color.textInverse,
  fontFamily: vars.font.familyMono,
});
export const rail = style({
  overflow: "hidden",
  height: 4,
  margin: `${vars.space[3]} 0 ${vars.space[8]}`,
  borderRadius: vars.radius.full,
  background: "#303030",
});
export const railValue = style({
  display: "block",
  width: "75%",
  height: "100%",
  borderRadius: vars.radius.full,
  background: "#3ecf8e",
});
export const activity = style({ margin: 0, borderTop: "1px solid #303030" });
export const activityItem = style({
  display: "grid",
  gridTemplateColumns: "44px 1fr",
  gap: vars.space[3],
  paddingBlock: vars.space[4],
  borderBottom: "1px solid #303030",
});
export const activityText = style({
  margin: 0,
  color: "#d4d4d4",
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.relaxed,
});
export const activityAuthor = style({ color: vars.color.textInverse });
export const activityIssue = style({
  color: "#3ecf8e",
  fontFamily: vars.font.familyMono,
});
export const activityTime = style({
  color: "#8a8a8a",
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
});
export const workspaceNote = style({
  marginTop: vars.space[4],
  color: vars.color.textSecondary,
  fontSize: vars.font.size.xs,
});
export const onboardingContainer = style({
  boxSizing: "border-box",
  display: "flex",
  minHeight: `calc(100dvh - ${vars.height.gnb})`,
  flexDirection: "column",
  justifyContent: "center",
  gap: vars.space[4],
  width: "100%",
  maxWidth: 624,
  marginInline: "auto",
  padding: vars.space[8],
  "@media": { [media.mobile]: { padding: vars.space[4] } },
});
export const onboardingTitle = style({
  margin: 0,
  fontFamily: vars.font.familyDisplay,
  fontSize: vars.font.size.display,
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: "-0.045em",
});
export const onboardingDescription = style({
  margin: `0 0 ${vars.space[4]}`,
  color: vars.color.textSecondary,
  lineHeight: vars.font.lineHeight.relaxed,
});
export const emptyState = style({
  padding: `${vars.space[10]} ${vars.space[6]}`,
  color: vars.color.textSecondary,
  textAlign: "center",
});
export const emptyDescription = style({
  margin: `${vars.space[2]} 0 0`,
  fontSize: vars.font.size.sm,
});
export const activityEmpty = style({
  margin: 0,
  paddingBlock: vars.space[6],
  borderTop: "1px solid #303030",
  color: "#a3a3a3",
  fontSize: vars.font.size.sm,
});
