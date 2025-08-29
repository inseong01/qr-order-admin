import { Page } from '@playwright/test';

import mockRequests from '../mock/request.test.json' assert { type: 'json' };

export const REQUEST_API_REX = /.*supabase\.co\/rest\/v1\/request(?:\/.*|\?.*|$)/;

/**
 * select request (success)
 * request 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function requestResponseSuccess(page: Page, data?: []) {
  await page.route(REQUEST_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data ?? mockRequests),
    });
  });
}

/**
 * select request (fail)
 * - request 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function requestResponseFail(page: Page) {
  await page.route(REQUEST_API_REX, async (route) => {
    await route.fulfill({
      status: 405,
      contentType: 'application/json',
    });
  });
}
