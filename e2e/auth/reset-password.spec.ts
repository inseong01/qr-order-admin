/**
 * @file 비밀번호 찾기 E2E 테스트
 * @description 비밀번호 찾기 기능의 End-to-End 테스트 시나리오를 정의합니다.
 *              - 성공: 가입된 이메일 입력 시 메일 전송 후 로그인 페이지로 리다이렉트
 *              - 성공: 존재하지 않는 이메일 입력 시에도 동일하게 동작 (보안)
 *              - 실패: 캡챠 인증 실패 시 기능 사용 불가
 *              - 실패: 잘못된 이메일 형식 입력 시 오류 메시지 표시
 *              - 실패: API 오류 발생 시 토스트 알림 표시
 */
import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT } from './const';
import {
  isSupabaseCalled,
  recoveryPasswordSuccessTest,
  recoveryPasswordSuccessNonexistentEmailTest,
  recoveryPasswordFailInvalidFormatTest,
  recoveryPasswordFailInvalidToken,
  recoveryPasswordFailInvalidCaptcha,
} from './fixtures/recovery-email.fixture';

const TEST_PAGE_URL = '/auth/find/password' as const;
const REDIRECT_PAGE_URL = '/auth/login' as const;

test.describe('비밀번호 찾기', () => {
  test.describe('성공 시나리오', () => {
    recoveryPasswordSuccessTest(
      '성공: 가입된 이메일 입력 시, 메일 전송 후 로그인 페이지로 이동해야 한다',
      async ({ page }) => {
        // 1. 비밀번호 찾기 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 가입된 이메일을 입력합니다.
        await page.locator('input[name="id"]').click();
        await page.locator('input[name="id"]').fill(TEST_ACCOUNT.ID);

        // 3. '비밀번호 찾기' 버튼을 클릭합니다.
        await page.locator('button[type="submit"]').click();

        // 4. 버튼이 비활성화되고 토스트 알림이 표시되는지 확인합니다.
        await expect(page.getByText('로그인')).not.toBeEnabled();
        await expect(page.locator('button[type="submit"]')).not.toBeEnabled();
        await expect(page.getByText('메일 전송')).toBeVisible();

        // 5. Supabase API가 호출되었는지 확인합니다.
        expect(isSupabaseCalled).toBeTruthy();

        // 6. 로그인 페이지로 리다이렉트되었는지 확인합니다.
        await page.waitForURL(REDIRECT_PAGE_URL);
        await expect(page.getByText('입력하기', { exact: true })).toBeEnabled();
      }
    );

    recoveryPasswordSuccessNonexistentEmailTest(
      '성공: 존재하지 않는 이메일 입력 시에도, 정상적으로 메일이 전송된 것처럼 보여야 한다',
      async ({ page }) => {
        // 1. 비밀번호 찾기 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 존재하지 않는 이메일을 입력합니다.
        await page.locator('input[name="id"]').click();
        await page.locator('input[name="id"]').fill(TEST_ACCOUNT.NONE_EXIST_ID);

        // 3. '비밀번호 찾기' 버튼을 클릭합니다.
        await page.locator('button[type="submit"]').click();

        // 4. 버튼이 비활성화되고 토스트 알림이 표시되는지 확인합니다.
        await expect(page.getByText('로그인')).not.toBeEnabled();
        await expect(page.locator('button[type="submit"]')).not.toBeEnabled();
        await expect(page.getByText('메일 전송')).toBeVisible();

        // 5. Supabase API가 호출되었는지 확인합니다.
        expect(isSupabaseCalled).toBeTruthy();

        // 6. 로그인 페이지로 리다이렉트되었는지 확인합니다.
        await page.waitForURL(REDIRECT_PAGE_URL);
        await expect(page.getByText('입력하기', { exact: true })).toBeEnabled();
      }
    );
  });

  test.describe('실패 시나리오', () => {
    recoveryPasswordFailInvalidCaptcha(
      '실패: 캡챠 인증 실패 시, 입력 필드와 버튼은 비활성화되어야 한다',
      async ({ page }) => {
        // 1. 비밀번호 찾기 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 입력 필드와 버튼이 비활성화 상태인지 확인합니다.
        await expect(page.locator('input[name="id"]')).not.toBeEnabled();
        await expect(page.locator('button[type="submit"]')).not.toBeEnabled();
        await expect(page.getByText('로그인', { exact: true })).not.toBeEnabled();
        await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

        // 3. Supabase API가 호출되지 않았는지 확인합니다.
        expect(isSupabaseCalled).toBeFalsy();
      }
    );

    recoveryPasswordFailInvalidFormatTest(
      '실패: 잘못된 이메일 형식 입력 시, 오류 메시지가 표시되어야 한다',
      async ({ page }) => {
        // 1. 비밀번호 찾기 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. 잘못된 형식의 이메일을 입력합니다.
        const idInput = page.locator('input[name="id"]');
        await idInput.click();
        await idInput.fill(TEST_ACCOUNT.WRONG.ID);

        // 3. '비밀번호 찾기' 버튼을 클릭합니다.
        await page.locator('button[type="submit"]').click();

        // 4. 유효성 검사 실패 메시지와 버튼 상태를 확인합니다.
        await expect(page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true })).toBeVisible();
        await expect(idInput).toHaveAttribute('data-invalid', 'true');
        await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

        // 5. Supabase API가 호출되지 않았는지 확인합니다.
        expect(isSupabaseCalled).toBeFalsy();
      }
    );

    recoveryPasswordFailInvalidToken('실패: API 오류 발생 시, 토스트 알림이 표시되어야 한다', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지로 이동합니다.
      await page.goto(TEST_PAGE_URL);

      // 2. 이메일을 입력합니다.
      await page.locator('input[name="id"]').click();
      await page.locator('input[name="id"]').fill(TEST_ACCOUNT.ID);

      // 3. '비밀번호 찾기' 버튼을 클릭합니다.
      await page.locator('button[type="submit"]').click();

      // 4. 토스트 알림이 표시되는지 확인합니다.
      await expect(page.getByText('인증 토큰이 유효하지 않습니다.')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

      // 5. 제출 버튼이 다시 활성화되는지 확인합니다.
      await expect(page.locator('button[type="submit"]')).toBeEnabled();

      // 6. Supabase API가 호출되었는지 확인합니다.
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
