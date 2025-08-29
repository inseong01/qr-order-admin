import { test, expect } from '@playwright/test';
import { anonymousLogin_S1 } from './fixture/index.success.fixture';

import { REDIRECT_PAGE_URL, TEST_PAGE_URL } from './const';

/**
 * @file 익명 로그인(방문자 접속) E2E 테스트
 * @description [성공] 익명 로그인 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 익명 로그인 시 메인 페이지로 리다이렉트
 */
test.describe('[성공] 익명 로그인(방문자 접속)', () => {
  /**
   * [성공] 익명 로그인 시 메인 페이지로 리다이렉트
   * - 입력, API 호출, URL 이동
   */
  anonymousLogin_S1('메인 페이지로 리다이렉트', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. '방문자로 접속하기' 버튼 클릭 및 성공 토스트 확인
    const anonButton = page.getByText('방문자로 접속하기');
    await anonButton.click();
    await expect(page.getByText('로그인 성공')).toBeVisible();

    // 3. 메인 페이지로 리다이렉트 확인
    await expect(page).toHaveURL(REDIRECT_PAGE_URL);
  });
});
