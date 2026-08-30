import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const navigation = style({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "320px",
  backgroundColor: "#1E293B",
  color: `${vars.color.textInverse}`,
});
