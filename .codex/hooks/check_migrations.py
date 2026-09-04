#!/usr/bin/env python3

import json
import subprocess


def main() -> None:
    result = subprocess.run(
        [
            "git",
            "diff",
            "HEAD",
            "--name-only",
            "--diff-filter=MDR",
            "--",
            "supabase/migrations/*.sql",
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    changed = [path for path in result.stdout.splitlines() if path]

    if result.returncode != 0:
        print(json.dumps({"decision": "block", "reason": result.stderr.strip()}))
        return

    if changed:
        paths = ", ".join(changed)
        print(
            json.dumps(
                {
                    "decision": "block",
                    "reason": (
                        "Existing Supabase migrations are immutable. Restore these files and "
                        f"add a new migration instead: {paths}"
                    ),
                }
            )
        )
        return

    print(json.dumps({"continue": True}))


if __name__ == "__main__":
    main()
