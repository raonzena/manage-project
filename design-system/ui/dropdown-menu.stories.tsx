import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuItem } from "./dropdown-menu";

const meta = {
  title: "Design System/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: "프로젝트 메뉴",
    trigger: <Button tone="secondary">프로젝트 메뉴</Button>,
    children: (
      <>
        <DropdownMenuItem>이름 변경</DropdownMenuItem>
        <DropdownMenuItem>보관하기</DropdownMenuItem>
        <DropdownMenuItem disabled>삭제</DropdownMenuItem>
      </>
    ),
  },
};

export const AlignEnd: Story = {
  args: { ...Default.args, align: "end" },
};
