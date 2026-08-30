import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const gnb = style({
  display: "flex",
  position: "sticky",
  top: 0,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: `${vars.height.gnb}`,
  borderBottom: `1px solid ${vars.color.borderPrimary}`,
  paddingInline: "24px",
  backgroundColor: `${vars.color.canvas}`,
});
