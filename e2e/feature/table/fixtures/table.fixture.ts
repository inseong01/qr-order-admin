import test, { Page } from '@playwright/test';

import mockInitTables from '../mock/table.init.json' assert { type: 'json' };
import mockPostedTables from '../mock/table.post.json' assert { type: 'json' };
import mockPatchedTables from '../mock/table.patch.json' assert { type: 'json' };
import mockDeletedTables from '../mock/table.delete.json' assert { type: 'json' };
import { deletedTable, newestTable, updatedTable } from '../const';

export const TABLE_ITEM_API_REX = /.*supabase\.co\/rest\/v1\/table(?:\/.*|\?.*|$)/;

let isCalled = false;

/**
 * select table (success)
 * - table GET 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function tableResponseSuccess(page: Page, data?: []) {
  await page.route(TABLE_ITEM_API_REX, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(data ?? mockInitTables),
    });
  });
}

/**
 * creaete table (success)
 * - table POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function creaeteTableSuccess(page: Page) {
  // isCalled = false;
  await page.route(TABLE_ITEM_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([newestTable]),
      });
    } else if (method === 'GET') {
      const mockData = isCalled ? mockPostedTables : mockInitTables;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    } else {
      console.error('Unexpected Error: method is not defined.');
    }
  });
}

/**
 * update table (success)
 * - table POST 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function updateTableSuccess(page: Page) {
  // isCalled = false;
  await page.route(TABLE_ITEM_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'POST') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([updatedTable]),
      });
    } else if (method === 'GET') {
      const mockData = isCalled ? mockPatchedTables : mockInitTables;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    } else {
      console.error('Unexpected Error: method is not defined.');
    }
  });
}

/**
 * delete table (success)
 * - table DELETE 요청을 모킹하여 성공 응답을 반환합니다.
 */
export async function deleteTableSuccess(page: Page) {
  // isCalled = false;
  await page.route(TABLE_ITEM_API_REX, async (route) => {
    const method = route.request().method();
    if (method === 'DELETE') {
      isCalled = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([deletedTable]),
      });
    } else if (method === 'GET') {
      const mockData = isCalled ? mockDeletedTables : mockInitTables;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    } else {
      console.error('Unexpected Error: method is not defined.');
    }
  });
}

/* FAIL */

/**
 * select table (fail)
 * - table 요청을 모킹하여 실패 응답을 반환합니다.
 */
export async function tableResponseFail(page: Page) {
  await page.route(TABLE_ITEM_API_REX, async (route) => {
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

// --- Variables ---

test.beforeEach(() => {
  isCalled = false;
});
