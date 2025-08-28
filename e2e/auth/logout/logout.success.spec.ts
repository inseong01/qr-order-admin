import { expect, test } from '@playwright/test';
import { TEST_ORIGN_URL, TEST_SESSION_KEY } from 'e2e/auth/common/const';
import { logout_S1 } from './fixture/index.success.fixture';

const TEST_PAEG_URL = '/';
const REDIRECT_PAGE_URL = '/auth/login';
/**
 * @file 로그아웃 E2E 테스트
 * @description [성공] 로그아웃 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 로그아웃 시 인증 토큰 제거 및 로그인 페이지 리다이렉트
 */
test.describe('[성공] 로그아웃', () => {
  /**
   * [성공] 로그아웃 시 인증 토큰 제거 및 로그인 페이지 리다이렉트
   * - 버튼 클릭, 모달 확인, URL 이동, 토큰 제거
   */
  logout_S1('인증 토큰 제거 및 로그인 페이지 이동', async ({ page, context }) => {
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
  });
});
