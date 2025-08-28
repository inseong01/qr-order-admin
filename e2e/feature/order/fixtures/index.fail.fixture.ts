import { test as base } from '@playwright/test';

import { updateOrderFail } from './order.fixture';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { menuTabAPISuccess } from 'e2e/feature/menu/fixtures/index.fixture';
import { tableTabAPISuccess } from 'e2e/feature/table/fixtures/index.fixture';

/**
 * 실패 시나리오 - 신규 주문 접수 및 완료 처리 요청 오류
 */
export const orderTabAPITest_F1 = base.extend({
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
    await updateOrderFail(page);

    await use(page);
  },
});
