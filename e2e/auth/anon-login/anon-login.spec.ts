import { test, expect } from '@playwright/test';

import {
  anonymousloginSuccessTest,
  anonymousLoginCaptchaFailTest,
  anonymousLoginInvalidCaptchaTokenTest,
  isSupabaseCalled,
} from './fixture/anon-login.fixture';

const TEST_PAGE_URL = '/auth/login' as const;
const REDIRECT_PAGE_URL = '/' as const;

/**
 * @file 익명 로그인(방문자 접속) E2E 테스트
 * @description [성공/실패] 익명 로그인 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 익명 로그인 시 메인 페이지로 리다이렉트
 *   - 실패: 캡챠 인증 실패 시 접속 버튼 비활성화
 *   - 실패: API 오류 발생 시 토스트 알림 표시
 */
test.describe('[성공/실패] 익명 로그인(방문자 접속)', () => {
  test.describe('[성공] 익명 로그인', () => {
    /**
     * [성공] 익명 로그인 시 메인 페이지로 리다이렉트
     * - 입력, API 호출, URL 이동, Supabase 호출 확인
     */
    anonymousloginSuccessTest('[성공] 익명 로그인 - 메인 페이지로 리다이렉트', async ({ page }) => {
      // 1. 로그인 페이지로 이동
      await page.goto(TEST_PAGE_URL);

      // 2. '방문자로 접속하기' 버튼 클릭
      const anonButton = page.getByText('방문자로 접속하기');
      await anonButton.click();

      // 3. 메인 페이지로 리다이렉트 확인
      await expect(page).toHaveURL(REDIRECT_PAGE_URL);

      // 4. Supabase API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });

  test.describe('[실패] 익명 로그인', () => {
    /**
     * [실패] 캡챠 인증 실패 시 접속 버튼 비활성화
     * - 캡챠 실패, 버튼 비활성화, API 미호출 확인
     */
    anonymousLoginCaptchaFailTest('[실패] 캡챠 인증 실패 - 접속 버튼 비활성화', async ({ page }) => {
      // 1. 로그인 페이지로 이동
      await page.goto(TEST_PAGE_URL);

      // 2. '방문자로 접속하기' 버튼 비활성화 확인
      const anonButton = page.getByText('방문자로 접속하기');
      await expect(anonButton).toBeDisabled();

      // 3. Supabase API 미호출 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    /**
     * [실패] API 오류 발생 시 토스트 알림 표시
     * - API 오류, 토스트 알림, URL 이동 없음, Supabase 호출 확인
     */
    anonymousLoginInvalidCaptchaTokenTest('[실패] API 오류 발생 - 토스트 알림 표시', async ({ page }) => {
      // 1. 로그인 페이지로 이동
      await page.goto(TEST_PAGE_URL);

      // 2. '방문자로 접속하기' 버튼 클릭
      const anonButton = page.getByText('방문자로 접속하기');
      await anonButton.click();

      // 3. 토스트 알림 표시 확인
      await expect(page.getByText('인증 토큰이 유효하지 않습니다.')).toBeVisible();

      // 4. 페이지 이동 없음 확인
      await expect(page).toHaveURL(TEST_PAGE_URL);

      // 5. Supabase API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
