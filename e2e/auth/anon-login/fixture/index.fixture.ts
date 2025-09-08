import { Page } from '@playwright/test';

import { TEST_ACCOUNT, TEST_ACCESS_TOKEN, TEST_REFRESH_TOKEN } from '../../common/const';

/**
 * Supabase 로그인 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function mockAnonymousLoginSuccess(page: Page) {
  await page.route('**/auth/v1/signup**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
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
      },
    });
  });
}

/**
 * Supabase 익명 로그인 요청을 모킹하여 실패 응답(400)을 반환합니다.
 */
export async function mockAnonymousLoginFail(page: Page) {
  await page.route('**/auth/v1/signup**', (route) => {
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
