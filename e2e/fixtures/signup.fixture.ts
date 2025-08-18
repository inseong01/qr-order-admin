import { Page } from '@playwright/test';

import { test as base } from './captcha.fixture';
import { mockFailTurnstile, mockSuccessTurnstile } from './captcha.fixture';
import { TEST_ACCESS_TOKEN, TEST_ACCOUNT } from '../const';

let isSupabaseCalled = false;

/**
 * Supabase 회원가입 요청을 모킹하여 성공 응답을 반환합니다.
 * @param page Playwright Page 객체
 */
async function mockSuccessSignup(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/signup**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { id: TEST_ACCOUNT.ID, email: TEST_ACCOUNT.ID },
        session: { access_token: TEST_ACCESS_TOKEN },
        error: null,
      }),
    });
  });
}

/**
 * Supabase 회원가입 요청을 모킹하여 실패 응답 (이미 가입된 사용자)을 반환합니다.
 * @param page Playwright Page 객체
 */
async function mockFailSignup(page: Page) {
  isSupabaseCalled = false;
  await page.route('**/auth/v1/signup**', (route) => {
    isSupabaseCalled = true;
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        user: null,
        sesstion: null,
        error: { message: 'User already registered', status: 400 },
      }),
    });
  });
}

// --- Variables ---

export { isSupabaseCalled };

// --- Fixtures ---

// 시나리오 1: 회원가입 성공
export const signupSuccessTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockSuccessSignup(page);
    await use(page);
  },
});

// 시나리오 2: 캡챠 인증 실패
export const signupCaptchaFailTest = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    await mockSuccessSignup(page);
    await use(page);
  },
});

// 시나리오 3: 이미 가입된 이메일 (API 실패)
export const signupEmailExistsTest = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockFailSignup(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
