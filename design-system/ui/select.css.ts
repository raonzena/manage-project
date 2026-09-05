import { vars } from "@/design-system/styles/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const field = style({
  position: "relative",
  display: "grid",
  gap: vars.space[1],
});
export const label = style({
  marginInline: vars.space[2],
  fontFamily: vars.font.familyMono,
  fontSize: "0.625rem",
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});
export const labelTone = styleVariants({
  default: { color: vars.color.textSecondary },
  inverse: { color: vars.color.navigationTextSecondary },
});
export const control = style({
  appearance: "none",
  display: "grid",
  alignItems: "center",
  gap: vars.space[2],
  width: "100%",
  minHeight: 54,
  paddingInline: vars.space[2],
  border: "1px solid transparent",
  borderRadius: vars.radius.md,
  cursor: "pointer",
  textAlign: "left",
  transition: `border-color ${vars.transition.fast}, background ${vars.transition.fast}, box-shadow ${vars.transition.fast}`,
  selectors: { "&:disabled": { cursor: "not-allowed", opacity: 0.5 } },
});
export const controlLayout = styleVariants({
  plain: { gridTemplateColumns: "minmax(0, 1fr) 16px" },
  withLeading: { gridTemplateColumns: "32px minmax(0, 1fr) 16px" },
});
export const controlTone = styleVariants({
  default: {
    borderColor: vars.color.border,
    background: vars.color.surface,
    color: vars.color.textPrimary,
    selectors: {
      "&:hover:not(:disabled)": { borderColor: vars.color.borderPrimary },
      "&:focus-visible": {
        borderColor: vars.color.brand,
        boxShadow: `0 0 0 3px ${vars.color.infoSubtle}`,
        outline: 0,
      },
    },
  },
  inverse: {
    borderColor: vars.color.navigationBorder,
    background: vars.color.navigationSurface,
    color: vars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        borderColor: vars.color.navigationTextSecondary,
        background: vars.color.navigationBorder,
      },
      "&:focus-visible": {
        borderColor: vars.color.brand,
        boxShadow: `0 0 0 2px color-mix(in srgb, ${vars.color.brand} 20%, transparent)`,
        outline: 0,
      },
    },
  },
});
export const leading = style({
  display: "grid",
  placeItems: "center",
  pointerEvents: "none",
});
export const value = style({
  minWidth: 0,
  overflow: "hidden",
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.bold,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
export const chevron = style({
  width: 16,
  height: 16,
  color: vars.color.navigationTextSecondary,
  pointerEvents: "none",
  transition: `transform ${vars.transition.fast}`,
});
export const chevronOpen = style({ transform: "rotate(180deg)" });
export const listbox = style({
  position: "absolute",
  top: `calc(100% + ${vars.space[1]})`,
  right: 0,
  left: 0,
  zIndex: 20,
  maxHeight: 240,
  overflowY: "auto",
  margin: 0,
  padding: vars.space[1],
  border: "1px solid transparent",
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.md,
});
export const listboxTone = styleVariants({
  default: {
    borderColor: vars.color.border,
    background: vars.color.surface,
    color: vars.color.textPrimary,
  },
  inverse: {
    borderColor: vars.color.navigationBorder,
    background: vars.color.navigationSurface,
    color: vars.color.textInverse,
  },
});
export const option = style({
  minWidth: 0,
  overflow: "hidden",
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  selectors: {
    "&[aria-disabled='true']": { cursor: "not-allowed", opacity: 0.5 },
  },
});
export const optionActive = styleVariants({
  default: { background: vars.color.surfaceSubtle },
  inverse: {
    background: vars.color.navigationBorder,
    color: vars.color.navigationAccent,
  },
});
export const optionAction = styleVariants({
  default: {
    marginTop: vars.space[1],
    borderTop: `1px solid ${vars.color.border}`,
    borderRadius: 0,
    color: vars.color.brand,
  },
  inverse: {
    marginTop: vars.space[1],
    borderTop: `1px solid ${vars.color.navigationBorder}`,
    borderRadius: 0,
    color: vars.color.navigationAccent,
  },
});
