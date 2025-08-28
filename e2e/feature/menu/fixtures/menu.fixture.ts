import { Page } from '@playwright/test';

import mockMenus from './../mock/menu.init.json' assert { type: 'json' };
import mockMenuCategories from '../mock/menu_category.init.json' assert { type: 'json' };
import { newCategory, newMenu, updatedMenu } from '../const';
import { MENU_CATEGORY_API_REX } from './menu_category.fixture';

export const MENU_API_REX = /.*supabase\.co\/rest\/v1\/menu(?:\/.*|\?.*|$)/;

/**
 * select menu (success)
 * - menu GET 요청을 모킹하여 성공 기본 응답을 반환합니다.
 */
export async function menuResponseSuccess(page: Page, data?: []) {
  await page.route(MENU_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data ?? mockMenus),
    });
  });
}

/**
 * create menu
 * - menu POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function createMenuSuccess(page: Page) {
  let isCalled = false;

  await page.route(MENU_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([newMenu]),
      });
    } else {
      const mockData = isCalled ? [newMenu] : [];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * update menu
 * - menu PATCH 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function updateMenuSuccess(page: Page) {
  let isCalled = false;

  // select menu_category
  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([newCategory]),
    });
  });

  await page.route(MENU_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'PATCH') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([updatedMenu]),
      });
    } else {
      const mockData = isCalled ? [...mockMenus, updatedMenu] : [...mockMenus, newMenu];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * delete menu
 * - menu DELETE 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function deleteMenuSuccess(page: Page) {
  let isCalled = false;

  // select menu_category
  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([newCategory]),
    });
  });

  await page.route(MENU_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      isCalled = true;
      await route.fulfill({
        status: 204,
        contentType: 'application/json',
        body: JSON.stringify([newMenu]),
      });
    } else {
      const mockData = isCalled ? [] : [newMenu];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * select menu (fail)
 * - menu GET 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function menuResponseFail(page: Page) {
  await page.route(MENU_API_REX, async (route) => {
    await route.fulfill({
      status: 405,
      contentType: 'application/json',
    });
  });
}

/**
 * create menu (fail)
 * - menu POST 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function createMenuFail(page: Page) {
  await page.route(MENU_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      await route.fulfill({
        status: 405,
        contentType: 'application/json',
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockMenus),
      });
    }
  });
}

/**
 * update menu (fail)
 * - menu PATCH 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function updateMenuFail(page: Page) {
  let isCalled = false;

  // select menu_category
  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockMenuCategories),
    });
  });

  await page.route(MENU_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'PATCH') {
      isCalled = true;
      await route.fulfill({
        status: 405,
        contentType: 'application/json',
      });
    } else {
      const mockData = isCalled ? [...mockMenus] : [...mockMenus];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}

/**
 * delete menu (fail)
 * - menu DELETE 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function deleteMenuFail(page: Page) {
  let isCalled = false;

  // select menu_category
  await page.route(MENU_CATEGORY_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockMenuCategories),
    });
  });

  await page.route(MENU_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      isCalled = true;
      await route.fulfill({
        status: 405,
        contentType: 'application/json',
      });
    } else {
      const mockData = isCalled ? [...mockMenus] : [...mockMenus];
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    }
  });
}
