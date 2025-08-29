import { test, expect } from '@playwright/test';
import { TEST_ACCOUNT } from '../common/const';
import { recoveryPassword_S1, recoveryPassword_S2 } from './fixture/index.success.fixture';

import { TEST_PAGE_URL, REDIRECT_PAGE_URL } from './const';

/**
 * @file 비밀번호 찾기 E2E 테스트
 * @description [성공] 비밀번호 찾기 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 가입된/존재하지 않는 이메일 입력 시 메일 전송 후 로그인 페이지 리다이렉트
 */
test.describe('[성공] 비밀번호 찾기', () => {
  /**
   * [성공] 가입된/존재하지 않는 이메일 입력 시 메일 전송 후 로그인 페이지 리다이렉트
   * - 입력, 버튼 클릭, 토스트 알림, URL 이동 확인
   */
  recoveryPassword_S1('가입된 이메일 입력 - 메일 전송 및 로그인 페이지 이동', async ({ page }) => {
    // 1. 비밀번호 찾기 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 가입된 이메일 입력
    await page.locator('input[name="id"]').click();
    await page.locator('input[name="id"]').fill(TEST_ACCOUNT.ID);

    // 3. '비밀번호 찾기' 버튼 클릭
    await page.locator('button[type="submit"]').click();

    // 4. 페이지 알림 확인
    await expect(page.getByText('메일 전송')).toBeVisible();

    // 5. 로그인 페이지로 리다이렉트 확인
    await page.waitForURL(REDIRECT_PAGE_URL);
    await expect(page.getByText('입력하기', { exact: true })).toBeEnabled();
  });

  recoveryPassword_S2('존재하지 않는 이메일 입력 - 메일 전송 및 로그인 페이지 이동(보안)', async ({ page }) => {
    // 1. 비밀번호 찾기 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. 존재하지 않는 이메일 입력
    await page.locator('input[name="id"]').click();
    await page.locator('input[name="id"]').fill(TEST_ACCOUNT.NONE_EXIST_ID);

    // 3. '비밀번호 찾기' 버튼 클릭
    await page.locator('button[type="submit"]').click();

    // 4. 페이지 알림 확인
    await expect(page.getByText('메일 전송')).toBeVisible();

    // 5. 로그인 페이지로 리다이렉트 확인
    await page.waitForURL(REDIRECT_PAGE_URL);
  });
});
