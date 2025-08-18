import test, { expect } from '@playwright/test';

import { TEST_ACCOUNT } from '../const';
import {
  isSupabaseCalled,
  loginCaptchaFailTest,
  loginCredentialFailTest,
  loginSuccessTest,
} from '../fixtures/login.fixture';

test.describe('로그인', () => {
  test.describe('성공 시나리오', () => {
    loginSuccessTest('로그인 성공 후 메인 페이지로 이동', async ({ page }) => {
      // 1. 로그인 페이지 이동
      await page.goto('/auth/login'); // PATHS.AUTH.LOGIN

      // 2. 아이디와 비밀번호 입력
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');

      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.WRONG.ID);
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);

      // 3. 로그인 버튼 클릭
      const loginButton = page.getByText('입력하기', { exact: true });

      await loginButton.click();

      // 4. 로그인 실패 오류 메시지 스타일링 확인
      const idMsg = page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true });
      const pwdMsg = page.getByText('소문자, 대문자, 숫자, 특수문자가 포함되어야 합니다.', { exact: true });
      const submitFailButton = page.getByText('검증 실패', { exact: true });

      await expect(idInput).toHaveAttribute('data-invalid', 'true');
      await expect(pwdInput).toHaveAttribute('data-invalid', 'true');

      // 5. 로그인 실패 오류 메시지 출력
      await expect(idMsg).toBeVisible();
      await expect(pwdMsg).toBeVisible();
      await expect(submitFailButton).toBeVisible();

      // 6. 재입력 시 오류 메시지, 버튼 초기화
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);

      await expect(idMsg).not.toBeVisible();
      await expect(submitFailButton).not.toBeVisible();

      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);

      await expect(pwdMsg).not.toBeVisible();

      // 7. supabase.auth.signInWithPassword 호출 성공 확인 (API 호출 확인)
      await loginButton.click();

      await expect(page.getByText('로그인 성공')).toBeVisible();

      // 8. 메인 페이지로 리다이렉트 확인
      await expect(page).toHaveURL('/'); // PATHS.ROOT

      // 9. Supabase API 호출 여부
      expect(isSupabaseCalled).toBeTruthy();
    });
  });

  test.describe('실패 시나리오', () => {
    loginCaptchaFailTest('캡챠 실패 시 로그인 불가 및 API 호출 없음', async ({ page }) => {
      // 1. 로그인 페이지 이동
      await page.goto('/auth/login');

      // 2. 입력 필드 비활성화 확인
      await expect(page.locator('input[name="id"]')).toBeDisabled();
      await expect(page.locator('input[name="password"]')).toBeDisabled();

      // 3. 버튼 변경 확인
      const failedButton = page.getByText('검증 실패', { exact: true });
      await expect(failedButton).toBeVisible();

      // 4. 이외 버튼 이동 제한 확인
      const signupButton = page.getByText('회원가입', { exact: true });
      const findPwdButton = page.getByText('비밀번호 찾기', { exact: true });
      const loginAnnonButton = page.getByText('방문자로 접속하기', { exact: true });
      await expect(signupButton).toBeDisabled();
      await expect(findPwdButton).toBeDisabled();
      await expect(loginAnnonButton).toBeDisabled();

      // 5. Supabase API 호출 없음 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    loginCredentialFailTest('잘못된 자격 증명으로 로그인 실패', async ({ page }) => {
      // 1. 로그인 페이지 이동
      await page.goto('/auth/login');

      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');

      // 2. 이메일, 비밀번호 입력
      await idInput.fill(TEST_ACCOUNT.ID);
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);

      // 3. 로그인 버튼 클릭
      const loginButton = page.getByText('입력하기', { exact: true });
      await loginButton.click();

      // 4. 에러 모달 메시지 확인
      const errorMessage = page.getByText('알 수 없는 오류가 발생했습니다');
      await expect(errorMessage).toBeVisible({ timeout: 500 }); // 모달 감지 대기 시간 설정

      // 6. 로그인 버튼 스타일 변화 확인 (오류 문구 발생)
      const changedLoginButton = page.getByText('검증 실패', { exact: true });

      await expect(loginButton).not.toBeVisible();
      await expect(changedLoginButton).toBeVisible();

      // 7. 입력 필드 재입력 시 오류 초기화
      await pwdInput.click();
      await pwdInput.fill('');

      await expect(loginButton).toBeVisible();
      await expect(loginButton).toBeEnabled();
      await expect(changedLoginButton).not.toBeVisible();

      // 8. Supabase API 호출 여부
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
