/**
 * @file 로그아웃 E2E 테스트
 * @description 로그아웃 기능의 End-to-End 테스트 시나리오를 정의합니다.
 *              - 성공: 로그아웃 시 인증 토큰이 제거되고 로그인 페이지로 리다이렉트
 *              - 실패: API 오류 발생 시 인증 토큰이 유지되고 현재 페이지에 머무름
 */
import { expect, test } from '@playwright/test';

import { TEST_ORIGN_URL, TEST_SESSION_KEY } from 'e2e/auth/const';
import { isSupabaseCalled, logoutFailAPIErrorTest, logoutSuccessTest } from 'e2e/auth/fixtures/logout.fixture';

const TEST_PAEG_URL = '/' as const;
const REDIRECT_PAGE_URL = '/auth/login' as const;

test.describe('로그아웃', () => {
  test.describe('성공 시나리오', () => {
    logoutSuccessTest(
      '성공: 로그아웃 시, 인증 토큰이 제거되고 로그인 페이지로 이동해야 한다',
      async ({ page, context }) => {
        // 1. 메인 페이지로 이동합니다.
        await page.goto(TEST_PAEG_URL);

        // 2. 로그아웃 버튼을 클릭하고 확인 모달에서 '예'를 선택합니다.
        await page.getByText('로그아웃').click();
        await expect(page.getByText('로그아웃 하시겠습니까?')).toBeVisible();
        await page.getByText('예').click();

        // 3. 로그인 페이지로 리다이렉트되었는지 확인합니다.
        await page.waitForURL(REDIRECT_PAGE_URL);
        await expect(page.getByText('로그인')).toBeVisible();

        // 4. 로컬 스토리지에서 인증 토큰이 제거되었는지 확인합니다.
        const storage = await context.storageState();
        const session = storage.origins
          .find((s) => s.origin === TEST_ORIGN_URL)
          ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);

        expect(storage.origins).toHaveLength(0);
        expect(session).toBe(undefined);

        // 5. Supabase API가 호출되었는지 확인합니다.
        expect(isSupabaseCalled).toBeTruthy();
      }
    );
  });

  test.describe('실패 시나리오', () => {
    logoutFailAPIErrorTest('실패: API 오류 발생 시, 인증 토큰이 유지되어야 한다', async ({ page, context }) => {
      // 1. 메인 페이지로 이동합니다.
      await page.goto(TEST_PAEG_URL);

      // 2. 로그아웃 버튼을 클릭하고 확인 모달에서 '예'를 선택합니다.
      await page.getByText('로그아웃').click();
      await expect(page.getByText('로그아웃 하시겠습니까?')).toBeVisible();
      await page.getByText('예').click();

      // 3. 토스트 알림이 표시되는지 확인합니다.
      await expect(page.getByText('로그아웃 과정에서 오류가 발생했습니다.')).toBeVisible();

      // 4. 페이지가 이동하지 않았는지 확인합니다.
      await expect(page).toHaveURL(TEST_PAEG_URL);

      // 5. 로컬 스토리지에 인증 토큰이 남아있는지 확인합니다.
      const storage = await context.storageState();
      const session = storage.origins
        .find((s) => s.origin === TEST_ORIGN_URL)
        ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);

      expect(storage.origins.length).toBeGreaterThanOrEqual(1);
      expect(session).not.toBe(undefined);

      // 6. Supabase API가 호출되었는지 확인합니다.
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
