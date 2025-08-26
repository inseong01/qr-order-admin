import { test as base, Page } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { tableTabAPISuccess } from 'e2e/feature/table/fixtures/index.fixture';
import { orderTabAPISuccess } from 'e2e/feature/order/fixtures/index.fixture';
import {
  creaeteMenuSuccess,
  deleteMenuSuccess,
  menuResponseFail,
  menuResponseSuccess,
  updateMenuSuccess,
} from './menu.fixture';
import {
  createMenuCategorySuccess,
  deleteMenuCategorySuccess,
  menuCategoryResponseFail,
  menuCategoryResponseSuccess,
  updateMenuCategorySuccess,
} from './menu_category.fixture';
import { deleteImageSuccess } from './storage.fixture';

/**
 * 주문 탭 기본 호출 성공
 * : menu, menu_category
 */
export async function menuTabAPISuccess(page: Page) {
  await menuResponseSuccess(page);
  await menuCategoryResponseSuccess(page);
}

/**
 * 주문 탭 빈 데이터 호출 성공
 * : menu, menu_category
 */
export async function menuTabAPIEmptySuccess(page: Page) {
  await menuResponseSuccess(page, []);
  await menuCategoryResponseSuccess(page, []);
}

/**
 * 주문 탭 기본 호출 실패
 * : menu, menu_category
 */
export async function menuTabAPIFail(page: Page) {
  await menuResponseFail(page);
  await menuCategoryResponseFail(page);
}

// --- Fixtures ---

/**
 * 시나리오 1: 신규 메뉴 카테고리 및 메뉴 항목 추가
 */
export const menuTabAPITest_S1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    // 사전 요청 목킹
    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    // 사용자 설정 요청 모킹
    await creaeteMenuSuccess(page);
    await createMenuCategorySuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 2: 메뉴 항목 수정
 */
export const menuTabAPITest_S2 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    // 사전 요청 목킹
    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    // 사용자 설정 요청 모킹
    await updateMenuSuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 3: 메뉴 카테고리 수정
 */
export const menuTabAPITest_S3 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    // 사전 요청 목킹
    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    // 사용자 설정 요청 모킹
    await updateMenuCategorySuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 4: 메뉴 항목 삭제
 */
export const menuTabAPITest_S4 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    // 사전 요청 목킹
    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    // 사용자 설정 요청 모킹
    await deleteMenuSuccess(page);
    await deleteImageSuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 5: 메뉴 카테고리 삭제
 */
export const menuTabAPITest_S5 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    // 사전 요청 목킹
    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    // 사용자 설정 요청 모킹
    await deleteMenuCategorySuccess(page);
    await deleteImageSuccess(page);

    await use(page);
  },
});
