import { expect, test } from '@playwright/test';

import { TEST_ORIGN_URL, TEST_SESSION_KEY } from 'e2e/auth/common/const';
import { isSupabaseCalled, logoutFailAPIErrorTest, logoutSuccessTest } from 'e2e/auth/logout/fixture/logout.fixture';

const TEST_PAEG_URL = '/' as const;
const REDIRECT_PAGE_URL = '/auth/login' as const;

/**
 * @file 로그아웃 E2E 테스트
 * @description [성공/실패] 로그아웃 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 로그아웃 시 인증 토큰 제거 및 로그인 페이지 리다이렉트
 *   - 실패: API 오류 발생 시 인증 토큰 유지 및 현재 페이지 머무름
 */
test.describe('[성공/실패] 로그아웃', () => {
  test.describe('[성공] 로그아웃', () => {
    /**
     * [성공] 로그아웃 시 인증 토큰 제거 및 로그인 페이지 리다이렉트
     * - 버튼 클릭, 모달 확인, URL 이동, 토큰 제거, Supabase 호출 확인
     */
    logoutSuccessTest('[성공] 로그아웃 - 인증 토큰 제거 및 로그인 페이지 이동', async ({ page, context }) => {
      // 1. 메인 페이지로 이동
      await page.goto(TEST_PAEG_URL);

      // 2. 로그아웃 버튼 클릭 및 모달 '예' 선택
      await page.getByText('로그아웃').click();
      await expect(page.getByText('로그아웃 하시겠습니까?')).toBeVisible();
      await page.getByText('예').click();

      // 3. 로그인 페이지로 리다이렉트 확인
      await page.waitForURL(REDIRECT_PAGE_URL);
      await expect(page.getByText('로그인')).toBeVisible();

      // 4. 로컬 스토리지 인증 토큰 제거 확인
      const storage = await context.storageState();
      const session = storage.origins
        .find((s) => s.origin === TEST_ORIGN_URL)
        ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);
      expect(storage.origins).toHaveLength(0);
      expect(session).toBe(undefined);

      // 5. Supabase API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });

  test.describe('[실패] 로그아웃', () => {
    /**
     * [실패] API 오류 발생 시 인증 토큰 유지 및 현재 페이지 머무름
     * - 버튼 클릭, 모달 확인, 토스트 알림, URL 이동 없음, 토큰 유지, Supabase 호출 확인
     */
    logoutFailAPIErrorTest('[실패] API 오류 발생 - 인증 토큰 유지 및 현재 페이지 머무름', async ({ page, context }) => {
      // 1. 메인 페이지로 이동
      await page.goto(TEST_PAEG_URL);

      // 2. 로그아웃 버튼 클릭 및 모달 '예' 선택
      await page.getByText('로그아웃').click();
      await expect(page.getByText('로그아웃 하시겠습니까?')).toBeVisible();
      await page.getByText('예').click();

      // 3. 토스트 알림 표시 확인
      await expect(page.getByText('로그아웃 과정에서 오류가 발생했습니다.')).toBeVisible();

      // 4. 페이지 이동 없음 확인
      await expect(page).toHaveURL(TEST_PAEG_URL);

      // 5. 로컬 스토리지 인증 토큰 유지 확인
      const storage = await context.storageState();
      const session = storage.origins
        .find((s) => s.origin === TEST_ORIGN_URL)
        ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);
      expect(storage.origins.length).toBeGreaterThanOrEqual(1);
      expect(session).not.toBe(undefined);

      // 6. Supabase API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
