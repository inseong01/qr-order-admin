import test from '@playwright/test';
import {
  anonymousloginSuccessTest,
  anonymousLoginCaptchaFailTest,
  anonymousLoginInvalidCaptchaTokenTest,
  isSupabaseCalled,
  expect,
} from '../fixtures/anon-login.fixture';
import { TEST_ORIGN_URL, TEST_SESSION_KEY, TEST_SESSION_VALUE } from 'e2e/const';

// 방문자 접속 E2E 테스트

test.describe('방문자 접속', () => {
  test.describe('성공 시나리오', () => {
    anonymousloginSuccessTest('방문자 접속 성공 후 메인 페이지로 리다이렉트', async ({ page, context }) => {
      // 1. 페이지 스토리지 확인
      // const beforeStorage = await context.storageState();
      // const beforeSession = beforeStorage.origins
      //   .find((s) => s.origin === TEST_ORIGN_URL)
      //   ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);

      // expect(beforeStorage.origins.length).toBeGreaterThanOrEqual(1);
      // expect(beforeSession).toHaveProperty('name', TEST_SESSION_KEY);
      // expect(beforeSession).toHaveProperty('value', JSON.stringify(TEST_SESSION_VALUE));

      // 버튼 클릭 이후 인증 세션 삽입 필요

      // 2. 로그인 페이지 이동
      await page.goto('/auth/login');

      // 3. "방문자로 접속하기" 버튼 클릭
      const anonButton = page.getByText('방문자로 접속하기');
      await anonButton.click();

      // 4. 메인 페이지로 리다이렉트 확인
      await expect(page).toHaveURL('/'); // PATHS.ROOT.MAIN

      // 5. API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });

  test.describe('실패 시나리오', () => {
    anonymousLoginCaptchaFailTest('캡챠 실패 시 방문자 접속 버튼 비활성화 및 API 호출 확인', async ({ page }) => {
      // 1. 로그인 페이지 이동
      await page.goto('/auth/login');

      // 2. "방문자로 접속하기" 버튼 비활성화 확인
      const anonButton = page.getByText('방문자로 접속하기');
      await expect(anonButton).toBeDisabled();

      // 3. API 호출 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    anonymousLoginInvalidCaptchaTokenTest('API 호출 실패 시 토스트 알림 확인', async ({ page }) => {
      // 1. 로그인 페이지 이동
      await page.goto('/auth/login');

      // 2. "방문자로 접속하기" 버튼 클릭
      const anonButton = page.getByText('방문자로 접속하기');
      await anonButton.click();

      // 3. API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 4. 토스트 알림 확인
      await expect(page.getByText('인증 토큰이 유효하지 않습니다.')).toBeVisible();

      // 5. 페이지 이동 없음
      await expect(page).toHaveURL('/auth/login');
    });
  });
});
