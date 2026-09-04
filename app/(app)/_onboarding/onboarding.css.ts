import { vars } from "@/design-system/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const form = style({ display: "flex", flexDirection: "column", gap: vars.space[6], width: "100%" });
export const fields = style({ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: vars.space[4] });
export const error = style({ margin: 0, color: vars.color.danger, fontSize: vars.font.size.sm });
