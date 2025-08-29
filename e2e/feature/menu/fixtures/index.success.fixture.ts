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

/**
 * 성공 시나리오 - 신규 메뉴 카테고리 및 메뉴 항목 추가
 */
export const menuTabAPITest_S1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await createMenuSuccess(page);
    await createMenuCategorySuccess(page);

    await use(page);
  },
});

/**
 * 성공 시나리오 - 메뉴 항목 수정
 */
export const menuTabAPITest_S2 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await updateMenuSuccess(page);

    await use(page);
  },
});

/**
 * 성공 시나리오 - 메뉴 카테고리 수정
 */
export const menuTabAPITest_S3 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await updateMenuCategorySuccess(page);

    await use(page);
  },
});

/**
 * 성공 시나리오 - 메뉴 항목 삭제
 */
export const menuTabAPITest_S4 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await deleteMenuSuccess(page);
    await deleteImageSuccess(page);

    await use(page);
  },
});

/**
 * 성공 시나리오 - 메뉴 카테고리 삭제
 */
export const menuTabAPITest_S5 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await deleteMenuCategorySuccess(page);
    await deleteImageSuccess(page);

    await use(page);
  },
});
