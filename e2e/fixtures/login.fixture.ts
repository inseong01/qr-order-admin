import { Page } from '@playwright/test';

import { test as base } from './captcha.fixture';
import { TEST_ACCESS_TOKEN, TEST_ACCOUNT, TEST_REFRESH_TOKEN } from '../const';
import { mockFailTurnstile, mockSuccessTurnstile } from './captcha.fixture';

let isSupabaseCalled = false;

/**
 * Supabase 로그인 요청을 모킹하여 성공 응답을 반환합니다.
 */
async function mockSuccessLogin(page: Page) {
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
        user: {
          email: TEST_ACCOUNT.ID,
        },
        session: {
          access_token: TEST_ACCESS_TOKEN,
          refresh_token: TEST_REFRESH_TOKEN,
          expires_at: Date.now() + 3600,
          user: {
            email: TEST_ACCOUNT.ID,
          },
        },
        error: null,
      }),
    });
  });
}

/**
 * Supabase 로그인 요청을 모킹하여 실패 응답(400)을 반환합니다.
 */
async function mockFailLogin(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/token**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      headers: {
        'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
        'x-supabase-api-version': '2024-01-01',
        'x-sb-error-code': 'invalid_credentials', // 선택
      },
      json: {
        code: 'invalid_credentials',
        message: 'Login credentials or grant type not recognized.',
      },
    });
  });
}

// --- Variables ---

export { isSupabaseCalled };

// --- Fixtures ---

// 시나리오 1: 로그인 완전 성공
export const loginSuccessTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockSuccessLogin(page);
    await use(page);
  },
});

// 시나리오 2: 캡챠 인증 실패
export const loginCaptchaFailTest = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    // Supabase API는 호출되지 않아야 하지만, 만약을 위해 성공으로 모킹
    await mockSuccessLogin(page);
    await use(page);
  },
});

// 시나리오 3: 잘못된 자격 증명 입력 (API 실패)
export const loginCredentialFailTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockFailLogin(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
