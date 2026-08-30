import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { calc } from "@vanilla-extract/css-utils";

export const navigation = style({
  display: "flex",
  position: "sticky",
  top: `${vars.height.gnb}`,
  flexDirection: "column",
  height: calc.subtract("100vh", `${vars.height.gnb}`),
  width: "320px",
  backgroundColor: "#1E293B",
  color: `${vars.color.textInverse}`,
});
