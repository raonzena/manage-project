// url=https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-22
// source=https://github.com/raonzena/manage-project/blob/main/design-system/ui/input.tsx
// component=Input
import figma from "figma";
import type { ComponentProps } from "react";
import type { Input } from "../ui/input";

const instance = figma.selectedInstance;
const props = {
  label: instance.getString("Label"),
  placeholder: instance.getString("Placeholder"),
  hint: instance.getString("Hint"),
} satisfies Pick<ComponentProps<typeof Input>, "label" | "placeholder" | "hint">;

export default {
  example: figma.code`<Input label={${JSON.stringify(props.label)}} placeholder={${JSON.stringify(props.placeholder)}} hint={${JSON.stringify(props.hint)}} />`,
  imports: ['import { Input } from "@/design-system/ui";'],
  id: "input",
  metadata: { nestable: true },
};
