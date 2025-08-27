import { expect, test } from '@playwright/test';

import { TEST_ACCOUNT } from '../common/const';
import {
  isSupabaseCalled,
  loginCaptchaFailTest,
  loginCredentialFailTest,
  loginSuccessTest,
} from './fixture/login.fixture';

const TEST_PAEG_URL = '/auth/login' as const;
const REDIRECT_PAGE_URL = '/' as const;

/**
 * @file 로그인 E2E 테스트
 * @description [성공/실패] 로그인 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 올바른 정보 입력 시 로그인 성공 및 메인 페이지로 리다이렉트
 *   - 실패: 캡챠 인증 실패 시 로그인 불가
 *   - 실패: 잘못된 자격 증명 입력 시 오류 메시지 표시
 */
test.describe('[성공/실패] 로그인', () => {
  test.describe('[성공] 로그인', () => {
    /**
     * [성공] 올바른 정보 입력 시 로그인 성공 및 메인 페이지 리다이렉트
     * - 입력, 유효성 검사, 토스트 메시지, URL 이동, Supabase 호출 확인
     */
    loginSuccessTest('[성공] 올바른 정보 입력 - 로그인 성공 및 메인 페이지 이동', async ({ page }) => {
      // 1. 로그인 페이지로 이동
      await page.goto(TEST_PAEG_URL);

      // 2. 아이디/비밀번호 입력 필드, 버튼 가져오기
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');
      const loginButton = page.getByText('입력하기', { exact: true });

      // 3. 잘못된 형식 입력 후 유효성 검사 실패 확인
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.WRONG.ID);
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);
      await loginButton.click();
      const idMsg = page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true });
      const pwdMsg = page.getByText('소문자, 대문자, 숫자, 특수문자가 포함되어야 합니다.', { exact: true });
      const submitFailButton = page.getByText('검증 실패', { exact: true });
      await expect(idInput).toHaveAttribute('data-invalid', 'true');
      await expect(pwdInput).toHaveAttribute('data-invalid', 'true');
      await expect(idMsg).toBeVisible();
      await expect(pwdMsg).toBeVisible();
      await expect(submitFailButton).toBeVisible();

      // 4. 올바른 정보 입력 후 오류 사라짐 확인
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);
      await expect(idMsg).not.toBeVisible();
      await expect(submitFailButton).not.toBeVisible();
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);
      await expect(pwdMsg).not.toBeVisible();

      // 5. 로그인 버튼 클릭 및 성공 토스트 확인
      await loginButton.click();
      await expect(page.getByText('로그인 성공')).toBeVisible();

      // 6. 메인 페이지로 리다이렉트 확인
      await expect(page).toHaveURL(REDIRECT_PAGE_URL);

      // 7. Supabase API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });

  test.describe('[실패] 로그인', () => {
    /**
     * [실패] 캡챠 인증 실패 시 로그인 불가
     * - 입력 필드/버튼 비활성화, API 미호출 확인
     */
    loginCaptchaFailTest('[실패] 캡챠 인증 실패 - 입력/버튼 비활성화', async ({ page }) => {
      // 1. 로그인 페이지로 이동
      await page.goto(TEST_PAEG_URL);

      // 2. 입력 필드 비활성화 확인
      await expect(page.locator('input[name="id"]')).toBeDisabled();
      await expect(page.locator('input[name="password"]')).toBeDisabled();

      // 3. '검증 실패' 버튼 표시 확인
      const failedButton = page.getByText('검증 실패', { exact: true });
      await expect(failedButton).toBeVisible();

      // 4. 다른 이동 버튼 비활성화 확인
      const signupButton = page.getByText('회원가입', { exact: true });
      const findPwdButton = page.getByText('비밀번호 찾기', { exact: true });
      const loginAnnonButton = page.getByText('방문자로 접속하기', { exact: true });
      await expect(signupButton).toBeDisabled();
      await expect(findPwdButton).toBeDisabled();
      await expect(loginAnnonButton).toBeDisabled();

      // 5. Supabase API 미호출 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    /**
     * [실패] 잘못된 자격 증명 입력 시 오류 메시지 표시
     * - 에러 메시지, 버튼 상태 변경, Supabase 호출 확인
     */
    loginCredentialFailTest('[실패] 잘못된 자격 증명 입력 - 오류 메시지 표시', async ({ page }) => {
      // 1. 로그인 페이지로 이동
      await page.goto(TEST_PAEG_URL);

      // 2. 입력 필드/버튼 가져오기
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');
      const loginButton = page.getByText('입력하기', { exact: true });

      // 3. 올바른 정보 입력 후 로그인 시도
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);
      await loginButton.click();

      // 4. 에러 메시지 표시 확인
      const errorMessage = page.getByText('이메일/비밀번호가 올바르지 않습니다.');
      await expect(errorMessage).toBeVisible();

      // 5. 버튼 상태 변경 확인
      const changedLoginButton = page.getByText('검증 실패', { exact: true });
      await expect(loginButton).not.toBeVisible();
      await expect(changedLoginButton).toBeVisible();

      // 6. 비밀번호 재입력 시 버튼 초기화 확인
      await pwdInput.click();
      await pwdInput.fill('');
      await expect(loginButton).toBeVisible();
      await expect(loginButton).toBeEnabled();
      await expect(changedLoginButton).not.toBeVisible();

      // 7. Supabase API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
