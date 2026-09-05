import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./button";
import { Dialog } from "./dialog";

function DialogExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      <Dialog description="새 프로젝트의 이름을 정하고 팀과 공유하세요." onClose={() => setOpen(false)} open={open} title="프로젝트 만들기">
        <Button onClick={() => setOpen(false)}>확인</Button>
      </Dialog>
    </>
  );
}

const meta = {
  title: "Design System/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    children: null,
    onClose: fn(),
    open: false,
    title: "프로젝트 만들기",
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <DialogExample /> };
