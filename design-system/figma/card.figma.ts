// url=https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-27
// source=https://github.com/raonzena/manage-project/blob/main/design-system/ui/card.tsx
// component=Card
import figma from "figma";

const content = figma.selectedInstance.getSlot("Content");

export default {
  example: figma.code`<Card>${content}</Card>`,
  imports: ['import { Card } from "@/design-system/ui";'],
  id: "card",
  metadata: { nestable: true },
};
