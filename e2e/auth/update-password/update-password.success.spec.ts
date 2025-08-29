import { test, expect } from '@playwright/test';
import { updatePassword_S1 } from './fixture/index.success.fixture';

import { TEST_PAGE_URL, REDIRECT_PAGE_URL } from './const';
import { TEST_ACCOUNT, TEST_ORIGN_URL, TEST_SESSION_KEY, TEST_SESSION_VALUE } from '../common/const';

/**
 * @file 비밀번호 재설정 E2E 테스트
 * @description [성공] 비밀번호 재설정 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 유효한 링크 접속 시 비밀번호 재설정 성공 및 로그인 페이지로 리다이렉트
 */
test.describe('[성공] 비밀번호 재설정', () => {
  /**
   * [성공] 유효한 링크 접속 시 비밀번호 재설정 성공 및 로그인 페이지로 리다이렉트
   * - 인증 토큰 확인, 입력, 버튼 클릭, 토큰 제거, URL 이동
   */
  updatePassword_S1('유효한 링크로 접속 시, 비밀번호 재설정 후 로그인 페이지로 이동', async ({ page, context }) => {
    // 1. 스토리지에 인증 토큰이 있는지 확인
    const beforeStorage = await context.storageState();
    const beforeSession = beforeStorage.origins
      .find((s) => s.origin === TEST_ORIGN_URL)
      ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);
    expect(beforeStorage.origins.length).toBeGreaterThanOrEqual(1);
    expect(beforeSession).toHaveProperty('name', TEST_SESSION_KEY);
    expect(beforeSession).toHaveProperty('value', JSON.stringify(TEST_SESSION_VALUE));

    // 2. 비밀번호 재설정 메일의 링크로 접속
    await page.goto(TEST_PAGE_URL);

    // 3. 비밀번호 변경 페이지로 리다이렉트 확인
    await page.waitForURL(REDIRECT_PAGE_URL);

    // 4. 새 비밀번호 입력
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(TEST_ACCOUNT.PASSWORD);
    await page.locator('input[name="confirmPassword"]').click();
    await page.locator('input[name="confirmPassword"]').fill(TEST_ACCOUNT.PASSWORD);

    // 5. '비밀번호 수정' 버튼 클릭
    await page.locator('button[type="submit"]').click();

    // 6. '비밀번호 재설정' 성공 메시지 확인
    await expect(page.getByText('비밀번호 재설정')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).not.toBeVisible();

    // 7. 로그인 페이지로 리다이렉트 확인
    await page.waitForURL('/auth/login');

    // 8. 스토리지에서 인증 토큰이 제거되었는지 확인
    const afterStorage = await context.storageState();
    const afterSession = afterStorage.origins
      .find((s) => s.origin === TEST_ORIGN_URL)
      ?.localStorage.find((l) => l.name === TEST_SESSION_KEY);
    expect(afterStorage.origins).toHaveLength(0);
    expect(afterSession).toBe(undefined);
  });
});
