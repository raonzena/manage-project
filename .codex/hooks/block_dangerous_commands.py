#!/usr/bin/env python3

import json
import re
import sys


def deny(reason: str) -> None:
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": reason,
                }
            }
        )
    )


def main() -> None:
    payload = json.load(sys.stdin)
    tool_input = payload.get("tool_input") or {}
    command = tool_input.get("command") or tool_input.get("cmd") or ""

    blocked_patterns = (
        (r"(?:^|[;&|]\s*)git\s+reset\s+[^;&|]*--hard(?:\s|$)", "git reset --hard is blocked by repository policy."),
        (r"(?:^|[;&|]\s*)git\s+clean\s+[^;&|]*-(?:[a-zA-Z]*f[a-zA-Z]*)(?:\s|$)", "Forced git clean is blocked by repository policy."),
        (r"(?:^|[;&|]\s*)git\s+push\b[^;&|]*(?:--force(?:-with-lease)?|-f)(?:\s|$)", "Force push is blocked by repository policy."),
        (r"(?:^|[;&|]\s*)rm\s+[^;&|]*-(?=[a-zA-Z]*r)(?=[a-zA-Z]*f)[a-zA-Z]+(?:\s|$)", "Recursive forced deletion is blocked by repository policy."),
        (r"(?:^|[;&|]\s*)(?:pnpm\s+exec\s+)?supabase\s+db\s+reset(?:\s|$)", "Supabase database reset is blocked by repository policy."),
        (r"(?:^|[;&|]\s*)(?:pnpm\s+exec\s+)?supabase\s+migration\s+repair(?:\s|$)", "Supabase migration repair is blocked by repository policy."),
    )

    for pattern, reason in blocked_patterns:
        if re.search(pattern, command):
            deny(reason)
            return


if __name__ == "__main__":
    main()
