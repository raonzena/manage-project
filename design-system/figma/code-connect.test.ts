import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { describe, expect, it } from "vitest";

function renderTemplate(
  component: string,
  text: Record<string, string>,
  variants: Record<string, string> = {},
) {
  const fileName = `${component}.figma.ts`;
  const source = readFileSync(new URL(fileName, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2021,
      esModuleInterop: true,
    },
  });
  const exports: { default?: { example: string } } = {};

  // Only supply the APIs used by these templates; this is not the Figma runtime.
  const figma = {
    selectedInstance: {
      getString(name: string) {
        if (!(name in text)) throw new Error(`Unexpected text property: ${name}`);
        return text[name];
      },
      getEnum(name: string, options: Record<string, string>) {
        const value = variants[name];
        if (!(value in options)) throw new Error(`Unexpected variant: ${name}=${value}`);
        return options[value];
      },
    },
    code(parts: TemplateStringsArray, ...values: unknown[]) {
      return parts.reduce(
        (result, part, index) => result + (index ? String(values[index - 1]) : "") + part,
        "",
      );
    },
  };

  runInNewContext(outputText, {
    exports,
    require(name: string) {
      if (name !== "figma") throw new Error(`Unexpected runtime import: ${name}`);
      return figma;
    },
  });
  if (!exports.default) throw new Error(`Missing default export: ${fileName}`);
  return exports.default.example;
}

function parseJsx(snippet: string) {
  const { diagnostics = [] } = ts.transpileModule(snippet, {
    fileName: "snippet.tsx",
    reportDiagnostics: true,
    compilerOptions: { jsx: ts.JsxEmit.Preserve },
  });
  expect(diagnostics.map(({ messageText }) =>
    ts.flattenDiagnosticMessageText(messageText, "\n"),
  )).toEqual([]);

  const source = ts.createSourceFile(
    "snippet.tsx", snippet, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX,
  );
  expect(source.statements).toHaveLength(1);
  const statement = source.statements[0];
  if (!statement || !ts.isExpressionStatement(statement)) {
    throw new Error("Expected one JSX expression");
  }
  return statement.expression;
}

function readStringExpression(node: ts.Node | undefined) {
  if (!node || !ts.isJsxExpression(node) || !node.expression ||
      !ts.isStringLiteral(node.expression)) {
    throw new Error("Expected a JSX expression containing a string literal");
  }
  return node.expression.text;
}

const textCases = [
  ["따옴표", '이름 "별칭" / \'nickname\''],
  ["중괄호", "{value}"],
  ["태그", "<strong>완료</strong>"],
  ["엔티티", "&amp; &lt; &#123;"],
  ["줄바꿈과 역슬래시", "첫째 줄\n둘째 줄\r\nC:\\work"],
  ["빈 문자열", ""],
] as const;

describe.each([
  ["badge", { Tone: "Success" }],
  ["button", { Tone: "Primary", Size: "Medium" }],
] as const)("%s Code Connect 텍스트", (component, variants) => {
  it.each(textCases)("%s를 유효한 JSX children으로 보존한다", (_name, text) => {
    const element = parseJsx(renderTemplate(component, { Label: text }, variants));
    if (!ts.isJsxElement(element)) throw new Error("Expected a JSX element");
    expect(element.children).toHaveLength(1);
    expect(readStringExpression(element.children[0])).toBe(text);
  });
});

describe("Input Code Connect 텍스트", () => {
  it.each(textCases)("%s를 세 JSX 속성에서 각각 보존한다", (_name, text) => {
    const properties = {
      Label: text,
      Placeholder: `${text} placeholder`,
      Hint: `${text} hint`,
    };
    const element = parseJsx(renderTemplate("input", properties));
    if (!ts.isJsxSelfClosingElement(element)) throw new Error("Expected a self-closing JSX element");

    for (const [property, expected] of Object.entries(properties)) {
      const attribute = element.attributes.properties.find((node) =>
        ts.isJsxAttribute(node) && node.name.getText() === property.toLowerCase(),
      );
      if (!attribute || !ts.isJsxAttribute(attribute)) {
        throw new Error(`Missing JSX attribute: ${property}`);
      }
      expect(readStringExpression(attribute.initializer)).toBe(expected);
    }
  });
});
