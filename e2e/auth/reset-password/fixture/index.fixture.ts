import { Page } from '@playwright/test';

/** 비밀번호 찾기 성공 모킹 */
export async function mockRecoveryPasswordSuccess(page: Page) {
  await page.route('**/auth/v1/recover**', (route) => {
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
  await page.route('**/auth/v1/recover**', (route) => {
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
