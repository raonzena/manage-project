import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./button";

const meta = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "새 작업 만들기",
    onClick: fn(),
  },
  argTypes: {
    tone: { control: "select", options: ["primary", "secondary", "danger", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { tone: "secondary" } };
export const Danger: Story = { args: { tone: "danger", children: "작업 삭제" } };
export const Ghost: Story = { args: { tone: "ghost" } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Disabled: Story = { args: { disabled: true } };
