import { test as base, Page } from '@playwright/test';

import { FIXED_TIME } from '../const';
import { createAuthContext } from 'e2e/auth/util/auth-context';
import { menuTabAPISuccess } from 'e2e/feature/menu/fixtures/index.fixture';
import { orderTabAPISuccess } from 'e2e/feature/order/fixtures/index.fixture';
import {
  creaeteTableSuccess,
  deleteTableSuccess,
  tableResponseFail,
  tableResponseSuccess,
  updateTableSuccess,
} from './table.fixture';
import { requestResponseFail, requestResponseSuccess } from './request.fixture';
import { requestItemResponseFail, requestItemResponseSuccess } from './request-item.fixture';
import { requestCategoryResponseFail, requestCategoryResponseSuccess } from './request-category.fixture';

/**
 * 좌석 탭 기본 호출 성공
 * : table, request, request_item, request_category
 */
export async function tableTabAPISuccess(page: Page) {
  await tableResponseSuccess(page);
  await requestResponseSuccess(page);
  await requestItemResponseSuccess(page);
  await requestCategoryResponseSuccess(page);
}

/**
 * 좌석 탭 기본 호출 실패
 * : table, request, request_item, request_category
 */
export async function tableTabAPIFail(page: Page) {
  await tableResponseFail(page);
  await requestResponseFail(page);
  await requestItemResponseFail(page);
  await requestCategoryResponseFail(page);
}

// --- Fixtures ---

/**
 * 시나리오 1: 신규 좌석 생성
 */
export const tableTabAPITest_S1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    // 사전 요청 목킹
    await menuTabAPISuccess(page);
    await orderTabAPISuccess(page);
    await requestResponseSuccess(page);
    await requestItemResponseSuccess(page);
    await requestCategoryResponseSuccess(page);

    // 사용자 설정 요청 모킹
    await creaeteTableSuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 2: 좌석 위치 및 크기 변경
 */
export const tableTabAPITest_S2 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    // 사전 요청 목킹
    await menuTabAPISuccess(page);
    await orderTabAPISuccess(page);
    await requestResponseSuccess(page);
    await requestItemResponseSuccess(page);
    await requestCategoryResponseSuccess(page);

    // 사용자 설정 요청 모킹
    await updateTableSuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 3: 좌석 삭제
 */
export const tableTabAPITest_S3 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    // 사전 요청 목킹
    await menuTabAPISuccess(page);
    await orderTabAPISuccess(page);
    await requestResponseSuccess(page);
    await requestItemResponseSuccess(page);
    await requestCategoryResponseSuccess(page);

    // 사용자 설정 요청 모킹
    await deleteTableSuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 4: 좌석 QR 확인 및 다운로드
 */
export const tableTabAPITest_S4 = base.extend({
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
    await tableTabAPISuccess(page);

    await use(page);
  },
});
