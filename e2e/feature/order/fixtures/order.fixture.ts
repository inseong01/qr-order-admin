import { Page } from '@playwright/test';

import mockInitOrders from './../mock/order.init.json' assert { type: 'json' };
import mockUpdatedOrders from './../mock/order.update.json' assert { type: 'json' };
import { orderItemResponseSuccess } from './order_item.fixture';

export const ORDER_API_REX = /.*supabase\.co\/rest\/v1\/order(?:\/.*|\?.*|$)/;

let isCalled = false;

/**
 * select order
 * - order 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function orderResponseSuccess(page: Page) {
  await page.route(ORDER_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockInitOrders),
    });
  });
}

/**
 * update order
 * - order PATCH 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function updateOrderSuccess(page: Page) {
  await page.route(ORDER_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'PATCH') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        // "order-2" 조리 완료 처리
        body: JSON.stringify([mockInitOrders[1]]),
      });
    } else if (method === 'GET') {
      const mockData = isCalled ? mockUpdatedOrders : mockInitOrders;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    } else {
      console.error('Unexpected Error: method is not defined.');
    }
  });

  // 주문 카테고리 모킹
  await orderItemResponseSuccess(page, 'PATCH', isCalled);
}

/**
 * order 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function orderResponseFail(page: Page) {
  await page.route(ORDER_API_REX, async (route) => {
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
