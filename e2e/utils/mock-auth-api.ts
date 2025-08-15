import { test as base, expect, Page } from '@playwright/test';
import {
  TEST_ACCESS_TOKEN,
  TEST_ACCOUNT,
  TEST_CAPTCHA_TOKEN,
  TEST_CAPTCHA_WIDGET_ID,
  TEST_NONE_CAPTCHA_TOKEN,
  TEST_REFRESH_TOKEN,
} from '../const';

/* Turnstile JS 요청 */
async function mockSuccessTurnstile(page: Page, token = TEST_CAPTCHA_TOKEN) {
  await page.route(/.*\/turnstile\/v0\/.*\.js.*/, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `
      window.turnstile = {
        render: (selector, options) => {
          if (options && options.callback) {
            options.callback('${TEST_CAPTCHA_TOKEN}');
          }
          return '${TEST_CAPTCHA_WIDGET_ID}';
        },
        'error-callback': () => {},
        reset: (widgetId) => {},
        remove: (widgetId) => {}
      };
    `,
    });
  });
}

async function mockFailTurnstile(page: Page, token = TEST_NONE_CAPTCHA_TOKEN) {
  await page.route(/.*\/turnstile\/v0\/.*\.js.*/, (route) => {
    route.fulfill({
      status: 400,
      contentType: 'application/javascript',
      body: `
      window.turnstile = {
        render: (selector, options) => {
          if (options && options.callback) {
            options.callback('${TEST_NONE_CAPTCHA_TOKEN}');
          }
          return '${TEST_CAPTCHA_WIDGET_ID}';
        },
        'error-callback': () => {},
        reset: (widgetId) => {},
        remove: (widgetId) => {}
      };
    `,
    });
  });
}

let isSupabaseAPICalled = false;

/* supabase 요청 */
async function mockSuccessSupabase(page: Page) {
  isSupabaseAPICalled = true;

  // signInWithPassword
  await page.route('**/auth/v1/token**', (route) => {
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

  // 필요 시 다른 Supabase API도 추가 가능
}

async function mockFailSupabase(page: Page) {
  isSupabaseAPICalled = true;

  // signInWithPassword
  await page.route('**/auth/v1/token**', (route) => {
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

  // 필요 시 다른 Supabase API도 추가 가능
}

// fixture 확장
// 1. 성공
export const successTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockSuccessSupabase(page);
    await use(page);
  },
});

// 2. 캡챠 토큰 미발행
export const wrongVerificationTest = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    await mockSuccessSupabase(page);
    await use(page);
  },
});

// 3. 잘못된 자격 증명 입력
export const wrongInputTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockFailSupabase(page);
    await use(page);
  },
});

export { expect, isSupabaseAPICalled };
