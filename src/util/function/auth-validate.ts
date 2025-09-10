import { z } from 'zod';

import {
  passwordLetterRegex,
  passwordNumberRegex,
  passwordRegex,
  passwordSpecialRegex,
  PWD_MAX,
  PWD_MIN,
} from '@/features/auth/const';
import { AUTH_MESSAGES } from '@/constants/message/auth';

/** 로그인 스키마 */
const login = z.object({
  // 이메일
  id: z.string().nonempty({ message: AUTH_MESSAGES.email.required }).email({ message: AUTH_MESSAGES.email.invalid }),

  // 비밀번호
  password: z
    .string()
    .nonempty({ message: AUTH_MESSAGES.password.required })
    .min(PWD_MIN, { message: AUTH_MESSAGES.password.min(PWD_MIN) })
    .max(PWD_MAX, { message: AUTH_MESSAGES.password.max(PWD_MAX) })
    .regex(passwordRegex, {
      message: AUTH_MESSAGES.password.invalid,
    })
    .refine((val) => !val.includes('\\'), {
      message: AUTH_MESSAGES.password.noBackslash,
    }),
});

/** 회원가입 스키마 */
const signup = z
  .object({
    // 이메일
    id: z.string().nonempty({ message: AUTH_MESSAGES.email.required }).email({ message: AUTH_MESSAGES.email.invalid }),

    // 비밀번호
    password: z
      .string()
      .nonempty({ message: AUTH_MESSAGES.password.required })
      .min(PWD_MIN, { message: AUTH_MESSAGES.password.min(PWD_MIN) })
      .max(PWD_MAX, { message: AUTH_MESSAGES.password.max(PWD_MAX) })
      .refine((val) => passwordLetterRegex.test(val), {
        message: AUTH_MESSAGES.password.letter,
      })
      .refine((val) => passwordNumberRegex.test(val), {
        message: AUTH_MESSAGES.password.number,
      })
      .refine((val) => passwordSpecialRegex.test(val), {
        message: AUTH_MESSAGES.password.special,
      })
      .refine((val) => !val.includes('\\'), {
        message: AUTH_MESSAGES.password.noBackslash,
      }),

    // 비밀번호 확인
    confirmPassword: z.string().nonempty({ message: AUTH_MESSAGES.confirmPassword.required }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: AUTH_MESSAGES.confirmPassword.mismatch,
  });

/** 비밀번호 찾기 스키마 */
const findPassword = z.object({
  // 아이디(이메일)
  id: z.string().nonempty({ message: AUTH_MESSAGES.email.required }).email({ message: AUTH_MESSAGES.email.invalid }),
});

/** 비밀번호 수정 스키마 */
const resetPassword = z
  .object({
    // 비밀번호
    password: z
      .string()
      .nonempty({ message: AUTH_MESSAGES.password.required })
      .min(PWD_MIN, { message: AUTH_MESSAGES.password.min(PWD_MIN) })
      .max(PWD_MAX, { message: AUTH_MESSAGES.password.max(PWD_MAX) })
      .refine((val) => passwordLetterRegex.test(val), {
        message: AUTH_MESSAGES.password.letter,
      })
      .refine((val) => passwordNumberRegex.test(val), {
        message: AUTH_MESSAGES.password.number,
      })
      .refine((val) => passwordSpecialRegex.test(val), {
        message: AUTH_MESSAGES.password.special,
      })
      .refine((val) => !val.includes('\\'), {
        message: AUTH_MESSAGES.password.noBackslash,
      }),

    // 비밀번호 확인
    confirmPassword: z.string().nonempty({ message: AUTH_MESSAGES.confirmPassword.required }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: AUTH_MESSAGES.confirmPassword.mismatch,
  });

/** 캡챠 토큰 검증 스키마 */
const captchaToken = z.string().nonempty({ message: AUTH_MESSAGES.captcha.missing });

export default {
  schema: {
    login,
    signup,
    findPassword,
    resetPassword,
    captchaToken,
  },
} as const;
