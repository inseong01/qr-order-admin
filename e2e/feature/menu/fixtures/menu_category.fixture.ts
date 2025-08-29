import { Page } from '@playwright/test';

import mockMenus from './../mock/menu.init.json' assert { type: 'json' };
import mockMenuCategories from '../mock/menu_category.init.json' assert { type: 'json' };
import { newCategory, newMenu, updatedCategory } from '../const';
import { MENU_API_REX } from './menu.fixture';

export const MENU_CATEGORY_API_REX = /.*supabase\.co\/rest\/v1\/menu_category(?:\/.*|\?.*|$)/;

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
  let isCalled = false;

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
  let isCalled = false;

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
  let isCalled = false;

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

/**
 * select menuCategory (fail)
 * - menuCategory GET 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function menuCategoryResponseFail(page: Page) {
  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 405,
      contentType: 'application/json',
    });
  });
}

/**
 * creaete menuCategory (fail)
 * - menuCategory POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function createMenuCategoryFail(page: Page) {
  let isCalled = false;

  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 405,
        contentType: 'application/json',
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
  let isCalled = false;

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
