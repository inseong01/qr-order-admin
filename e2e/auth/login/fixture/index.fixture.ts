import { Page } from '@playwright/test';

import { TEST_ACCESS_TOKEN, TEST_ACCOUNT, TEST_REFRESH_TOKEN } from '../../common/const';

/**
 * Supabase 로그인 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function mockSuccessLogin(page: Page) {
  let isSupabaseCalled = false;

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
export async function mockFailLogin(page: Page) {
  let isSupabaseCalled = false;

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
