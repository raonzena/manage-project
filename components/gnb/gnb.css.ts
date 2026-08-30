import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const gnb = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  borderBottom: `1px solid ${vars.color.borderPrimary}`,
  paddingInline: "24px",
});
