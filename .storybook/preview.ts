import type { Preview } from "@storybook/nextjs-vite";
import "@/design-system/styles/theme.css";
import "@/design-system/styles/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
