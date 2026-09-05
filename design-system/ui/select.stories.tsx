import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Select, type SelectOption } from "./select";

const options: SelectOption[] = [
  { label: "할 일", value: "todo" },
  { label: "진행 중", value: "progress" },
  { label: "완료", value: "done" },
  { label: "사용할 수 없음", value: "disabled", disabled: true },
];

function SelectExample({ disabled = false, tone = "default" }: { disabled?: boolean; tone?: "default" | "inverse" }) {
  const [value, setValue] = useState("todo");
  return (
    <div style={{ width: 280, padding: tone === "inverse" ? 24 : 0, background: tone === "inverse" ? "#171717" : undefined }}>
      <Select disabled={disabled} label="상태" onValueChange={setValue} options={options} tone={tone} value={value} />
    </div>
  );
}

const meta = {
  title: "Design System/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "상태",
    onValueChange: fn(),
    options,
    value: "todo",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <SelectExample /> };
export const Inverse: Story = { render: () => <SelectExample tone="inverse" /> };
export const Disabled: Story = { render: () => <SelectExample disabled /> };
