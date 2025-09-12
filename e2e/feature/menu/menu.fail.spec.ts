import { expect, test } from '@playwright/test';
import {
  menuTabAPITest_F1,
  menuTabAPITest_F2,
  menuTabAPITest_F3,
  menuTabAPITest_F4,
  menuTabAPITest_F5,
  menuTabAPITest_F6,
  menuTabAPITest_F7,
} from './fixtures/index.fail.fixture';
import { generateFakeImage, mockMenu, newCategory, newMenu, TEST_PAGE_URL, updatedCategory } from './const';

/**
 * @file 메뉴 관리 E2E 테스트
 * @description [실패] 메뉴 관리 기능의 End-to-End 실패 시나리오를 검증합니다.
 *   - API 오류, 이미지 업로드/삭제 오류, 토스트 알림 확인
 */
test.describe('[실패] 메뉴 관리', () => {
  /**
   * 모든 실패 케이스 테스트 전 공통 준비 단계
   * - 테스트 페이지로 이동 후 초기화 대기
   */
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_PAGE_URL);
  });

  /**
   * [실패] 메뉴 및 카테고리 생성 요청 시 API 오류 발생 - 오류 토스트 알림 노출
   * - 입력, API 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_F1('메뉴/카테고리 생성 실패 - API 오류 및 토스트 알림', async ({ page }) => {
    // 1. 위젯 열기 → '분류 추가' 클릭
    await page.getByText('열기').click();
    await page.getByText('분류 추가').click();

    // 2. 분류명 입력 → '추가하기' 클릭
    await page.getByPlaceholder('분류명을 입력해주세요').fill(newCategory.title);
    await page.getByText('추가하기').click();

    // 3. 확인 모달 '예' 클릭
    await page.getByText('예').click();

    // 4. 오류 토스트 알림 확인 (카테고리)
    await expect(page.getByText('오류가 발생했습니다.', { exact: false })).toBeVisible();

    // 5. 메뉴 추가 버튼 클릭
    await page.getByText('메뉴 추가').click();

    // 6. 정상 입력 (음식명, 분류, 가격, 판매 상태)
    await page.getByLabel('음식명').fill('테스트 메뉴');
    await page.getByLabel('분류').selectOption('버거');
    await page.getByLabel('가격').fill('10000');
    await page.getByLabel('판매 상태').selectOption('신규');

    // 7. 추가하기 클릭 (POST 오류 모킹)
    await page.getByText('추가하기').click();
    await page.getByText('예').click();

    // 8. 오류 토스트 알림 확인 (메뉴)
    await expect(page.getByText('메뉴 처리 과정에서 오류가 발생했습니다.', { exact: false })).toBeVisible();
  });

  /**
   * [실패] 메뉴 수정 요청 시 API 오류 발생 - 오류 토스트 알림 노출
   * - 입력, PATCH 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_F2('메뉴 수정 실패 - API 오류 및 토스트 알림', async ({ page }) => {
    // 1. 수정할 메뉴 클릭
    await page.getByText(mockMenu.name).click();

    // 2. 정상 입력 (이름, 가격)
    await page.locator('input[name="name"]').fill('수정 메뉴');
    await page.locator('input[name="price"]').fill('20000');

    // 3. 수정하기 클릭 (PATCH 오류 모킹)
    await page.getByText('수정하기').click();

    // 4. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 5. 오류 토스트 알림 확인
    await expect(page.getByText('메뉴 수정 과정에서 오류가 발생했습니다.', { exact: false })).toBeVisible();
  });

  /**
   * [실패] 메뉴 카테고리 수정 요청 시 API 오류 발생 - 오류 토스트 알림 노출
   * - 입력, PATCH 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_F3('카테고리 수정 실패 - API 오류 및 토스트 알림', async ({ page }) => {
    // 1. 위젯 열기 → 분류 수정 클릭
    await page.getByText('열기').click();
    await page.getByText('분류 수정').click();

    // 2. 수정할 카테고리 선택
    await expect(page.getByRole('dialog').getByText('분류 수정')).toBeVisible(); // 모달 등장 확인
    await page.getByRole('dialog').getByText(mockMenu.menu_category.title).click();

    // 3. 이름 수정 후 '수정하기' 클릭
    await page.locator('input[name="title"]').fill(updatedCategory.title);
    await page.getByText('수정하기').click();

    // 4. '예' 클릭 (PATCH 오류 모킹)
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 5. 오류 토스트 알림 확인
    await expect(page.getByText('오류가 발생했습니다.', { exact: false })).toBeVisible();
  });

  /**
   * [실패] 메뉴 항목 삭제 요청 시 API 오류 발생 - 오류 토스트 알림 노출
   * - 사용자 조작, DELETE 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_F4('메뉴 삭제 실패 - API 오류 및 토스트 알림', async ({ page }) => {
    // 1. 삭제할 메뉴 클릭
    await page.getByText(mockMenu.name).click();

    // 2. 삭제하기 클릭 (DELETE 오류 모킹)
    await page.getByText('삭제하기').click();

    // 3. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 4. 오류 토스트 알림 확인
    await expect(page.getByText('메뉴 삭제 과정에서 오류가 발생했습니다.', { exact: false })).toBeVisible();
  });

  /**
   * [실패] 메뉴 항목 생성 시 사진 업로드 API 오류 발생 - 이미지 처리 오류 토스트 알림 노출
   * - 입력, 파일 첨부, POST 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_F5('메뉴 생성 실패 - 이미지 업로드 오류 및 토스트 알림', async ({ page }) => {
    // 1. 메뉴 추가 버튼 클릭
    await page.getByText('메뉴 추가').click();

    // 2. 정상 입력 (음식명, 가격, 사진 첨부)
    await page.getByLabel('음식명').fill('테스트 메뉴');
    await page.getByLabel('가격').fill('10000');

    // 3. 사진 첨부 (실제 업로드 모킹)
    const file = await generateFakeImage();
    await page.locator('input[name="img_url"]').setInputFiles(file);

    // 4. 추가하기 클릭 (POST 오류 모킹)
    await page.getByText('추가하기').click();

    // 5. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 6. 오류 토스트 알림 확인
    await expect(page.getByText('이미지 업로드 과정에서 오류가 발생했습니다.', { exact: false })).toBeVisible();
  });

  /**
   * [실패] 메뉴 항목 수정 시 사진 업로드 API 오류 발생 - 이미지 처리 오류 토스트 알림 노출
   * - 입력, 파일 첨부, PUT 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_F6('메뉴 수정 실패 - 이미지 업로드 오류 및 토스트 알림', async ({ page }) => {
    // 1. 수정할 메뉴 클릭
    await page.getByText(newMenu.name).click();

    // 2. 정상 입력 (이름, 가격, 사진 첨부)
    await page.locator('input[name="name"]').fill('수정 메뉴');
    await page.locator('input[name="price"]').fill('20000');

    // 3. 사진 첨부 (실제 업로드 모킹)
    const file = await generateFakeImage();
    await page.locator('input[name="img_url"]').setInputFiles(file);

    // 4. 수정하기 클릭 (PUT 오류 모킹)
    await page.getByText('수정하기').click();

    // 5. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 6. 오류 토스트 알림 확인
    await expect(page.getByText('이미지 처리 과정에서 오류가 발생했습니다.', { exact: false })).toBeVisible();
  });

  /**
   * [실패] 메뉴 항목 삭제 시 사진 삭제 API 오류 발생 - 이미지 처리 오류 토스트 알림 노출
   * - 사용자 조작, DELETE 오류 모킹, 토스트 알림 확인
   */
  menuTabAPITest_F7('메뉴 삭제 실패 - 이미지 삭제 오류 및 토스트 알림', async ({ page }) => {
    // 1. 삭제할 메뉴 클릭
    await page.getByText(newMenu.name).click();

    // 2. 삭제하기 클릭 (DELETE 오류 모킹)
    await page.getByText('삭제하기').click();

    // 3. 확인 모달 '예' 클릭
    await expect(page.getByText('예')).toBeVisible();
    await page.getByText('예').click();

    // 4. 오류 토스트 알림 확인
    await expect(page.getByText('이미지 처리 과정에서 오류가 발생했습니다.', { exact: false })).toBeVisible();
  });
});
