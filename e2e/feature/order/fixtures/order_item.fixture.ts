import { Page } from '@playwright/test';

import mockInitOrderItems from '../mock/order-item.init.json' assert { type: 'json' };
import mockUpdatedOrderItems from '../mock/order-item.update.json' assert { type: 'json' };

export const ORDER_ITEM_API_REX = /.*supabase\.co\/rest\/v1\/order_item(?:\/.*|\?.*|$)/;

/**
 * select orderItem (success)
 * - orderItem GET 요청을 모킹하여 성공 기본 응답을 반환합니다.
 */
export async function orderItemResponseSuccess(page: Page, method: string, isCalled: boolean) {
  let mockMethodData: typeof mockUpdatedOrderItems;

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
 * select orderItem (fail)
 * - orderItem 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function orderItemResponseFail(page: Page) {
  await page.route(ORDER_ITEM_API_REX, async (route) => {
    await route.fulfill({
      status: 405,
      contentType: 'application/json',
    });
  });
}
