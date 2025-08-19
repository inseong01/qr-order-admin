import { Page, test as base } from '@playwright/test';
import { mockFailTurnstile, mockSuccessTurnstile } from './captcha.fixture';

let isSupabaseCalled = false;

/** 비밀번호 찾기 성공 모킹 */
export async function mockRecoveryPasswordSuccess(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/recover**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {},
      }),
    });
  });
}

/** 비밀번호 찾기 실패 모킹 */
export async function mockRecoveryPasswordFail(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/recover**', (route) => {
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

// 시나리오 1: 비밀번호 찾기 성공
export const recoveryPasswordSuccessTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 2: 비밀번호 찾기 성공 - 존재하지 않는 이메일
export const recoveryPasswordSuccessNonexistentEmailTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 3: 비밀번호 찾기 실패 - 캡챠 토큰 무효
export const recoveryPasswordFailInvalidCaptcha = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    await mockRecoveryPasswordFail(page);
    await use(page);
  },
});

// 시나리오 4: 비밀번호 찾기 실패 - 잘못된 이메일 형식
export const recoveryPasswordFailInvalidFormatTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordSuccess(page);
    await use(page);
  },
});

// 시나리오 5: 비밀번호 찾기 실패 - 인증 토큰 무효
export const recoveryPasswordFailInvalidToken = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordFail(page);
    await use(page);
  },
});
