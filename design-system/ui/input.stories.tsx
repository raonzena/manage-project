import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta = {
  title: "Design System/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "프로젝트 이름",
    placeholder: "예: 웹사이트 리뉴얼",
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "팀원이 알아보기 쉬운 이름을 입력하세요." } };
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "", hint: "프로젝트 이름은 필수입니다." },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "보관된 프로젝트" } };
