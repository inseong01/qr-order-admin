import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT } from '../common/const';
import { signup_F1, signup_F2 } from './fixture/index.fail.fixture';

import { TEST_PAGE_URL } from './const';

/**
 * @file 회원가입 E2E 테스트
 * @description [실패] 회원가입 기능의 End-to-End 시나리오를 검증합니다.
 *   - 실패: 캡챠 인증 실패 시 회원가입 불가
 *   - 실패: 이미 등록된 이메일 입력 시 토스트 알림 표시
 */
test.describe('[실패] 회원가입', () => {
  /**
   * [실패] 캡챠 인증 실패 시 회원가입 불가
   * - 입력 필드/버튼 비활성화, '검증 실패' 버튼
   */
  signup_F1('캡챠 인증 실패 - 입력/버튼 비활성화', async ({ page }) => {
    // 1. 회원가입 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 입력 필드 비활성화 확인
    await expect(page.locator('input[name="id"]')).toBeDisabled();
    await expect(page.locator('input[name="password"]')).toBeDisabled();
    await expect(page.locator('input[name="confirmPassword"]')).toBeDisabled();

    // 3. 버튼 비활성화 확인
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    await expect(page.getByText('돌아가기', { exact: true })).toBeDisabled();

    // 4. '검증 실패' 버튼 상태 확인
    await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');
  });

  /**
   * [실패] 이미 등록된 이메일 입력 시 토스트 알림 표시
   * - 토스트 알림, '검증 실패' 버튼, 페이지 이동 없음
   */
  signup_F2('이미 등록된 이메일 입력 - 토스트 알림 표시', async ({ page }) => {
    // 1. 회원가입 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 이미 등록된 이메일/비밀번호 입력
    await page.locator('input[name="id"]').click();
    await page.locator('input[name="id"]').fill(TEST_ACCOUNT.ID);
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(TEST_ACCOUNT.PASSWORD);
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.PASSWORD);

    // 3. '회원가입' 버튼 클릭
    await page.locator('button[type="submit"]').click();

    // 4. 토스트 알림 표시 확인
    await expect(page.getByText('이미 등록된 이메일 주소입니다.', { exact: true })).toBeVisible();

    // 5. '검증 실패' 버튼 상태 확인
    await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

    // 6. 페이지 이동 없음 확인
    await expect(page).toHaveURL(TEST_PAGE_URL);
  });
});
