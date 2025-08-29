import { test as base } from '@playwright/test';

import { createAuthContext } from 'e2e/auth/util/auth-context';
import { tableTabAPISuccess } from 'e2e/feature/table/fixtures/index.fixture';
import { orderTabAPISuccess } from 'e2e/feature/order/fixtures/index.fixture';
import {
  createMenuSuccess,
  createMenuFail,
  deleteMenuFail,
  deleteMenuSuccess,
  updateMenuFail,
  updateMenuSuccess,
} from './menu.fixture';
import { deleteImageFail, deleteImageSuccess, postImageFail, putImageFail } from './storage.fixture';
import { createMenuCategoryFail, updateMenuCategoryFail, updateMenuCategorySuccess } from './menu_category.fixture';

/**
 * 실패 시나리오 - 신규 메뉴 카테고리 및 메뉴 항목 추가 오류
 */
export const menuTabAPITest_F1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await createMenuFail(page);
    await createMenuCategoryFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 메뉴 항목 수정 오류
 */
export const menuTabAPITest_F2 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await updateMenuFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 메뉴 카테고리 수정 오류
 */
export const menuTabAPITest_F3 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await updateMenuCategoryFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 메뉴 항목 삭제 오류
 */
export const menuTabAPITest_F4 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    await tableTabAPISuccess(page);
    await orderTabAPISuccess(page);

    await deleteMenuFail(page);
    await deleteImageSuccess(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 메뉴 카테고리 삭제 오류
 */
export const menuTabAPITest_F5 = base.extend({
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
    await deleteImageFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 메뉴 항목 생성 시 사진 업로드 오류
 */
export const menuTabAPITest_F6 = base.extend({
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
    await updateMenuCategorySuccess(page);
    await postImageFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 메뉴 항목 수정 시 사진 업로드 오류
 */
export const menuTabAPITest_F7 = base.extend({
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
    await putImageFail(page);

    await use(page);
  },
});

/**
 * 실패 시나리오 - 메뉴 항목 삭제 시 사진 삭제 오류
 */
export const menuTabAPITest_F8 = base.extend({
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
    await deleteImageFail(page);

    await use(page);
  },
});
