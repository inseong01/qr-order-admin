import { Page } from '@playwright/test';

import mockInitOrderItems from '../mock/order-item.init.json' assert { type: 'json' };
import mockUpdatedOrderItems from '../mock/order-item.update.json' assert { type: 'json' };

export const ORDER_ITEM_API_REX = /.*supabase\.co\/rest\/v1\/order_item(?:\/.*|\?.*|$)/;

let mockMethodData: typeof mockUpdatedOrderItems;

/**
 * select orderItem (success)
 * - orderItem GET 요청을 모킹하여 성공 기본 응답을 반환합니다.
 */
export async function orderItemResponseSuccess(page: Page, method: string, isCalled: boolean) {
  switch (method) {
    case 'PATCH': {
      mockMethodData = mockUpdatedOrderItems;
      break;
    }
    case 'GET': {
      mockMethodData = [];
      break;
    }
    default: {
      console.error('Unexpected error: order item method is not defined.');
    }
  }

  await page.route(ORDER_ITEM_API_REX, async (route) => {
    const mockData = isCalled ? mockMethodData : mockInitOrderItems;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData),
    });
  });
}

/**
 * orderItem 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function orderItemResponseFail(page: Page) {
  await page.route(ORDER_ITEM_API_REX, async (route) => {
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
