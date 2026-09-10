import { describe, expect, it } from "vitest";
import { issueSchema } from "./schema";

const input = {
  projectId: "a3c7ca14-e4f4-40a0-92ea-29aa23f8a513",
  title: "  새 이슈  ",
  description: "",
  status: "TODO",
  assigneeId: "",
  dueAt: "",
};

describe("issueSchema", () => {
  it.each(["2026-09-10", "2028-02-29"])("accepts a valid date without timezone conversion: %s", (dueAt) => {
    expect(issueSchema.parse({ ...input, dueAt }).dueAt).toBe(dueAt);
  });
  it("trims the title and allows an unassigned issue without a description", () => {
    expect(issueSchema.parse(input)).toEqual({ ...input, title: "새 이슈" });
  });
  it.each([
    { title: "   " },
    { projectId: "invalid" },
    { status: "UNKNOWN" },
    { assigneeId: "invalid" },
    { dueAt: "2026-02-30" },
    { dueAt: "2026-02-29" },
    { dueAt: "2026-13-01" },
    { dueAt: "2026-09-10T00:00:00Z" },
  ])("rejects invalid issue fields: %o", (fields) => {
    expect(issueSchema.safeParse({ ...input, ...fields }).success).toBe(false);
  });
});
