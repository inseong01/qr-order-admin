import { test as base } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { orderResponseFail, orderResponseSuccess } from './order.fixture';
import { orderCategoryResponseFail, orderCategoryResponseSuccess } from './order_category.fixture';

// --- Fixtures ---

// 시나리오 1: order, order_category 호출 성공
export const orderTabAPISuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await orderResponseSuccess(page);
    await orderCategoryResponseSuccess(page);
    await use(page);
  },
});

// 시나리오 2: order, order_category 호출 실패 - API 오류
export const orderTabAPIFailTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await orderResponseFail(page);
    await orderCategoryResponseFail(page);
    await use(page);
  },
});
