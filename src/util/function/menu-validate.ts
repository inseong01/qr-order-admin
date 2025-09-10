import { z } from 'zod';

import { MenuCategory } from '@/lib/supabase/tables/menu-category';
import { NewMenu, UpdateMenu } from '@/lib/supabase/tables/menu';

import { FEATURE_MESSAGES } from '@/constants/message/feature';

/** 메뉴 카테고리 생성 데이터 검증 */
function createCategoryValue(value: string) {
  const categorySchema = z.string().nonempty({ message: FEATURE_MESSAGES.category.required });

  return categorySchema.safeParseAsync(value);
}

/** 메뉴 카테고리 수정 데이터 검증 */
function updateCategoryValue(data: MenuCategory[]) {
  const categorySchema = z
    .array(
      z.object({
        id: z.string().nonempty({ message: FEATURE_MESSAGES.category.select }),
        title: z.string().nonempty({ message: FEATURE_MESSAGES.category.required }),
      })
    )
    .min(1, { message: FEATURE_MESSAGES.category.select });

  return categorySchema.safeParseAsync(data);
}

/** 메뉴 카테고리 삭제 데이터 검증 */
function deleteCategoryValue(id: string[]) {
  const categorySchema = z.array(z.string()).nonempty({ message: FEATURE_MESSAGES.category.select });

  return categorySchema.safeParseAsync(id);
}

/** 메뉴 생성 데이터 검증 */
function createMenuValue(data: NewMenu) {
  const newMenuSchema = z.object({
    category_id: z.string().nonempty({ message: FEATURE_MESSAGES.menu.categoryRequired }),
    name: z.string().nonempty({ message: FEATURE_MESSAGES.menu.nameRequired }),
    price: z.number().nonnegative({ message: FEATURE_MESSAGES.menu.priceInvalid }),
    tag: z.string().nonempty({ message: FEATURE_MESSAGES.menu.tagRequired }),
    img_url: z.string().nonempty({ message: FEATURE_MESSAGES.menu.imgInvalid }).optional(),
  });

  return newMenuSchema.safeParseAsync(data);
}

/** 메뉴 수정 데이터 검증 */
function updateMenuValue(data: UpdateMenu) {
  const updatedMenuSchema = z.object({
    id: z.string().nonempty({ message: '메뉴 아이디는 포함되어야 합니다.' }),
    category_id: z.string().nonempty({ message: FEATURE_MESSAGES.menu.categoryRequired }),
    name: z.string().nonempty({ message: FEATURE_MESSAGES.menu.nameRequired }),
    price: z.number().nonnegative({ message: FEATURE_MESSAGES.menu.priceInvalid }),
    tag: z.string().nonempty({ message: FEATURE_MESSAGES.menu.tagRequired }),
    img_url: z.string().nonempty({ message: FEATURE_MESSAGES.menu.imgInvalid }),
  });

  return updatedMenuSchema.safeParseAsync(data);
}

/** 주문 아이디 데이터 검증 */
function orderIdValue(id: string) {
  const orderIdSchema = z.string().nonempty({ message: FEATURE_MESSAGES.order.idRequired });

  return orderIdSchema.safeParseAsync(id);
}

export default {
  createCategoryValue,
  updateCategoryValue,
  deleteCategoryValue,
  createMenuValue,
  updateMenuValue,
  orderIdValue,
} as const;
