import { test, expect } from '@playwright/test';
import { anonymousLogin_F1, anonymousLogin_F2 } from './fixture/index.fail.fixture';

import { TEST_PAGE_URL } from './const';

/**
 * @file 익명 로그인(방문자 접속) E2E 테스트
 * @description [실패] 익명 로그인 기능의 End-to-End 시나리오를 검증합니다.
 *   - 실패: 캡챠 인증 실패 시 접속 버튼 비활성화
 *   - 실패: API 오류 발생 시 토스트 알림 표시
 */
test.describe('[실패] 익명 로그인(방문자 접속)', () => {
  /**
   * [실패] 캡챠 인증 실패 시 접속 버튼 비활성화
   * - 캡챠 실패, 버튼 비활성화, API 미호출 확인
   */
  anonymousLogin_F1('캡챠 인증 실패 - 접속 버튼 비활성화', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. '방문자로 접속하기' 버튼 비활성화 확인
    const anonButton = page.getByText('방문자로 접속하기');
    await expect(anonButton).toBeDisabled();
  });

  /**
   * [실패] API 오류 발생 시 토스트 알림 표시
   * - API 오류, 토스트 알림, URL 이동 없음
   */
  anonymousLogin_F2('API 오류 발생 - 토스트 알림 표시', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto(TEST_PAGE_URL);

    // 2. '방문자로 접속하기' 버튼 클릭
    const anonButton = page.getByText('방문자로 접속하기');
    await anonButton.click();

    // 3. 토스트 알림 표시 확인
    await expect(page.getByText('인증 토큰이 유효하지 않습니다.')).toBeVisible();

    // 4. 페이지 이동 없음 확인
    await expect(page).toHaveURL(TEST_PAGE_URL);
  });
});
