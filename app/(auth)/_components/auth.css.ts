import { media } from "@/design-system/styles/media";
import { vars } from "@/design-system/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const page = style({
  display: "grid",
  gridTemplateColumns: "minmax(360px, .92fr) minmax(520px, 1.08fr)",
  minHeight: "100dvh",
  background: vars.color.surface,
  "@media": { [media.tablet]: { gridTemplateColumns: "1fr" } },
});

export const story = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  padding: vars.space[8],
  overflow: "hidden",
  background: vars.color.navigation,
  color: vars.color.textInverse,
  "@media": { [media.tablet]: { display: "none" } },
});

export const brand = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space[2],
  width: "fit-content",
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "-0.03em",
});
export const brandMark = style({
  display: "grid",
  placeItems: "center",
  width: 28,
  height: 28,
  borderRadius: vars.radius.sm,
  background: vars.color.brand,
  color: vars.color.textInverse,
  fontFamily: vars.font.familyMono,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.bold,
});
export const storyContent = style({ margin: "auto", maxWidth: 540 });
export const storyKicker = style({
  marginBottom: vars.space[4],
  color: "#64d9a1",
  fontFamily: vars.font.familyMono,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});
export const storyTitle = style({
  marginBottom: vars.space[6],
  fontSize: "clamp(3rem, 5vw, 5.5rem)",
  lineHeight: 0.98,
  letterSpacing: "-0.065em",
});
export const storyDescription = style({
  marginBottom: vars.space[10],
  color: "#b6b6b2",
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.relaxed,
});
export const storyNote = style({
  margin: 0,
  color: "#72726f",
  fontFamily: vars.font.familyMono,
  fontSize: "0.6875rem",
});

export const formSide = style({
  display: "grid",
  placeItems: "center",
  padding: vars.space[8],
  background: vars.color.surface,
  "@media": {
    [media.mobile]: {
      display: "block",
      padding: `${vars.space[6]} ${vars.space[4]}`,
    },
  },
});
export const mobileBrand = style({
  display: "none",
  alignItems: "center",
  gap: vars.space[2],
  marginBottom: vars.space[12],
  fontWeight: vars.font.weight.bold,
  "@media": { [media.tablet]: { display: "flex" } },
});
export const formCard = style({ width: "100%", maxWidth: 420 });
export const formHeader = style({ marginBottom: vars.space[8] });
export const eyebrow = style({
  marginBottom: vars.space[3],
  color: vars.color.brand,
  fontFamily: vars.font.familyMono,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});
export const title = style({
  marginBottom: vars.space[3],
  fontSize: "2.25rem",
  lineHeight: vars.font.lineHeight.tight,
  letterSpacing: "-0.05em",
  "@media": { [media.mobile]: { fontSize: "2rem" } },
});
export const description = style({
  margin: 0,
  color: vars.color.textSecondary,
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.relaxed,
});
export const form = style({ display: "grid", gap: vars.space[4] });
export const error = style({
  margin: 0,
  padding: vars.space[3],
  borderRadius: vars.radius.md,
  background: vars.color.dangerSubtle,
  color: vars.color.danger,
  fontSize: vars.font.size.xs,
});
export const submit = style({ width: "100%", marginTop: vars.space[2] });
export const switchText = style({
  margin: `${vars.space[2]} 0 0`,
  color: vars.color.textSecondary,
  textAlign: "center",
  fontSize: vars.font.size.sm,
});
export const switchLink = style({
  color: vars.color.brand,
  fontWeight: vars.font.weight.semibold,
  selectors: { "&:hover": { textDecoration: "underline" } },
});
