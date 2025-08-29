import { Page } from '@playwright/test';

import { menuResponseFail, menuResponseSuccess } from './menu.fixture';
import { menuCategoryResponseFail, menuCategoryResponseSuccess } from './menu_category.fixture';

/**
 * 주문 탭 기본 호출 성공
 * : menu, menu_category
 */
export async function menuTabAPISuccess(page: Page) {
  await menuResponseSuccess(page);
  await menuCategoryResponseSuccess(page);
}

/**
 * 주문 탭 빈 데이터 호출 성공
 * : menu, menu_category
 */
export async function menuTabAPIEmptySuccess(page: Page) {
  await menuResponseSuccess(page, []);
  await menuCategoryResponseSuccess(page, []);
}

/**
 * 주문 탭 기본 호출 실패
 * : menu, menu_category
 */
export async function menuTabAPIFail(page: Page) {
  await menuResponseFail(page);
  await menuCategoryResponseFail(page);
}
