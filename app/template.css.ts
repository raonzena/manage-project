import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system/styles/theme.css";

export const container = style({
  display: "flex",
  minHeight: `calc(100dvh - ${vars.height.gnb})`,
});

export const main = style({
  flex: 1,
  minWidth: 0,
  "@media": { "(max-width: 840px)": { paddingBottom: vars.space[12] } },
});
