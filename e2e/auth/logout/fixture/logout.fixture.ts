import { Page, test as base } from '@playwright/test';

import { createAuthContext } from '../../util/auth-context';

let isSupabaseCalled = false;

/** 메인 페이지 사전 필요 응답 모킹 */
async function mockMainPageAPI(page: Page) {
  await page.route('**/rest/v1/menu?select**', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([]),
    });
  });

  await page.route('**/rest/v1/menu_category?select**', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([]),
    });
  });

  await page.route('**/rest/v1/request?select**', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([]),
    });
  });

  await page.route('**/rest/v1/order?select**', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([]),
    });
  });
}

/** 로그아웃 성공 모킹 */
async function mockLogoutSuccess(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/logout**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 204,
    });
  });
}

/** 로그아웃 실패 모킹 */
async function mockLogoutFail(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/logout**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 400,
      headers: {
        'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
        'x-supabase-api-version': '2024-01-01',
        'x-sb-error-code': 'bad_jwt', // 선택
      },
      body: JSON.stringify({
        code: 'bad_jwt',
        message: 'JWT sent in the Authorization header is not valid.',
      }),
    });
  });
}

// --- Variables ---

export { isSupabaseCalled };

// --- Fixtures ---

// 시나리오 1: 로그아웃 성공
export const logoutSuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockMainPageAPI(page);
    await mockLogoutSuccess(page);
    await use(page);
  },
});

// 시나리오 2: 로그아웃 실패 - API 오류
export const logoutFailAPIErrorTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockMainPageAPI(page);
    await mockLogoutFail(page);
    await use(page);
  },
});
