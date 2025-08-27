import { test, expect } from '@playwright/test';
import {
  tableTabAPITest_S1,
  tableTabAPITest_S2,
  tableTabAPITest_S3,
  tableTabAPITest_S4,
} from './fixtures/index.success.fixture';
import { FIRST_TABLE_POS, MODAL_QR_CODE_POS, SECOND_TABLE_POS } from './const';

/**
 * @file 좌석 관리 E2E 테스트
 * @description [성공] 좌석 관리 기능의 End-to-End 시나리오를 검증합니다.
 *   - 좌석 생성, 수정, 삭제, QR 확인 및 다운로드, 토스트 알림 확인
 */
test.describe('[성공] 좌석 관리', () => {
  test.describe.configure({ mode: 'serial' });

  /**
   * 각 테스트 실행 전 초기화
   * - 페이지 새로고침 및 좌석 탭 진입
   */
  test.beforeEach(async ({ page }) => {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.goto('/');
    await page.getByText('좌석').click();
  });

  /**
   * [성공] 신규 좌석 생성 - 위치와 크기 반영, 토스트 알림 확인
   * - 사용자 조작, API 모킹, 스냅샷, 토스트 알림 확인
   */
  tableTabAPITest_S1(
    '신규 좌석 생성 시, 위치와 크기가 반영되어야 하며 새로고침 후에도 유지되어야 한다',
    async ({ page }) => {
      // 1. 좌석 탭 확인
      await expect(page).toHaveScreenshot('init-tab.png');

      // 2. 위젯 '열기' 클릭
      await page.getByText('열기').click();

      // 3. '좌석 추가' 클릭
      await page.getByText('좌석 추가').click({ delay: 200 });

      // 4. 편집 모드 진입 후 스냅샷
      await expect(page).toHaveScreenshot('before-create.png');

      // 5. '추가하기' 클릭
      await page.getByText('추가하기').click({ delay: 800 });

      // 6. 확인 모달에서 '예' 클릭
      await page.getByText('예').click();

      // 7. 토스트 알림 '추가되었습니다.' 확인
      await expect(page.getByText('추가되었습니다.')).toBeVisible();
      await expect(page.getByText('추가되었습니다.')).not.toBeVisible();

      // 8. 편집 모드 종료 후 스냅샷
      await expect(page).toHaveScreenshot('after-create.png');

      // 9. 새로고침 이후 생성된 좌석 확인
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByText('좌석').click();
      await expect(page).toHaveScreenshot('after-create.png');
    }
  );

  /**
   * [성공] 좌석 선택 및 수정 - 수정 UI 반영, 스냅샷 확인
   * - 사용자 조작, UI 반영, 스냅샷 확인
   */
  tableTabAPITest_S2(
    '좌석 선택 시, 수정 툴이 표시되고 다른 좌석을 누르면 이전 수정 툴은 새로운 좌석으로 옮겨진다.',
    async ({ page }) => {
      // 1. 좌석 탭 진입 스냅샷
      await expect(page).toHaveScreenshot('init-tab.png');

      // 2. 위젯 '열기' 클릭
      await page.getByText('열기').click();

      // 3. '좌석 수정' 클릭
      await page.getByText('좌석 수정').click({ delay: 200 });

      // 4. 편집 모드 진입 후 스냅샷
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

      // 9. 토스트 알림 '수정되었습니다.' 확인
      await expect(page.getByText('수정되었습니다.')).toBeVisible();
      await expect(page.getByText('수정되었습니다.')).not.toBeVisible();

      // 10. 편집 모드 종료 후 스냅샷
      await expect(page).toHaveScreenshot('after-edit.png');

      // 11. 새로고침 이후 생성된 좌석 확인
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByText('좌석').click();
      await expect(page).toHaveScreenshot('reload-edit.png');
    }
  );

  /**
   * [성공] 좌석 삭제 - 삭제 반영, 토스트 알림 확인, 스냅샷 확인
   * - 사용자 조작, DELETE 요청 확인, 토스트 알림, 스냅샷 확인
   */
  tableTabAPITest_S3(
    '좌석 삭제 시, 좌석 캔버스에서 삭제되고 새로고침 후에도 삭제된 좌석이 제외되어야 한다',
    async ({ page }) => {
      // 1. 좌석 탭 진입 스냅샷
      await expect(page).toHaveScreenshot('init-tab.png');

      // 2. 위젯 '열기' 클릭
      await page.getByText('열기').click();

      // 3. '좌석 삭제' 클릭
      await page.getByText('좌석 삭제').click({ delay: 200 });

      // 4. 편집 모드 진입 후 스냅샷
      await expect(page).toHaveScreenshot('before-delete.png');

      // 5. 좌석 클릭
      await page.mouse.click(FIRST_TABLE_POS.X, FIRST_TABLE_POS.Y);

      // 6. 좌석 빨간 테두리 확인
      await expect(page).toHaveScreenshot('click-delete-table.png');

      // 7. '삭제하기' 클릭
      await page.getByText('삭제하기').click({ delay: 800 });

      // 8. 확인 모달에서 '예' 클릭
      await page.getByText('예').click();

      // 9. 토스트 알림 '삭제되었습니다.' 확인
      await expect(page.getByText('삭제되었습니다.')).toBeVisible();
      await expect(page.getByText('삭제되었습니다.')).not.toBeVisible();

      // 10. 편집 모드 종료 후 스냅샷
      await expect(page).toHaveScreenshot('after-delete.png');

      // 11. 새로고침 이후 생성된 좌석 확인
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByText('좌석').click();
      await expect(page).toHaveScreenshot('reload-delete.png');
    }
  );

  /**
   * [성공] 좌석 QR 확인 및 다운로드 - QR 모달, 다운로드 동작, 토스트 알림 확인
   * - 사용자 조작, 다운로드 이벤트, UI 반영, 토스트 알림 확인
   */
  tableTabAPITest_S4(
    '좌석 QR 확인 및 다운로드 시, 모달 및 QR 코드가 정상 표시되고 다운로드가 정상 동작해야 한다',
    async ({ page }) => {
      // 1. 좌석 탭 확인 및 클릭
      await expect(page).toHaveScreenshot('init-tab.png');
      await page.mouse.click(FIRST_TABLE_POS.X, FIRST_TABLE_POS.Y);

      // 2. 좌석 모달 확인
      await expect(page.getByTestId('submitForm')).toBeVisible();

      // 3. 좌석 모달에서 토글 UI 클릭
      await page.getByTestId('toggleBox').click();

      // 4. QR 코드 화면 전환 확인
      await expect(page).toHaveScreenshot('qr-code-modal.png');
      await expect(page.getByText('클릭하면 다운로드 됩니다.')).toBeVisible();

      // 5. QR 코드 클릭
      const [_, qrCodeDownload] = await Promise.all([
        page.mouse.click(MODAL_QR_CODE_POS.X, MODAL_QR_CODE_POS.Y),
        page.waitForEvent('download'),
      ]);

      // 6. QR 코드 파일 주소 반환 확인
      const downloadUrl = await qrCodeDownload.path();
      expect(downloadUrl).toBeTruthy();

      // 7. 좌석 모달 닫기 버튼 클릭
      await page.getByAltText('닫기').click();

      // 8. 좌석 모달 닫힘 확인
      await expect(page.getByTestId('submitForm')).not.toBeVisible();
    }
  );
});
