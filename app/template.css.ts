import { style } from "@vanilla-extract/css";
import { media } from "@/design-system/styles/media";
import { vars } from "@/design-system/styles/theme.css";

export const container = style({
  display: "flex",
  minHeight: `calc(100dvh - ${vars.height.gnb})`,
});

export const main = style({
  flex: 1,
  minWidth: 0,
  "@media": { [media.tablet]: { paddingBottom: vars.space[12] } },
});
