import { z } from "zod";

const email = z.email("올바른 이메일 주소를 입력해 주세요.").trim();

const password = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(/[A-Za-z]/, "비밀번호에 영문을 포함해 주세요.")
  .regex(/\d/, "비밀번호에 숫자를 포함해 주세요.")
  .regex(/[^A-Za-z0-9\s]/, "비밀번호에 특수문자를 포함해 주세요.");

export const loginSchema = z.object({
  email,
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "이름을 2자 이상 입력해 주세요."),
    email,
    password,
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해 주세요."),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "비밀번호가 서로 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type AuthField = "name" | "email" | "password" | "passwordConfirm";
