import { Page } from '@playwright/test';

import mockRequestCategories from '../mock/request_category.test.json' assert { type: 'json' };

export const REQUEST_CATEGORY_API_REX = /.*supabase\.co\/rest\/v1\/request_category(?:\/.*|\?.*|$)/;

/**
 * select request_category (success)
 * request_category 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function requestCategoryResponseSuccess(page: Page, data?: []) {
  await page.route(REQUEST_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data ?? mockRequestCategories),
    });
  });
}

/**
 * select request_category (fail)
 * - request_category 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function requestCategoryResponseFail(page: Page) {
  await page.route(REQUEST_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 405,
      contentType: 'application/json',
    });
  });
}
