import { test, expect } from '@playwright/test';

import { exceptionAPITest_S1 } from './fixture/index.fixture';

import { exceptionAPITest_S2 } from './fixture/index.fixture';

test.describe('예외 및 경계 값 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('데이터 미존재', () => {
    exceptionAPITest_S1(' 메뉴 탭에서 안내 문구가 표시되어야 한다', async ({ page }) => {
      // 1. 메뉴 탭 등장 대기
      await page.waitForTimeout(1000);

      // 2. 안내 문구 확인
      await expect(page.getByText('위젯에서 메뉴 분류를 생성해주세요.')).toBeVisible();
      await expect(page).toHaveScreenshot('empty-menu.png');
    });

    exceptionAPITest_S1('좌석 탭에서 안내 문구가 표시되어야 한다', async ({ page }) => {
      // 1. 좌석 탭 이동
      await page.getByText('좌석', { exact: true }).click();

      // 2. 안내 문구 확인
      await expect(page.getByText('위젯에서 테이블을 생성해주세요.')).toBeVisible();
      await expect(page).toHaveScreenshot('empty-table.png');
    });

    exceptionAPITest_S1('주문 탭에서 안내 문구가 표시되어야 한다', async ({ page }) => {
      // 1. 주문 탭 이동
      await page.getByText('주문', { exact: true }).click();

      // 2. 안내 문구 확인
      await expect(page.getByText('표시할 주문이 없습니다.')).toBeVisible();
      await expect(page).toHaveScreenshot('empty-order.png');
    });
  });

  test.describe('입력 값 유효성 검사', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(1000);
    });

    exceptionAPITest_S2('메뉴 분류 추가: 영문 입력 시 유효성 메시지 표시', async ({ page }) => {
      // 1. 모달 열기
      await page.getByText('열기').click();
      await expect(page.getByText('분류 추가')).toBeVisible();

      // 2. 분류 추가 버튼 클릭
      await page.getByText('분류 추가').click();

      // 3. 공백 입력 후 확인
      await page.locator('input[name="title"]').fill(' ');
      await page.getByText('추가하기').click();

      // 4. 영문 입력 후 확인
      await page.locator('input[name="title"]').fill('test category');
      await page.getByText('추가하기').click();

      // 5. 유효성 메시지 검증
      await expect(page.getByText('한글만 입력 가능합니다.')).toBeVisible();
      await expect(page.locator('input[name="title"]')).toHaveValue('test category');
    });

    exceptionAPITest_S2('메뉴 분류 수정: 미선택 및 영문 입력 시 유효성 메시지 표시', async ({ page }) => {
      // 1. 모달 열기
      await page.getByText('열기').click();
      await expect(page.getByText('분류 수정')).toBeVisible();

      // 2. 분류 수정 버튼 클릭 (선택 없음)
      await page.getByText('분류 수정').click();
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

    exceptionAPITest_S2('메뉴 분류 삭제: 미선택 시 유효성 메시지 표시', async ({ page }) => {
      // 1. 모달 열기
      await page.getByText('열기').click();
      await expect(page.getByText('분류 삭제')).toBeVisible();

      // 2. 분류 삭제 버튼 클릭 (선택 없음)
      await page.getByText('분류 삭제').click();
      await page.getByText('삭제하기').click();

      // 3. 유효성 메시지 검증
      await expect(page.getByText('분류를 선택해주세요.')).toBeVisible();
    });

    /* 메뉴 모달 예외 테스트 작성 */

    // exceptionAPITest_S2('메뉴 생성: 필수 입력 없이 추가 시 유효성 메시지 표시', async ({ page }) => {
    //   await page.getByText('상품 추가').click();
    //   await page.getByText('추가하기').click();
    //   await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();
    //   await expect(page.getByText('가격을 입력해주세요.')).toBeVisible();
    // });

    // exceptionAPITest_S2('메뉴 생성: 가격 음수 입력 시 유효성 메시지 표시', async ({ page }) => {
    //   await page.getByText('상품 추가').click();
    //   await page.getByLabel('음식명').fill('테스트 메뉴');
    //   await page.getByLabel('가격').fill('-1000');
    //   await page.getByText('추가하기').click();
    //   await expect(page.getByText('가격은 0 이상의 숫자여야 합니다.')).toBeVisible();
    // });

    // exceptionAPITest_S2('메뉴 수정: 필수 입력 없이 수정 시 유효성 메시지 표시', async ({ page }) => {
    //   await page.getByText('테스트 메뉴').click();
    //   await page.locator('input[name="name"]').fill('');
    //   await page.locator('input[name="price"]').fill('');
    //   await page.getByText('수정하기').click();
    //   await expect(page.getByText('메뉴 이름을 입력해주세요.')).toBeVisible();
    //   await expect(page.getByText('가격을 입력해주세요.')).toBeVisible();
    // });

    // exceptionAPITest_S2('메뉴 수정: 가격 음수 입력 시 유효성 메시지 표시', async ({ page }) => {
    //   await page.getByText('테스트 메뉴').click();
    //   await page.locator('input[name="price"]').fill('-500');
    //   await page.getByText('수정하기').click();
    //   await expect(page.getByText('가격은 0 이상의 숫자여야 합니다.')).toBeVisible();
    // });
  });
});
