import { test as base, Page } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { tableResponseFail, tableResponseSuccess } from './table.fixture';
import { requestResponseFail, requestResponseSuccess } from './request.fixture';
import { requestItemResponseFail, requestItemResponseSuccess } from './request-item.fixture';
import { requestCategoryResponseFail, requestCategoryResponseSuccess } from './request-category.fixture';

/**
 * 좌석 탭 기본 호출 성공
 * : table, request, request_item, request_category
 */
export async function tableTabAPISuccess(page: Page) {
  await tableResponseSuccess(page);
  await requestResponseSuccess(page);
  await requestItemResponseSuccess(page);
  await requestCategoryResponseSuccess(page);
}

/**
 * 좌석 탭 기본 호출 실패
 * : table, request, request_item, request_category
 */
export async function tableTabAPIFail(page: Page) {
  await tableResponseFail(page);
  await requestResponseFail(page);
  await requestItemResponseFail(page);
  await requestCategoryResponseFail(page);
}

// --- Fixtures ---

/**
 * 시나리오 1:
 *
 * 사전 요청 목킹: 좌석 탭 기본 호출 성공
 */
export const tableTabAPISuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await tableTabAPISuccess(page);
    await use(page);
  },
});
