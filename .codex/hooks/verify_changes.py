#!/usr/bin/env python3

import json
import subprocess


CHECKABLE_SUFFIXES = (".ts", ".tsx", ".js", ".jsx", ".css.ts")
BUILD_FILES = {"next.config.ts", "package.json", "pnpm-lock.yaml"}


def run(command: list[str]) -> tuple[bool, str]:
    result = subprocess.run(command, check=False, capture_output=True, text=True)
    output = "\n".join(part.strip() for part in (result.stdout, result.stderr) if part.strip())
    return result.returncode == 0, output


def changed_files() -> list[str]:
    result = subprocess.run(
        ["git", "status", "--short", "--untracked-files=all"],
        check=False,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip())
    return [line[3:] for line in result.stdout.splitlines() if len(line) > 3]


def requires_build(paths: list[str]) -> bool:
    return any(
        path in BUILD_FILES
        or (
            path.startswith("app/")
            and path.rsplit("/", 1)[-1]
            in {"page.tsx", "layout.tsx", "template.tsx", "loading.tsx", "error.tsx", "route.ts"}
        )
        for path in paths
    )


def main() -> None:
    try:
        paths = changed_files()
    except RuntimeError as error:
        print(json.dumps({"decision": "block", "reason": str(error)}))
        return

    if not any(path.endswith(CHECKABLE_SUFFIXES) for path in paths) and not any(
        path in BUILD_FILES for path in paths
    ):
        print(json.dumps({"continue": True}))
        return

    commands = [
        ["pnpm", "exec", "tsc", "--noEmit"],
        ["pnpm", "lint"],
    ]
    if requires_build(paths):
        commands.append(["pnpm", "build"])

    failures = []
    for command in commands:
        ok, output = run(command)
        if not ok:
            failures.append(f"$ {' '.join(command)}\n{output[-6000:]}")

    if failures:
        print(
            json.dumps(
                {
                    "decision": "block",
                    "reason": "Repository checks failed:\n\n" + "\n\n".join(failures),
                }
            )
        )
        return

    print(json.dumps({"continue": True}))


if __name__ == "__main__":
    main()
