import { expect, test } from '@playwright/test';

import { newCategory, newMenu, TEST_PAGE_URL, updatedCategory, updatedMenu } from './const';
import mockMenus from './mock/menu.init.json' assert { type: 'json' };
import {
  menuTabAPITest_S1,
  menuTabAPITest_S2,
  menuTabAPITest_S3,
  menuTabAPITest_S4,
  menuTabAPITest_S5,
  menuTabAPITest_S6,
} from './fixtures/index.success.fixture';

/**
 * @file 메뉴 관리 E2E 테스트
 * @description [성공] 메뉴 관리 기능의 End-to-End 성공 시나리오를 검증합니다.
 *   - 신규 메뉴 카테고리 및 메뉴 항목 추가
 *   - 메뉴 항목 수정
 *   - 메뉴 카테고리 수정
 *   - 메뉴 항목 삭제
 *   - 메뉴 카테고리 삭제
 */
test.describe('[성공] 메뉴 관리', () => {
  // test.describe.configure({ mode: 'serial' });

  /**
   * 모든 실패 케이스 테스트 전 공통 준비 단계
   * - 테스트 페이지로 이동 후 초기화 대기
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
  });

  /**
   * [성공] 신규 메뉴 카테고리 및 메뉴 항목 추가 - 정상적으로 추가되면 화면에 표시
   * - 입력, API 모킹, 토스트 알림 확인
   */
  menuTabAPITest_S1('신규 메뉴 카테고리 및 메뉴 항목 추가 - 정상적으로 추가되면 화면에 표시', async ({ page }) => {
    // 1. 하단 탭 '메뉴' 확인
    await expect(page.getByText('메뉴', { exact: true })).toBeVisible();

    // 2. 위젯 열기 → '분류 추가' 클릭
    await page.getByText('열기').click();
    await page.getByText('분류 추가').click();

    // 3. 분류명 입력 → '추가하기' 클릭
    await page.getByPlaceholder('분류명을 입력해주세요').fill(newCategory.title);
    await page.getByText('추가하기').click();
    await page.waitForTimeout(500); // UI 애니메이션 보정 대기

    // 4. 확인 모달 '아니요' 클릭 → 값 유지 확인
    await page.getByText('아니요').click();
    await page.waitForTimeout(500);
    await expect(page.getByPlaceholder('분류명을 입력해주세요')).toHaveValue(newCategory.title);

    // 5. 다시 '추가하기'
    await page.getByText('추가하기').click();
    await page.waitForTimeout(500);

    // 6. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 7. 토스트 알림 & 카테고리 생성 확인
    await expect(page.getByText('추가되었습니다.', { exact: true })).toBeVisible();
    await expect(page.getByText(newCategory.title, { exact: true })).toBeVisible();

    // 8. 생성된 카테고리에서 '메뉴 추가' 클릭
    await page.getByText('메뉴 추가').click();
    await page.waitForTimeout(700); // UI 애니메이션 보정 대기
    await expect(page.getByRole('heading', { name: '메뉴 추가' })).toBeVisible();

    // 9. 메뉴 정보 입력 → '추가하기' 클릭
    await page.getByLabel('음식명').fill(newMenu.name);
    await expect(page.getByLabel('분류')).toHaveValue(newCategory.title);
    await page.getByLabel('가격').fill(newMenu.price.toString());
    await page.getByLabel('판매 상태').selectOption('신규');
    await page.getByText('추가하기').click();
    await page.waitForTimeout(500);

    // 10. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 11. 토스트 알림 & 신규 메뉴 확인
    await expect(page.getByText('추가되었습니다.', { exact: true })).toBeVisible();
    await expect(page.getByText(newMenu.name)).toBeVisible();
    await expect(page.getByText(`${newMenu.price.toLocaleString()}원`)).toBeVisible();
  });

  /**
   * [성공] 메뉴 항목 수정 - 이름과 가격 변경 정상 반영
   * - 입력, PATCH 요청 확인, 토스트 알림 확인
   */
  menuTabAPITest_S2('메뉴 항목 수정 - 이름과 가격 변경 정상 반영', async ({ page }) => {
    // 1. 수정할 메뉴 클릭 → 수정 모달 확인
    await page.getByText(newMenu.name).click();
    await expect(page.getByText('메뉴 수정')).toBeVisible();
    await page.waitForTimeout(500); // UI 애니메이션 보정 대기

    // 2. 이름, 가격 수정 후 '수정하기' 클릭
    await page.locator('input[name="name"]').fill(updatedMenu.name);
    await page.locator('input[name="price"]').fill('2000');
    await page.getByText('수정하기').click();
    await page.waitForTimeout(500);

    // 3. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 4. 토스트 알림 & 가격 반영 확인
    await expect(page.getByText('수정되었습니다.', { exact: true })).toBeVisible();
    await expect(page.getByText(updatedMenu.name)).toBeVisible();
    await expect(page.getByText(`${updatedMenu.price.toLocaleString()}원`)).toBeVisible();
  });

  /**
   * [성공] 메뉴 카테고리 수정 - 메뉴와 카테고리 수정 정상 반영
   * - 입력, POST 요청 확인, 토스트 알림 확인
   */
  menuTabAPITest_S3('메뉴 카테고리 수정 - 메뉴와 카테고리 수정 정상 반영', async ({ page }) => {
    // 1. 위젯 열기 → '분류 수정' 클릭
    await page.getByText('열기').click();
    await page.getByText('분류 수정').click();
    await page.waitForTimeout(500); // UI 애니메이션 보정 대기

    // 2. 수정할 카테고리 선택
    await expect(page.getByRole('dialog').getByText('분류 수정')).toBeVisible(); // 모달 등장 확인
    await page.getByRole('dialog').getByText(newMenu.menu_category.title).click();

    // 3. 이름 수정 후 '수정하기' 클릭
    await page.locator('input[name="title"]').fill(updatedCategory.title);
    await page.getByText('수정하기').click();
    await page.waitForTimeout(500); // UI 애니메이션 보정 대기

    // 4. 확인 모달 '예' 클릭 및 POST 요청 확인 (메뉴 목록은 cascade 처리)
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 5. 토스트 알림 확인
    await expect(page.getByText('수정되었습니다.', { exact: true })).toBeVisible();

    // 6. 카테고리 수정 확인
    await expect(page.getByText(updatedCategory.title)).toBeVisible();
    await expect(page.getByText(newMenu.name)).toBeVisible();
  });

  /**
   * [성공] 메뉴 항목 삭제 - 삭제 정상 반영
   * - 사용자 조작, DELETE 요청 확인, 토스트 알림 확인
   */
  menuTabAPITest_S4('메뉴 항목 삭제 - 삭제 정상 반영', async ({ page }) => {
    // 1. 메뉴 클릭 → 수정 모달 확인
    await page.getByText(newMenu.name).click();
    await expect(page.getByText('메뉴 수정')).toBeVisible();
    await page.waitForTimeout(500); // UI 애니메이션 보정 대기

    // 2. '삭제하기' 클릭
    await page.getByText('삭제하기').click();
    await page.waitForTimeout(500);

    // 3. 확인 모달 '예' 클릭 및 DELETE 요청 확인
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 4. 토스트 알림 & 삭제 반영 확인
    await expect(page.getByText('삭제되었습니다.', { exact: true })).toBeVisible();
    await expect(page.getByText(newMenu.name)).not.toBeVisible();
  });

  /**
   * [성공] 메뉴 카테고리 삭제 - 메뉴와 카테고리 삭제 정상 반영
   * - 사용자 조작, DELETE 요청 확인, 토스트 알림 확인
   */
  menuTabAPITest_S5('메뉴 카테고리 삭제 - 메뉴와 카테고리 삭제 정상 반영', async ({ page }) => {
    // 1. 위젯 열기 → '분류 삭제' 클릭
    await page.getByText('열기').click();
    await page.getByText('분류 삭제').click();
    await page.waitForTimeout(500); // UI 애니메이션 보정 대기

    // 2. 삭제할 카테고리 선택
    await expect(page.getByRole('dialog').getByText('분류 삭제')).toBeVisible(); // 모달 등장 확인
    await page.getByRole('dialog').getByText(mockMenus[0].menu_category.title).click();

    // 3. '삭제하기' 클릭
    await page.getByText('삭제하기').click();
    await page.waitForTimeout(500); // UI 애니메이션 보정 대기

    // 4. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 6. 토스트 알림 확인
    await expect(page.getByText('삭제되었습니다.', { exact: true })).toBeVisible();

    // 7. 카테고리 삭제 확인
    await expect(page.getByText(mockMenus[0].menu_category.title)).not.toBeVisible();
    await expect(page.getByText(mockMenus[0].name)).not.toBeVisible();
  });

  /**
   * [성공] 메뉴 카테고리 삭제 - 메뉴와 카테고리 삭제 정상 반영
   * - 사용자 조작, DELETE 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_S6('메뉴 카테고리 삭제 - 이미지 API 오류 발생 무시', async ({ page }) => {
    // 1. 위젯 열기 → 분류 삭제 클릭
    await page.getByText('열기').click();
    await page.getByText('분류 삭제').click();

    // 2. 삭제할 카테고리 선택
    await expect(page.getByRole('dialog').getByText('분류 삭제')).toBeVisible(); // 모달 등장 확인
    await page.getByRole('dialog').getByText(newCategory.title).click();

    // 3. '삭제하기' 클릭
    await page.getByText('삭제하기').click();

    // 4. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 5. 성공 토스트 알림 확인
    await expect(page.getByText('삭제되었습니다.', { exact: false })).toBeVisible();
  });
});
