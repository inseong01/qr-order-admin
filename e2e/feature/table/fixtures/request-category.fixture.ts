import { Page } from '@playwright/test';

import mockRequestCategories from '../mock/request_category.test.json' assert { type: 'json' };

export const REQUEST_CATEGORY_API_REX = /.*supabase\.co\/rest\/v1\/request_category(?:\/.*|\?.*|$)/;

/**
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
 * request_category 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function requestCategoryResponseFail(page: Page) {
  await page.route(REQUEST_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
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
