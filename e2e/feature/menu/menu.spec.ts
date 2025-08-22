import { expect, test } from '@playwright/test';

import { newCategory, newMenu, updatedCategory, updatedMenu } from './const';
import mockMenus from './mock/menu.test.json' assert { type: 'json' };
import {
  menuTabAPITest_S1,
  menuTabAPITest_S2,
  menuTabAPITest_S3,
  menuTabAPITest_S4,
  menuTabAPITest_S5,
} from './fixtures/index.fixture';

// 메뉴 관리 E2E 테스트
const TEST_PAGE_URL = '/' as const;

test.describe('메뉴 관리', () => {
  test.describe.configure({ mode: 'serial' });

  test.describe('성공 시나리오', () => {
    menuTabAPITest_S1(
      '신규 메뉴 카테고리 및 메뉴 항목 추가: 정상적으로 추가되면 화면에 표시되어야 한다',
      async ({ page }) => {
        // 1. 페이지 이동 및 초기 UI 확인
        await page.goto(TEST_PAGE_URL);
        await expect(page.locator('li')).toBeVisible();
        await page.waitForTimeout(1000); // UI 애니메이션 보정 대기

        // 2. 하단 탭 '메뉴' 확인
        await expect(page.getByText('메뉴', { exact: true })).toBeVisible();

        // 3. 위젯 열기 → '분류 추가' 클릭
        await page.getByText('열기').click();
        await page.getByText('분류 추가').click();

        // 4. 분류명 입력 → '추가하기' 클릭
        await page.getByPlaceholder('분류명을 입력해주세요').fill(newCategory.title);
        await page.getByText('추가하기').click();
        await page.waitForTimeout(500); // UI 애니메이션 보정 대기

        // 5. 확인 모달 '아니요' 클릭 → 값 유지 확인
        await page.getByText('아니요').click();
        await page.waitForTimeout(500);
        await expect(page.getByPlaceholder('분류명을 입력해주세요')).toHaveValue(newCategory.title);

        // 6. 다시 '추가하기'
        await page.getByText('추가하기').click();
        await page.waitForTimeout(500);

        // 7. 확인 모달 '예' 클릭 및 POST 요청 확인
        await Promise.all([
          await page.getByText('예').click(),
          await page.waitForRequest(async (req) => {
            return req.method() === 'POST' && req.url().includes('/rest/v1/menu_category');
          }),
        ]);

        // 8. 토스트 알림 & 카테고리 생성 확인
        await expect(page.getByText('추가되었습니다.', { exact: true })).toBeVisible();
        await expect(page.getByText(newCategory.title, { exact: true })).toBeVisible();

        // 9. 생성된 카테고리에서 '상품 추가' 클릭
        await page.getByText('상품 추가').click();
        await page.waitForTimeout(700); // UI 애니메이션 보정 대기
        await expect(page.getByText('상품 추가')).toBeVisible();
        await expect(page.getByText('음식 추가')).toBeVisible();

        // 10. 메뉴 정보 입력 → '추가하기' 클릭
        await page.getByLabel('음식명').fill(newMenu.name);
        await expect(page.getByLabel('분류')).toHaveValue(newCategory.title);
        await page.getByLabel('가격').fill(newMenu.price.toString());
        await page.getByLabel('판매 상태').selectOption('신규');
        await page.getByText('추가하기').click();
        await page.waitForTimeout(500);

        // 11. 확인 모달 '예' 클릭 및 POST 요청 확인
        await Promise.all([
          await page.getByText('예').click(),
          await page.waitForRequest(async (req) => {
            return req.method() === 'POST' && req.url().includes('/rest/v1/menu');
          }),
        ]);

        // 13. 토스트 알림 & 신규 메뉴 확인
        await expect(page.getByText('추가되었습니다.', { exact: true })).toBeVisible();
        await expect(page.getByText(newMenu.name)).toBeVisible();
        await expect(page.getByText(`${newMenu.price.toLocaleString()}원`)).toBeVisible();

        // 14. 토스트 알림 사라짐 확인
        await expect(page.getByText('추가되었습니다.', { exact: true })).not.toBeVisible();
      }
    );

    menuTabAPITest_S2('메뉴 항목 수정: 이름과 가격 변경이 정상 반영되어야 한다', async ({ page }) => {
      // 1. 페이지 이동 및 초기 UI 확인
      await page.goto(TEST_PAGE_URL);
      await expect(page.locator('li')).toBeVisible();
      await page.waitForTimeout(1000); // UI 애니메이션 보정 대기

      // 2. 수정할 메뉴 클릭 → 수정 모달 확인
      await page.getByText(newMenu.name).click();
      await expect(page.getByText('음식 수정')).toBeVisible();
      await page.waitForTimeout(500); // UI 애니메이션 보정 대기

      // 3. 이름, 가격 수정 후 '수정하기' 클릭
      await page.locator('input[name="name"]').fill(updatedMenu.name);
      await page.locator('input[name="price"]').fill('2000');
      await page.getByText('수정하기').click();
      await page.waitForTimeout(500);

      // 4. 확인 모달 '예' 클릭 및 PATCH 요청 확인
      await Promise.all([
        await page.getByText('예').click(),
        await page.waitForRequest(async (req) => req.method() === 'PATCH' && req.url().includes('/rest/v1/menu')),
      ]);

      // 5. 토스트 알림 & 가격 반영 확인
      await expect(page.getByText('수정되었습니다.', { exact: true })).toBeVisible();
      await expect(page.getByText(updatedMenu.name)).toBeVisible();
      await expect(page.getByText(`${updatedMenu.price.toLocaleString()}원`)).toBeVisible();
    });

    menuTabAPITest_S3('메뉴 카테고리 수정: 메뉴와 카테고리 수정이 정상 반영되어야 한다', async ({ page }) => {
      // 1. 페이지 이동 및 초기 UI 확인
      await page.goto(TEST_PAGE_URL);
      await expect(page.locator('li')).toBeVisible();
      await page.waitForTimeout(1000); // UI 애니메이션 보정 대기

      // 2. 위젯 열기 → '분류 수정' 클릭
      await page.getByText('열기').click();
      await page.getByText('분류 수정').click();
      await page.waitForTimeout(500); // UI 애니메이션 보정 대기

      // 3. 수정할 카테고리 선택
      await expect(page.getByRole('dialog').getByText('분류 수정')).toBeVisible(); // 모달 등장 확인
      await page.getByRole('dialog').getByText(newMenu.menu_category.title).click();

      // 3. 이름 수정 후 '수정하기' 클릭
      await page.locator('input[name="title"]').fill(updatedCategory.title);
      await page.getByText('수정하기').click();
      await page.waitForTimeout(500); // UI 애니메이션 보정 대기

      // 4. 확인 모달 '예' 클릭 및 POST 요청 확인 (메뉴 목록은 cascade 처리)
      await expect(page.getByText('예')).toBeVisible();
      await Promise.all([
        await page.getByText('예').click(),
        await page.waitForRequest(
          async (req) => req.method() === 'POST' && req.url().includes('/rest/v1/menu_category')
        ),
      ]);

      // 5. 토스트 알림 확인
      await expect(page.getByText('수정되었습니다.', { exact: true })).toBeVisible();

      // 6. 카테고리 수정 확인
      await expect(page.getByText(updatedCategory.title)).toBeVisible();
      await expect(page.getByText(newMenu.name)).toBeVisible();

      // 7. 토스트 알림 사라짐 확인
      await expect(page.getByText('수정되었습니다.', { exact: true })).not.toBeVisible();
    });

    menuTabAPITest_S4('메뉴 항목 삭제: 삭제가 정상 반영되어야 한다', async ({ page }) => {
      // 1. 페이지 이동 및 초기 UI 확인
      await page.goto(TEST_PAGE_URL);
      await expect(page.locator('li')).toBeVisible();
      await page.waitForTimeout(1000); // UI 애니메이션 보정 대기

      // 2. 메뉴 클릭 → 수정 모달 확인
      await page.getByText(newMenu.name).click();
      await expect(page.getByText('음식 수정')).toBeVisible();
      await page.waitForTimeout(500); // UI 애니메이션 보정 대기

      // 3. '삭제하기' 클릭
      await page.getByText('삭제하기').click();
      await page.waitForTimeout(500);

      // 4. 확인 모달 '예' 클릭 및 DELETE 요청 확인
      await Promise.all([
        await page.getByText('예').click(),
        await page.waitForRequest(async (req) => {
          return req.method() === 'DELETE' && req.url().includes('/storage/v1/object');
        }),
        await page.waitForRequest(async (req) => {
          return req.method() === 'DELETE' && req.url().includes('/rest/v1/menu');
        }),
      ]);

      // 5. 토스트 알림 & 삭제 반영 확인
      await expect(page.getByText('삭제되었습니다.', { exact: true })).toBeVisible();
      await expect(page.getByText(newMenu.name)).not.toBeVisible();

      // 6. 토스트 알림 사라짐 확인
      await expect(page.getByText('삭제되었습니다.', { exact: true })).not.toBeVisible();
    });

    menuTabAPITest_S5('메뉴 카테고리 삭제: 메뉴와 카테고리 삭제가 정상 반영되어야 한다', async ({ page }) => {
      // 1. 페이지 이동 및 초기 UI 확인
      await page.goto(TEST_PAGE_URL);
      await expect(page.locator('li')).toBeVisible();
      await page.waitForTimeout(1000); // UI 애니메이션 보정 대기

      // 2. 위젯 열기 → '분류 삭제' 클릭
      await page.getByText('열기').click();
      await page.getByText('분류 삭제').click();
      await page.waitForTimeout(500); // UI 애니메이션 보정 대기

      // 3. 삭제할 카테고리 선택
      await expect(page.getByRole('dialog').getByText('분류 삭제')).toBeVisible(); // 모달 등장 확인
      await page.getByRole('dialog').getByText(mockMenus[0].menu_category.title).click();

      // 4. '삭제하기' 클릭
      await page.getByText('삭제하기').click();
      await page.waitForTimeout(500); // UI 애니메이션 보정 대기

      // 5. 확인 모달 '예' 클릭
      await expect(page.getByText('예')).toBeVisible();

      // 6. 확인 모달 '예' 클릭 및 DELETE 요청 확인 (메뉴 목록은 casecade 처리)
      await Promise.all([
        await page.getByText('예').click(),
        await page.waitForRequest(
          async (req) => req.method() === 'DELETE' && req.url().includes('/rest/v1/menu_category')
        ),
        await page.waitForRequest(async (req) => {
          return req.method() === 'DELETE' && req.url().includes('/storage/v1/object');
        }),
      ]);

      // 7. 토스트 알림 확인
      await expect(page.getByText('삭제되었습니다.', { exact: true })).toBeVisible();

      // 8. 카테고리 삭제 확인
      await expect(page.getByText(mockMenus[0].menu_category.title)).not.toBeVisible();
      await expect(page.getByText(mockMenus[0].name)).not.toBeVisible();

      // 9. 토스트 알림 사라짐 확인
      await expect(page.getByText('삭제되었습니다.', { exact: true })).not.toBeVisible();
    });
  });
});
