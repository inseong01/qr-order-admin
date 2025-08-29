import { test as base } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { menuTabAPISuccess } from 'e2e/feature/menu/fixtures/index.fixture';
import { orderTabAPISuccess } from 'e2e/feature/order/fixtures/index.fixture';

import { FIXED_TIME } from '../const';
import { requestResponseSuccess } from './request.fixture';
import { requestItemResponseSuccess } from './request-item.fixture';
import { requestCategoryResponseSuccess } from './request-category.fixture';
import { creaeteTableFail, deleteTableFail, updateTableFail } from './table.fixture';

/**
 * 실패 시나리오 - 신규 좌석 생성 요청 오류
 */
export const tableTabAPITest_F1 = base.extend({
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
    await orderTabAPISuccess(page);
    await requestResponseSuccess(page);
    await requestItemResponseSuccess(page);
    await requestCategoryResponseSuccess(page);

    // 사용자 설정 요청 모킹
    await creaeteTableFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 좌석 위치 및 크기 변경 요청 오류
 */
export const tableTabAPITest_F2 = base.extend({
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
    await orderTabAPISuccess(page);
    await requestResponseSuccess(page);
    await requestItemResponseSuccess(page);
    await requestCategoryResponseSuccess(page);

    // 사용자 설정 요청 모킹
    await updateTableFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 좌석 삭제 요청 오류
 */
export const tableTabAPITest_F3 = base.extend({
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
    await orderTabAPISuccess(page);
    await requestResponseSuccess(page);
    await requestItemResponseSuccess(page);
    await requestCategoryResponseSuccess(page);

    // 사용자 설정 요청 모킹
    await deleteTableFail(page);

    await use(page);
  },
});
