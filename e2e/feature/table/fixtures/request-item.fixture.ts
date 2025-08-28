import { Page } from '@playwright/test';

import mockRequestItems from '../mock/request_item.test.json' assert { type: 'json' };

export const REQUEST_ITEM_API_REX = /.*supabase\.co\/rest\/v1\/request_item(?:\/.*|\?.*|$)/;

/**
 * select request_item (success)
 * - request_item 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function requestItemResponseSuccess(page: Page, data?: []) {
  await page.route(REQUEST_ITEM_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data ?? mockRequestItems),
    });
  });
}

/**
 * select request_item (fail)
 * - request_item 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function requestItemResponseFail(page: Page) {
  await page.route(REQUEST_ITEM_API_REX, async (route) => {
    await route.fulfill({
      status: 405,
      contentType: 'application/json',
    });
  });
}
