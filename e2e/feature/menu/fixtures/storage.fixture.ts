import { Page } from '@playwright/test';
import { mockMenu } from '../const';

export const STORAGE_API_REX = /.*supabase\.co\/storage\/v1\/object(\/|\$|\?)./;

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
  await page.route(STORAGE_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
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
  await page.route(STORAGE_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      await route.fulfill({
        status: 204,
        contentType: 'application/json',
        body: JSON.stringify([mockMenu.img_url]), // FileObject
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
 * post storage
 * - storage PUT 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function postImageFail(page: Page) {
  await page.route(STORAGE_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      await route.fulfill({
        status: 405,
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
 * PUT storage
 * - storage PUT 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function putImageFail(page: Page) {
  await page.route(STORAGE_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'PUT') {
      await route.fulfill({
        status: 405,
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
 * - storage DELETE 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function deleteImageFail(page: Page) {
  await page.route(STORAGE_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      await route.fulfill({
        status: 405,
        contentType: 'application/json',
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
