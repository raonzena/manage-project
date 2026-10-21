// url=https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-21
// source=https://github.com/raonzena/manage-project/blob/main/design-system/ui/badge.tsx
// component=Badge
import figma from "figma";
import type { ComponentProps } from "react";
import type { Badge } from "../ui/badge";

const instance = figma.selectedInstance;
const tones = {
  Neutral: "neutral",
  Info: "info",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
} satisfies Record<string, NonNullable<ComponentProps<typeof Badge>["tone"]>>;

const tone = instance.getEnum("Tone", tones);
const label = JSON.stringify(instance.getString("Label"));

export default {
  example: figma.code`<Badge tone="${tone}">{${label}}</Badge>`,
  imports: ['import { Badge } from "@/design-system/ui";'],
  id: "badge",
  metadata: { nestable: true },
};
