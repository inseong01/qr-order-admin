import { Browser, Page } from '@playwright/test';

import { TEST_SESSION_VALUE } from 'e2e/auth/common/const';

/** 비밀번호 재설정 성공 모킹 */
export async function mockUpdatePasswordSuccess(page: Page, browser: Browser) {
  await page.route(/.*supabase\.co\/auth\/v1\/verify.*/, async (route, request) => {
    const url = new URL(request.url());
    const redirectTo = url.searchParams.get('redirect_to');

    const browserType = browser.browserType().name();

    // webkit fulfill 리다이렉션 오류 우회 적용
    if (browserType === 'webkit') {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `<html><head><meta http-equiv="refresh" content="0;url=${redirectTo}"></head></html>`,
      });
    } else {
      await route.fulfill({
        status: 303,
        contentType: 'text/plain',
        headers: {
          location: `${redirectTo}`,
        },
      });
    }
  });

  await page.route('**/auth/v1/user**', (route) => {
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

  await page.route('**/auth/v1/logout**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: {
        data: {},
      },
    });
  });
}

/** 비밀번호 재설정 실패 모킹 */
export async function mockUpdatePasswordFail(page: Page, browser: Browser) {
  await page.route(/.*supabase\.co\/auth\/v1\/verify.*/, async (route, request) => {
    const url = new URL(request.url());
    const redirectTo = url.searchParams.get('redirect_to');

    const browserType = browser.browserType().name();

    // webkit fulfill 리다이렉션 오류 우회 적용
    if (browserType === 'webkit') {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `<html><head><meta http-equiv="refresh" content="0;url=${redirectTo}"></head></html>`,
      });
    } else {
      await route.fulfill({
        status: 303,
        contentType: 'text/plain',
        headers: {
          location: `${redirectTo}`,
        },
      });
    }
  });

  await page.route('**/auth/v1/user**', (route) => {
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
