import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>프로젝트 설정</CardTitle>
          <CardDescription>프로젝트의 기본 정보와 공개 범위를 관리합니다.</CardDescription>
        </div>
        <Badge tone="success">활성</Badge>
      </CardHeader>
      카드 본문에는 제품별 콘텐츠를 자유롭게 구성할 수 있습니다.
    </Card>
  ),
};
