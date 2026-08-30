import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    canvas: null,
    surface: null,
    surfaceSubtle: null,
    border: null,
    borderPrimary: null,
    textPrimary: null,
    textSecondary: null,
    textInverse: null,
    navigation: null,
    brand: null,
    brandHover: null,
    success: null,
    successSubtle: null,
    warning: null,
    warningSubtle: null,
    danger: null,
    dangerSubtle: null,
    infoSubtle: null,
  },
  font: {
    family: null,
    weight: {
      regular: null,
      medium: null,
      semibold: null,
      bold: null,
    },
    size: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      display: null,
    },
    lineHeight: {
      tight: null,
      normal: null,
      relaxed: null,
    },
    letterSpacing: {
      tight: null,
      normal: null,
    },
  },
  space: {
    1: null,
    2: null,
    3: null,
    4: null,
    6: null,
    8: null,
    10: null,
    12: null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    full: null,
  },
  shadow: {
    sm: null,
    md: null,
  },
  transition: {
    fast: null,
  },
  height: {
    gnb: null,
  },
});

createGlobalTheme(":root", vars, {
  color: {
    canvas: "#f8f9ff",
    surface: "#ffffff",
    surfaceSubtle: "#f9fafb",
    border: "#e5e7eb",
    borderPrimary: "#c5c6cd",
    textPrimary: "#111827",
    textSecondary: "#6b7280",
    textInverse: "#ffffff",
    navigation: "#172033",
    brand: "#3b82f6",
    brandHover: "#2563eb",
    success: "#22c55e",
    successSubtle: "#dcfce7",
    warning: "#f59e0b",
    warningSubtle: "#fef3c7",
    danger: "#ef4444",
    dangerSubtle: "#fee2e2",
    infoSubtle: "#dbeafe",
  },
  font: {
    family:
      "Inter, Pretendard, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    weight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    size: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      display: "2rem",
    },
    lineHeight: {
      tight: "1.2",
      normal: "1.5",
      relaxed: "1.7",
    },
    letterSpacing: {
      tight: "-0.02em",
      normal: "0",
    },
  },
  space: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "999px",
  },
  shadow: {
    sm: "0 1px 2px rgb(17 24 39 / 0.06)",
    md: "0 8px 24px rgb(17 24 39 / 0.08)",
  },
  transition: {
    fast: "160ms ease",
  },
  height: {
    gnb: "64px",
  },
});
