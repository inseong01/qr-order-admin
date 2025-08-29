import { test, expect } from '@playwright/test';

import mockInitOrders from './mock/order.init.json' assert { type: 'json' };
import mockUpdatedOrders from './mock/order.update.json' assert { type: 'json' };

import { firstOrder, setFormattedTime, TEST_PAGE_URL } from './const';
import { orderTabAPITest_S1 } from './fixtures/index.success.fixture';

/**
 * @file 주문 관리 E2E 테스트
 * @description [성공] 주문 기능의 End-to-End 시나리오를 검증합니다.
 *   - 신규 주문 접수, 완료 처리, 카드 UI 반영, 토스트 알림 확인
 */
test.describe('[성공] 주문 관리', () => {
  /**
   * 모든 실패 케이스 테스트 전 공통 준비 단계
   * - 테스트 페이지로 이동 후 초기화 대기
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
  });

  /**
   * [성공] 신규 주문 접수 후 완료 처리 - 카드가 사라지고 완료 수가 증가
   * - 사용자 조작, API 모킹, 토스트 알림 확인, UI 반영 검증
   */
  orderTabAPITest_S1('신규 주문 접수 후 완료 처리 - 주문 카드가 사라지고 완료 수 변동', async ({ page }) => {
    // 1. '주문' 탭 클릭
    await page.getByText('주문').click();

    // 2. '접수' 헤더 탭에서 주문 확인 (주문, 완료 개수 확인 포함)
    const notDoneOrders = mockInitOrders.filter((d) => !d.is_done);
    const doneOrders = mockInitOrders.filter((d) => d.is_done);

    await expect(page.getByText(`접수 ${notDoneOrders.length}`)).toBeVisible();
    await expect(page.getByText(`완료 ${doneOrders.length}`)).toBeVisible();
    await page.waitForTimeout(300);

    // 4. 생성된 신규 주문 카드 정보 확인
    for (const order of notDoneOrders) {
      await expect(page.getByText(`#${order.order_number}`)).toBeVisible();
      await expect(page.getByText(`테이블 ${order.table.number}`)).toBeVisible();
      await expect(page.getByText(`${setFormattedTime(order.created_at)}`)).toBeVisible();
      await expect(page.getByTestId(`complete-${order.id}`)).toBeEnabled();
    }

    // 5. '조리 완료' 클릭
    if (!firstOrder) return console.error('First order is empty!');
    await page.getByTestId(`complete-${firstOrder.id}`).click();
    await page.waitForTimeout(300);

    // 6. 확인 모달에서 '예' 클릭
    await page.getByText('예').click();
    await page.waitForTimeout(300);

    // 7. 토스트 알림 '완료되었습니다.' 확인
    await expect(page.getByText('완료되었습니다.')).toBeVisible();
    await expect(page.getByText('완료되었습니다.')).not.toBeVisible();

    // 8. '접수' 헤더 탭에서 주문 확인 (주문, 완료 개수 확인 포함)
    await expect(page.getByText(`접수 ${mockUpdatedOrders.filter((d) => !d.is_done).length}`)).toBeVisible();
    await expect(page.getByText(`완료 ${mockUpdatedOrders.filter((d) => d.is_done).length}`)).toBeVisible();

    // 9. 주문 탭에서 '완료' 헤더 탭 클릭
    await page.getByText(`완료 ${mockUpdatedOrders.filter((d) => d.is_done).length}`).click();

    // 10. 완료된 주문 카드 정보 확인
    const afterRequestOrders = mockUpdatedOrders.filter((d) => d.is_done);
    for (const order of afterRequestOrders) {
      await expect(page.getByText(`#${order.order_number}`)).toBeVisible();
      await expect(page.getByText(`테이블 ${order.table.number}`)).toBeVisible();
      await expect(page.getByText(`${setFormattedTime(order.created_at)}`)).toBeVisible();
      await expect(page.getByTestId(`complete-${order.id}`)).not.toBeEnabled();
    }
  });
});
