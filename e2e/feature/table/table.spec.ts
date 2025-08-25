import { test, expect } from '@playwright/test';
import {
  tableTabAPITest_S1,
  tableTabAPITest_S2,
  tableTabAPITest_S3,
  tableTabAPITest_S4,
} from './fixtures/index.fixture';
import { deletedTable, initTable, newestTable, QR_CODE_DOWNLOAD_URL, updatedTable } from './const';

// 좌석 관리 E2E 테스트

test.describe('좌석 관리', () => {
  test.describe('성공 시나리오', () => {
    tableTabAPITest_S1(
      '신규 좌석 생성 시, 위치와 크기가 반영되어야 하며 새로고침 후에도 유지되어야 한다',
      async ({ page }) => {
        // 1. '좌석' 탭 선택
        await page.goto('/');
        await page.waitForTimeout(1000);
        await page.getByText('좌석').click();
        await page.waitForTimeout(1000);

        // 2. 테이블 요청 알림 확인
        await expect(page.getByText('요청')).toBeHidden();
        await page.waitForTimeout(500);
        await expect(page.getByText('요청')).toBeVisible({ timeout: 1000 });

        // 3. 위젯 '열기' 클릭
        await page.getByText('열기').click();

        // 4. '좌석 추가' 클릭
        await page.getByText('좌석 추가').click();
        await page.waitForTimeout(300);

        // 5. 좌석 생성, 편집 모드 배경 확인
        await expect(page.getByText('배경 내에서 좌석을 배치할 수 있습니다.')).toBeVisible();

        // 6. 좌석 위치 변경 및 크기 조절
        const tableLayer = page.locator(`#${newestTable?.id}`);
        const transformerLayer = page.locator('#transformer');
        const target = page.getByRole('list');
        // 정상 동작 확인 필요 - 좌표 맞는지
        await tableLayer.dragTo(target, { targetPosition: { x: 440, y: 130 } });
        await transformerLayer.dragTo(target, { targetPosition: { x: 220, y: 520 } });

        // 7. 위젯 '추가하기' 클릭
        await page.getByText('추가하기').click();
        await page.waitForTimeout(300);

        // 8. 확인 모달에서 '예' 클릭
        await page.getByText('예').click();
        await page.waitForTimeout(300);

        // 9. 토스트 알림 '추가되었습니다.' 확인
        await expect(page.getByText('추가되었습니다.')).toBeVisible();
        await page.waitForTimeout(300);
        await expect(page.getByText('추가되었습니다.')).not.toBeVisible();

        // 10. '좌석' 탭에서 생성된 좌석 확인
        await expect(page.locator(`#${newestTable?.id}`)).toBeVisible();

        // 11. 새로고침 이후 생성된 좌석 확인
        await page.reload();
        await expect(page.locator(`#${newestTable?.id}`)).toBeVisible();
      }
    );

    tableTabAPITest_S2(
      '좌석 위치 및 크기 변경 시, 변경 상태가 저장되고 새로고침 후에도 유지되어야 한다',
      async ({ page }) => {
        // 1. '좌석' 탭 선택
        await page.goto('/');
        await page.waitForTimeout(1000);
        await page.getByText('좌석').click();

        // 2. 위젯 '열기' 클릭
        await page.getByText('열기').click();

        // 3. '좌석 수정' 클릭
        await page.getByText('좌석 수정').click();
        await page.waitForTimeout(300);

        // 4. 좌석 생성, 편집 모드 배경 확인
        await expect(page.getByText('수정할 좌석을 선택해주세요.')).toBeVisible();

        // 5. 수정할 좌석 선택
        await page.locator(`#${updatedTable?.id}`).click();
        await expect(page.getByText('배경 내에서 좌석을 수정할 수 있습니다.')).toBeVisible();

        // 6. 위치 이동 및 크기 조절
        const tableLayer = page.locator(`#${newestTable?.id}`);
        const transformerLayer = page.locator('#transformer');
        const target = page.getByRole('list');
        // 정상 동작 확인 필요 - 좌표 맞는지
        await tableLayer.dragTo(target, { targetPosition: { x: 800, y: 100 } });
        await transformerLayer.dragTo(target, { targetPosition: { x: 200, y: 200 } });
        await page.waitForTimeout(300);

        // 7. '수정하기' 클릭
        await page.getByText('수정하기').click();
        await page.waitForTimeout(300);

        // 8. 확인 모달에서 '예' 클릭
        await page.getByText('예').click();
        await page.waitForTimeout(300);

        // 9. 토스트 알림 '수정되었습니다.' 확인
        await expect(page.getByText('수정되었습니다.')).toBeVisible();
        await page.waitForTimeout(300);
        await expect(page.getByText('수정되었습니다.')).not.toBeVisible();

        // 10. '좌석' 탭에서 수정된 좌석 확인
        await expect(page.locator(`#${updatedTable?.id}`)).toBeVisible();

        // 11. 새로고침 이후 수정된 좌석 확인
        await page.reload();
        await expect(page.locator(`#${updatedTable?.id}`)).toBeVisible();
      }
    );

    tableTabAPITest_S3(
      '좌석 삭제 시, 좌석 캔버스에서 삭제되고 새로고침 후에도 삭제된 좌석이 제외되어야 한다',
      async ({ page }) => {
        // 1. '좌석' 탭 선택
        await page.goto('/');
        await page.waitForTimeout(1000);
        await page.getByText('좌석').click();

        // 2. 위젯 '열기' 클릭
        await page.getByText('열기').click();

        // 3. '좌석 삭제' 클릭
        await page.getByText('좌석 삭제').click();
        await page.waitForTimeout(300);

        // 4. 좌석 클릭, 편집 모드 배경 확인
        await expect(page.getByText('삭제할 좌석을 선택해주세요.')).toBeVisible();
        await page.locator(`#${deletedTable?.id}`).click();

        // 5. 삭제할 좌석 선택 (좌석 빨간 테두리 확인)
        await expect(page.locator(`#${deletedTable?.id}`)).toHaveCSS('border-color', 'red');

        // 6. '삭제하기' 클릭
        await page.getByText('삭제하기').click();
        await page.waitForTimeout(300);

        // 7. 확인 모달에서 '예' 클릭
        await page.getByText('예').click();

        // 8. 토스트 알림 '삭제되었습니다.' 확인
        await expect(page.getByText('삭제되었습니다.')).toBeVisible();
        await page.waitForTimeout(300);
        await expect(page.getByText('삭제되었습니다.')).not.toBeVisible();

        // 9. '좌석' 탭에서 삭제된 좌석 확인
        await expect(page.locator(`#${deletedTable?.id}`)).not.toBeVisible();

        // 10. 새로고침 이후 삭제된 좌석 확인
        await page.reload();
        await page.waitForTimeout(300);
        await expect(page.locator(`#${deletedTable?.id}`)).not.toBeVisible();
      }
    );

    tableTabAPITest_S4(
      '좌석 QR 확인 및 다운로드 시, 모달 및 QR 코드가 정상 표시되고 다운로드가 정상 동작해야 한다',
      async ({ page }) => {
        // 1. '좌석' 탭 선택
        await page.goto('/');
        await page.getByText('좌석').click();

        // 2. 좌석 클릭
        await expect(page).toHaveScreenshot('init-tab.png');
        await page.mouse.click(80, 150);

        // 3. 좌석 모달 확인
        await expect(page.getByTestId('submitForm')).toBeVisible();

        // 4. 좌석 모달에서 토글 UI 클릭
        await page.getByTestId('toggleBox').click();

        // 5. QR 코드 화면 전환 확인
        await expect(page).toHaveScreenshot('qr-code-modal.png');
        await expect(page.getByText('클릭하면 다운로드 됩니다.')).toBeVisible();

        // 6. QR 코드 클릭
        const [_, qrCodeDownload] = await Promise.all([page.mouse.click(1000, 350), page.waitForEvent('download')]);

        // 7. QR 코드 파일 주소 반환 확인
        const downloadUrl = await qrCodeDownload.path();
        expect(downloadUrl).toBeTruthy();

        // 8. 좌석 모달 닫기 버튼 클릭
        await page.getByAltText('닫기').click();

        // 9. 좌석 모달 닫힘 확인
        await expect(page.getByTestId('submitForm')).not.toBeVisible();
      }
    );
  });
});
