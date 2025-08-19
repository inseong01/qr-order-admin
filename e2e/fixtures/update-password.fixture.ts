import { Page, test as base } from '@playwright/test';

import { mockFailTurnstile, mockSuccessTurnstile } from './captcha.fixture';
import { TEST_SESSION_VALUE } from 'e2e/const';

let isSupabaseCalled = false;

/** 비밀번호 재설정 성공 모킹 */
export async function mockUpdatePasswordSuccess(page: Page) {
  isSupabaseCalled = false;
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
}

/** 비밀번호 재설정 실패 모킹 */
export async function mockUpdatePasswordFail(page: Page) {
  isSupabaseCalled = false;
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
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 2: 비밀번호 재설정 실패 - 캡챠 토큰 무효
export const updatePasswordFailInvalidCaptchaTest = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    await mockUpdatePasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 3: 비밀번호 재설정 실패 - 잘못된 비밀번호 형식
export const updatePasswordFailInvalidFormatTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 4: 비밀번호 재설정 실패 - 인증 토큰 무효
export const updatePasswordFailInvalidToken = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordFail(page);
    await use(page);
  },
});
