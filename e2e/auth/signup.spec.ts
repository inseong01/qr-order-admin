import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT } from '../const';
import {
  isSupabaseCalled,
  signupCaptchaFailTest,
  signupEmailExistsTest,
  signupSuccessTest,
} from '../fixtures/signup.fixture';

// 회원가입 성공 시나리오

test.describe('회원가입', () => {
  test.describe('성공 시나리오', () => {
    signupSuccessTest('회원가입 성공 후 로그인 페이지로 이동', async ({ page }) => {
      // 1. 회원가입 페이지 이동
      await page.goto('/auth/signup');

      // 2. 잘못된 이메일, 비밀번호, 비밀번호 확인 입력
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');
      const pwdCheckInput = page.locator('input[name="confirmPassword"]');

      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.WRONG.ID);
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);
      await pwdCheckInput.click();
      await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);

      // 3. 회원가입 버튼 클릭
      const signupButton = page.locator('button[type="submit"]');

      await signupButton.click();

      // 4. 입력창 오류 출력 및 속성 확인
      const idMsg = page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true });
      const pwdMsg = page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true });
      const pwdCheckMsg = page.getByText('비밀번호가 일치하지 않습니다.', { exact: true });
      const submitFailButton = page.getByText('검증 실패', { exact: true });

      await expect(idMsg).toBeVisible();
      await expect(pwdMsg).toBeVisible();
      await expect(pwdCheckMsg).toBeVisible();
      await expect(submitFailButton).toBeVisible();

      await expect(idInput).toHaveAttribute('data-invalid', 'true');
      await expect(pwdInput).toHaveAttribute('data-invalid', 'true');
      await expect(pwdCheckInput).toHaveAttribute('data-invalid', 'true');

      // 5. 이메일, 비밀번호, 비밀번호 재입력 및 오류 메시지 확인
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);

      await expect(idMsg).not.toBeVisible();

      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);

      await expect(pwdMsg).not.toBeVisible();

      await pwdCheckInput.click();
      await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);

      await expect(submitFailButton).not.toBeVisible();

      // 6. 제출 버튼 클릭
      await signupButton.click();

      // 7. 입력창, 버튼 클릭 비활성화 확인
      const backButton = page.getByText('돌아가기', { exact: true });

      await expect(idInput).toBeDisabled();
      await expect(pwdInput).toBeDisabled();
      await expect(pwdCheckInput).toBeDisabled();
      await expect(backButton).toBeDisabled();

      // 8. 성공 메시지 확인
      await expect(page.getByText('회원가입 성공')).toBeVisible();

      // 9. 로그인 페이지 리다이렉트 확인
      await expect(page).toHaveURL('/auth/login'); // PATHS.AUTH.LOGIN

      // 10. API 호출 여부 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 11. 로그인 페이지 입력창 활성화 확인
      const loginButton = page.getByText('입력하기', { exact: true });
      await expect(loginButton).toBeEnabled();
    });
  });

  test.describe('실패 시나리오', () => {
    signupCaptchaFailTest('캡챠 실패 시 회원가입 불가 및 API 호출 없음', async ({ page }) => {
      // 1. 회원가입 페이지 이동
      await page.goto('/auth/signup');

      // 2. 입력 필드 비활성화 확인
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');
      const pwdCheckInput = page.locator('input[name="confirmPassword"]');

      await expect(idInput).toBeDisabled();
      await expect(pwdInput).toBeDisabled();
      await expect(pwdCheckInput).toBeDisabled();

      // 3. 회원가입 버튼 클릭 불가 확인
      const signupButton = page.locator('button[type="submit"]');
      await expect(signupButton).toBeDisabled();

      // 4. 이외 버튼 클릭 불가 확인
      const backButton = page.getByText('돌아가기', { exact: true });
      await expect(backButton).toBeDisabled();

      // 5. 버튼 글자 변경 확인
      await expect(signupButton).toHaveText('검증 실패');

      // 6. API 호출 없음 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    signupEmailExistsTest('이미 등록된 이메일로 회원가입 실패', async ({ page }) => {
      // 1. 회원가입 페이지 이동
      await page.goto('/auth/signup');

      // 2. 이메일, 비밀번호, 비밀번호 확인 입력
      const idInput = page.locator('input[name="id"]');
      const pwdInput = page.locator('input[name="password"]');
      const pwdCheckInput = page.locator('input[name="confirmPassword"]');

      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);
      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);
      await pwdCheckInput.click();
      await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);

      // 3. 회원가입 버튼 클릭
      const signupButton = page.locator('button[type="submit"]');
      await signupButton.click();

      // 4. API 호출 실패 확인 (에러 메시지)
      const errorMsg = page.getByText('이미 등록된 이메일 주소입니다.', { exact: true });
      await expect(errorMsg).toBeVisible();

      // 5. 회원가입 버튼 상태 확인
      await expect(signupButton).toHaveText('검증 실패');

      // 6. 페이지 이동 없음
      await expect(page).toHaveURL('/auth/signup'); // PATHS.AUTH.SIGNUP

      // 7. API 호출 있음 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
