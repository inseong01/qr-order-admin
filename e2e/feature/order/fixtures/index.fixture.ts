import { test as base, Page } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { orderResponseFail, orderResponseSuccess } from './order.fixture';
import { orderCategoryResponseFail, orderCategoryResponseSuccess } from './order_category.fixture';

/**
 * 주문 탭 기본 호출 성공
 * : order, order_category
 */
export async function orderTabAPISuccess(page: Page) {
  await orderResponseSuccess(page);
  await orderCategoryResponseSuccess(page);
}

/**
 * 주문 탭 기본 호출 실패
 * : order, order_category
 */
export async function orderTabAPIFail(page: Page) {
  await orderResponseFail(page);
  await orderCategoryResponseFail(page);
}

// --- Fixtures ---

// 시나리오 1: 주문 탭 호출 성공
export const orderTabAPISuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await orderTabAPISuccess(page);
    await use(page);
  },
});

// 시나리오 2: 주문 탭 호출 실패 - API 오류
export const orderTabAPIFailTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await orderTabAPIFail(page);
    await use(page);
  },
});
