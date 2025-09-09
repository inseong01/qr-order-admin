import { Page } from '@playwright/test';

import { TEST_ACCESS_TOKEN, TEST_ACCOUNT } from '../../common/const';

/**
 * Supabase 회원가입 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function mockSuccessSignup(page: Page) {
  await page.route('**/auth/v1/signup**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { id: TEST_ACCOUNT.ID, email: TEST_ACCOUNT.ID },
        session: { access_token: TEST_ACCESS_TOKEN },
      }),
    });
  });
}

/**
 * Supabase 회원가입 요청을 모킹하여 실패 응답 (이미 가입된 사용자)을 반환합니다.
 */
export async function mockFailSignup(page: Page) {
  await page.route('**/auth/v1/signup**', (route) => {
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      headers: {
        'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
        'x-supabase-api-version': '2024-01-01',
        'x-sb-error-code': 'email_exists', // 선택
      },
      json: {
        code: 'email_exists',
        message: 'Email address already exists in the system.',
      },
    });
  });
}
