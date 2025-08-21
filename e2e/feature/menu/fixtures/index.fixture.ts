import { test as base } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { menuResponseFail, menuResponseSuccess } from './menu.fixture';
import { menuCategoryResponseFail, menuCategoryResponseSuccess } from './menu_category.fixture';

// --- Fixtures ---

// 시나리오 1: menu, menu_category 호출 성공
export const menuTabAPISuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await menuResponseSuccess(page);
    await menuCategoryResponseSuccess(page);
    await use(page);
  },
});

// 시나리오 2: menu, menu_category 호출 실패 - API 오류
export const menuTabAPIFailTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await menuResponseFail(page);
    await menuCategoryResponseFail(page);
    await use(page);
  },
});
