/**
 * @file 비밀번호 재설정 E2E 테스트
 * @description 비밀번호 재설정 기능의 End-to-End 테스트 시나리오를 정의합니다.
 *              - 성공: 유효한 링크 접속 시 비밀번호 재설정 성공 및 로그인 페이지로 리다이렉트
 *              - 실패: 캡챠 인증 실패 시 기능 사용 불가
 *              - 실패: 잘못된 비밀번호 형식 입력 시 오류 메시지 표시
 *              - 실패: 유효하지 않은 토큰으로 접속 시 토스트 알림 표시
 */
import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT, EMAIL_REDIRECT_URL, TEST_SESSION_KEY, TEST_SESSION_VALUE, TEST_ORIGN_URL } from 'e2e/auth/const';
import {
  updatePasswordSuccessTest,
  updatePasswordFailInvalidCaptchaTest,
  updatePasswordFailInvalidFormatTest,
  updatePasswordFailInvalidToken,
  isSupabaseCalled,
} from './fixtures/update-password.fixture';

const TEST_PAGE_URL = EMAIL_REDIRECT_URL;
const REDIRECT_PAGE_URL = '/change/password' as const;

test.describe('비밀번호 재설정', () => {
  test.describe('성공 시나리오', () => {
    updatePasswordSuccessTest(
      '성공: 유효한 링크로 접속 시, 비밀번호 재설정 후 로그인 페이지로 이동해야 한다',
      async ({ page, context }) => {
        // 1. 스토리지에 인증 토큰이 있는지 확인합니다.
        const beforeStorage = await context.storageState();
        const beforeSession = beforeStorage.origins
          .find((s) => s.origin === TEST_ORIGN_URL)
          ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);
        expect(beforeStorage.origins.length).toBeGreaterThanOrEqual(1);
        expect(beforeSession).toHaveProperty('name', TEST_SESSION_KEY);
        expect(beforeSession).toHaveProperty('value', JSON.stringify(TEST_SESSION_VALUE));

        // 2. 비밀번호 재설정 메일의 링크로 접속합니다.
        await page.goto(TEST_PAGE_URL);

        // 3. 비밀번호 변경 페이지로 리다이렉트되었는지 확인합니다.
        await page.waitForURL(REDIRECT_PAGE_URL);

        // 4. 새 비밀번호를 입력합니다.
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill(TEST_ACCOUNT.PASSWORD);
        await page.locator('input[name="confirmPassword"]').click();
        await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.PASSWORD);

        // 5. '비밀번호 수정' 버튼을 클릭합니다.
        await page.locator('button[type="submit"]').click();

        // 6. '비밀번호 재설정' 성공 메시지가 표시되는지 확인합니다.
        await expect(page.getByText('비밀번호 재설정')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).not.toBeVisible();

        // 7. 로그인 페이지로 리다이렉트되었는지 확인합니다.
        await page.waitForURL('/auth/login');

        // 8. 스토리지에서 인증 토큰이 제거되었는지 확인합니다.
        const afterStorage = await context.storageState();
        const afterSession = afterStorage.origins
          .find((s) => s.origin === TEST_ORIGN_URL)
          ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);
        expect(afterStorage.origins).toHaveLength(0);
        expect(afterSession).toBe(undefined);

        // 9. Supabase API가 호출되었는지 확인합니다.
        expect(isSupabaseCalled).toBeTruthy();
      }
    );
  });

  test.describe('실패 시나리오', () => {
    updatePasswordFailInvalidCaptchaTest(
      '실패: 캡챠 인증 실패 시, 입력 필드와 버튼은 비활성화되어야 한다',
      async ({ page }) => {
        // 1. 비밀번호 재설정 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 입력 필드와 제출 버튼이 비활성화 상태인지 확인합니다.
        await expect(page.locator('input[name="password"]')).toBeDisabled();
        await expect(page.locator('input[name="confirmPassword"]')).toBeDisabled();
        await expect(page.locator('button[type="submit"]')).toBeDisabled();
      }
    );

    updatePasswordFailInvalidFormatTest(
      '실패: 잘못된 비밀번호 형식 입력 시, 오류 메시지가 표시되어야 한다',
      async ({ page }) => {
        // 1. 비밀번호 재설정 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 잘못된 형식의 비밀번호를 입력하고 '비밀번호 수정' 버튼을 클릭합니다.
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill(TEST_ACCOUNT.WRONG.PASSWORD);
        await page.locator('input[name="confirmPassword"]').click();
        await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.PASSWORD);
        await page.locator('button[type="submit"]').click();

        // 3. 유효성 검사 실패 메시지가 표시되는지 확인합니다.
        await expect(page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true })).toBeVisible();
        await expect(page.getByText('비밀번호가 일치하지 않습니다.', { exact: true })).toBeVisible();

        // 4. 비밀번호를 다시 입력하면 오류가 사라지는지 확인합니다.
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('');
        await expect(page.getByText('소문자, 대문자가 포함되어야 합니다.', { exact: true })).not.toBeVisible();

        // 5. 비밀번호 확인을 다시 입력하면 오류가 사라지는지 확인합니다.
        await page.locator('input[name="confirmPassword"]').click();
        await page.locator('input[name="confirmPassword"]').fill('');
        await expect(page.getByText('비밀번호가 일치하지 않습니다.', { exact: true })).not.toBeVisible();

        // 6. Supabase API가 호출되지 않았는지 확인합니다.
        expect(isSupabaseCalled).toBeFalsy();
      }
    );

    updatePasswordFailInvalidToken(
      '실패: 유효하지 않은 토큰으로 접속 시, 오류 메시지가 표시되어야 한다',
      async ({ page }) => {
        // 1. 비밀번호 재설정 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 비밀번호를 입력하고 '비밀번호 수정' 버튼을 클릭합니다.
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill(TEST_ACCOUNT.PASSWORD);
        await page.locator('input[name="confirmPassword"]').click();
        await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.PASSWORD);
        await page.locator('button[type="submit"]').click();

        // 3. 토스트 알림이 표시되는지 확인합니다.
        await expect(page.getByText('인증 토큰이 유효하지 않습니다.', { exact: true })).toBeVisible();

        // 4. Supabase API가 호출되었는지 확인합니다.
        expect(isSupabaseCalled).toBeTruthy();
      }
    );
  });
});
