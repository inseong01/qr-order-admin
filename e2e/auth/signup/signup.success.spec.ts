import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT } from '../common/const';
import { signup_S1 } from './fixture/index.success.fixture';

import { TEST_PAGE_URL, REDIRECT_PAGE_URL } from './const';

/**
 * @file 회원가입 E2E 테스트
 * @description [성공 ] 회원가입 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 올바른 정보 입력 시 회원가입 성공 및 로그인 페이지 리다이렉트
 *   - 실패: 캡챠 인증 실패 시 회원가입 불가
 *   - 실패: 이미 등록된 이메일 입력 시 토스트 알림 표시
 */

test.describe('[성공] 회원가입', () => {
  /**
   * [성공] 올바른 정보 입력 시 회원가입 성공 및 로그인 페이지 리다이렉트
   * - 입력, 유효성 검사, 버튼 클릭, 필드/버튼 비활성화, 토스트 메시지, URL 이동 확인
   */
  signup_S1('올바른 정보 입력 - 회원가입 성공 및 로그인 페이지 이동', async ({ page }) => {
    // 1. 회원가입 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 입력 필드/버튼 가져오기
    const idInput = page.locator('input[name="id"]');
    const pwdInput = page.locator('input[name="password"]');
    const pwdCheckInput = page.locator('input[name="confirmPassword"]');
    const signupButton = page.locator('button[type="submit"]');

    // 3. 잘못된 정보 입력
    await idInput.click();
    await idInput.fill(TEST_ACCOUNT.WRONG.ID);
    await pwdInput.click();
    await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);
    await pwdCheckInput.click();
    await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);
    await signupButton.click();

    // 4. 유효성 검사 실패 확인
    await expect(page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true })).toBeVisible();
    await expect(page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true })).toBeVisible();
    await expect(page.getByText('비밀번호가 일치하지 않습니다.', { exact: true })).toBeVisible();
    await expect(page.getByText('검증 실패', { exact: true })).toBeVisible();
    await expect(idInput).toHaveAttribute('data-invalid', 'true');
    await expect(pwdInput).toHaveAttribute('data-invalid', 'true');
    await expect(pwdCheckInput).toHaveAttribute('data-invalid', 'true');

    // 5. 올바른 정보 입력 후 오류 사라짐 확인
    await idInput.click();
    await idInput.fill(TEST_ACCOUNT.ID);
    await expect(page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true })).not.toBeVisible();
    await pwdInput.click();
    await pwdInput.fill(TEST_ACCOUNT.PASSWORD);
    await expect(page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true })).not.toBeVisible();
    await pwdCheckInput.click();
    await pwdCheckInput.fill('');
    await expect(page.getByText('비밀번호가 일치하지 않습니다.', { exact: true })).not.toBeVisible();
    await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);
    await expect(page.getByText('검증 실패', { exact: true })).not.toBeVisible();

    // 6. '회원가입' 버튼 클릭 및 필드/버튼 비활성화 확인
    await signupButton.click();

    // 7. '회원가입 성공' 메시지 확인
    await expect(page.getByText('회원가입 성공')).toBeVisible();

    // 8. 로그인 페이지로 리다이렉트 확인
    await page.waitForURL(REDIRECT_PAGE_URL);
    await expect(page.getByText('입력하기', { exact: true })).toBeEnabled();
  });
});
