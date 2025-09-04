import { test, expect } from '@playwright/test';
import { exceptionAPITest_S1, exceptionAPITest_S2, exceptionAPITest_S3 } from './fixture/index.fixture';
import {
  EMPTY_FOOD_NAME,
  mockMenu,
  MODIFIED_FOOD_NAME,
  NEGATIVE_PRICE,
  POSITIVE_PRICE,
  RIGHT_FOOD_NAME,
} from './const';

/**
 * @file 예외 및 경계 값 E2E 테스트
 * @description [예외/경계] 데이터 미존재, 입력 값 유효성, API 오류 등 예외 상황을 검증합니다.
 */
test.describe('[예외/경계] 예외 및 경계 값 테스트', () => {
  test.describe('[예외] 데이터 미존재 안내', () => {
    /**
     * 각 테스트 실행 전 초기화
     * - 메인 페이지 진입
     */
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    /**
     * [예외] 메뉴 탭 데이터 미존재 - 안내 문구 및 스냅샷 확인
     */
    exceptionAPITest_S1('메뉴 탭 데이터 없음 - 안내 문구 표시', async ({ page }) => {
      // 1. 메뉴 탭 등장 대기

      // 2. 안내 문구 및 스냅샷 확인
      await expect(page.getByText('위젯에서 메뉴 분류를 생성해주세요.')).toBeVisible();
      await expect(page).toHaveScreenshot('empty-menu.png');
    });

    /**
     * [예외] 좌석 탭 데이터 미존재 - 안내 문구 및 스냅샷 확인
     */
    exceptionAPITest_S1('좌석 탭 데이터 없음 - 안내 문구 표시', async ({ page }) => {
      // 1. 좌석 탭 이동
      await page.getByText('좌석', { exact: true }).click();

      // 2. 안내 문구 및 스냅샷 확인
      await expect(page.getByText('위젯에서 테이블을 생성해주세요.')).toBeVisible();
      await expect(page).toHaveScreenshot('empty-table.png');
    });

    /**
     * [예외] 주문 탭 데이터 미존재 - 안내 문구 및 스냅샷 확인
     */
    exceptionAPITest_S1('주문 탭 데이터 없음 - 안내 문구 표시', async ({ page }) => {
      // 1. 주문 탭 이동
      await page.getByText('주문', { exact: true }).click();

      // 2. 안내 문구 및 스냅샷 확인
      await expect(page.getByText('표시할 주문이 없습니다.')).toBeVisible();
      await expect(page).toHaveScreenshot('empty-order.png');
    });
  });

  test.describe('[경계] 입력 값 유효성 검사', () => {
    /**
     * 각 테스트 실행 전 초기화
     * - 메인 페이지 진입 및 대기
     */
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    /**
     * [경계] 메뉴 분류 추가 - 영문 입력 시 유효성 메시지 표시
     */
    exceptionAPITest_S2('메뉴 분류 추가 - 영문 입력 시 유효성 메시지', async ({ page }) => {
      // 1. 모달 열기 및 분류 추가 버튼 클릭
      await page.getByText('열기').click();
      await expect(page.getByText('분류 추가')).toBeVisible();
      await page.getByText('분류 추가').click();

      // 2. 공백 입력 후 확인
      await page.locator('input[name="title"]').fill(' ');
      await page.getByText('추가하기').click();

      // 3. 영문 입력 후 확인
      await page.locator('input[name="title"]').fill('test category');
      await page.getByText('추가하기').click();

      // 4. 유효성 메시지 검증
      await expect(page.getByText('한글만 입력 가능합니다.')).toBeVisible();
      await expect(page.locator('input[name="title"]')).toHaveValue('test category');
    });

    /**
     * [경계] 메뉴 분류 수정 - 미선택 및 영문 입력 시 유효성 메시지 표시
     */
    exceptionAPITest_S2('메뉴 분류 수정 - 미선택 및 영문 입력 시 유효성 메시지', async ({ page }) => {
      // 1. 모달 열기 및 분류 수정 버튼 클릭
      await page.getByText('열기').click();
      await expect(page.getByText('분류 수정')).toBeVisible();
      await page.getByText('분류 수정').click();

      // 2. 선택 없음 상태에서 '수정하기' 클릭
      await page.getByText('수정하기').click();
      await expect(page.getByText('분류를 선택해주세요.')).toBeVisible();

      // 3. 체크 후 분류명 미입력 확인
      await page.locator('input[name="check"]').click();
      await page.getByText('수정하기').click();
      await expect(page.getByText('분류명을 입력해주세요.')).toBeVisible();

      // 4. 영문 입력 후 확인
      await page.locator('input[name="title"]').fill('test category');
      await page.getByText('수정하기').click({ delay: 200 });

      // 5. 유효성 메시지 검증
      await expect(page.getByText('한글만 입력 가능합니다.')).toBeVisible();
      await expect(page.locator('input[name="title"]')).toHaveValue('test category');
    });

    /**
     * [경계] 메뉴 분류 삭제 - 미선택 시 유효성 메시지 표시
     */
    exceptionAPITest_S2('메뉴 분류 삭제 - 미선택 시 유효성 메시지', async ({ page }) => {
      // 1. 모달 열기 및 분류 삭제 버튼 클릭
      await page.getByText('열기').click();
      await expect(page.getByText('분류 삭제')).toBeVisible();
      await page.getByText('분류 삭제').click();

      // 2. 선택 없음 상태에서 '삭제하기' 클릭
      await page.getByText('삭제하기').click();

      // 3. 유효성 메시지 검증
      await expect(page.getByText('분류를 선택해주세요.')).toBeVisible();
    });

    /**
     * [경계] 메뉴 생성 - 필수 입력 없이 추가 시 유효성 메시지 표시
     */
    exceptionAPITest_S2('메뉴 생성 - 필수 입력 없이 추가 시 유효성 메시지', async ({ page }) => {
      // 1. 메뉴 추가 모달 열기 및 음식명 입력
      await page.getByText('메뉴 추가', { exact: true }).click();
      await page.getByLabel('음식명').fill(EMPTY_FOOD_NAME);

      // 2. 아무 값도 입력하지 않고 '추가하기' 클릭
      await page.getByText('추가하기').click();

      // 3. 오류 메시지 확인 및 초기화
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();
      await page.getByLabel('음식명').fill(RIGHT_FOOD_NAME);
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).not.toBeVisible();
      await page.getByLabel('음식명').fill(EMPTY_FOOD_NAME);

      // 4. 가격을 음수로 입력하고 '추가하기' 클릭
      await page.getByLabel('가격').fill(NEGATIVE_PRICE);
      await page.getByText('추가하기').click();

      // 5. 오류 메시지 확인 (메뉴명/가격)
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();
      await expect(page.getByText('가격은 0 이상의 숫자여야 합니다.')).toBeVisible();

      // 6. 가격을 양수로 다시 입력 후 '추가하기' 클릭
      await page.getByLabel('가격').fill(POSITIVE_PRICE);
      await page.getByText('추가하기').click();

      // 7. 오류 메시지 확인
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();
      await expect(page.getByText('가격은 0 이상의 숫자여야 합니다.')).not.toBeVisible();

      // 8. 음식명 입력
      await page.getByLabel('음식명').fill(RIGHT_FOOD_NAME);

      // 9. 최종 검증
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).not.toBeVisible();
    });

    /**
     * [경계] 메뉴 수정 - 필수 입력 없이 수정 시 유효성 메시지 표시
     */
    exceptionAPITest_S2('메뉴 수정 - 필수 입력 없이 수정 시 유효성 메시지', async ({ page }) => {
      // 1. '테스트 메뉴' 항목 확인 및 수정 모달 열기
      await expect(page.getByText(mockMenu.name)).toBeVisible();
      await page.getByText(mockMenu.name).click();
      await expect(page.getByText('메뉴 수정')).toBeVisible();
      await expect(page.locator('input[name="name"]')).toHaveValue(mockMenu.name);
      await expect(page.locator('select[name="title"]')).toHaveValue(mockMenu.menu_category.title);
      await expect(page.locator('input[name="price"]')).toHaveValue(mockMenu.price.toString());
      await expect(page.locator('select[name="tag"]')).toHaveValue(mockMenu.tag);

      // 2. 음식명 미입력 후 '수정하기' 클릭
      await page.getByLabel('음식명').fill(EMPTY_FOOD_NAME);
      await page.getByText('수정하기').click();

      // 3. 음식명 오류 메시지 확인
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();

      // 4. 가격을 음수로 입력하고 '수정하기' 클릭
      await page.getByLabel('가격').fill(NEGATIVE_PRICE);
      await page.getByText('수정하기').click();

      // 5. 오류 메시지 확인 (메뉴명 + 가격)
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();
      await expect(page.getByText('가격은 0 이상의 숫자여야 합니다.')).toBeVisible();

      // 6. 가격을 양수로 수정 후 '수정하기' 클릭
      await page.getByLabel('가격').fill(POSITIVE_PRICE);
      await page.getByText('수정하기').click();

      // 7. 오류 메시지 확인 (메뉴명만 남고, 가격 오류는 해제됨)
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();
      await expect(page.getByText('가격은 0 이상의 숫자여야 합니다.')).not.toBeVisible();

      // 8. 음식명을 정상 값으로 입력
      await page.getByLabel('음식명').fill(MODIFIED_FOOD_NAME);

      // 9. 최종 검증 (음식명 오류 메시지 해제 확인)
      await expect(page.getByText('메뉴 이름을 입력해주세요.')).not.toBeVisible();
    });
  });

  test.describe('[예외] 초기 API 요청 오류', () => {
    /**
     * [예외] 탭 진입 시 API GET 오류 - 오류 문구 및 탭 비노출 확인
     */
    exceptionAPITest_S3('탭 진입 시 API GET 오류 - 오류 문구 표시', async ({ page }) => {
      // 1. '/' 경로 진입 시 API GET 오류 발생
      await page.goto('/');

      // 2. ErrorComponent 등장 확인
      await expect(page.getByText('예기치 않은 오류가 발생했습니다.')).toBeVisible();

      // 3. 탭 노출 확인
      await expect(page.getByText('메뉴', { exact: true })).toBeVisible();
      await expect(page.getByText('좌석', { exact: true })).toBeVisible();
      await expect(page.getByText('주문', { exact: true })).toBeVisible();
    });
  });
});
