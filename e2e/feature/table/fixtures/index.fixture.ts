import { test as base } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { tableResponseFail, tableResponseSuccess } from './table.fixture';
import { requestResponseFail, requestResponseSuccess } from './request.fixture';
import { requestItemResponseFail, requestItemResponseSuccess } from './request-item.fixture';
import { requestCategoryResponseFail, requestCategoryResponseSuccess } from './request-category.fixture';

// --- Fixtures ---

// 시나리오 1: table, request, request_item, request_category 호출 성공
export const tableTabAPISuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await tableResponseSuccess(page);
    await requestResponseSuccess(page);
    await requestItemResponseSuccess(page);
    await requestCategoryResponseSuccess(page);
    await use(page);
  },
});

// 시나리오 2: table, request, request_item, request_category 호출 실패 - API 오류
export const tableTabAPIFailTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await tableResponseFail(page);
    await requestResponseFail(page);
    await requestItemResponseFail(page);
    await requestCategoryResponseFail(page);
    await use(page);
  },
});
