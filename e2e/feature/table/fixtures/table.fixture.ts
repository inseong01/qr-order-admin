import { Page, test as base } from '@playwright/test';

import mockTables from '../mock/table.test.json' assert { type: 'json' };

let isApiCalled = false;

const API_URL = '**/rest/v1/table?select**';

/**
 * table 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function tableResponseSuccess(page: Page) {
  await page.route(API_URL, async (route) => {
    isApiCalled = true;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockTables),
    });
  });
}

/**
 * table 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function tableResponseFail(page: Page) {
  await page.route(API_URL, async (route) => {
    isApiCalled = true;
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      headers: {
        'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
        'x-supabase-api-version': '2024-01-01',
        'x-sb-error-code': 'bad_jwt', // 선택
      },
      json: {
        code: 'bad_jwt',
        message: 'JWT sent in the Authorization header is not valid.',
      },
    });
  });
}

base.beforeEach(() => {
  isApiCalled = false;
});

// --- Variables ---

export { isApiCalled };
