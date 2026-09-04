import { vars } from "@/design-system/styles/theme.css";
import { style } from "@vanilla-extract/css";
export const form = style({ display: "grid", gap: vars.space[6] });
export const fields = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: vars.space[4],
});
export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space[2],
});
export const error = style({
  margin: 0,
  color: vars.color.danger,
  fontSize: vars.font.size.sm,
});
