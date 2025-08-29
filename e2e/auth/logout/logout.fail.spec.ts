import { expect, test } from '@playwright/test';
import { TEST_ORIGN_URL, TEST_SESSION_KEY } from 'e2e/auth/common/const';
import { logout_F1 } from './fixture/index.fail.fixture';

const TEST_PAEG_URL = '/';

/**
 * @file 로그아웃 E2E 테스트
 * @description [실패] 로그아웃 기능의 End-to-End 시나리오를 검증합니다.
 *   - 실패: API 오류 발생 시 인증 토큰 유지 및 현재 페이지 머무름
 */
test.describe('[실패] 로그아웃', () => {
  /**
   * [실패] API 오류 발생 시 인증 토큰 유지 및 현재 페이지 머무름
   * - 버튼 클릭, 모달 확인, 토스트 알림, URL 이동 없음, 토큰 유지
   */
  logout_F1('API 오류 발생 - 인증 토큰 유지 및 현재 페이지 머무름', async ({ page, context }) => {
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
  });
});
