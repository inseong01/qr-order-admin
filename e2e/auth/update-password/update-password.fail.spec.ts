import { test, expect } from '@playwright/test';
import { TEST_ACCOUNT } from '../common/const';
import { updatePassword_F1, updatePassword_F2, updatePassword_F3 } from './fixture/index.fail.fixture';

import { TEST_PAGE_URL } from './const';

/**
 * @file 비밀번호 재설정 E2E 테스트
 * @description [실패] 비밀번호 재설정 기능의 End-to-End 시나리오를 검증합니다.
 *   - 실패: 캡챠 인증 실패 시 기능 사용 불가
 *   - 실패: 잘못된 비밀번호 형식 입력 시 오류 메시지 표시
 *   - 실패: 유효하지 않은 토큰으로 접속 시 토스트 알림 표시
 */
test.describe('[실패] 비밀번호 재설정', () => {
  /**
   * [실패] 캡챠 인증 실패 시 기능 사용 불가
   * - 입력/버튼 비활성화
   */
  updatePassword_F1('캡챠 인증 실패 - 입력/버튼 비활성화', async ({ page }) => {
    // 1. 비밀번호 재설정 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 입력/버튼 비활성화 확인
    await expect(page.locator('input[name="password"]')).not.toBeEnabled();
    await expect(page.locator('input[name="confirmPassword"]')).not.toBeEnabled();

    //
    await page.waitForTimeout(500);
    await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');
  });

  /**
   * [실패] 잘못된 비밀번호 형식 입력 시 오류 메시지 표시
   * - 유효성 검사 실패 메시지, 버튼 상태
   */
  updatePassword_F2('잘못된 비밀번호 형식 입력 - 오류 메시지 표시', async ({ page }) => {
    // 1. 비밀번호 재설정 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 잘못된 비밀번호 입력
    await page.locator('input[name="password"]').fill(TEST_ACCOUNT.WRONG.PASSWORD);
    await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.WRONG.PASSWORD);

    // 3. '비밀번호 수정' 버튼 클릭
    await page.locator('button[type="submit"]').click();

    // 4. 유효성 검사 실패 메시지/버튼 상태 확인
    await expect(page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true })).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('data-invalid', 'true');
    await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');
  });

  /**
   * [실패] 유효하지 않은 토큰으로 접속 시 토스트 알림 표시
   * - 토스트 알림, 버튼 상태,
   */
  updatePassword_F3('유효하지 않은 토큰 - 토스트 알림 표시', async ({ page }) => {
    // 1. 비밀번호 재설정 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 비밀번호 입력
    await page.locator('input[name="password"]').fill(TEST_ACCOUNT.PASSWORD);
    await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.PASSWORD);

    // 3. '비밀번호 수정' 버튼 클릭
    await page.locator('button[type="submit"]').click();

    // 3. 토스트 알림 표시/버튼 상태 확인
    await expect(page.getByText('인증 토큰이 유효하지 않습니다.')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

    // 4. 제출 버튼 활성화 확인
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
});
