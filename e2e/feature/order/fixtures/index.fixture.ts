import { Page } from '@playwright/test';

import { orderResponseFail, orderResponseSuccess } from './order.fixture';
import { orderItemResponseFail, orderItemResponseSuccess } from './order_item.fixture';

/**
 * 주문 탭 기본 호출 성공
 * : order, order_category
 */
export async function orderTabAPISuccess(page: Page) {
  await orderResponseSuccess(page);
  await orderItemResponseSuccess(page, 'GET', false);
}

/**
 * 주문 탭 빈 데이터 호출 성공
 * : order, order_item
 */
export async function orderTabAPIEmptySuccess(page: Page) {
  await orderResponseSuccess(page, []);
  await orderItemResponseSuccess(page, 'GET', true);
}

/**
 * 주문 탭 기본 호출 실패
 * : order, order_category
 */
export async function orderTabAPIFail(page: Page) {
  await orderResponseFail(page);
  await orderItemResponseFail(page);
}
