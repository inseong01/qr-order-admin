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
import { deleteImageFail, deleteImageSuccess, postImageFail } from './storage.fixture';
import { createMenuCategoryFail, updateMenuCategoryFail, updateMenuCategorySuccess } from './menu_category.fixture';

/* FAIL */

/**
 * 시나리오 6: 신규 메뉴 카테고리 및 메뉴 항목 추가 오류
 */
export const menuTabAPITest_S6 = base.extend({
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
    await createMenuFail(page);
    await createMenuCategoryFail(page);

    await use(page);
  },
});

/**
 * 시나리오 7: 메뉴 항목 수정 오류
 */
export const menuTabAPITest_S7 = base.extend({
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
    await updateMenuFail(page);

    await use(page);
  },
});

/**
 * 시나리오 8: 메뉴 카테고리 수정 오류
 */
export const menuTabAPITest_S8 = base.extend({
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
    await updateMenuCategoryFail(page);

    await use(page);
  },
});

/**
 * 시나리오 9: 메뉴 항목 삭제 오류
 */
export const menuTabAPITest_S9 = base.extend({
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
    await deleteMenuFail(page);
    await deleteImageSuccess(page);

    await use(page);
  },
});

/**
 * 시나리오 10: 메뉴 카테고리 삭제 오류
 */
export const menuTabAPITest_S10 = base.extend({
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
    await deleteImageFail(page);

    await use(page);
  },
});

/**
 * 시나리오 11: 메뉴 항목 생성 시 사진 업로드 오류
 */
export const menuTabAPITest_S11 = base.extend({
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
    await updateMenuCategorySuccess(page);
    await postImageFail(page);

    await use(page);
  },
});

/**
 * 시나리오 12: 메뉴 항목 수정 시 사진 업로드 오류
 */
export const menuTabAPITest_S12 = base.extend({
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
    await postImageFail(page);

    await use(page);
  },
});

/**
 * 시나리오 13: 메뉴 항목 삭제 시 사진 삭제 오류
 */
export const menuTabAPITest_S13 = base.extend({
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
    await deleteImageFail(page);

    await use(page);
  },
});
