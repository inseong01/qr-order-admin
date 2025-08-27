import { test as base } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { tableTabAPISuccess } from 'e2e/feature/table/fixtures/index.fixture';
import { orderTabAPISuccess } from 'e2e/feature/order/fixtures/index.fixture';
import { createMenuSuccess, deleteMenuSuccess, updateMenuSuccess } from './menu.fixture';
import {
  createMenuCategorySuccess,
  deleteMenuCategorySuccess,
  updateMenuCategorySuccess,
} from './menu_category.fixture';
import { deleteImageSuccess } from './storage.fixture';

/* SUCCESS */

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
    await createMenuSuccess(page);
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
