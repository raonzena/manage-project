import { describe, expect, it } from "vitest";
import { issueSchema } from "./schema";

const input = {
  projectId: "a3c7ca14-e4f4-40a0-92ea-29aa23f8a513",
  title: "  새 이슈  ",
  description: "",
  status: "TODO",
  assigneeId: "",
};

describe("issueSchema", () => {
  it("trims the title and allows an unassigned issue without a description", () => {
    expect(issueSchema.parse(input)).toEqual({ ...input, title: "새 이슈" });
  });
  it.each([
    { title: "   " },
    { projectId: "invalid" },
    { status: "UNKNOWN" },
    { assigneeId: "invalid" },
  ])("rejects invalid issue fields: %o", (fields) => {
    expect(issueSchema.safeParse({ ...input, ...fields }).success).toBe(false);
  });
});
