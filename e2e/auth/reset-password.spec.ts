import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT } from '../const';
import {
  isSupabaseCalled,
  recoveryPasswordSuccessTest,
  recoveryPasswordSuccessNonexistentEmailTest,
  recoveryPasswordFailInvalidFormatTest,
  recoveryPasswordFailInvalidToken,
  recoveryPasswordFailInvalidCaptcha,
} from '../fixtures/recovery-email.fixture';

// 비밀번호 찾기 E2E 테스트

test.describe('비밀번호 찾기', () => {
  test.describe('성공 시나리오', () => {
    recoveryPasswordSuccessTest('가입된 이메일', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지 이동
      await page.goto('/auth/find/password'); // PATHS.AUTH.FIND.PASSWORD

      // 2. 가입된 이메일 입력
      const idInput = page.locator('input[name="id"]');

      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);

      // 3. "비밀번호 찾기" 버튼 클릭
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // 4. 버튼 비활성화 확인
      const moveButton = page.getByText('로그인');

      await expect(moveButton).not.toBeEnabled();
      await expect(submitButton).not.toBeEnabled();

      // 5. 성공 메시지 확인
      const successMsg = page.getByText('메일 전송');
      await expect(successMsg).toBeVisible();

      // 6. API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 7. 로그인 페이지 리다이렉트 확인
      await expect(page).toHaveURL('/auth/login'); // PATHS.AUTH.LOGIN

      // 8. 로그인 페이지 입력창 활성화 확인
      const loginButton = page.getByText('입력하기', { exact: true });
      await expect(loginButton).toBeEnabled();
    });

    recoveryPasswordSuccessNonexistentEmailTest('존재하지 않는 이메일', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지 이동
      await page.goto('/auth/find/password'); // PATHS.AUTH.FIND.PASSWORD

      // 2. 존재하지 않는 이메일 입력
      const idInput = page.locator('input[name="id"]');

      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.NONE_EXIST_ID);

      // 3. "비밀번호 찾기" 버튼 클릭
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // 4. 버튼 비활성화 확인
      const moveButton = page.getByText('로그인');

      await expect(moveButton).not.toBeEnabled();
      await expect(submitButton).not.toBeEnabled();

      // 5. 성공 메시지 확인
      const successMsg = page.getByText('메일 전송');
      await expect(successMsg).toBeVisible();

      // 6. API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 7. 로그인 페이지 리다이렉트 확인
      await expect(page).toHaveURL('/auth/login'); // PATHS.AUTH.LOGIN

      // 8. 로그인 페이지 입력창 활성화 확인
      const loginButton = page.getByText('입력하기', { exact: true });
      await expect(loginButton).toBeEnabled();
    });
  });

  test.describe('실패 시나리오', () => {
    recoveryPasswordFailInvalidCaptcha('캡챠 실패 시 로그인 불가 및 API 호출 없음', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지 이동
      await page.goto('/auth/find/password'); // PATHS.AUTH.FIND.PASSWORD

      // 2. 입력, 버튼 상태 확인
      const idInput = page.locator('input[name="id"]');
      const submitButton = page.locator('button[type="submit"]');
      const backButton = page.getByText('로그인', { exact: true });

      await expect(idInput).not.toBeEnabled();
      await expect(submitButton).not.toBeEnabled();
      await expect(backButton).not.toBeEnabled();
      await expect(submitButton).toHaveText('검증 실패');

      // 3. API 호출 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    recoveryPasswordFailInvalidFormatTest('잘못된 이메일 형식', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지 이동
      await page.goto('/auth/find/password'); // PATHS.AUTH.FIND.PASSWORD

      // 2. 잘못된 형식의 이메일 입력
      const idInput = page.locator('input[name="id"]');

      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.WRONG.ID);

      // 3. "비밀번호 찾기" 버튼 클릭
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // 4. API 호출 확인
      expect(isSupabaseCalled).toBeFalsy();

      // 5. 입력창 알림 확인
      const idMsg = page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true });

      await expect(idMsg).toBeVisible();
      await expect(idInput).toHaveAttribute('data-invalid', 'true');
      await expect(submitButton).toHaveText('검증 실패');
    });

    recoveryPasswordFailInvalidToken('인증 토큰 무효', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지 이동
      await page.goto('/auth/find/password'); // PATHS.AUTH.FIND.PASSWORD

      // 2. 이메일 입력
      const idInput = page.locator('input[name="id"]');

      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.ID);

      // 3. "비밀번호 찾기" 버튼 클릭
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // 4. API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 5. API 호출 실패 확인 (에러 메시지)
      const errorMsg = page.getByText('인증 토큰이 유효하지 않습니다.');

      await expect(submitButton).toHaveText('검증 실패');
      await expect(errorMsg).toBeVisible();

      // 6. 캡챠 재생성, 제출 활성화
      await expect(submitButton).toBeEnabled();
    });
  });
});
