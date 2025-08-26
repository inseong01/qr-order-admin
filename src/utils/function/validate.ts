import { z } from 'zod';

import { MenuCategory } from '@/lib/supabase/tables/menu-category';
import { NewMenu, UpdateMenu } from '@/lib/supabase/tables/menu';
import {
  passwordLetterRegex,
  passwordNumberRegex,
  passwordRegex,
  passwordSpecialRegex,
  PWD_MAX,
  PWD_MIN,
} from '@/features/auth/const';

/** 메뉴 카테고리 생성 데이터 검증 */
function createCategoryValue(value: string) {
  const categorySchema = z
    .string()
    .nonempty({ message: '분류명을 입력해주세요.' })
    .regex(/^[가-힣&\s]+$/, {
      message: '한글만 입력 가능합니다.',
    });

  return categorySchema.safeParseAsync(value);
}

/** 메뉴 카테고리 수정 데이터 검증 */
function updateCategoryValue(data: MenuCategory[]) {
  const categorySchema = z
    .array(
      z.object({
        id: z.string().nonempty({ message: '분류를 선택해주세요.' }),
        title: z
          .string()
          .nonempty({ message: '분류명을 입력해주세요.' })
          .regex(/^[가-힣&\s]+$/, {
            message: '한글만 입력 가능합니다.',
          }),
      })
    )
    .min(1, { message: '분류를 선택해주세요.' });

  return categorySchema.safeParseAsync(data);
}

/** 메뉴 카테고리 삭제 데이터 검증 */
function deleteCategoryValue(id: string[]) {
  const categorySchema = z.array(z.string()).nonempty({ message: '분류를 선택해주세요.' });

  return categorySchema.safeParseAsync(id);
}

/** 메뉴 생성 데이터 검증 */
function createMenuValue(data: NewMenu) {
  const newMenuSchema = z.object({
    category_id: z.string().nonempty({ message: '메뉴 분류를 선택헤주세요.' }),
    name: z.string().nonempty({ message: '메뉴 이름을 입력해주세요.' }),
    price: z.number().nonnegative({ message: '가격은 0 이상의 숫자여야 합니다.' }),
    tag: z.string().nonempty({ message: '태그를 선택해주세요.' }),
    img_url: z.string().nonempty({ message: '올바르지 않은 이미지 주소입니다.' }).optional(),
  });

  return newMenuSchema.safeParseAsync(data);
}

/** 메뉴 수정 데이터 검증 */
function updateMenuValue(data: UpdateMenu) {
  const updatedMenuSchema = z.object({
    id: z.string().nonempty({ message: '메뉴 아이디는 포함되어야 합니다.' }),
    category_id: z.string().nonempty({ message: '메뉴 분류를 선택헤주세요.' }),
    name: z.string().nonempty({ message: '메뉴 이름을 입력해주세요.' }),
    price: z.number().nonnegative({ message: '가격을 입력해주세요.' }),
    tag: z.string().nonempty({ message: '태그를 선택해주세요.' }),
    img_url: z.string().nonempty({ message: '올바르지 않은 이미지 주소입니다.' }),
  });

  return updatedMenuSchema.safeParseAsync(data);
}

/** 주문 아이디 데이터 검증 */
function orderIdValue(id: string) {
  const orderIdSchema = z.string().nonempty({ message: '주문이 선택되지 않았습니다.' });

  return orderIdSchema.safeParseAsync(id);
}

/** 로그인 스키마 */
const login = z.object({
  // 이메일
  id: z
    .string()
    .nonempty({ message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 주소 형식이 아닙니다.' }),

  // 비밀번호
  password: z
    .string()
    .nonempty({ message: '비밀번호를 입력해주세요.' })
    .min(PWD_MIN, { message: `최소 ${PWD_MIN}자 이상이어야 합니다.` })
    .max(PWD_MAX, { message: `최대 ${PWD_MAX}자까지 가능합니다.` })
    .regex(passwordRegex, {
      message: '소문자, 대문자, 숫자, 특수문자가 포함되어야 합니다.',
    })
    .refine((val) => !val.includes('\\'), {
      message: `\\ 특수문자는 사용할 수 없습니다.`,
    }),
});

/** 회원가입 스키마 */
const signup = z
  .object({
    // 이메일
    id: z
      .string()
      .nonempty({ message: '이메일을 입력해주세요.' })
      .email({ message: '올바른 이메일 주소 형식이 아닙니다.' }),

    // 비밀번호
    password: z
      .string()
      .nonempty({ message: '비밀번호를 입력해주세요.' })
      .min(PWD_MIN, { message: `최소 ${PWD_MIN}자 이상이어야 합니다.` })
      .max(PWD_MAX, { message: `최대 ${PWD_MAX}자까지 가능합니다.` })
      .refine((val) => passwordLetterRegex.test(val), {
        message: '소문자, 대문자가 포함되어야 합니다.',
      })
      .refine((val) => passwordNumberRegex.test(val), {
        message: '숫자가 포함되어야 합니다.',
      })
      .refine((val) => passwordSpecialRegex.test(val), {
        message: '특수문자가 포함되어야 합니다.',
      })
      .refine((val) => !val.includes('\\'), {
        message: `\\ 특수문자는 사용할 수 없습니다.`,
      }),

    // 비밀번호 확인
    confirmPassword: z.string().nonempty({ message: '비밀번호 확인은 필수 입력 항목입니다.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

/** 비밀번호 찾기 스키마 */
const findPassword = z.object({
  // 아이디(이메일)
  id: z
    .string()
    .nonempty({ message: '이메일 주소를 입력해주세요.' })
    .email({ message: '올바른 이메일 주소 형식이 아닙니다.' }),
});

/** 비밀번호 수정 스키마 */
const resetPassword = z
  .object({
    // 비밀번호
    password: z
      .string()
      .nonempty({ message: '비밀번호를 입력해주세요.' })
      .min(PWD_MIN, { message: `최소 ${PWD_MIN}자 이상이어야 합니다.` })
      .max(PWD_MAX, { message: `최대 ${PWD_MAX}자까지 가능합니다.` })
      .refine((val) => passwordLetterRegex.test(val), {
        message: '소문자, 대문자가 포함되어야 합니다.',
      })
      .refine((val) => passwordNumberRegex.test(val), {
        message: '숫자가 포함되어야 합니다.',
      })
      .refine((val) => passwordSpecialRegex.test(val), {
        message: '특수문자가 포함되어야 합니다.',
      })
      .refine((val) => !val.includes('\\'), {
        message: `\\ 특수문자는 사용할 수 없습니다.`,
      }),

    // 비밀번호 확인
    confirmPassword: z.string().nonempty({ message: '비밀번호 확인은 필수 입력 항목입니다.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

/** 캡챠 토큰 검증 스키마 */
const captchaToken = z.string().nonempty({ message: '캡챠 토큰이 누락되었습니다.' });

export default {
  createCategoryValue,
  updateCategoryValue,
  deleteCategoryValue,
  createMenuValue,
  updateMenuValue,
  orderIdValue,
  schema: {
    login,
    signup,
    findPassword,
    resetPassword,
    captchaToken,
  },
} as const;
