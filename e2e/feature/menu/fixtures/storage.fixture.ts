import { Page } from '@playwright/test';

export const STORAGE_API_REX = /.*supabase\.co\/storage\/v1\/object(\/|\$|\?)./;

let isCalled = false;

/**
 * select strage (success)
 * - storage GET 요청을 모킹하여 성공 기본 응답을 반환합니다.
 */
export async function storageResponseSuccess(page: Page) {
  await page.route(STORAGE_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(''),
    });
  });
}

/**
 * post storage
 * - storage POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function postImageSuccess(page: Page) {
  isCalled = false;
  await page.route(STORAGE_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}), // { id: string; path: string; fullPath: string; }
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}), // { id: string; path: string; fullPath: string; }
      });
    }
  });
}

/**
 * delete storage
 * - storage DELETE 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function deleteImageSuccess(page: Page) {
  isCalled = false;
  await page.route(STORAGE_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      isCalled = true;
      await route.fulfill({
        status: 204,
        contentType: 'application/json',
        body: JSON.stringify({}), // FileObject
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}), // { id: string; path: string; fullPath: string; }
      });
    }
  });
}

// --- Variables ---
