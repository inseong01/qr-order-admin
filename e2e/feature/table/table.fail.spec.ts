import { test, expect } from '@playwright/test';
import { FIRST_TABLE_POS, SECOND_TABLE_POS, TEST_PAGE_URL } from './const';
import { tableTabAPITest_F1, tableTabAPITest_F2, tableTabAPITest_F3 } from './fixtures/index.fail.fixture';

/**
 * @file 좌석 관리 E2E 테스트
 * @description [실패] 좌석 관리 기능의 End-to-End 시나리오를 검증합니다.
 *   - 좌석 생성, 수정, 삭제, QR 확인 및 다운로드, 토스트 알림 확인
 */
test.describe('[실패] 좌석 관리', () => {
  test.describe.configure({ mode: 'serial' });

  /**
   * 각 테스트 실행 전 초기화
   * - 페이지 새로고침 및 좌석 탭 진입
   */
  test.beforeEach(async ({ page }) => {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.goto(TEST_PAGE_URL);
    await page.getByText('좌석').click();
  });

  /**
   * [실패] 신규 좌석 생성 오류 - 위치와 크기 미반영, 토스트 알림 확인
   * - 사용자 조작, API 모킹, 스냅샷, 토스트 알림 확인
   */
  tableTabAPITest_F1('신규 좌석 생성 실패 - 생성 반영 안 되고 새로고침 후에도 동일', async ({ page }) => {
    // 1. 좌석 탭 확인
    await expect(page).toHaveScreenshot('init-table-tab.png');

    // 2. 위젯 '열기' 클릭
    await page.getByText('열기').click();

    // 3. '좌석 추가' 클릭
    await page.getByText('좌석 추가').click({ delay: 200 });

    // 4. 편집 모드 진입 후 스냅샷
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('before-create.png');

    // 5. '추가하기' 클릭
    await page.getByText('추가하기').click({ delay: 800 });

    // 6. 확인 모달에서 '예' 클릭
    await page.getByText('예').click();

    // 7. 토스트 알림 '오류가 발생했습니다.' 확인
    await expect(page.getByText('오류가 발생했습니다.')).toBeVisible();
    await expect(page.getByText('오류가 발생했습니다.')).not.toBeVisible();

    // 8. 편집 모드 종료 후 스냅샷
    await expect(page).toHaveScreenshot('init-table-tab.png');

    // 9. 새로고침 이후 생성된 좌석 확인
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByText('좌석').click();
    await expect(page).toHaveScreenshot('init-table-tab.png');
  });

  /**
   * [실패] 좌석 선택 및 수정 오류 - 수정 UI 미반영, 스냅샷 확인
   * - 사용자 조작, UI 미반영, 스냅샷 확인
   */
  tableTabAPITest_F2('좌석 수정 실패 - 수정 반영 안 되고 새로고침 후에도 동일', async ({ page }) => {
    // 1. 좌석 탭 진입 스냅샷
    await expect(page).toHaveScreenshot('init-table-tab.png');

    // 2. 위젯 '열기' 클릭
    await page.getByText('열기').click();

    // 3. '좌석 수정' 클릭
    await page.getByText('좌석 수정').click({ delay: 200 });

    // 4. 편집 모드 진입 후 스냅샷
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('before-edit.png');

    // 5. 수정할 좌석 선택
    await page.mouse.click(FIRST_TABLE_POS.X, FIRST_TABLE_POS.Y);
    await expect(page).toHaveScreenshot('click-edit-table-1.png');

    // 6. 다른 좌석 선택
    await page.mouse.click(SECOND_TABLE_POS.X, SECOND_TABLE_POS.Y);
    await expect(page).toHaveScreenshot('click-edit-table-2.png');

    // 7. '수정하기' 클릭
    await page.getByText('수정하기').click({ delay: 800 });

    // 8. 확인 모달에서 '예' 클릭
    await page.getByText('예').click();

    // 9. 토스트 알림 '오류가 발생했습니다.' 확인
    await expect(page.getByText('오류가 발생했습니다.')).toBeVisible();
    await expect(page.getByText('오류가 발생했습니다.')).not.toBeVisible();

    // 10. 편집 모드 종료 후 스냅샷
    await expect(page).toHaveScreenshot('init-table-tab.png');

    // 11. 새로고침 이후 생성된 좌석 확인
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByText('좌석').click();
    await expect(page).toHaveScreenshot('init-table-tab.png');
  });

  /**
   * [실패] 좌석 삭제 - 삭제 미반영, 토스트 알림 확인, 스냅샷 확인
   * - 사용자 조작, DELETE 요청 확인, 토스트 알림, 스냅샷 확인
   */
  tableTabAPITest_F3('좌석 삭제 실패 - 삭제 반영 안 되고 새로고침 후에도 동일', async ({ page }) => {
    // 1. 좌석 탭 진입 스냅샷
    await expect(page).toHaveScreenshot('init-table-tab.png');

    // 2. 위젯 '열기' 클릭
    await page.getByText('열기').click();

    // 3. '좌석 삭제' 클릭
    await page.getByText('좌석 삭제').click({ delay: 200 });

    // 4. 편집 모드 진입 후 스냅샷
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('before-delete.png');

    // 5. 좌석 클릭
    await page.mouse.click(FIRST_TABLE_POS.X, FIRST_TABLE_POS.Y);

    // 6. 좌석 빨간 테두리 확인
    await expect(page).toHaveScreenshot('click-delete-table.png');

    // 7. '삭제하기' 클릭
    await page.getByText('삭제하기').click({ delay: 800 });

    // 8. 확인 모달에서 '예' 클릭
    await page.getByText('예').click();

    // 9. 토스트 알림 '오류가 발생했습니다.' 확인
    await expect(page.getByText('오류가 발생했습니다.')).toBeVisible();
    await expect(page.getByText('오류가 발생했습니다.')).not.toBeVisible();

    // 10. 편집 모드 종료 후 스냅샷
    await expect(page).toHaveScreenshot('init-table-tab.png');

    // 11. 새로고침 이후 생성된 좌석 확인
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByText('좌석').click();
    await expect(page).toHaveScreenshot('init-table-tab.png');
  });
});
