import { Page, test as base } from '@playwright/test';

import { TEST_SESSION_VALUE } from 'e2e/auth/const';
import { mockFailTurnstile, mockSuccessTurnstile } from './captcha.fixture';
import { createAuthContext } from '../util/auth-context';

let isSupabaseCalled = false;

/** 비밀번호 재설정 성공 모킹 */
export async function mockUpdatePasswordSuccess(page: Page) {
  isSupabaseCalled = false;

  await page.route(/.*supabase\.co\/auth\/v1\/verify.*/, async (route, request) => {
    const url = new URL(request.url());
    const redirectTo = url.searchParams.get('redirect_to');
    await route.fulfill({
      status: 303,
      contentType: 'text/plain',
      headers: {
        location: `${redirectTo}`,
      },
    });
  });

  await page.route('**/auth/v1/user**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        data: {
          session: TEST_SESSION_VALUE,
        },
      },
    });
  });

  await page.route('**/auth/v1/logout**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        data: {},
      },
    });
  });
}

/** 비밀번호 재설정 실패 모킹 */
export async function mockUpdatePasswordFail(page: Page) {
  isSupabaseCalled = false;

  await page.route(/.*supabase\.co\/auth\/v1\/verify.*/, async (route, request) => {
    const url = new URL(request.url());
    const redirectTo = url.searchParams.get('redirect_to');
    await route.fulfill({
      status: 303,
      contentType: 'text/plain',
      headers: {
        location: `${redirectTo}`,
      },
    });
  });

  await page.route('**/auth/v1/user**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
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

// --- Variables ---

export { isSupabaseCalled };

// --- Fixtures ---

// 시나리오 1: 비밀번호 재설정 성공
export const updatePasswordSuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 2: 비밀번호 재설정 실패 - 캡챠 토큰 무효
export const updatePasswordFailInvalidCaptchaTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockFailTurnstile(page);
    await mockUpdatePasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 3: 비밀번호 재설정 실패 - 잘못된 비밀번호 형식
export const updatePasswordFailInvalidFormatTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 4: 비밀번호 재설정 실패 - 인증 토큰 무효
export const updatePasswordFailInvalidToken = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordFail(page);
    await use(page);
  },
});
