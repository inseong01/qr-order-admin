import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT, REDIRECT_URL, TEST_SESSION_KEY, TEST_SESSION_VALUE, TEST_ORIGN_URL } from 'e2e/const';
import {
  updatePasswordSuccessTest,
  updatePasswordFailInvalidCaptchaTest,
  updatePasswordFailInvalidFormatTest,
  updatePasswordFailInvalidToken,
  isSupabaseCalled,
} from '../fixtures/update-password.fixture';

// 비밀번호 재설정 E2E 테스트

test.describe('비밀번호 재설정', () => {
  test.describe('성공 시나리오', () => {
    updatePasswordSuccessTest('비밀번호 재설정 성공 후 로그인 페이지로 이동', async ({ page, context }) => {
      // 1. 페이지 스토리지 확인
      const beforeStorage = await context.storageState();
      const beforeSession = beforeStorage.origins
        .find((s) => s.origin === TEST_ORIGN_URL)
        ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);

      expect(beforeStorage.origins.length).toBeGreaterThanOrEqual(1);
      expect(beforeSession).toHaveProperty('name', TEST_SESSION_KEY);
      expect(beforeSession).toHaveProperty('value', JSON.stringify(TEST_SESSION_VALUE));

      // 2. 메일 링크 접속
      await page.goto(REDIRECT_URL);

      // 3. 리다이렉트 주소 확인
      await expect(page).toHaveURL('/change/password'); // PATHS.ROOT.CHANGE.PASSWORD

      // 4. 새 비밀번호, 비밀번호 확인 입력
      const pwdInput = page.locator('input[name="password"]');
      const pwdCheckInput = page.locator('input[name="confirmPassword"]');

      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);

      await pwdCheckInput.click();
      await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);

      // 5. "비밀번호 수정" 버튼 클릭
      const updateButton = page.locator('button[type="submit"]');
      await updateButton.click();

      // 6. 수정 버튼 상태 확인
      await expect(updateButton).not.toBeVisible();

      // 7. API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 8. 성공 메시지 확인
      const successMsg = page.getByText('비밀번호 재설정');
      await expect(successMsg).toBeVisible();

      // 9. 로그인 페이지 리다이렉트 확인
      await expect(page).toHaveURL('/auth/login'); // PATHS.AUTH.LOGIN

      // 10. 페이지 스토리지 확인
      const afterStorage = await context.storageState();
      const afterSession = afterStorage.origins
        .find((s) => s.origin === TEST_ORIGN_URL)
        ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);

      expect(afterStorage.origins).toHaveLength(0);
      expect(afterSession).toBe(undefined);
    });
  });

  test.describe('실패 시나리오', () => {
    updatePasswordFailInvalidCaptchaTest('유효하지 않은 캡챠 토큰으로 비밀번호 재설정 실패', async ({ page }) => {
      // 1. 재설정 링크로 페이지 이동
      await page.goto('/change/password'); // PATHS.ROOT.CHANGE.PASSWORD

      // 2. 비밀번호 입력창, 제출 버튼 비활성화 확인
      const pwdInput = page.locator('input[name="password"]');
      const pwdCheckInput = page.locator('input[name="confirmPassword"]');
      const updateButton = page.locator('button[type="submit"]');

      await expect(pwdInput).toBeDisabled();
      await expect(pwdCheckInput).toBeDisabled();
      await expect(updateButton).toBeDisabled();
    });

    updatePasswordFailInvalidFormatTest('잘못된 비밀번호 형식으로 비밀번호 재설정 실패', async ({ page }) => {
      // 1. 재설정 링크로 페이지 이동
      await page.goto('/change/password'); // PATHS.ROOT.CHANGE.PASSWORD

      // 2. 잘못된 비밀번호 입력
      const pwdInput = page.locator('input[name="password"]');
      const pwdCheckInput = page.locator('input[name="confirmPassword"]');

      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);

      await pwdCheckInput.click();
      await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);

      // 3. 제출 버튼 클릭
      const updateButton = page.locator('button[type="submit"]');
      await updateButton.click();

      // 4. API 호출 확인
      expect(isSupabaseCalled).toBeFalsy();

      // 5. 에러 메시지 확인
      const pwdMsg = page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true });
      const pwdCheckMsg = page.getByText('비밀번호가 일치하지 않습니다.', { exact: true });

      await expect(pwdMsg).toBeVisible();
      await expect(pwdCheckMsg).toBeVisible();

      // 6. 비밀번호 재입력
      await pwdInput.click();
      await pwdInput.fill('');

      // 7. 비밀번호 입력 오류 확인
      await expect(pwdMsg).not.toBeVisible();

      // 8. 비밀번호 확인 재입력
      await pwdCheckInput.click();
      await pwdCheckInput.fill('');

      // 9. 비밀번호 확인 입력 오류 확인
      await expect(pwdMsg).not.toBeVisible();
    });

    updatePasswordFailInvalidToken('유효하지 않은 토큰으로 비밀번호 재설정 실패', async ({ page }) => {
      // 1. 재설정 링크로 페이지 이동
      await page.goto('/change/password'); // PATHS.ROOT.CHANGE.PASSWORD

      // 2. 비밀번호 입력
      const pwdInput = page.locator('input[name="password"]');
      const pwdCheckInput = page.locator('input[name="confirmPassword"]');

      await pwdInput.click();
      await pwdInput.fill(TEST_ACCOUNT.PASSWORD);

      await pwdCheckInput.click();
      await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);

      // 3. 제출 버튼 클릭
      const updateButton = page.locator('button[type="submit"]');
      await updateButton.click();

      // 4. API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 5. API 호출 실패 확인 (에러 메시지)
      const errorMsg = page.getByText('인증 토큰이 유효하지 않습니다.', { exact: true });
      await expect(errorMsg).toBeVisible();
    });
  });
});
