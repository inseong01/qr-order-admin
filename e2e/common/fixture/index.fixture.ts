import { test as base } from '@playwright/test';

import { FIXED_TIME } from 'e2e/feature/table/const';
import { createAuthContext } from 'e2e/auth/util/auth-context';
import { menuTabAPIEmptySuccess, menuTabAPIFail, menuTabAPISuccess } from 'e2e/feature/menu/fixtures/index.fixture';
import { orderTabAPIEmptySuccess, orderTabAPIFail, orderTabAPISuccess } from 'e2e/feature/order/fixtures/index.fixture';
import { tableTabAPIEmptySuccess, tableTabAPIFail, tableTabAPISuccess } from 'e2e/feature/table/fixtures/index.fixture';

/**
 * 시나리오 1: 빈 데이터 반환 성공
 */
export const exceptionAPITest_S1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.clock.setSystemTime(FIXED_TIME);

    // 사전 요청 목킹
    await menuTabAPIEmptySuccess(page);
    await tableTabAPIEmptySuccess(page);
    await orderTabAPIEmptySuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 2: 입력 값 유효성 검사
 */
export const exceptionAPITest_S2 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.clock.setSystemTime(FIXED_TIME);

    // 사전 요청 목킹
    await menuTabAPISuccess(page);
    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 3: 초기 API 요청 오류
 */
export const exceptionAPITest_S3 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.clock.setSystemTime(FIXED_TIME);

    // 사전 요청 목킹
    await menuTabAPIFail(page);
    await tableTabAPIFail(page);
    await orderTabAPIFail(page);

    await use(page);
  },
});
