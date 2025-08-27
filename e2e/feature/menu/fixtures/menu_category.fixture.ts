import { Page } from '@playwright/test';

import mockMenus from './../mock/menu.init.json' assert { type: 'json' };
import mockMenuCategories from '../mock/menu_category.init.json' assert { type: 'json' };
import { newCategory, newMenu, updatedCategory } from '../const';
import { MENU_API_REX } from './menu.fixture';

export const MENU_CATEGORY_API_REX = /.*supabase\.co\/rest\/v1\/menu_category(?:\/.*|\?.*|$)/;

let isCalled = false;

/* SUCCESS */

/**
 * select menuCategory (success)
 * - menuCategory GET 요청을 모킹하여 성공 기본 응답을 반환합니다.
 */
export async function menuCategoryResponseSuccess(page: Page, data?: []) {
  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data ?? mockMenuCategories),
    });
  });
}

/**
 * creaete menuCategory
 * - menuCategory POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function createMenuCategorySuccess(page: Page) {
  isCalled = false;

  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ title: newCategory.title }]),
      });
    } else {
      const mockData = isCalled ? [newCategory] : [];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * upsert menuCategory
 * - menuCategory POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function updateMenuCategorySuccess(page: Page) {
  isCalled = false;
  // select menu
  await page.route(MENU_API_REX, async (route) => {
    const mockData = isCalled ? [{ ...newMenu, menu_category: updatedCategory }] : [newMenu];
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData),
    });
  });

  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ title: updatedCategory.title }),
      });
    } else {
      const mockData = isCalled ? [updatedCategory] : [newCategory];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * delete menuCategory
 * - menuCategory DELETE 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function deleteMenuCategorySuccess(page: Page) {
  isCalled = false;
  // select menu
  await page.route(MENU_API_REX, async (route) => {
    const mockData = isCalled ? [] : mockMenus;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData),
    });
  });

  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      isCalled = true;
      await route.fulfill({
        status: 204,
        contentType: 'application/json',
        body: JSON.stringify([mockMenuCategories[0]]),
      });
    } else {
      const mockData = isCalled ? [] : mockMenuCategories;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/* FAIL */

/**
 * select menuCategory (fail)
 * - menuCategory GET 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function menuCategoryResponseFail(page: Page) {
  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 405,
      contentType: 'application/json',
      headers: {
        'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
        'x-supabase-api-version': '2024-01-01',
      },
    });
  });
}

/**
 * creaete menuCategory (fail)
 * - menuCategory POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function createMenuCategoryFail(page: Page) {
  isCalled = false;

  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 405,
        contentType: 'application/json',
        headers: {
          'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
          'x-supabase-api-version': '2024-01-01',
        },
      });
    } else {
      const mockData = isCalled ? mockMenuCategories : mockMenuCategories;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * upsert menuCategory (fail)
 * - menuCategory POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function updateMenuCategoryFail(page: Page) {
  isCalled = false;
  // select menu
  await page.route(MENU_API_REX, async (route) => {
    const mockData = isCalled ? mockMenus : mockMenus;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData),
    });
  });

  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 405,
        contentType: 'application/json',
        headers: {
          'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
          'x-supabase-api-version': '2024-01-01',
        },
      });
    } else {
      const mockData = isCalled ? mockMenuCategories : mockMenuCategories;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * delete menuCategory (fail)
 * - menuCategory DELETE 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function deleteMenuCategoryFail(page: Page) {
  isCalled = false;
  // select menu
  await page.route(MENU_API_REX, async (route) => {
    const mockData = isCalled ? mockMenus : mockMenus;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData),
    });
  });

  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      isCalled = true;
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        headers: {
          'access-control-expose-headers': 'X-Total-Count, Link, X-Supabase-Api-Version',
          'x-supabase-api-version': '2024-01-01',
        },
        json: {
          code: 'bad_jwt',
          message: 'JWT sent in the Authorization header is not valid.',
        },
      });
    } else {
      const mockData = isCalled ? mockMenuCategories : mockMenuCategories;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}
