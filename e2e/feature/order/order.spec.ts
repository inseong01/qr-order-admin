import { test, expect } from '@playwright/test';

import mockInitOrders from './mock/order.init.json' assert { type: 'json' };
import mockUpdatedOrders from './mock/order.update.json' assert { type: 'json' };

import { firstOrder, setFormattedTime } from './const';
import { orderTabAPITest_S1 } from './fixtures/index.fixture';

// 주문 처리 E2E 테스트

test.describe('주문 처리', () => {
  test.describe('성공 시나리오', () => {
    orderTabAPITest_S1(
      '신규 주문 접수 후 완료 처리 시, 주문 카드가 사라지고 완료 수가 증가해야 한다',
      async ({ page }) => {
        // 1. '주문' 탭 클릭
        await page.goto('/');
        await page.waitForTimeout(1000); // 애니메이션 등장 지연
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
        await page.waitForTimeout(300);
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
      }
    );
  });
});
