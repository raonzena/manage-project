import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "진행 중", tone: "neutral" },
  argTypes: {
    tone: { control: "select", options: ["neutral", "info", "success", "warning", "danger"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Info: Story = { args: { tone: "info", children: "정보" } };
export const Success: Story = { args: { tone: "success", children: "완료" } };
export const Warning: Story = { args: { tone: "warning", children: "주의" } };
export const Danger: Story = { args: { tone: "danger", children: "차단됨" } };
