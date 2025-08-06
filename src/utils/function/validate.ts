import { z } from 'zod';

import { MenuCategory } from '@/lib/supabase/tables/menu-category';
import { NewMenu, UpdateMenu } from '@/lib/supabase/tables/menu';
import { FindPwdForm, LoginForm, SignupForm } from '@/features/auth/store/form-atom';
import { PWD_MAX, PWD_MIN } from '@/features/auth/const';

/** 메뉴 카테고리 생성 데이터 검증 */
function createCategoryValue(value: string) {
  const categorySchema = z
    .string()
    .nonempty({ message: '분류를 입력해주세요.' })
    .regex(/^[가-힣&]+$/, {
      message: '한글, &만 입력 가능합니다.',
    });

  return categorySchema.safeParseAsync(value);
}

/** 메뉴 카테고리 수정 데이터 검증 */
function updateCategoryValue(data: MenuCategory[]) {
  console.log('data: ', data);
  const categorySchema = z.array(
    z.object({
      id: z.string().nonempty({ message: '분류가 선택되지 않았습니다.' }),
      title: z
        .string()
        .nonempty({ message: '분류를 입력해주세요.' })
        .regex(/^[가-힣&]+$/, {
          message: '한글, &만 입력 가능합니다.',
        }),
    })
  );

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
    category_id: z.string({ message: '메뉴 분류를 선택헤주세요.' }),
    name: z.string({ message: '메뉴 이름을 입력해주세요.' }).nonempty({ message: '메뉴 이름을 입력해주세요.' }),
    price: z.number({ message: '가격을 입력해주세요.' }).nonnegative({ message: '가격은 양수이어야 합니다.' }),
    tag: z.string({ message: '태그를 선택해주세요.' }),
    img_url: z.string({ message: '올바르지 않은 이미지 주소입니다.' }).optional(),
  });

  return newMenuSchema.safeParseAsync(data);
}

/** 메뉴 수정 데이터 검증 */
function updateMenuValue(data: UpdateMenu) {
  const updatedMenuSchema = z.object({
    id: z.string({ message: '메뉴 아이디는 포함되어야 합니다.' }),
    category_id: z.string({ message: '메뉴 분류를 선택헤주세요.' }),
    name: z.string({ message: '메뉴 이름을 입력해주세요.' }).nonempty({ message: '메뉴 이름을 입력해주세요.' }),
    price: z.number({ message: '가격을 입력해주세요.' }).nonnegative({ message: '가격은 양수이어야 합니다.' }),
    tag: z.string({ message: '태그를 선택해주세요.' }),
    img_url: z.string({ message: '올바르지 않은 이미지 주소입니다.' }),
  });

  return updatedMenuSchema.safeParseAsync(data);
}

/** 주문 아이디 데이터 검증 */
function orderIdValue(id: string) {
  const orderIdSchema = z.string({ message: '주문이 선택되지 않았습니다.' });

  return orderIdSchema.safeParseAsync(id);
}

/** 로그인 스키마 */
const login = z.object({
  // 이메일
  id: z
    .string({ message: '이메일은 필수 입력 항목입니다.' })
    .nonempty({ message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 주소 형식이 아닙니다.' }),

  // 비밀번호
  password: z
    .string({ message: '비밀번호는 필수 입력 항목입니다.' })
    .nonempty({ message: '비밀번호를 입력해주세요.' })
    .min(8, { message: `최소 ${PWD_MIN}자 이상이어야 합니다.` })
    .max(20, { message: `최대 ${PWD_MAX}자까지 가능합니다.` })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/, {
      message: '영문, 숫자, 특수문자를 각각 최소 1개 이상 포함해야 합니다.',
    }),
});

/** 회원가입 스키마 (KR 기준) */
const signup = z
  .object({
    // 이메일
    id: z
      .string({ message: '이메일은 필수 입력 항목입니다.' })
      .nonempty({ message: '이메일을 입력해주세요.' })
      .email({ message: '올바른 이메일 주소 형식이 아닙니다.' }),

    // 비밀번호
    password: z
      .string({ message: '비밀번호는 필수 입력 항목입니다.' })
      .nonempty({ message: '비밀번호를 입력해주세요.' })
      .min(8, { message: `최소 ${PWD_MIN}자 이상이어야 합니다.` })
      .max(20, { message: `최대 ${PWD_MAX}자까지 가능합니다.` })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/, {
        message: '영문, 숫자, 특수문자를 각각 최소 1개 이상 포함해야 합니다.',
      }),

    // 비밀번호 확인
    confirmPassword: z.string({ message: '비밀번호 확인은 필수 입력 항목입니다.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

/** 비밀번호 찾기 스키마 */
const findPassword = z.object({
  // 아이디(이메일)
  id: z
    .string({ message: '이메일 주소는 필수 입력 항목입니다.' })
    .nonempty({ message: '이메일 주소를 입력해주세요.' })
    .email({ message: '올바른 이메일 주소 형식이 아닙니다.' }),
});

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
  },
} as const;
