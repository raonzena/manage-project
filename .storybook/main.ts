import type { StorybookConfig } from "@storybook/nextjs-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { fileURLToPath } from "node:url";

const config: StorybookConfig = {
  stories: ["../design-system/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  viteFinal(viteConfig) {
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: {
        "@": fileURLToPath(new URL("../", import.meta.url)),
      },
    };
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(vanillaExtractPlugin());
    return viteConfig;
  },
};

export default config;
