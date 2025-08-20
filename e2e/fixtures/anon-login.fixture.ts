import { Page } from '@playwright/test';

import { test as base } from './captcha.fixture';
import {
  TEST_ACCESS_TOKEN,
  TEST_ACCOUNT,
  TEST_ORIGN_URL,
  TEST_REFRESH_TOKEN,
  TEST_SESSION_KEY,
  TEST_SESSION_VALUE,
} from '../const';
import { mockFailTurnstile, mockSuccessTurnstile } from './captcha.fixture';

let isSupabaseCalled = false;

/**
 * Supabase 로그인 요청을 모킹하여 성공 응답을 반환합니다.
 */
async function mockAnonymousLoginSuccess(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/token**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: TEST_ACCESS_TOKEN,
        expires_in: 3600,
        refresh_token: TEST_REFRESH_TOKEN,
        token_type: 'bearer',
        user: { email: TEST_ACCOUNT.ID },
        session: {
          access_token: TEST_ACCESS_TOKEN,
          refresh_token: TEST_REFRESH_TOKEN,
          expires_at: Date.now() + 3600,
          user: { email: TEST_ACCOUNT.ID },
        },
      }),
    });
  });

  await page.route('**/auth/v1/signup**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          user: { id: TEST_ACCOUNT.ID, email: TEST_ACCOUNT.ID },
          session: { access_token: TEST_ACCESS_TOKEN },
        },
      }),
    });
  });
}

/**
 * Supabase 익명 로그인 요청을 모킹하여 실패 응답(400)을 반환합니다.
 */
async function mockAnonymousLoginFail(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/signup**', (route) => {
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

// 시나리오 1: 익명 로그인 성공
export const anonymousloginSuccessTest = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: {
        cookies: [],
        origins: [
          {
            origin: TEST_ORIGN_URL,
            localStorage: [{ name: TEST_SESSION_KEY, value: JSON.stringify(TEST_SESSION_VALUE) }],
          },
        ],
      },
    });
    await use(context);
    await context.close();
  },
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockAnonymousLoginSuccess(page);
    await use(page);
  },
});

// 시나리오 2: 익명 로그인 실패 - 캡챠 인증 실패
export const anonymousLoginCaptchaFailTest = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    // Supabase API는 호출되지 않아야 하지만, 만약을 위해 성공으로 모킹
    await mockAnonymousLoginSuccess(page);
    await use(page);
  },
});

// 시나리오 3: 익명 로그인 실패 - 유효하지 않는 캡챠 토큰
export const anonymousLoginInvalidCaptchaTokenTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockAnonymousLoginFail(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
