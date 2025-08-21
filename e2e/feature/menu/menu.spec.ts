import { test, expect } from '@playwright/test';
import { menuTabAPISuccessTest } from './fixtures/index.fixture';

// 메뉴 관리 E2E 테스트
const TEST_PAGE_URL = '/';

test.describe('메뉴 관리', () => {
  test.describe('성공 시나리오', () => {
    menuTabAPISuccessTest(
      '신규 메뉴 카테고리 및 메뉴 항목 추가: 정상적으로 추가되면 화면에 표시되어야 한다',
      async ({ page }) => {
        // 1. 하단 탭에서 '메뉴' 탭 활성화 확인
        await page.goto(TEST_PAGE_URL);
        await expect(page.getByText('메뉴')).toBeVisible();

        // 2. 위젯 열기 → '분류 추가' 클릭
        await page.getByText('열기').click();
        await page.getByText('분류 추가').click();

        // 3. 모달에서 분류명 입력 → '추가하기' 클릭
        await page.getByPlaceholder('분류명을 입력해주세요').fill('신규 카테고리');
        await page.getByText('추가하기').click();

        // 4. 생성된 카테고리에서 '상품 추가' 클릭
        await expect(page.getByText('신규 카테고리')).toBeVisible();
        await page.getByText('상품 추가').click();

        // 5. 메뉴 사진, 이름, 가격, 태그 입력 → '추가하기' 클릭
        await page.setInputFiles('input[type="file"]', 'test-menu.jpg');
        await page.getByPlaceholder('메뉴명 입력').fill('신규메뉴');
        await page.getByPlaceholder('가격 입력').fill('10000');
        await page.getByPlaceholder('태그 입력').fill('추천');
        await page.getByText('추가하기').click();

        // 6. 새 카테고리와 메뉴가 화면에 정상 표시
        await expect(page.getByText('신규카테고리')).toBeVisible();
        await expect(page.getByText('신규메뉴')).toBeVisible();
      }
    );

    menuTabAPISuccessTest('메뉴 항목 수정 및 삭제: 가격 변경과 삭제가 정상 반영되어야 한다', async ({ page }) => {
      // 1. 수정할 메뉴 클릭
      await page.goto(TEST_PAGE_URL);
      await page.getByText('기존메뉴').click();

      // 2. 메뉴 수정 모달에서 가격 수정
      await page.locator('input[name="price"]').fill('15000');

      // 3. 메뉴 수정 모달에서 '수정하기' 클릭
      await page.getByText('수정하기').click();

      // 3. 수정된 메뉴 가격 확인
      await expect(page.getByText('15000')).toBeVisible();

      // 4. 수정된 메뉴 클릭
      await page.getByText('기존메뉴').click();

      // 5. 메뉴 수정 모달에서 '삭제하기' 클릭
      await page.getByText('삭제하기').click();

      // 6. 메뉴 목록에서 항목 삭제 확인
      await expect(page.getByText('기존메뉴')).not.toBeVisible();
    });

    menuTabAPISuccessTest('메뉴 카테고리 수정 및 삭제: 이름 변경과 삭제가 정상 반영되어야 한다', async ({ page }) => {
      // 1. 위젯 클릭
      await page.goto(TEST_PAGE_URL);
      await page.getByText('열기').click();

      // 2. '분류 수정' 클릭
      await page.getByText('분류 수정').click();

      // 3. 수정할 메뉴 카테고리 선택
      await page.getByText('기존 카테고리').click();

      // 4. 새 이름 입력
      await page.getByPlaceholder('분류명을 작성해주세요').fill('변경 카테고리');

      // 5. '수정하기' 클릭
      await page.getByText('수정하기').click();

      // 5. 확인 모달 '예' 클릭
      await page.getByText('예').click();

      // 6. '분류 삭제' 클릭
      await page.getByText('분류 삭제').click();

      // 7. 삭제할 카테고리 선택
      await page.getByText('변경 카테고리').click();

      // 9. '삭제하기' 클릭
      await page.getByText('삭제하기').click();

      // 9. 확인 모달 '예' 클릭
      await page.getByText('예').click();

      // 10. 카테고리 이름 변경 및 삭제 확인
      await expect(page.getByText('변경된 카테고리 이름')).not.toBeVisible();
    });
  });
});
