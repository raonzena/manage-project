import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html", {
  background: vars.color.canvas,
  minWidth: "320px",
});

globalStyle("body", {
  margin: 0,
  background: vars.color.canvas,
  color: vars.color.textPrimary,
  fontFamily: vars.font.family,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.normal,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("h1, h2, h3, p, ul", { marginTop: 0 });

globalStyle("ul", { padding: 0, listStyle: "none" });

globalStyle("button, input, textarea, select", {
  font: "inherit",
});

globalStyle("button, a", {
  WebkitTapHighlightColor: "transparent",
});

globalStyle("button", { color: "inherit" });

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle(":focus-visible", {
  outline: `2px solid ${vars.color.brand}`,
  outlineOffset: "2px",
});

globalStyle("::selection", {
  background: vars.color.infoSubtle,
});
