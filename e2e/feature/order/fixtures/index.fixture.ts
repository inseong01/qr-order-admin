import { test as base, Page } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { tableTabAPISuccess } from 'e2e/feature/table/fixtures/index.fixture';
import { menuTabAPISuccess } from 'e2e/feature/menu/fixtures/index.fixture';
import { orderResponseFail, orderResponseSuccess, updateOrderSuccess } from './order.fixture';
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
 * 주문 탭 기본 호출 실패
 * : order, order_category
 */
export async function orderTabAPIFail(page: Page) {
  await orderResponseFail(page);
  await orderItemResponseFail(page);
}

// --- Fixtures ---

// 시나리오 1: 신규 주문 접수 및 완료 처리
export const orderTabAPITest_S1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    // 사전 요청 목킹
    await tableTabAPISuccess(page);
    await menuTabAPISuccess(page);

    // 사용자 설정 요청 모킹
    await updateOrderSuccess(page);

    await use(page);
  },
});
