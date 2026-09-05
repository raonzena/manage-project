import { describe, expect, it } from "vitest";
import { loginSchema, signUpSchema } from "./schema";

describe("로그인 입력 검증", () => {
  it("로그인에는 회원가입의 비밀번호 조합 규칙을 다시 요구하지 않는다", () => {
    expect(loginSchema.safeParse({
      email: "member@example.com",
      password: "12345678",
    }).success).toBe(true);
  });

  it.each([
    ["올바르지 않은 이메일", "invalid", "Password1!", "email"],
    ["짧은 비밀번호", "member@example.com", "short", "password"],
  ])("%s를 해당 필드의 오류로 반환한다", (_label, email, password, field) => {
    const result = loginSchema.safeParse({ email, password });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: [field] })]),
      );
    }
  });
});

describe("회원가입 입력 검증", () => {
  const validInput = {
    name: "홍길동",
    email: "member@example.com",
    password: "Password1!",
    passwordConfirm: "Password1!",
  };

  it("올바른 입력을 받고 이름의 앞뒤 공백을 제거한다", () => {
    expect(signUpSchema.parse({ ...validInput, name: "  홍길동  " }))
      .toEqual(validInput);
  });

  it.each([
    ["8자 미만", "Ab1!"],
    ["영문 없음", "1234567!"],
    ["숫자 없음", "Password!"],
    ["특수문자 없음", "Password1"],
    ["공백을 특수문자로 사용", "Password1 "],
  ])("비밀번호 규칙 위반(%s)을 거부한다", (_label, password) => {
    const result = signUpSchema.safeParse({
      ...validInput,
      password,
      passwordConfirm: password,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: ["password"] })]),
      );
    }
  });

  it.each(["", "   ", " 홍 "])("공백 제거 후 2자 미만인 이름 %j를 거부한다", (name) => {
    expect(signUpSchema.safeParse({ ...validInput, name }).success).toBe(false);
  });

  it("비밀번호가 다르면 확인 필드에 오류를 반환한다", () => {
    const result = signUpSchema.safeParse({
      ...validInput,
      passwordConfirm: "Different1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual([
        expect.objectContaining({
          path: ["passwordConfirm"],
          message: "비밀번호가 서로 일치하지 않습니다.",
        }),
      ]);
    }
  });
});
