// url=https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-10
// source=https://github.com/raonzena/manage-project/blob/main/design-system/ui/button.tsx
// component=Button
import figma from "figma";
import type { ComponentProps } from "react";
import type { Button } from "../ui/button";

const instance = figma.selectedInstance;
const tones = {
  Primary: "primary",
  Secondary: "secondary",
} satisfies Record<string, NonNullable<ComponentProps<typeof Button>["tone"]>>;
const sizes = {
  Small: "sm",
  Medium: "md",
} satisfies Record<string, NonNullable<ComponentProps<typeof Button>["size"]>>;

const tone = instance.getEnum("Tone", tones);
const size = instance.getEnum("Size", sizes);
const label = JSON.stringify(instance.getString("Label"));

export default {
  example: figma.code`<Button tone="${tone}" size="${size}">{${label}}</Button>`,
  imports: ['import { Button } from "@/design-system/ui";'],
  id: "button",
  metadata: { nestable: true },
};
