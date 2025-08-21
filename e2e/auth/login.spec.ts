/**
 * @file 로그인 E2E 테스트
 * @description 로그인 기능의 End-to-End 테스트 시나리오를 정의합니다.
 *              - 성공: 올바른 정보 입력 시 로그인 성공 및 메인 페이지로 리다이렉트
 *              - 실패: 캡챠 인증 실패 시 로그인 불가
 *              - 실패: 잘못된 자격 증명 입력 시 오류 메시지 표시
 */
import { expect, test } from '@playwright/test';

import { TEST_ACCOUNT } from './const';
import {
  isSupabaseCalled,
  loginCaptchaFailTest,
  loginCredentialFailTest,
  loginSuccessTest,
} from './fixtures/login.fixture';

const TEST_PAEG_URL = '/auth/login' as const;
const REDIRECT_PAGE_URL = '/' as const;

test.describe('로그인', () => {
  test.describe('성공 시나리오', () => {
    loginSuccessTest('성공: 올바른 정보 입력 시, 로그인에 성공하고 메인 페이지로 이동해야 한다', async ({ page }) => {
      // 1. 로그인 페이지로 이동합니다.
      await page.goto(TEST_PAEG_URL);

      // 2. 아이디와 비밀번호 입력 필드를 가져옵니다.
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');
      const loginButton = page.getByText('입력하기', { exact: true });

      // 3. 잘못된 형식의 아이디와 비밀번호를 입력합니다.
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.WRONG.ID);
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);

      // 4. 로그인 버튼을 클릭합니다.
      await loginButton.click();

      // 5. 유효성 검사 실패 메시지와 버튼 상태를 확인합니다.
      const idMsg = page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true });
      const pwdMsg = page.getByText('소문자, 대문자, 숫자, 특수문자가 포함되어야 합니다.', { exact: true });
      const submitFailButton = page.getByText('검증 실패', { exact: true });

      await expect(idInput).toHaveAttribute('data-invalid', 'true');
      await expect(pwdInput).toHaveAttribute('data-invalid', 'true');
      await expect(idMsg).toBeVisible();
      await expect(pwdMsg).toBeVisible();
      await expect(submitFailButton).toBeVisible();

      // 6. 올바른 아이디를 다시 입력하고, 오류가 사라지는지 확인합니다.
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);
      await expect(idMsg).not.toBeVisible();
      await expect(submitFailButton).not.toBeVisible();

      // 7. 올바른 비밀번호를 다시 입력하고, 오류가 사라지는지 확인합니다.
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);
      await expect(pwdMsg).not.toBeVisible();

      // 8. 로그인 버튼을 클릭합니다.
      await loginButton.click();

      // 9. 토스트 메시지가 표시되는지 확인합니다.
      await expect(page.getByText('로그인 성공')).toBeVisible();

      // 10. 메인 페이지로 리다이렉트되었는지 확인합니다.
      await expect(page).toHaveURL(REDIRECT_PAGE_URL);

      // 11. Supabase API가 호출되었는지 확인합니다.
      expect(isSupabaseCalled).toBeTruthy();
    });
  });

  test.describe('실패 시나리오', () => {
    loginCaptchaFailTest('실패: 캡챠 인증 실패 시, 입력 필드와 버튼은 비활성화되어야 한다', async ({ page }) => {
      // 1. 로그인 페이지로 이동합니다.
      await page.goto(TEST_PAEG_URL);

      // 2. 입력 필드가 비활성화 상태인지 확인합니다.
      await expect(page.locator('input[name="id"]')).toBeDisabled();
      await expect(page.locator('input[name="password"]')).toBeDisabled();

      // 3. '검증 실패' 버튼이 표시되는지 확인합니다.
      const failedButton = page.getByText('검증 실패', { exact: true });
      await expect(failedButton).toBeVisible();

      // 4. 다른 페이지 이동 버튼들이 비활성화 상태인지 확인합니다.
      const signupButton = page.getByText('회원가입', { exact: true });
      const findPwdButton = page.getByText('비밀번호 찾기', { exact: true });
      const loginAnnonButton = page.getByText('방문자로 접속하기', { exact: true });
      await expect(signupButton).toBeDisabled();
      await expect(findPwdButton).toBeDisabled();
      await expect(loginAnnonButton).toBeDisabled();

      // 5. Supabase API가 호출되지 않았는지 확인합니다.
      expect(isSupabaseCalled).toBeFalsy();
    });

    loginCredentialFailTest('실패: 잘못된 자격 증명 입력 시, 오류 메시지가 표시되어야 한다', async ({ page }) => {
      // 1. 로그인 페이지로 이동합니다.
      await page.goto(TEST_PAEG_URL);

      // 2. 아이디, 비밀번호 입력 필드와 로그인 버튼을 가져옵니다.
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');
      const loginButton = page.getByText('입력하기', { exact: true });

      // 3. 올바른 형식의 아이디와 비밀번호를 입력합니다.
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);

      // 4. 로그인 버튼을 클릭합니다.
      await loginButton.click();

      // 5. 에러 메시지가 표시되는지 확인합니다.
      const errorMessage = page.getByText('이메일/비밀번호가 올바르지 않습니다.');
      await expect(errorMessage).toBeVisible();

      // 6. 로그인 버튼이 '검증 실패' 상태로 변경되었는지 확인합니다.
      const changedLoginButton = page.getByText('검증 실패', { exact: true });
      await expect(loginButton).not.toBeVisible();
      await expect(changedLoginButton).toBeVisible();

      // 7. 비밀번호를 다시 입력하면, 버튼 상태가 초기화되는지 확인합니다.
      await pwdInput.click();
      await pwdInput.fill('');
      await expect(loginButton).toBeVisible();
      await expect(loginButton).toBeEnabled();
      await expect(changedLoginButton).not.toBeVisible();

      // 8. Supabase API가 호출되었는지 확인합니다.
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
