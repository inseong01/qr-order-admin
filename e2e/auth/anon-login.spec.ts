/**
 * @file 방문자 접속 E2E 테스트
 * @description 방문자 접속 기능의 End-to-End 테스트 시나리오를 정의합니다.
 *              - 성공: 방문자 접속 시 메인 페이지로 리다이렉트
 *              - 실패: 캡챠 인증 실패 시 접속 버튼 비활성화
 *              - 실패: API 오류 발생 시 토스트 알림 표시
 */
import { test, expect } from '@playwright/test';

import {
  anonymousloginSuccessTest,
  anonymousLoginCaptchaFailTest,
  anonymousLoginInvalidCaptchaTokenTest,
  isSupabaseCalled,
} from './fixtures/anon-login.fixture';

const TEST_PAGE_URL = '/auth/login' as const;
const REDIRECT_PAGE_URL = '/' as const;

test.describe('방문자 접속', () => {
  test.describe('성공 시나리오', () => {
    anonymousloginSuccessTest('성공: 방문자 접속 시 메인 페이지로 리다이렉트되어야 한다', async ({ page }) => {
      // 1. 로그인 페이지로 이동합니다.
      await page.goto(TEST_PAGE_URL);

      // 2. '방문자로 접속하기' 버튼을 클릭합니다.
      const anonButton = page.getByText('방문자로 접속하기');
      await anonButton.click();

      // 3. 메인 페이지로 리다이렉트되었는지 확인합니다.
      await expect(page).toHaveURL(REDIRECT_PAGE_URL);

      // 4. Supabase API가 호출되었는지 확인합니다.
      expect(isSupabaseCalled).toBeTruthy();
    });
  });

  test.describe('실패 시나리오', () => {
    anonymousLoginCaptchaFailTest(
      '실패: 캡챠 인증 실패 시, 방문자 접속 버튼은 비활성화되어야 한다',
      async ({ page }) => {
        // 1. 로그인 페이지로 이동합니다.
        await page.goto(TEST_PAGE_URL);

        // 2. '방문자로 접속하기' 버튼이 비활성화 상태인지 확인합니다.
        const anonButton = page.getByText('방문자로 접속하기');
        await expect(anonButton).toBeDisabled();

        // 3. Supabase API가 호출되지 않았는지 확인합니다.
        expect(isSupabaseCalled).toBeFalsy();
      }
    );

    anonymousLoginInvalidCaptchaTokenTest('실패: API 오류 발생 시, 토스트 알림이 표시되어야 한다', async ({ page }) => {
      // 1. 로그인 페이지로 이동합니다.
      await page.goto(TEST_PAGE_URL);

      // 2. '방문자로 접속하기' 버튼을 클릭합니다.
      const anonButton = page.getByText('방문자로 접속하기');
      await anonButton.click();

      // 3. 토스트 알림이 표시되는지 확인합니다.
      await expect(page.getByText('인증 토큰이 유효하지 않습니다.')).toBeVisible();

      // 4. 페이지가 이동하지 않았는지 확인합니다.
      await expect(page).toHaveURL(TEST_PAGE_URL);

      // 5. Supabase API가 호출되었는지 확인합니다.
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
