/**
 * @file 회원가입 E2E 테스트
 * @description 회원가입 기능의 End-to-End 테스트 시나리오를 정의합니다.
 *              - 성공: 올바른 정보 입력 시 회원가입 성공 및 로그인 페이지로 리다이렉트
 *              - 실패: 캡챠 인증 실패 시 회원가입 불가
 *              - 실패: 이미 등록된 이메일 입력 시 토스트 알림 표시
 */
import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT } from './const';
import {
  isSupabaseCalled,
  signupCaptchaFailTest,
  signupEmailExistsTest,
  signupSuccessTest,
} from './fixtures/signup.fixture';

const TEST_PAGE_URL = '/auth/signup' as const;
const REDIRECT_PAGE_URL = '/auth/login' as const;

test.describe('회원가입', () => {
  test.describe('성공 시나리오', () => {
    signupSuccessTest(
      '성공: 올바른 정보 입력 시, 회원가입에 성공하고 로그인 페이지로 이동해야 한다',
      async ({ page }) => {
        // 1. 회원가입 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 입력 필드를 가져옵니다.
        const idInput = page.locator('input[name="id"]');
        const pwdInput = page.locator('input[name="password"]');
        const pwdCheckInput = page.locator('input[name="confirmPassword"]');
        const signupButton = page.locator('button[type="submit"]');

        // 3. 잘못된 형식의 정보를 입력하고 '회원가입' 버튼을 클릭합니다.
        await idInput.click();
        await idInput.fill(TEST_ACCOUNT.WRONG.ID);
        await pwdInput.click();
        await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);
        await pwdCheckInput.click();
        await pwdCheckInput.fill(TEST_ACCOUNT.PASSWORD);
        await signupButton.click();

        // 4. 유효성 검사 실패 메시지와 버튼 상태를 확인합니다.
        await expect(page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true })).toBeVisible();
        await expect(page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true })).toBeVisible();
        await expect(page.getByText('비밀번호가 일치하지 않습니다.', { exact: true })).toBeVisible();
        await expect(page.getByText('검증 실패', { exact: true })).toBeVisible();
        await expect(idInput).toHaveAttribute('data-invalid', 'true');
        await expect(pwdInput).toHaveAttribute('data-invalid', 'true');
        await expect(pwdCheckInput).toHaveAttribute('data-invalid', 'true');

        // 5. 올바른 정보를 다시 입력하고 오류가 사라지는지 확인합니다.
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

        // 6. '회원가입' 버튼을 클릭합니다.
        await signupButton.click();

        // 7. 입력 필드와 버튼이 비활성화되는지 확인합니다.
        await expect(idInput).toBeDisabled();
        await expect(pwdInput).toBeDisabled();
        await expect(pwdCheckInput).toBeDisabled();
        await expect(page.getByText('돌아가기', { exact: true })).toBeDisabled();

        // 8. '회원가입 성공' 메시지가 표시되는지 확인합니다.
        await expect(page.getByText('회원가입 성공')).toBeVisible();

        // 9. 로그인 페이지로 리다이렉트되었는지 확인합니다.
        await page.waitForURL(REDIRECT_PAGE_URL);
        await expect(page.getByText('입력하기', { exact: true })).toBeEnabled();

        // 10. Supabase API가 호출되었는지 확인합니다.
        expect(isSupabaseCalled).toBeTruthy();
      }
    );
  });

  test.describe('실패 시나리오', () => {
    signupCaptchaFailTest('실패: 캡챠 인증 실패 시, 입력 필드와 버튼은 비활성화되어야 한다', async ({ page }) => {
      // 1. 회원가입 페이지로 이동합니다.
      await page.goto(TEST_PAGE_URL);

      // 2. 입력 필드가 비활성화 상태인지 확인합니다.
      await expect(page.locator('input[name="id"]')).toBeDisabled();
      await expect(page.locator('input[name="password"]')).toBeDisabled();
      await expect(page.locator('input[name="confirmPassword"]')).toBeDisabled();

      // 3. 버튼들이 비활성화 상태인지 확인합니다.
      await expect(page.locator('button[type="submit"]')).toBeDisabled();
      await expect(page.getByText('돌아가기', { exact: true })).toBeDisabled();

      // 4. '회원가입' 버튼이 '검증 실패' 상태인지 확인합니다.
      await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

      // 5. Supabase API가 호출되지 않았는지 확인합니다.
      expect(isSupabaseCalled).toBeFalsy();
    });

    signupEmailExistsTest('실패: 이미 등록된 이메일 입력 시, 토스트 알림이 표시되어야 한다', async ({ page }) => {
      // 1. 회원가입 페이지로 이동합니다.
      await page.goto(TEST_PAGE_URL);

      // 2. 이미 등록된 이메일과 비밀번호를 입력합니다.
      await page.locator('input[name="id"]').click();
      await page.locator('input[name="id"]').fill(TEST_ACCOUNT.ID);
      await page.locator('input[name="password"]').click();
      await page.locator('input[name="password"]').fill(TEST_ACCOUNT.PASSWORD);
      await page.locator('input[name="confirmPassword"]').click();
      await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.PASSWORD);

      // 3. '회원가입' 버튼을 클릭합니다.
      await page.locator('button[type="submit"]').click();

      // 4. 토스트 알림이 표시되는지 확인합니다.
      await expect(page.getByText('이미 등록된 이메일 주소입니다.', { exact: true })).toBeVisible();

      // 5. '회원가입' 버튼이 '검증 실패' 상태인지 확인합니다.
      await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

      // 6. 페이지가 이동하지 않았는지 확인합니다.
      await expect(page).toHaveURL(TEST_PAGE_URL);

      // 7. Supabase API가 호출되었는지 확인합니다.
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
