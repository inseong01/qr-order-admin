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

      // 4. 입력창, 버튼 클릭 비활성화 확인
      const backButton = page.getByText('돌아가기', { exact: true });

      await expect(idInput).toBeDisabled();
      await expect(pwdInput).toBeDisabled();
      await expect(pwdCheckInput).toBeDisabled();
      await expect(backButton).toBeDisabled();

      // 5. 성공 메시지 확인
      await expect(page.getByText('회원가입 성공')).toBeVisible();

      // 6. 로그인 페이지 리다이렉트 확인
      await expect(page).toHaveURL('/auth/login'); // PATHS.AUTH.LOGIN

      // 7. API 호출 있음 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 8. 로그인 페이지 입력창 활성화 확인
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
      const errorMsg = page.getByText('알 수 없는 오류가 발생했습니다', { exact: true });
      await expect(errorMsg).toBeVisible({ timeout: 500 }); // 모달 감지 대기 시간 설정

      // 5. 페이지 이동 없음
      await expect(page).toHaveURL('/auth/signup'); // PATHS.AUTH.SIGNUP

      // 6. API 호출 있음 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
