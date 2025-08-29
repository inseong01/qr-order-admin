import { Page } from '@playwright/test';

import { tableResponseFail, tableResponseSuccess } from './table.fixture';
import { requestResponseFail, requestResponseSuccess } from './request.fixture';
import { requestItemResponseFail, requestItemResponseSuccess } from './request-item.fixture';
import { requestCategoryResponseFail, requestCategoryResponseSuccess } from './request-category.fixture';

/**
 * 좌석 탭 기본 호출 성공
 * : table, request, request_item, request_category
 */
export async function tableTabAPISuccess(page: Page) {
  await tableResponseSuccess(page);
  await requestResponseSuccess(page);
  await requestItemResponseSuccess(page);
  await requestCategoryResponseSuccess(page);
}

/**
 * 좌석 탭 빈 데이터 호출 성공
 * : table, request, request_item, request_category
 */
export async function tableTabAPIEmptySuccess(page: Page) {
  await tableResponseSuccess(page, []);
  await requestResponseSuccess(page, []);
  await requestItemResponseSuccess(page, []);
  await requestCategoryResponseSuccess(page, []);
}

/**
 * 좌석 탭 기본 호출 실패
 * : table, request, request_item, request_category
 */
export async function tableTabAPIFail(page: Page) {
  await tableResponseFail(page);
  await requestResponseFail(page);
  await requestItemResponseFail(page);
  await requestCategoryResponseFail(page);
}
